import { AreaChart } from "@/components/ui/chart"

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const online = [182, 205, 198, 240, 262, 251, 288, 301, 296, 334, 362, 418]
const store = [140, 138, 152, 149, 160, 171, 168, 175, 181, 179, 190, 226]
const data = months.map((m, i) => ({ month: m, online: online[i] * 1000, store: store[i] * 1000 }))

const idr = (n: number) => `Rp ${new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n * 1000)}`

export default function ChartAreaDemo() {
  return (
    <div className="grid w-full gap-10 lg:grid-cols-2">
      <div>
        <div className="mb-3 text-[15px] font-semibold">Revenue, online</div>
        <AreaChart data={data} index="month" series={[{ key: "online", name: "Online" }]} label="Monthly online revenue, 2026" valueFormatter={idr} />
      </div>
      <div>
        <div className="mb-3 text-[15px] font-semibold">Online and in store</div>
        <AreaChart
          data={data}
          index="month"
          series={[
            { key: "online", name: "Online" },
            { key: "store", name: "In store" },
          ]}
          label="Monthly revenue by channel, 2026"
          valueFormatter={idr}
        />
      </div>
    </div>
  )
}
