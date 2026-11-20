// Verifies the palette-sheet geometry: the gap between neighbouring blocks must be
// exactly g everywhere they face each other. Run: node scripts/check-sheet-geometry.ts
import { MARK, SHEET, type SheetParams, sheetGeometry } from "../src/site/parts/sheet-geometry.ts"

type Pt = [number, number]

// Sample an SVG path made of M/H/V/A/Z commands (absolute) into points.
function sample(d: string, step = 0.5): Pt[] {
  const t = d.match(/[MHVAZQ]|-?\d*\.?\d+/g)!
  const pts: Pt[] = []
  let i = 0, x = 0, y = 0, sx = 0, sy = 0
  const line = (nx: number, ny: number) => {
    const n = Math.max(1, Math.ceil(Math.hypot(nx - x, ny - y) / step))
    for (let k = 1; k <= n; k++) pts.push([x + ((nx - x) * k) / n, y + ((ny - y) * k) / n])
    x = nx; y = ny
  }
  while (i < t.length) {
    const c = t[i++]
    if (c === "M") { x = sx = +t[i++]; y = sy = +t[i++]; pts.push([x, y]) }
    else if (c === "H") line(+t[i++], y)
    else if (c === "V") line(x, +t[i++])
    else if (c === "Z") line(sx, sy)
    else if (c === "Q") {
      const qx = +t[i++], qy = +t[i++], nx = +t[i++], ny = +t[i++]
      const n = 400
      for (let k = 1; k <= n; k++) { const u = k / n; pts.push([(1 - u) ** 2 * x + 2 * (1 - u) * u * qx + u * u * nx, (1 - u) ** 2 * y + 2 * (1 - u) * u * qy + u * u * ny]) }
      x = nx; y = ny
    }
    else if (c === "A") {
      const r = +t[i++]; i++; i++; i++; const sweep = +t[i++]; const nx = +t[i++], ny = +t[i++]
      // centre of a minor arc of radius r from (x,y) to (nx,ny)
      const mx = (x + nx) / 2, my = (y + ny) / 2, dx = nx - x, dy = ny - y, q = Math.hypot(dx, dy)
      const h = Math.sqrt(Math.max(0, r * r - (q / 2) ** 2))
      const s = sweep ? 1 : -1
      const cx = mx - (s * h * dy) / q, cy = my + (s * h * dx) / q
      let a0 = Math.atan2(y - cy, x - cx), a1 = Math.atan2(ny - cy, nx - cx)
      if (sweep && a1 < a0) a1 += 2 * Math.PI
      if (!sweep && a1 > a0) a1 -= 2 * Math.PI
      const n = Math.max(2, Math.ceil((Math.abs(a1 - a0) * r) / step))
      for (let k = 1; k <= n; k++) { const a = a0 + ((a1 - a0) * k) / n; pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]) }
      x = nx; y = ny
    }
  }
  return pts
}

// For every boundary point of A that faces B (closer than 2g), the shortest distance to B.
function gaps(a: Pt[], b: Pt[], g: number) {
  const out: number[] = []
  for (const [ax, ay] of a) {
    let m = Infinity
    for (const [bx, by] of b) m = Math.min(m, Math.hypot(ax - bx, ay - by))
    if (m < g * 1.5) out.push(m)
  }
  return out
}

function report(name: string, p: SheetParams) {
  const s = sheetGeometry(p)
  const step = p.W / 1200
  const T = sample(s.top, step), M = sample(s.left, step), O = sample(s.right, step)
  for (const [label, d] of [["top ↔ left", gaps(T, M, p.g)], ["top ↔ right", gaps(T, O, p.g)], ["left ↔ right", gaps(M, O, p.g)]] as const) {
    const min = Math.min(...d), max = Math.max(...d)
    // points on a convex corner see the facing straight edge at ≥ g; the facing pair minimum must be g
    console.log(`${name.padEnd(5)} ${label.padEnd(13)} min gap ${min.toFixed(3)}  (target ${p.g}, sampled ${d.length} facing points)`)
  }
  console.log(`${name.padEnd(5)} tail meets left edge at y=${s.yL.toFixed(2)}, rise meets right edge at y=${s.yR.toFixed(2)}`)
}

report("sheet", SHEET)
report("mark", MARK)

// Stricter: every point on M's top edge (up to its gap corner) and O's top edge (from its gap
// corner to the right edge) must sit exactly g from T — min and max both equal g.
function strict(name: string, p: SheetParams, paths = sheetGeometry(p)) {
  const step = p.W / 1500
  const T = sample(paths.top, step)
  const dist = ([x, y]: Pt) => Math.min(...T.map(([a, b]) => Math.hypot(x - a, y - b)))
  const yb = p.split + p.g / 2
  // Facing stretch only: where the gap leaves the sheet at x = 0 / x = W there is nothing opposite.
  const xFromL = p.rTail - (p.rTail * p.rTail) / (p.rTail + p.g)
  const mTop = sample(paths.left, step).filter(([x, y]) => x >= xFromL && x <= p.col - p.rInner && y <= yb + p.rTail)
  const oTop = sample(paths.right, step).filter(([x, y]) => x >= p.col + p.g + p.rInner && x < p.W - 1e-6 && y <= yb + 1e-6)
  for (const [label, pts] of [["mint top edge", mTop], ["orange top edge", oTop]] as const) {
    const d = pts.map(dist)
    console.log(`${name.padEnd(9)} ${label.padEnd(16)} gap ${Math.min(...d).toFixed(2)} … ${Math.max(...d).toFixed(2)}  (target ${p.g})`)
  }
}
console.log("--- constant-gap test")
strict("new", SHEET)
strict("old", SHEET, {
  top: "M0,56 Q0,0 56,0 H544 Q600,0 600,56 V300 Q600,372 528,372 H92 Q30,372 0,430 Z",
  left: "M0,468 Q38,388 110,388 H236 Q292,388 292,444 V584 Q292,640 236,640 H56 Q0,640 0,584 Z",
  right: "M308,444 Q308,388 364,388 H520 Q590,388 600,330 V584 Q600,640 544,640 H364 Q308,640 308,584 Z",
} as ReturnType<typeof sheetGeometry>)
