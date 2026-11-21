import { BarList, SegmentedBar } from "@/components/ui/chart"

const idr = (n: number) => `Rp ${new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n)}`

export default function ChartShareDemo() {
  return (
    <div className="grid w-full gap-10 lg:grid-cols-2">
      <div>
        <div className="mb-4 text-[15px] font-semibold">Sales by channel</div>
        <BarList
          label="Sales by channel"
          valueFormatter={idr}
          data={[
            { name: "Website", value: 386_000_000 },
            { name: "Tokopedia", value: 274_000_000 },
            { name: "Shopee", value: 198_000_000 },
            { name: "Jakarta store", value: 97_000_000 },
            { name: "Wholesale", value: 45_000_000 },
          ]}
        />
      </div>
      <div>
        <div className="mb-4 text-[15px] font-semibold">Payment methods</div>
        <SegmentedBar
          label="Payment methods, share of orders"
          data={[
            { name: "QRIS", value: 46 },
            { name: "Card", value: 22 },
            { name: "Bank transfer", value: 18 },
            { name: "PayLater", value: 9 },
            { name: "Cash", value: 5 },
          ]}
          valueFormatter={(n) => `${n}%`}
        />
      </div>
    </div>
  )
}
