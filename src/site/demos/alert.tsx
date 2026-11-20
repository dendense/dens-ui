import { CircleAlertIcon, InfoIcon, ZapIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AlertDemo() {
  return (
    <div className="grid w-full max-w-lg gap-3">
      <Alert>
        <InfoIcon />
        <AlertTitle>27 runs are waiting on the bank API rate limit</AlertTitle>
        <AlertDescription>They start again when the limit resets at 14:40.</AlertDescription>
      </Alert>
      <Alert variant="highlight">
        <ZapIcon />
        <AlertTitle>Settlement sync is 2.4× slower since 12:15</AlertTitle>
        <AlertDescription>Pause retries for 15 minutes to let the queue drain.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <CircleAlertIcon />
        <AlertTitle>Payroll handoff failed</AlertTitle>
        <AlertDescription>The payroll system rejected the file: column "cost_center" is missing. Fix the mapping and run again.</AlertDescription>
      </Alert>
    </div>
  )
}
