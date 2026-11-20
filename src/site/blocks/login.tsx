import { ArrowRightIcon, EyeIcon, LockIcon, MailIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input, InputGroup } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mark } from "../parts/brand"

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
              <svg viewBox="0 0 600 640" className="absolute inset-0 size-full" aria-hidden>
                <path d="M0,56 Q0,0 56,0 H544 Q600,0 600,56 V300 Q600,372 528,372 H92 Q30,372 0,430 Z" fill="#008C8D" />
                <path d="M0,468 Q38,388 110,388 H236 Q292,388 292,444 V584 Q292,640 236,640 H56 Q0,640 0,584 Z" fill="#C0EBD7" />
                <path d="M308,444 Q308,388 364,388 H520 Q590,388 600,330 V584 Q600,640 544,640 H364 Q308,640 308,584 Z" fill="#FF8A00" />
              </svg>
              <div className="absolute left-[8%] right-[8%] top-[9%]">
                <p className="text-[8cqw] font-bold leading-[1.02] tracking-[-0.035em] text-white">Every workflow, one calm console.</p>
                <p className="mt-[3cqw] max-w-[85%] text-[3.4cqw] font-medium leading-snug text-[#031414]">Approvals, runs and alerts for the whole ops team.</p>
              </div>
              <div className="absolute bottom-[7%] left-[6%] w-[36%] text-[#00585a]">
                <div className="text-[9cqw] font-bold leading-none tracking-[-0.04em] tabular-nums">98.7%</div>
                <div className="mt-[1.5cqw] text-[3cqw] font-semibold leading-tight">runs succeed on the first try</div>
              </div>
              <div className="absolute bottom-[7%] left-[57%] w-[36%] text-[#1f1100]">
                <div className="text-[9cqw] font-bold leading-none tracking-[-0.04em] tabular-nums">3</div>
                <div className="mt-[1.5cqw] text-[3cqw] font-semibold leading-tight">approvals waiting for you</div>
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
                      <button type="button" aria-label="Show password" className="grid size-7 place-content-center rounded-md text-muted-foreground hover:text-foreground [&_svg]:size-4">
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
