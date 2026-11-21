import { DonutChart } from "@/components/ui/chart"

const idr = (n: number) => `Rp ${new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n)}`

export default function ChartDonutDemo() {
  return (
    <div className="w-full max-w-xl">
      <div className="mb-4 text-[15px] font-semibold">Sales by category, November</div>
      <DonutChart
        label="Sales by category, November"
        centerLabel="Total sales"
        valueFormatter={idr}
        data={[
          { name: "Coffee beans", value: 412_000_000 },
          { name: "Brewing gear", value: 268_000_000 },
          { name: "Subscriptions", value: 191_000_000 },
          { name: "Workshops", value: 84_000_000 },
          { name: "Gift cards", value: 45_000_000 },
        ]}
      />
    </div>
  )
}
