import * as React from "react"
import { highlight } from "sugar-high"
import { CheckIcon, CopyIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useCopy } from "../lib"

export function CopyButton({ value, className }: { value: string; className?: string }) {
  const { copied, copy } = useCopy()
  return (
    <button
      type="button"
      onClick={() => copy(value)}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      className={cn(
        "grid size-8 place-content-center rounded-lg text-muted-foreground transition-colors outline-none hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-4",
        className
      )}
    >
      {copied ? <CheckIcon className="text-primary" /> : <CopyIcon />}
    </button>
  )
}

export function CodeBlock({
  code,
  lang = "tsx",
  className,
  maxHeight,
  title,
}: {
  code: string
  lang?: "tsx" | "bash" | "css"
  className?: string
  maxHeight?: number
  title?: string
}) {
  const html = React.useMemo(() => (lang === "bash" ? null : highlight(code.trimEnd())), [code, lang])
  return (
    <div className={cn("group relative overflow-hidden rounded-xl bg-(--code-bg) ring-1 ring-border/80", className)}>
      {title && (
        <div className="flex h-10 items-center border-b border-border/80 px-4 font-mono text-xs text-muted-foreground">
          {title}
        </div>
      )}
      <CopyButton value={code.trimEnd()} className="absolute right-2 top-2 bg-(--code-bg)" />
      <pre
        className="overflow-auto px-4 py-3.5 pr-12 font-mono text-[12.5px] leading-[1.7]"
        style={maxHeight ? { maxHeight } : undefined}
      >
        {html != null ? (
          <code dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <code>
            {code
              .trimEnd()
              .split("\n")
              .map((line, i) => (
                <span key={i} className="block">
                  <span className="select-none text-primary">$ </span>
                  {line}
                </span>
              ))}
          </code>
        )}
      </pre>
    </div>
  )
}
