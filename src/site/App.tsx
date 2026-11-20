import * as React from "react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { usePath } from "./lib"
import { DocsLayout, Footer, TopBar } from "./parts/shell"
import { HomePage } from "./pages/home"
import { ComponentPage, InstallationPage, IntroductionPage, NotFound, ThemingPage } from "./pages/docs"
import { BlockPage, isBlock } from "./pages/blocks"

function Route({ path }: { path: string }) {
  if (path === "/") return <HomePage />
  let page: React.ReactNode
  if (path === "/docs" || path === "/docs/introduction") page = <IntroductionPage />
  else if (path === "/docs/installation") page = <InstallationPage />
  else if (path === "/docs/theming") page = <ThemingPage />
  else if (path.startsWith("/docs/components/")) {
    const slug = path.slice("/docs/components/".length)
    page = <ComponentPage key={slug} slug={slug} />
  } else if (path.startsWith("/blocks/")) {
    const name = path.slice("/blocks/".length)
    page = isBlock(name) ? <BlockPage key={name} name={name} /> : <NotFound />
  } else page = <NotFound />
  return <DocsLayout>{page}</DocsLayout>
}

export function App() {
  const path = usePath()
  React.useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [path])
  return (
    <TooltipProvider>
      <div className="flex min-h-dvh flex-col">
        <a href="#main" onClick={(e) => { e.preventDefault(); document.getElementById("main")?.focus() }} className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-card focus:px-4 focus:py-2 focus:shadow-raised">
          Skip to content
        </a>
        <TopBar />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          <Route path={path} />
        </main>
        <Footer />
      </div>
    </TooltipProvider>
  )
}
