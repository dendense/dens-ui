import * as React from "react"
import * as THREE from "three"

import { EYES, KIND, classify } from "./cat-shape"

/**
 * A dot-matrix field in which a cat face assembles, ripples and blinks.
 * Loaded lazily (three.js stays out of the main bundle) and used only for
 * empty banner slots.
 *
 * Geometry: the plane is 2 units tall and `aspect · 2` wide, seen by a 35° camera
 * at distance 1 / tan(17.5°) ≈ 3.17, so one world unit = half the slot height.
 * The grid step is 2 / rows; strokes (whiskers, mouth) are 0.6 steps thick.
 */
export type CatDotsProps = {
  tone?: "dark" | "light"
  /** horizontal centre of the face, −1 (left edge) … 1 (right edge) */
  focusX?: number
  /** vertical centre of the face, −1 (bottom) … 1 (top) */
  focusY?: number
  /** face height as a share of the slot height */
  faceHeight?: number
  /** dots per slot height */
  rows?: number
}

const palettes = {
  dark: { bg: "#19a3a4", face: "#c0ebd7", eye: "#ff8a00", line: "#fff2df", bgAlpha: 0.22, faceAlpha: 0.8 },
  light: { bg: "#00797a", face: "#0a4a44", eye: "#ff8a00", line: "#0f1716", bgAlpha: 0.2, faceAlpha: 0.8 },
}

const vertex = /* glsl */ `
  attribute vec3 aScatter;
  attribute float aKind;
  attribute float aSeed;
  uniform float uTime;
  uniform float uIntro;
  uniform float uBlink;
  uniform float uDot;
  uniform float uPixelRatio;
  uniform vec2 uEyeL;
  uniform vec2 uEyeR;
  varying float vKind;
  varying float vSeed;
  void main() {
    vec3 p = position;
    // ripple: the background moves more than the face, so the face reads as a held shape
    float w = sin(p.x * 2.1 + uTime * 0.9) * cos(p.y * 1.7 - uTime * 0.6);
    p.z += w * (aKind < 0.5 ? 0.11 : 0.035);
    // blink: eye dots fold onto their eye's centre line
    if (aKind > 1.5 && aKind < 2.5) {
      vec2 c = distance(p.xy, uEyeL) < distance(p.xy, uEyeR) ? uEyeL : uEyeR;
      p.y = mix(p.y, c.y, uBlink);
    }
    // intro: each dot travels from its scattered start, staggered by its seed
    float t = clamp(uIntro * 1.6 - aSeed * 0.6, 0.0, 1.0);
    t = 1.0 - pow(1.0 - t, 3.0);
    vec3 pos = mix(aScatter, p, t);
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    float size = aKind < 0.5 ? 0.52 : (aKind < 1.5 ? 0.9 : 1.05);
    gl_PointSize = uDot * size * uPixelRatio * (3.17 / -mv.z);
    vKind = aKind;
    vSeed = aSeed;
  }
`

const fragment = /* glsl */ `
  uniform vec3 uBg;
  uniform vec3 uFace;
  uniform vec3 uEye;
  uniform vec3 uLine;
  uniform float uBgAlpha;
  uniform float uFaceAlpha;
  uniform float uTime;
  varying float vKind;
  varying float vSeed;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float edge = smoothstep(0.5, 0.38, d);
    vec3 col = uBg;
    float a = uBgAlpha * (0.7 + 0.3 * sin(uTime * 1.2 + vSeed * 6.2831));
    if (vKind > 0.5 && vKind < 1.5) { col = uFace; a = uFaceAlpha; }
    else if (vKind > 1.5 && vKind < 2.5) { col = uEye; a = 1.0; }
    else if (vKind > 2.5) { col = uLine; a = 0.95; }
    gl_FragColor = vec4(col, a * edge);
  }
`

function buildGeometry(aspect: number, p: Required<Omit<CatDotsProps, "tone">>) {
  const rows = p.rows
  const step = 2 / rows
  const cols = Math.max(4, Math.round((2 * aspect) / step))
  const halfW = ((cols - 1) * step) / 2
  const halfH = ((rows - 1) * step) / 2
  // face transform: face space spans 1.3 units tall (−0.52 … 0.78)
  const s = (p.faceHeight * 2) / 1.3
  const cx = p.focusX * aspect
  const cy = p.focusY - 0.13 * s
  const line = (0.6 * step) / s

  const pos: number[] = []
  const scatter: number[] = []
  const kind: number[] = []
  const seed: number[] = []
  let r = 1
  const rand = () => ((r = (r * 16807) % 2147483647) - 1) / 2147483646 // deterministic

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const x = -halfW + i * step
      const y = -halfH + j * step
      const k = classify((x - cx) / s, (y - cy) / s, line)
      if (k === KIND.none) continue
      pos.push(x, y, 0)
      const a = rand() * Math.PI * 2
      const rr = 1.2 + rand() * 2.4
      scatter.push(x + Math.cos(a) * rr, y + Math.sin(a) * rr, -1.5 + rand() * 2.5)
      kind.push(k)
      seed.push(rand())
    }
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3))
  g.setAttribute("aScatter", new THREE.Float32BufferAttribute(scatter, 3))
  g.setAttribute("aKind", new THREE.Float32BufferAttribute(kind, 1))
  g.setAttribute("aSeed", new THREE.Float32BufferAttribute(seed, 1))
  const eyes = EYES.map(([ex, ey]) => new THREE.Vector2(cx + ex * s, cy + ey * s))
  return { g, eyes, step }
}

export default function CatDots({ tone = "dark", focusX = 0, focusY = 0, faceHeight = 0.62, rows = 58 }: CatDotsProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const host = ref.current
    if (!host) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const pal = palettes[tone]

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    host.appendChild(renderer.domElement)
    renderer.domElement.style.display = "block"
    renderer.domElement.setAttribute("aria-hidden", "true")

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 20)
    camera.position.set(0, 0, 1 / Math.tan(THREE.MathUtils.degToRad(17.5)))

    const uniforms = {
      uTime: { value: 0 },
      uIntro: { value: reduced ? 1 : 0 },
      uBlink: { value: 0 },
      uDot: { value: 1 },
      uPixelRatio: { value: renderer.getPixelRatio() },
      uEyeL: { value: new THREE.Vector2() },
      uEyeR: { value: new THREE.Vector2() },
      uBg: { value: new THREE.Color(pal.bg) },
      uFace: { value: new THREE.Color(pal.face) },
      uEye: { value: new THREE.Color(pal.eye) },
      uLine: { value: new THREE.Color(pal.line) },
      uBgAlpha: { value: pal.bgAlpha },
      uFaceAlpha: { value: pal.faceAlpha },
    }
    const material = new THREE.ShaderMaterial({ vertexShader: vertex, fragmentShader: fragment, uniforms, transparent: true, depthWrite: false })
    let points: THREE.Points | null = null

    const rebuild = () => {
      const w = Math.max(1, host.clientWidth)
      const h = Math.max(1, host.clientHeight)
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      if (points) {
        scene.remove(points)
        points.geometry.dispose()
      }
      // Narrow slots (phones): the cat moves into a band at the top, clear of the copy.
      // Ear tips at y = 0.80 (units, slot height = 2), face scale s = 0.338
      // (faceHeight = 1.3·s / 2 = 0.22): centre cy = 0.80 − 0.78·s = 0.536,
      // focusY = cy + 0.13·s = 0.58, lowest whisker at cy − 0.37·s = 0.41.
      const aspect = w / h
      const compact = aspect < 1.1
      const { g, eyes, step } = buildGeometry(aspect, {
        focusX: compact ? 0 : focusX,
        focusY: compact ? 0.58 : focusY,
        faceHeight: compact ? 0.22 : faceHeight,
        // a smaller face needs a finer grid to keep its outline: ≈ 8 px per step on a phone
        rows: compact ? Math.round(rows * 1.6) : rows,
      })
      uniforms.uEyeL.value.copy(eyes[0])
      uniforms.uEyeR.value.copy(eyes[1])
      // dot diameter: 46% of the grid step, in CSS px (slot height = 2 units)
      uniforms.uDot.value = step * 0.46 * (h / 2)
      points = new THREE.Points(g, material)
      scene.add(points)
    }
    rebuild()

    // pointer parallax: up to ±4° of camera orbit
    const target = { x: 0, y: 0 }
    // listen on window: text and navbar sit above the slot and would swallow host events
    const onMove = (e: PointerEvent) => {
      const b = host.getBoundingClientRect()
      const inside = e.clientX >= b.left && e.clientX <= b.right && e.clientY >= b.top && e.clientY <= b.bottom
      target.x = inside ? ((e.clientX - b.left) / b.width - 0.5) * 2 : 0
      target.y = inside ? ((e.clientY - b.top) / b.height - 0.5) * 2 : 0
    }

    let visible = true
    let raf = 0
    let last = performance.now()
    let nextBlink = 2.2
    let blinkStart = -1
    const dist = camera.position.z

    // Clock: time only advances while the slot is on screen, but the intro is measured
    // in elapsed seconds, not in frames, so it lasts 2.4 s at any frame rate.
    const frame = (now: number) => {
      const dt = Math.min(0.25, (now - last) / 1000)
      last = now
      const t = (uniforms.uTime.value += dt)
      if (uniforms.uIntro.value < 1) uniforms.uIntro.value = Math.min(1, t / 2.4)
      // blink: 180 ms close-open, every 3–6 s
      if (t > nextBlink && blinkStart < 0) blinkStart = t
      if (blinkStart >= 0) {
        const k = (t - blinkStart) / 0.18
        uniforms.uBlink.value = k < 1 ? Math.sin(k * Math.PI) : 0
        if (k >= 1) {
          blinkStart = -1
          nextBlink = t + 3 + Math.random() * 3
        }
      }
      const ax = THREE.MathUtils.degToRad(4) * target.x
      const ay = THREE.MathUtils.degToRad(4) * -target.y
      camera.position.x += (Math.sin(ax) * dist - camera.position.x) * 0.06
      camera.position.y += (Math.sin(ay) * dist - camera.position.y) * 0.06
      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
      if (visible) raf = requestAnimationFrame(frame)
    }

    const start = () => {
      cancelAnimationFrame(raf)
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }

    if (reduced) {
      renderer.render(scene, camera)
    } else {
      start()
      window.addEventListener("pointermove", onMove, { passive: true })
    }

    const io = new IntersectionObserver(([entry]) => {
      const was = visible
      visible = entry.isIntersecting && document.visibilityState === "visible"
      if (!reduced && visible && !was) start()
    })
    io.observe(host)
    const onVis = () => {
      const was = visible
      visible = document.visibilityState === "visible"
      if (!reduced && visible && !was) start()
    }
    document.addEventListener("visibilitychange", onVis)

    let resizeTimer = 0
    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        rebuild()
        if (reduced) renderer.render(scene, camera)
      }, 120)
    })
    ro.observe(host)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      window.clearTimeout(resizeTimer)
      document.removeEventListener("visibilitychange", onVis)
      window.removeEventListener("pointermove", onMove)
      points?.geometry.dispose()
      material.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [tone, focusX, focusY, faceHeight, rows])

  return <div ref={ref} className="absolute inset-0" />
}
