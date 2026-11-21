import { BarChart } from "@/components/ui/chart"

const data = [
  { week: "W1", orders: 1240, returns: 96 },
  { week: "W2", orders: 1385, returns: 104 },
  { week: "W3", orders: 1190, returns: 88 },
  { week: "W4", orders: 1520, returns: 121 },
  { week: "W5", orders: 1610, returns: 117 },
  { week: "W6", orders: 1475, returns: 99 },
  { week: "W7", orders: 1730, returns: 132 },
  { week: "W8", orders: 1890, returns: 140 },
]

export default function ChartBarDemo() {
  return (
    <div className="grid w-full gap-10 lg:grid-cols-2">
      <div>
        <div className="mb-3 text-[15px] font-semibold">Orders per week</div>
        <BarChart data={data} index="week" series={[{ key: "orders", name: "Orders" }]} label="Orders per week" />
      </div>
      <div>
        <div className="mb-3 text-[15px] font-semibold">Orders and returns</div>
        <BarChart
          data={data.slice(-6)}
          index="week"
          series={[
            { key: "orders", name: "Orders" },
            { key: "returns", name: "Returns" },
          ]}
          label="Orders and returns per week"
        />
      </div>
    </div>
  )
}
