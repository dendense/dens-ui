import * as THREE from "three"

import { skyWeights, type Signal } from "./phases"

/*
 * The painted street corner, brought to life.
 *
 * The illustration is Seedream art (public/media/music): four sky plates
 * painted from one master (day, dawn, dusk, night) and one signal pole cut out
 * of a magenta ground in day and night light, all three lenses painted dark.
 * three.js only does what a painting can't:
 *
 *   - cross-fades the sky and pole plates by local time
 *   - drifts the sky plate and twinkles stars into the night plate's open sky
 *   - lights the signal: red → green → amber, with glow and halo
 *   - floats sun-lit dust by day, and sends small flocks of birds across
 *
 * Units are CSS pixels: an orthographic camera spans the canvas, y up.
 */

export type SceneOptions = { onSignal?: (s: Signal) => void; onReady?: () => void }
export type SceneHandle = {
  dispose: () => void
  setHour: (hour: number | null) => void
  /** jump the cycle to a signal (the music starting turns the light green) */
  showSignal: (s: Signal) => void
  /** phones: px from the top where the text column ends */
  setClearTop: (px: number) => void
}

const MEDIA = `${import.meta.env.BASE_URL}media/music/`
const SKY_ASPECT = 2752 / 1536
const POLE_ASPECT = 1376 / 768

/* Measured on pole-day.png (1376 × 768), as shares of width / height. */
const POLE = {
  axisX: 1045 / 1376,
  housingCenterY: 340 / 768,
  lensR: 42 / 768, // of image height
  lenses: [
    { y: 195 / 768, x: 477.5 / 1376, color: "#ff3b26", core: "#fff1e6" },
    { y: 312.5 / 768, x: 477.5 / 1376, color: "#ffad14", core: "#fff6df" },
    { y: 440 / 768, x: 477.5 / 1376, color: "#19e07f", core: "#eafff4" },
  ],
}

/* Signal timing, seconds. Amber is short, as on the street. */
const CYCLE: { signal: Signal; lens: number; secs: number }[] = [
  { signal: "red", lens: 0, secs: 11 },
  { signal: "green", lens: 2, secs: 10 },
  { signal: "amber", lens: 1, secs: 3 },
]

/* ---------- shaders ---------- */

const fullscreenVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const skyFragment = /* glsl */ `
  uniform sampler2D uDay;
  uniform sampler2D uDawn;
  uniform sampler2D uDusk;
  uniform sampler2D uNight;
  uniform vec4 uW;          // day, dawn, dusk, night
  uniform float uTime;
  uniform float uScreenAspect;
  uniform float uImageAspect;
  uniform float uFocusX;    // which part of a wide plate a narrow screen keeps
  uniform float uScrim;     // darkens the top-left where the type sits
  uniform float uMotion;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  vec3 plate(vec2 uv) {
    return texture2D(uDay, uv).rgb * uW.x
         + texture2D(uDawn, uv).rgb * uW.y
         + texture2D(uDusk, uv).rgb * uW.z
         + texture2D(uNight, uv).rgb * uW.w;
  }

  void main() {
    // cover-fit, then a 4% overscan the drift can move inside
    vec2 uv = vUv;
    float r = uScreenAspect / uImageAspect;
    if (r > 1.0) uv.y = (uv.y - 0.5) / r + 0.5;
    else uv.x = (uv.x - 0.5) * r + mix(0.5, uFocusX, 1.0 - r);
    uv = (uv - 0.5) / 1.04 + 0.5;
    uv += uMotion * vec2(sin(uTime * 0.021) * 0.014, cos(uTime * 0.017) * 0.006);

    vec3 c = plate(uv);

    // stars: only in the night plate's open sky, never over cloud
    float nightLuma = dot(texture2D(uNight, uv).rgb, vec3(0.299, 0.587, 0.114));
    float open = 1.0 - smoothstep(0.16, 0.3, nightLuma);
    vec2 grid = vUv * vec2(uScreenAspect, 1.0) * 140.0;
    vec2 cell = floor(grid);
    float h = hash(cell);
    if (h > 0.982) {
      vec2 p = fract(grid) - vec2(hash(cell + 3.1), hash(cell + 7.7)) * 0.6 - 0.2;
      float tw = 0.55 + 0.45 * sin(uTime * (0.8 + h * 3.0) * uMotion + h * 60.0);
      float star = smoothstep(0.16, 0.0, length(p)) * tw;
      c += vec3(0.92, 0.95, 1.0) * star * open * (uW.w + uW.z * 0.25) * 0.9;
    }

    // scrim for legibility of the type in the top-left
    float corner = 1.0 - smoothstep(0.1, 1.35, length((vUv - vec2(0.0, 0.85)) * vec2(1.25, 0.8)));
    c *= 1.0 - uScrim * corner;

    c += (hash(vUv * 1000.0 + fract(uTime)) - 0.5) * 0.008; // grain against banding
    gl_FragColor = vec4(c, 1.0);
    #include <colorspace_fragment>
  }
`

const poleVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const poleFragment = /* glsl */ `
  uniform sampler2D uDay;
  uniform sampler2D uNight;
  uniform float uNightMix;
  uniform vec3 uTint;
  uniform float uSpan;     // mesh height in image heights (> 1: the pole runs on)
  varying vec2 vUv;
  void main() {
    // below the painting, keep repeating its last row: only the pole reaches it
    float fromTop = (1.0 - vUv.y) * uSpan;
    vec2 uv = vec2(vUv.x, 1.0 - min(fromTop, 0.996));
    vec4 d = texture2D(uDay, uv);
    vec4 n = texture2D(uNight, uv);
    vec4 c = mix(d, n, uNightMix);
    if (c.a < 0.01) discard;
    gl_FragColor = vec4(c.rgb * uTint, c.a);
    #include <colorspace_fragment>
  }
`

const lampFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uCore;
  uniform float uOn;
  uniform float uHalo;
  uniform float uScale;  // quad half-size in lens radii
  varying vec2 vUv;
  void main() {
    vec2 p = (vUv - 0.5) * 2.0 * uScale;   // in lens radii
    float d = length(p);
    // the lit lens, brighter low where the visor doesn't shade it
    float disc = smoothstep(1.0, 0.86, d);
    float shade = mix(0.55, 1.0, smoothstep(0.9, -0.4, p.y));
    float hot = smoothstep(0.75, 0.0, length(p + vec2(0.12, 0.18)));
    vec3 lens = mix(uColor, uCore, hot * 0.7) * disc * shade;
    // the halo the lens throws into the air
    float halo = exp(-d * d * 0.18) * 0.42 * uHalo + exp(-d * 0.9) * 0.18 * uHalo;
    vec3 col = (lens * 1.25 + uColor * halo) * uOn;
    gl_FragColor = vec4(col, 1.0);
  }
`

const dustVertex = /* glsl */ `
  attribute float aSize;
  attribute float aSeed;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform vec2 uView;
  uniform float uMotion;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    // a slow updraft, wrapping at the top
    p.y = mod(p.y + uTime * (6.0 + aSeed * 10.0) * uMotion, uView.y + 40.0) - 20.0;
    p.x += sin(uTime * 0.3 * uMotion + aSeed * 30.0) * 8.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    float tw = 0.5 + 0.5 * sin(uTime * (0.7 + aSeed * 1.6) * uMotion + aSeed * 50.0);
    vAlpha = tw;
    gl_PointSize = aSize * uPixelRatio * (0.75 + 0.45 * tw);
  }
`
const dustFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uStrength;
  varying float vAlpha;
  void main() {
    float r = length(gl_PointCoord - 0.5) * 2.0;
    float a = (smoothstep(0.4, 0.0, r) + smoothstep(1.0, 0.0, r) * 0.3) * vAlpha * uStrength;
    gl_FragColor = vec4(uColor * a, a);
  }
`

/* birds: a soaring "m" drawn in the point sprite, wings flapping */
const birdVertex = /* glsl */ `
  attribute float aSize;
  attribute float aFlap;
  attribute float aAlpha;
  uniform float uPixelRatio;
  varying float vFlap;
  varying float vAlpha;
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uPixelRatio;
    vFlap = aFlap;
    vAlpha = aAlpha;
  }
`
const birdFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vFlap;
  varying float vAlpha;
  void main() {
    vec2 p = (gl_PointCoord - 0.5) * 2.0;
    p.y = -p.y;
    float x = abs(p.x);
    if (x > 0.96) discard;
    // wing line: up-stroke lifts the tips, down-stroke drops them
    float lift = mix(-0.42, 0.62, vFlap);
    float wing = lift * (x * 1.35 - x * x * 0.62) - 0.06;
    float thick = mix(0.17, 0.045, x);
    float a = smoothstep(thick, thick * 0.35, abs(p.y - wing));
    a = max(a, smoothstep(0.15, 0.07, length(p - vec2(0.0, -0.1))));
    a *= uOpacity * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(uColor, a);
  }
`

/* ---------- build ---------- */

function loadTexture(loader: THREE.TextureLoader, file: string) {
  return new Promise<THREE.Texture>((resolve, reject) => {
    loader.load(
      MEDIA + file,
      (t) => {
        t.colorSpace = THREE.SRGBColorSpace
        t.anisotropy = 4
        t.generateMipmaps = true
        t.minFilter = THREE.LinearMipmapLinearFilter
        resolve(t)
      },
      undefined,
      reject
    )
  })
}

export function createScene(canvas: HTMLCanvasElement, opts: SceneOptions = {}): SceneHandle {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const motion = reduceMotion ? 0 : 1
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "low-power" })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace

  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(0, 1, 1, 0, -10, 10)

  const disposables: { dispose: () => void }[] = []
  const track = <T extends { dispose: () => void }>(x: T) => (disposables.push(x), x)
  const blank = track(new THREE.DataTexture(new Uint8Array([22, 80, 184, 255]), 1, 1))
  blank.needsUpdate = true

  /* sky */
  const skyMat = track(
    new THREE.ShaderMaterial({
      vertexShader: fullscreenVertex,
      fragmentShader: skyFragment,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uDay: { value: blank },
        uDawn: { value: blank },
        uDusk: { value: blank },
        uNight: { value: blank },
        uW: { value: new THREE.Vector4(1, 0, 0, 0) },
        uTime: { value: 0 },
        uScreenAspect: { value: 1 },
        uImageAspect: { value: SKY_ASPECT },
        uFocusX: { value: 0.5 },
        uScrim: { value: 0 },
        uMotion: { value: motion },
      },
    })
  )
  const sky = new THREE.Mesh(track(new THREE.PlaneGeometry(2, 2)), skyMat)
  sky.frustumCulled = false
  sky.renderOrder = 0
  scene.add(sky)

  /* dust: sun-lit specks drifting up, by day */
  const DUST = 70
  const dustPos = new Float32Array(DUST * 3)
  const dustSize = new Float32Array(DUST)
  const dustSeed = new Float32Array(DUST)
  for (let i = 0; i < DUST; i++) {
    dustSeed[i] = Math.random()
    dustSize[i] = Math.random() < 0.1 ? 7 + Math.random() * 5 : 2 + Math.random() * 3
  }
  const dustGeo = track(new THREE.BufferGeometry())
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3))
  dustGeo.setAttribute("aSize", new THREE.BufferAttribute(dustSize, 1))
  dustGeo.setAttribute("aSeed", new THREE.BufferAttribute(dustSeed, 1))
  const dustMat = track(
    new THREE.ShaderMaterial({
      vertexShader: dustVertex,
      fragmentShader: dustFragment,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uView: { value: new THREE.Vector2(1, 1) },
        uColor: { value: new THREE.Color("#ffe7b0") },
        uStrength: { value: 1 },
        uMotion: { value: motion },
      },
    })
  )
  const dust = new THREE.Points(dustGeo, dustMat)
  dust.frustumCulled = false
  dust.renderOrder = 1
  scene.add(dust)


  /* birds: two or three small flocks crossing far off */
  type Flock = { x: number; y: number; dir: number; speed: number; scale: number; wait: number; members: { dx: number; dy: number; phase: number; rate: number }[] }
  const BIRDS_PER = 6
  const FLOCKS = 3
  const birdCount = BIRDS_PER * FLOCKS
  const birdPos = new Float32Array(birdCount * 3)
  const birdSize = new Float32Array(birdCount)
  const birdFlap = new Float32Array(birdCount)
  const birdAlpha = new Float32Array(birdCount)
  const birdGeo = track(new THREE.BufferGeometry())
  birdGeo.setAttribute("position", new THREE.BufferAttribute(birdPos, 3))
  birdGeo.setAttribute("aSize", new THREE.BufferAttribute(birdSize, 1))
  birdGeo.setAttribute("aFlap", new THREE.BufferAttribute(birdFlap, 1))
  birdGeo.setAttribute("aAlpha", new THREE.BufferAttribute(birdAlpha, 1))
  const birdMat = track(
    new THREE.ShaderMaterial({
      vertexShader: birdVertex,
      fragmentShader: birdFragment,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: { uPixelRatio: { value: renderer.getPixelRatio() }, uColor: { value: new THREE.Color("#25365e") }, uOpacity: { value: 0.75 } },
    })
  )
  const birds = new THREE.Points(birdGeo, birdMat)
  birds.frustumCulled = false
  birds.renderOrder = 1
  birds.visible = !reduceMotion
  scene.add(birds)

  const flocks: Flock[] = []
  const spawn = (f: Flock, first = false) => {
    f.dir = Math.random() < 0.5 ? 1 : -1
    f.scale = 0.7 + Math.random() * 0.45
    f.speed = (18 + Math.random() * 20) * f.scale
    // the upper sky; on phones above the text-heavy middle
    f.y = vh * (isPortrait ? 0.72 + Math.random() * 0.2 : 0.5 + Math.random() * 0.38)
    f.x = first ? Math.random() * vw : f.dir > 0 ? -80 : vw + 80
    f.wait = first ? 0 : 3 + Math.random() * 10
    const n = 3 + Math.floor(Math.random() * (BIRDS_PER - 2))
    f.members = Array.from({ length: BIRDS_PER }, (_, k) => {
      const side = k % 2 ? 1 : -1
      const rank = Math.ceil(k / 2)
      return {
        dx: -f.dir * rank * (13 + Math.random() * 7),
        dy: side * rank * (6 + Math.random() * 5) + (Math.random() - 0.5) * 6,
        phase: Math.random() * 10,
        rate: 5 + Math.random() * 3,
        hidden: k >= n,
      } as Flock["members"][number] & { hidden: boolean }
    })
  }
  for (let i = 0; i < FLOCKS; i++) {
    const f = { x: 0, y: 0, dir: 1, speed: 0, scale: 1, wait: 0, members: [] } as Flock
    flocks.push(f)
  }


  /* pole */
  const poleMat = track(
    new THREE.ShaderMaterial({
      vertexShader: poleVertex,
      fragmentShader: poleFragment,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uDay: { value: blank },
        uNight: { value: blank },
        uNightMix: { value: 0 },
        uTint: { value: new THREE.Color(1, 1, 1) },
        uSpan: { value: 1 },
      },
    })
  )
  const pole = new THREE.Mesh(track(new THREE.PlaneGeometry(1, 1)), poleMat)
  pole.renderOrder = 2
  pole.visible = false
  scene.add(pole)

  /* lamps */
  const LAMP_SCALE = 5 // quad half-size, in lens radii
  const lampGeo = track(new THREE.PlaneGeometry(1, 1))
  const lamps = POLE.lenses.map((l) => {
    const mat = track(
      new THREE.ShaderMaterial({
        vertexShader: poleVertex,
        fragmentShader: lampFragment,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uColor: { value: new THREE.Color(l.color) },
          uCore: { value: new THREE.Color(l.core) },
          uOn: { value: 0 },
          uHalo: { value: 1 },
          uScale: { value: LAMP_SCALE },
        },
      })
    )
    const mesh = new THREE.Mesh(lampGeo, mat)
    mesh.renderOrder = 3
    mesh.visible = false
    scene.add(mesh)
    return { mesh, mat, target: 0 }
  })

  /* layout, in CSS px with y up */
  let vw = 1
  let vh = 1
  let isPortrait = false
  let clearTop = 0
  const layout = () => {
    vw = canvas.clientWidth || window.innerWidth
    vh = canvas.clientHeight || window.innerHeight
    renderer.setSize(vw, vh, false)
    camera.right = vw
    camera.top = vh
    camera.updateProjectionMatrix()
    skyMat.uniforms.uScreenAspect.value = vw / vh
    dustMat.uniforms.uView.value.set(vw, vh)

    const portrait = vw / vh < 0.9
    isPortrait = portrait
    // the painting's height; the housing then sits where the reference has it
    // phones: the signal stands in the gap between the text column and the
    // player bar, as large as that gap allows, every sign above the bar
    const PLAYER = 112 // the floating bar and its margin, from the bottom
    const SIGNS_BOTTOM = 0.93 // the orange arrow's lower edge, as a share of H
    let H: number
    let top: number
    if (portrait) {
      const gap = vh - PLAYER - (clearTop || vh * 0.6) - 16
      H = Math.max(120, Math.min(vw * 0.62, gap / (SIGNS_BOTTOM - 0.163)))
      top = vh - PLAYER - SIGNS_BOTTOM * H
    } else {
      H = Math.min(vh * 0.54, vw * 0.36)
      top = vh * 0.5 - POLE.housingCenterY * H
    }
    const W = H * POLE_ASPECT
    const axisX = vw * (portrait ? 0.84 : 0.87)
    const left = axisX - POLE.axisX * W
    const span = Math.max(1, (vh - top + 40) / H) // run the pole past the bottom edge
    pole.scale.set(W, H * span, 1)
    pole.position.set(left + W / 2, vh - top - (H * span) / 2, 0)
    poleMat.uniforms.uSpan.value = span
    skyMat.uniforms.uFocusX.value = portrait ? 0.62 : 0.5

    const r = POLE.lensR * H
    POLE.lenses.forEach((l, i) => {
      lamps[i].mesh.scale.set(r * 2 * LAMP_SCALE, r * 2 * LAMP_SCALE, 1)
      lamps[i].mesh.position.set(left + l.x * W, vh - (top + l.y * H), 0)
    })

    for (let i = 0; i < DUST; i++) {
      dustPos[i * 3] = Math.random() * vw
      dustPos[i * 3 + 1] = Math.random() * vh
    }
    dustGeo.attributes.position.needsUpdate = true
  }
  layout()
  for (const f of flocks) spawn(f, true)
  const ro = new ResizeObserver(layout)
  ro.observe(canvas)

  /* time of day */
  let hourOverride: number | null = null
  const applyHour = () => {
    const now = new Date()
    const hour = hourOverride ?? now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600
    const [day, dawn, dusk, night] = skyWeights(hour)
    skyMat.uniforms.uW.value.set(day, dawn, dusk, night)
    skyMat.uniforms.uScrim.value = dawn * 0.68 + dusk * 0.36 + day * 0.16 + night * 0.05
    poleMat.uniforms.uNightMix.value = night + dusk * 0.55 + dawn * 0.3
    const tint = poleMat.uniforms.uTint.value as THREE.Color
    tint.setRGB(1, 1, 1)
      .lerp(new THREE.Color(1.04, 0.9, 0.86), dawn)
      .lerp(new THREE.Color(1.1, 0.78, 0.66), dusk * (1 - night))
    dustMat.uniforms.uStrength.value = day + dawn * 0.7 + dusk * 0.5
    // birds read as dark specks by day, silhouettes at dusk, roost at night
    ;(birdMat.uniforms.uColor.value as THREE.Color)
      .set("#25365e")
      .lerp(new THREE.Color("#4b3f63"), dawn)
      .lerp(new THREE.Color("#2a1b2a"), dusk)
    birdMat.uniforms.uOpacity.value = 0.75 * (1 - night) + 0.15 * night
    for (const l of lamps) l.mat.uniforms.uHalo.value = 1 + night * 1.4 + dusk * 0.6
  }
  applyHour()

  /* signal */
  let step = 0
  let stepLeft = CYCLE[0].secs
  const showSignal = () => {
    const s = CYCLE[step]
    lamps.forEach((l, i) => (l.target = i === s.lens ? 1 : 0))
    opts.onSignal?.(s.signal)
  }
  showSignal()

  /* assets */
  const loader = new THREE.TextureLoader()
  let ready = false
  // first the sky plate the hour needs and the pole, then the other plates
  const SKY_FILES = ["sky-day.min.jpg", "sky-dawn.min.jpg", "sky-dusk.min.jpg", "sky-night.min.jpg"]
  const SKY_UNIFORMS = ["uDay", "uDawn", "uDusk", "uNight"] as const
  const skyLoaded: (THREE.Texture | null)[] = [null, null, null, null]
  const fillSky = () => {
    const any = skyLoaded.find(Boolean) ?? blank
    SKY_UNIFORMS.forEach((u, i) => (skyMat.uniforms[u].value = skyLoaded[i] ?? any))
  }
  const startHour = hourOverride ?? new Date().getHours() + new Date().getMinutes() / 60
  const w0 = skyWeights(startHour)
  const first = w0.indexOf(Math.max(...w0))
  const keep = (t: THREE.Texture) => {
    if (disposed) {
      t.dispose()
      return false
    }
    track(t)
    return true
  }
  Promise.all([loadTexture(loader, SKY_FILES[first]), loadTexture(loader, "pole-day.png"), loadTexture(loader, "pole-night.png")])
    .then(([sky, pDay, pNight]) => {
      if (![sky, pDay, pNight].map(keep).every(Boolean)) return
      skyLoaded[first] = sky
      fillSky()
      poleMat.uniforms.uDay.value = pDay
      poleMat.uniforms.uNight.value = pNight
      pole.visible = true
      lamps.forEach((l) => (l.mesh.visible = true))
      ready = true
      renderer.render(scene, camera) // the first frame the canvas fades in on is the real one
      opts.onReady?.()
      SKY_FILES.forEach((f, i) => {
        if (i === first) return
        loadTexture(loader, f)
          .then((t) => {
            if (!keep(t)) return
            skyLoaded[i] = t
            fillSky()
            renderer.render(scene, camera)
          })
          .catch((err) => console.error(`dens.fm: ${f} failed to load`, err))
      })
    })
    .catch((err) => console.error("dens.fm: scene assets failed to load", err))

  /* loop */
  const timer = new THREE.Timer()
  timer.connect(document) // resets the delta when the tab comes back
  let raf = 0
  let visible = document.visibilityState === "visible"
  let sinceHour = 0
  let disposed = false
  const frame = (now?: number) => {
    raf = requestAnimationFrame(frame)
    if (!visible) return
    timer.update(now)
    const dt = Math.min(timer.getDelta(), 0.1)
    const t = timer.getElapsed()
    skyMat.uniforms.uTime.value = t
    dustMat.uniforms.uTime.value = t
    if (birds.visible) {
      flocks.forEach((f, fi) => {
        if (f.wait > 0) f.wait -= dt
        else f.x += f.dir * f.speed * dt
        if ((f.dir > 0 && f.x > vw + 160) || (f.dir < 0 && f.x < -160)) spawn(f)
        f.members.forEach((m, k) => {
          const i = fi * BIRDS_PER + k
          const hidden = f.wait > 0 || (m as typeof m & { hidden?: boolean }).hidden
          birdPos[i * 3] = f.x + m.dx * f.scale
          birdPos[i * 3 + 1] = f.y + m.dy * f.scale + Math.sin(t * 0.9 + m.phase) * 2.5
          // flap in bursts, glide between
          const glide = 0.5 + 0.5 * Math.sin(t * 0.45 + m.phase)
          birdFlap[i] = glide > 0.35 ? 0.5 + 0.5 * Math.sin(t * m.rate + m.phase) : 0.62
          birdSize[i] = 18 * f.scale
          birdAlpha[i] = hidden ? 0 : 1
        })
      })
      birdGeo.attributes.position.needsUpdate = true
      birdGeo.attributes.aFlap.needsUpdate = true
      birdGeo.attributes.aSize.needsUpdate = true
      birdGeo.attributes.aAlpha.needsUpdate = true
    }

    stepLeft -= dt
    if (stepLeft <= 0) {
      step = (step + 1) % CYCLE.length
      stepLeft = CYCLE[step].secs
      showSignal()
    }
    // LEDs snap on and fall off fast; no slow incandescent fade
    for (const l of lamps) {
      const u = l.mat.uniforms.uOn
      u.value += (l.target - u.value) * Math.min(1, dt * (l.target > u.value ? 30 : 14))
    }
    sinceHour += dt
    if (sinceHour > 5) {
      sinceHour = 0
      applyHour()
    }
    if (ready || t < 4) renderer.render(scene, camera)
  }
  frame()
  const onVis = () => {
    visible = document.visibilityState === "visible"
  }
  document.addEventListener("visibilitychange", onVis)

  return {
    setClearTop(px) {
      if (Math.abs(px - clearTop) < 1) return
      clearTop = px
      layout()
    },
    showSignal(sig) {
      const i = CYCLE.findIndex((c) => c.signal === sig)
      if (i < 0 || i === step) return
      step = i
      stepLeft = CYCLE[i].secs
      showSignal()
    },
    setHour(hour) {
      hourOverride = hour
      applyHour()
    },
    dispose() {
      disposed = true
      cancelAnimationFrame(raf)
      ro.disconnect()
      document.removeEventListener("visibilitychange", onVis)
      timer.dispose()
      for (const d of disposables) d.dispose()
      renderer.dispose()
    },
  }
}
