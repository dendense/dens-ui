import { ArrowUpRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function CardDemo() {
  return (
    <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-[1.3fr_1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Settlement sync</CardTitle>
          <CardDescription>bank api → ledger · every 15 min</CardDescription>
          <CardAction>
            <Badge variant="highlight">Slow · 2.4×</Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="grid gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Last 24 runs</span>
            <span className="font-semibold tabular-nums">21 / 24</span>
          </div>
          <Progress value={87} />
        </CardContent>
        <CardFooter className="justify-end">
          <Button size="sm" variant="outline">Trace</Button>
          <Button size="sm" variant="ink">Pause retries</Button>
        </CardFooter>
      </Card>
      <Card variant="brand" className="justify-between">
        <CardHeader>
          <CardTitle>Mars Green</CardTitle>
          <CardDescription>The brand variant, for one panel per screen.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button size="sm" className="bg-white text-[#0f1716] hover:bg-white/90">
            Explore <ArrowUpRightIcon />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
