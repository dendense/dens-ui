import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SelectDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select defaultValue="finance">
        <SelectTrigger className="w-56" aria-label="Folder">
          <SelectValue placeholder="Choose a folder" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Folders</SelectLabel>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="people">People ops</SelectItem>
            <SelectItem value="it">IT & access</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectItem value="archived" disabled>
            Archived
          </SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="week">
        <SelectTrigger size="sm" className="w-28" aria-label="Range">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="day">Day</SelectItem>
          <SelectItem value="week">Week</SelectItem>
          <SelectItem value="month">Month</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
