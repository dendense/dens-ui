import * as React from "react"

/* ---------- hash router (works on GitHub Pages without 404 tricks) ---------- */
function readPath() {
  const h = window.location.hash.replace(/^#/, "")
  return h.startsWith("/") ? h : "/"
}
function subscribe(cb: () => void) {
  window.addEventListener("hashchange", cb)
  return () => window.removeEventListener("hashchange", cb)
}
export function usePath() {
  return React.useSyncExternalStore(subscribe, readPath, () => "/")
}
export function href(path: string) {
  return `#${path}`
}

export function Link({ to, ...props }: Omit<React.ComponentProps<"a">, "href"> & { to: string }) {
  return <a href={href(to)} {...props} />
}

/* ---------- theme ---------- */
type Theme = "light" | "dark"
function currentTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light"
}
const themeListeners = new Set<() => void>()
export function setTheme(t: Theme) {
  document.documentElement.classList.toggle("dark", t === "dark")
  try {
    localStorage.setItem("dens-theme", t)
  } catch {
    /* storage unavailable */
  }
  themeListeners.forEach((l) => l())
}
export function useTheme() {
  return React.useSyncExternalStore(
    (cb) => {
      themeListeners.add(cb)
      return () => themeListeners.delete(cb)
    },
    currentTheme,
    () => "light" as Theme
  )
}

/* ---------- copy ---------- */
export function useCopy(timeout = 1600) {
  const [copied, setCopied] = React.useState(false)
  const copy = React.useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        window.setTimeout(() => setCopied(false), timeout)
      } catch {
        setCopied(false)
      }
    },
    [timeout]
  )
  return { copied, copy }
}

export const REGISTRY_URL = "https://dendense.github.io/dens-ui/r"
export const REPO_URL = "https://github.com/dendense/dens-ui"
