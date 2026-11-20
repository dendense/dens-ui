import { SearchIcon } from "lucide-react"
import { Input, InputGroup } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"

export default function InputDemo() {
  return (
    <div className="grid w-full max-w-sm gap-5">
      <InputGroup start={<SearchIcon />} end={<Kbd>⌘K</Kbd>}>
        <Input placeholder="Search workflows" aria-label="Search workflows" />
      </InputGroup>
      <div className="grid gap-2">
        <Label htmlFor="email">Work email</Label>
        <Input id="email" type="email" placeholder="nadia@denslab.id" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="slug">Workspace URL</Label>
        <Input id="slug" defaultValue="denslab ops" aria-invalid aria-describedby="slug-error" />
        <p id="slug-error" className="text-[13px] text-destructive">
          Use lowercase letters and dashes only, e.g. denslab-ops.
        </p>
      </div>
    </div>
  )
}
