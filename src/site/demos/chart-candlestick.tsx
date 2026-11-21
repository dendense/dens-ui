import { CandlestickChart, type Candle } from "@/components/ui/chart"

// a seeded random walk, so the demo looks the same on every load
function candles(n: number, seed = 7): Candle[] {
  let s = seed
  const rand = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646
  const out: Candle[] = []
  let price = 4820
  const start = new Date(2026, 8, 1)
  for (let i = 0; i < n; i++) {
    // pulled toward a slow wave, so the walk has swings instead of one long climb
    const target = 4820 + 240 * Math.sin(i / 10) + 4 * i
    const open = price
    const close = Math.max(100, open * 0.7 + target * 0.3 + (rand() - 0.5) * 120)
    const high = Math.max(open, close) + rand() * 60
    const low = Math.min(open, close) - rand() * 60
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    out.push({
      time: d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
      open: Math.round(open),
      high: Math.round(high),
      low: Math.round(low),
      close: Math.round(close),
      volume: Math.round(180_000 + rand() * 420_000 + Math.abs(close - open) * 2_400),
    })
    price = close
  }
  return out
}

const data = candles(64)

export default function ChartCandlestickDemo() {
  return (
    <div className="w-full">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <div className="text-[15px] font-semibold">LMBG / IDR</div>
          <div className="text-[12.5px] text-muted-foreground">Lumbung index, daily · fictional data</div>
        </div>
      </div>
      <CandlestickChart data={data} label="LMBG / IDR, daily candles" movingAveragePeriod={20} />
    </div>
  )
}
