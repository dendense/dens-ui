import { ArrowRightIcon, EyeIcon, LockIcon, MailIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input, InputGroup } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mark } from "../parts/brand"
import { SHEET, SHEET_INSET, sheet } from "../parts/sheet-geometry"

/* positions in sheet units → % of the sheet, sizes → container-query width */
const sx = (u: number) => `${(u / SHEET.W) * 100}%`
const sy = (u: number) => `${(u / SHEET.H) * 100}%`
const cq = (u: number) => `${(u / SHEET.W) * 100}cqw`
const inset = SHEET_INSET

export function LoginBlock({ className }: { className?: string }) {
  return (
    <div className={cn("@container overflow-hidden rounded-[28px] bg-card ring-1 ring-border", className)}>
      <div className="grid @3xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        {/* Brand side: the palette sheet, whole, carrying the pitch */}
        <div className="hidden flex-col gap-8 bg-[#0c0b0b] p-8 text-[#fff2df] @3xl:flex">
          <div className="flex items-center gap-2.5">
            <Mark className="size-8 rounded-[9px] ring-1 ring-white/15" />
            <span className="text-lg font-bold tracking-[-0.02em]">Lumbung</span>
          </div>
          <div className="cq mt-auto w-full max-w-[520px]">
            <div className="relative aspect-[600/640]">
              <svg viewBox={`0 0 ${SHEET.W} ${SHEET.H}`} className="absolute inset-0 size-full" aria-hidden>
                <path d={sheet.top} fill="#008C8D" />
                <path d={sheet.left} fill="#C0EBD7" />
                <path d={sheet.right} fill="#FF8A00" />
              </svg>
              <div className="absolute" style={{ left: sx(inset), right: sx(inset), top: sy(inset) }}>
                <p className="font-bold leading-[1.02] tracking-[-0.035em] text-white" style={{ fontSize: cq(48) }}>Every workflow, one calm console.</p>
                <p className="max-w-[85%] font-medium leading-snug text-[#031414]" style={{ fontSize: cq(20), marginTop: cq(16) }}>Approvals, runs and alerts for the whole ops team.</p>
              </div>
              <div className="absolute text-[#00585a]" style={{ left: sx(inset), top: sy(sheet.yb + inset), width: sx(SHEET.col - 2 * inset) }}>
                <div className="font-bold leading-none tracking-[-0.04em] tabular-nums" style={{ fontSize: cq(54) }}>98.7%</div>
                <div className="font-semibold leading-tight" style={{ fontSize: cq(18), marginTop: cq(8) }}>runs succeed on the first try</div>
              </div>
              <div className="absolute text-[#1f1100]" style={{ left: sx(sheet.x0 + inset), top: sy(sheet.yb + inset), width: sx(SHEET.W - sheet.x0 - 2 * inset) }}>
                <div className="font-bold leading-none tracking-[-0.04em] tabular-nums" style={{ fontSize: cq(54) }}>3</div>
                <div className="font-semibold leading-tight" style={{ fontSize: cq(18), marginTop: cq(8) }}>approvals waiting for you</div>
              </div>
            </div>
          </div>
          <p className="text-[12px] text-[#fff2df]/70">Demo workspace · figures are illustrative</p>
        </div>

        {/* Form side */}
        <div className="flex flex-col justify-center px-6 py-10 sm:px-12">
          <div className="mx-auto w-full max-w-sm">
            <div className="mb-8 flex items-center gap-2.5 @3xl:hidden">
              <Mark className="size-8" />
              <span className="text-lg font-bold tracking-[-0.02em]">Lumbung</span>
            </div>
            <h3 className="text-[28px] font-bold tracking-[-0.03em]">Sign in</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              New to Lumbung? <a href="#/blocks/login" className="font-semibold text-primary underline-offset-4 hover:underline">Create a workspace</a>
            </p>

            <Tabs defaultValue="password" className="mt-7 gap-5">
              <TabsList className="w-full">
                <TabsTrigger value="password" className="flex-1">Password</TabsTrigger>
                <TabsTrigger value="link" className="flex-1">Email link</TabsTrigger>
              </TabsList>
              <TabsContent value="password" className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="login-email">Work email</Label>
                  <InputGroup start={<MailIcon />}>
                    <Input id="login-email" type="email" placeholder="nadia@denslab.id" autoComplete="off" />
                  </InputGroup>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password">Password</Label>
                    <a href="#/blocks/login" className="text-[13px] font-medium text-muted-foreground hover:text-foreground">Forgot password?</a>
                  </div>
                  <InputGroup
                    start={<LockIcon />}
                    end={
                      <button type="button" aria-label="Show password" className="grid size-6 place-content-center rounded-[6px] text-muted-foreground hover:text-foreground [&_svg]:size-4">
                        <EyeIcon />
                      </button>
                    }
                  >
                    <Input id="login-password" type="password" placeholder="••••••••" autoComplete="off" />
                  </InputGroup>
                </div>
                <div className="flex items-center gap-2.5">
                  <Checkbox id="remember" defaultChecked />
                  <Label htmlFor="remember" className="font-medium">Keep me signed in for 30 days</Label>
                </div>
                <Button size="lg" className="mt-1 w-full">Sign in <ArrowRightIcon /></Button>
              </TabsContent>
              <TabsContent value="link" className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="login-link-email">Work email</Label>
                  <Input id="login-link-email" type="email" placeholder="nadia@denslab.id" autoComplete="off" />
                </div>
                <Button size="lg" className="w-full">Email me a sign-in link</Button>
              </TabsContent>
            </Tabs>

            <div className="my-7 flex items-center gap-3 text-xs text-muted-foreground">
              <Separator className="flex-1" /> or continue with <Separator className="flex-1" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline">Google</Button>
              <Button variant="outline">SSO</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
