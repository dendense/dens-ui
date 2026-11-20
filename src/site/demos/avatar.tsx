import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"

export default function AvatarDemo() {
  return (
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback>NR</AvatarFallback>
        </Avatar>
        <div className="leading-tight">
          <div className="text-sm font-semibold">Nadia Rahma</div>
          <div className="text-[13px] text-muted-foreground">Ops lead</div>
        </div>
      </div>
      <AvatarGroup>
        <Avatar>
          <AvatarFallback className="bg-highlight text-highlight-foreground">TR</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback className="bg-brand text-brand-foreground">LP</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback className="bg-foreground text-background">AS</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback className="bg-secondary text-secondary-foreground">+3</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    </div>
  )
}
