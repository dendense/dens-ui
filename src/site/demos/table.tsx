import { Badge, StatusDot } from "@/components/ui/badge"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const rows = [
  { name: "Settlement sync", route: "bank api → ledger", runs: 24, status: "slow" },
  { name: "Vendor onboarding", route: "intake form → erp, email", runs: 6, status: "healthy" },
  { name: "Monthly access audit", route: "cron · monthly → sso", runs: 1, status: "waiting" },
  { name: "Contract renewals", route: "crm → mail", runs: 12, status: "healthy" },
] as const

export default function TableDemo() {
  return (
    <Table className="min-w-[520px]">
      <TableCaption>Demo data · workflows in the last 24 hours</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Workflow</TableHead>
          <TableHead className="text-right">Runs</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.name}>
            <TableCell>
              <div className="font-semibold">{r.name}</div>
              <div className="font-mono text-[11.5px] text-muted-foreground">{r.route}</div>
            </TableCell>
            <TableCell className="text-right">{r.runs}</TableCell>
            <TableCell className="text-right">
              {r.status === "slow" && (
                <Badge variant="outline">
                  <StatusDot tone="destructive" /> Slow · 2.4×
                </Badge>
              )}
              {r.status === "healthy" && (
                <Badge variant="soft">
                  <StatusDot /> Healthy
                </Badge>
              )}
              {r.status === "waiting" && <Badge variant="highlight">Waiting on you</Badge>}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
