import * as React from "react"
import { InfoIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Link, REGISTRY_URL } from "../lib"
import { CodeBlock } from "../parts/code"
import { H2, PageHeader } from "../parts/shell"
import { Pager } from "./docs"

/*
 * Desktop apps: how to run Dens-UI inside Tauri, Electron, Wails, Dioxus/Leptos,
 * or carry the tokens over to a native toolkit.
 */

const paths: { shell: string; lang: string; reuse: string; to: string }[] = [
  { shell: "Tauri 2", lang: "Rust", reuse: "Everything: theme, components, blocks", to: "#tauri" },
  { shell: "Electron", lang: "JavaScript / TypeScript", reuse: "Everything", to: "#electron-wails" },
  { shell: "Wails", lang: "Go", reuse: "Everything", to: "#electron-wails" },
  { shell: "Dioxus, Leptos", lang: "Rust", reuse: "Theme and class names; components are rewritten in RSX", to: "#dioxus-leptos" },
  { shell: "egui, iced, Slint, GTK 4", lang: "Rust", reuse: "Colour, radius and spacing values only", to: "#native" },
]

const tokens: [string, string, string][] = [
  ["background", "#edf0ef", "#0c0b0b"],
  ["surface", "#f5f7f6", "#121514"],
  ["card", "#ffffff", "#161918"],
  ["foreground", "#0f1716", "#ecf2f0"],
  ["muted-foreground", "#566361", "#9aa8a5"],
  ["primary", "#00797a", "#19a3a4"],
  ["primary-foreground", "#ffffff", "#031414"],
  ["highlight", "#ff8a00", "#ff9a1f"],
  ["soft", "#c0ebd7", "#123f3a"],
  ["destructive", "#a42423", "#f74835"],
  ["border", "#dbe2df", "#262c2b"],
  ["ring", "#008c8d", "#19a3a4"],
]

function Steps({ children }: { children: React.ReactNode }) {
  return <ol className="grid gap-8 [counter-reset:step]">{children}</ol>
}

function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <li className="grid gap-4 [counter-increment:step]">
      <h3 className="flex items-baseline gap-3 text-[17px] font-semibold tracking-[-0.01em] before:font-mono before:text-[13px] before:text-muted-foreground before:content-[counter(step,decimal-leading-zero)]">
        {title}
      </h3>
      {children}
    </li>
  )
}

export function DesktopPage() {
  return (
    <article>
      <PageHeader
        title="Desktop apps"
        lead="Dens-UI is web code. A desktop shell that renders a webview runs it unchanged; a native toolkit takes the tokens and leaves the components."
      />

      <H2 id="paths">Pick a path</H2>
      <div className="overflow-x-auto rounded-2xl bg-card ring-1 ring-border">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-border text-left font-mono text-[11.5px] text-muted-foreground">
              <th className="px-4 py-3 font-medium">Shell</th>
              <th className="px-4 py-3 font-medium">Language</th>
              <th className="px-4 py-3 font-medium">What you reuse</th>
            </tr>
          </thead>
          <tbody>
            {paths.map((p) => (
              <tr key={p.shell} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-semibold">
                  <a href={p.to} onClick={(e) => { e.preventDefault(); document.getElementById(p.to.slice(1))?.scrollIntoView({ behavior: "smooth" }) }} className="hover:text-primary">
                    {p.shell}
                  </a>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{p.lang}</td>
                <td className="px-4 py-3">{p.reuse}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="prose-dens mt-4">
        If you write Rust and want the components as they are, use Tauri: the Rust code runs the app, and the window is a
        webview (WKWebView on macOS, WebKitGTK on Linux, WebView2 on Windows) that renders the same React you see on this site.
      </p>

      {/* ---------------------------------------------------------------- */}
      <H2 id="tauri">Tauri (Rust)</H2>
      <Steps>
        <Step title="Create the app">
          <p className="prose-dens">You need Rust (<code>rustup</code>) and Node 20 or newer. The React + TypeScript template already uses Vite.</p>
          <CodeBlock
            lang="bash"
            code={`npm create tauri-app@latest my-app -- --template react-ts --manager npm
cd my-app
npm install`}
          />
        </Step>

        <Step title="Add Tailwind v4 and the @/ alias">
          <CodeBlock lang="bash" code={`npm install tailwindcss @tailwindcss/vite
npm install -D @types/node`} />
          <CodeBlock
            title="vite.config.ts"
            code={`import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  // keep the rest of the Tauri template: clearScreen: false, server.port 1420, strictPort …
})`}
          />
          <CodeBlock
            title="tsconfig.json  (inside compilerOptions)"
            code={`"baseUrl": ".",
"paths": { "@/*": ["./src/*"] }`}
          />
        </Step>

        <Step title="Install the theme and components">
          <p className="prose-dens">
            From here it is the normal <Link to="/docs/installation">installation</Link>. Run shadcn init, add the theme,
            then import it in the stylesheet the template loads (<code>src/App.css</code>).
          </p>
          <CodeBlock
            lang="bash"
            code={`npx shadcn@latest init
npx shadcn@latest add ${REGISTRY_URL}/theme.json
npx shadcn@latest add ${REGISTRY_URL}/all.json`}
          />
          <CodeBlock
            lang="css"
            title="src/App.css"
            code={`@import "tailwindcss";
@import "@fontsource-variable/figtree";
@import "@fontsource-variable/jetbrains-mono";
@import "./styles/dens-ui.css";`}
          />
        </Step>

        <Step title="Run it">
          <CodeBlock lang="bash" code={`npm run tauri dev`} />
          <p className="prose-dens">
            Keep Vite's default <code>base</code> (<code>/</code>). This repository sets <code>base: "/dens-ui/"</code> only
            because GitHub Pages serves it from a sub-path; do not copy that into an app.
          </p>
        </Step>
      </Steps>

      {/* ---------------------------------------------------------------- */}
      <H2 id="feel">Make it feel like a desktop app</H2>
      <div className="grid gap-8">
        <div className="grid gap-4">
          <h3 className="text-[17px] font-semibold tracking-[-0.01em]">Follow the system theme</h3>
          <p className="prose-dens">
            Webviews report the OS appearance through <code>prefers-color-scheme</code>, so the same snippet works in Tauri,
            Electron and Wails. Run it before React renders to avoid a light flash.
          </p>
          <CodeBlock
            title="src/main.tsx"
            code={`const media = window.matchMedia("(prefers-color-scheme: dark)")
const apply = () => document.documentElement.classList.toggle("dark", media.matches)
apply()
media.addEventListener("change", apply)`}
          />
        </div>

        <div className="grid gap-4">
          <h3 className="text-[17px] font-semibold tracking-[-0.01em]">Draw your own title bar on macOS</h3>
          <p className="prose-dens">
            An overlay title bar lets the Dens-UI ground run to the top of the window, with the traffic lights sitting on it.
            Give the header <code>data-tauri-drag-region</code> so it moves the window, and leave about 78px on the left for the
            three buttons.
          </p>
          <CodeBlock
            title="src-tauri/tauri.conf.json  (app.windows[0])"
            code={`{
  "title": "My app",
  "width": 1200,
  "height": 780,
  "minWidth": 960,
  "minHeight": 600,
  "titleBarStyle": "Overlay",
  "hiddenTitle": true
}`}
          />
          <CodeBlock
            title="src-tauri/capabilities/default.json  (permissions)"
            code={`"permissions": ["core:default", "core:window:allow-start-dragging"]`}
          />
          <CodeBlock
            title="TitleBar.tsx"
            code={`export function TitleBar() {
  return (
    <header data-tauri-drag-region className="flex h-11 shrink-0 select-none items-center gap-3 pl-[78px] pr-3">
      <span data-tauri-drag-region className="text-[13px] font-semibold text-muted-foreground">My app</span>
    </header>
  )
}`}
          />
          <p className="prose-dens">
            <code>titleBarStyle</code> only applies on macOS. On Linux keep the native decorations; the window manager draws them.
          </p>
        </div>

        <div className="grid gap-4">
          <h3 className="text-[17px] font-semibold tracking-[-0.01em]">Small things that separate an app from a page</h3>
          <ul className="prose-dens list-disc space-y-2 pl-5">
            <li>
              Put <code>select-none</code> on the window chrome (sidebar, toolbars, tab bars). Leave text selectable in the
              content, where people copy things.
            </li>
            <li>
              Stop the rubber-band scroll of the whole window. Scroll inside panels instead, with
              <code>overflow-y-auto</code> on the area that holds the content.
            </li>
            <li>
              Start from the <Link to="/blocks/dashboard">Dashboard block</Link>: the icon rail, Sidebar with folders and the
              inset main panel already have the shape of a desktop window.
            </li>
            <li>
              Set a minimum window size (<code>minWidth</code> / <code>minHeight</code>) so the sidebar never has to collapse
              into the mobile menu.
            </li>
          </ul>
          <CodeBlock lang="css" title="src/App.css" code={`html, body { height: 100%; overflow: hidden; overscroll-behavior: none; }`} />
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      <H2 id="platforms">Platform notes</H2>
      <ul className="prose-dens list-disc space-y-2 pl-5">
        <li>
          <strong>macOS</strong> uses WKWebView, the Safari engine. Everything in the registry works there as it does in Safari.
        </li>
        <li>
          <strong>Linux</strong> uses WebKitGTK. Install the build dependencies first (Debian / Ubuntu shown below). On some
          GPUs and drivers <code>backdrop-blur</code> is slow: Dens-UI uses it in the Dialog overlay and the glass Navbar. If
          a window feels sluggish, replace it with a solid fill such as <code>bg-card</code>.
        </li>
        <li>
          <strong>Blank window on Linux</strong> (often NVIDIA): start the app with
          <code>WEBKIT_DISABLE_DMABUF_RENDERER=1</code>.
        </li>
        <li>
          <strong>Fonts</strong> come from <code>@fontsource</code> and are bundled into the build, so the app works offline and
          sends no requests to a font CDN.
        </li>
        <li>
          <strong>WebGL</strong> is not needed. The dot-matrix cat lives on this docs site only; no registry component uses it.
        </li>
      </ul>
      <CodeBlock
        lang="bash"
        className="mt-4"
        code={`sudo apt install libwebkit2gtk-4.1-dev build-essential curl wget file libxdo-dev libssl-dev libayatana-appindicator3-dev librsvg2-dev`}
      />

      {/* ---------------------------------------------------------------- */}
      <H2 id="electron-wails">Electron and Wails</H2>
      <div className="prose-dens">
        <p>
          Both render a webview too, so the steps are the Tauri ones without the Rust part: a Vite + React + TypeScript
          frontend, Tailwind v4, the <code>@/</code> alias, then the theme and components from the registry.
        </p>
        <p>
          <strong>Electron.</strong> If the window loads <code>index.html</code> from disk (<code>file://</code>), set
          <code>base: "./"</code> in <code>vite.config.ts</code> so the built asset paths are relative. A hash router keeps
          working without a server.
        </p>
        <p>
          <strong>Wails (Go).</strong> Start from the React + TypeScript template, then continue with step 2 of the Tauri guide
          inside the <code>frontend/</code> folder.
        </p>
      </div>
      <CodeBlock lang="bash" className="mt-4" code={`wails init -n my-app -t react-ts`} />

      {/* ---------------------------------------------------------------- */}
      <H2 id="dioxus-leptos">Dioxus and Leptos (Rust UI in the webview)</H2>
      <p className="prose-dens mb-4">
        These frameworks also render HTML in a webview, but you write the markup in Rust, so the React files cannot be used.
        The stylesheet and the class names can: Tailwind v4 reads <code>.rs</code> files as easily as <code>.tsx</code>.
      </p>
      <Steps>
        <Step title="Add the theme to a Tailwind entry file">
          <p className="prose-dens">
            Copy <code>dens-ui.css</code> from the <Link to="/docs/theming">Theming</Link> page into your crate, then point
            Tailwind at your Rust sources.
          </p>
          <CodeBlock
            lang="css"
            title="input.css  (crate root)"
            code={`@import "tailwindcss";
@source "./src/**/*.rs";
@import "./styles/dens-ui.css";

@font-face {
  font-family: "Figtree Variable";
  src: url("/assets/fonts/figtree-latin-wght-normal.woff2") format("woff2-variations");
  font-weight: 300 900;
  font-display: swap;
}`}
          />
          <p className="prose-dens">
            Take <code>figtree-latin-wght-normal.woff2</code> (and the JetBrains Mono file, if you show code) from the
            <code>@fontsource-variable</code> packages and put them in <code>assets/fonts/</code>. Without them the theme falls
            back to the system UI font.
          </p>
        </Step>

        <Step title="Build the CSS">
          <CodeBlock lang="bash" code={`npm install tailwindcss @tailwindcss/cli
npx @tailwindcss/cli -i input.css -o assets/tailwind.css --watch`} />
        </Step>

        <Step title="Copy the classes into your components">
          <p className="prose-dens">
            Each component page has a <strong>Manual</strong> tab with the source. The class strings move across as they are;
            this is the default Button in Dioxus:
          </p>
          <CodeBlock
            title="src/components/button.rs"
            code={`use dioxus::prelude::*;

#[component]
pub fn Button(children: Element, onclick: EventHandler<MouseEvent>) -> Element {
    rsx! {
        button {
            class: "inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold \\
                    select-none bg-primary text-primary-foreground hover:bg-primary/90 \\
                    focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 \\
                    focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
            onclick: move |e| onclick.call(e),
            {children}
        }
    }
}`}
          />
          <p className="prose-dens">
            For dark mode, put the <code>dark</code> class on the root element of your app (for example a full-height
            <code>div</code> with <code>bg-background text-foreground</code>). Every token below it switches.
          </p>
        </Step>
      </Steps>
      <Alert className="mt-6">
        <InfoIcon />
        <AlertTitle>Behaviour is not included</AlertTitle>
        <AlertDescription>
          The React components get focus trapping, keyboard navigation and menu positioning from Radix. In Dioxus or Leptos
          you bring that yourself: the native <code className="font-mono text-[12.5px]">&lt;dialog&gt;</code> and{" "}
          <code className="font-mono text-[12.5px]">&lt;details&gt;</code> elements cover the simple cases.
        </AlertDescription>
      </Alert>

      {/* ---------------------------------------------------------------- */}
      <H2 id="native">Native toolkits (egui, iced, Slint, GTK 4)</H2>
      <p className="prose-dens mb-6">
        These draw their own widgets and do not read CSS (GTK reads a CSS dialect of its own). What carries over is the design:
        the values below, the radius scale, and the rules in <code>DESIGN.md</code>: Mars Green for primary actions and focus,
        orange only for what waits on the user, outer radius = inner radius + padding.
      </p>
      <div className="overflow-x-auto rounded-2xl bg-card ring-1 ring-border">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="border-b border-border text-left font-mono text-[11.5px] text-muted-foreground">
              <th className="px-4 py-3 font-medium">Token</th>
              <th className="px-4 py-3 font-medium">Light</th>
              <th className="px-4 py-3 font-medium">Dark</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map(([t, l, d]) => (
              <tr key={t} className="border-b border-border last:border-0">
                <td className="px-4 py-2.5 font-mono text-[12.5px]">{t}</td>
                {[l, d].map((v) => (
                  <td key={v} className="px-4 py-2.5">
                    <span className="flex items-center gap-2.5 font-mono text-[12.5px] tabular-nums">
                      <span className="size-4 rounded-[5px] ring-1 ring-foreground/20" style={{ background: v }} aria-hidden />
                      {v}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="prose-dens mt-4">
        Radius: controls are pills (half their height), fields 14px, panels 22px, dialogs 28px. Spacing works on a 4px step.
      </p>

      <h3 className="mt-8 mb-4 text-[17px] font-semibold tracking-[-0.01em]">egui</h3>
      <CodeBlock
        title="theme.rs  (egui 0.31+; older versions call corner_radius rounding)"
        code={`use egui::{Color32, CornerRadius, Visuals};

pub fn dens_light() -> Visuals {
    let mut v = Visuals::light();
    v.panel_fill = Color32::from_rgb(0xed, 0xf0, 0xef);        // background
    v.window_fill = Color32::WHITE;                             // card
    v.extreme_bg_color = Color32::from_rgb(0xf5, 0xf7, 0xf6);  // surface: text fields
    v.selection.bg_fill = Color32::from_rgb(0x00, 0x79, 0x7a); // primary
    v.hyperlink_color = Color32::from_rgb(0x00, 0x79, 0x7a);
    v.window_corner_radius = CornerRadius::same(22);
    for w in [&mut v.widgets.inactive, &mut v.widgets.hovered, &mut v.widgets.active] {
        w.corner_radius = CornerRadius::same(20); // pill on a 40px button
    }
    v
}

// ctx.set_visuals(dens_light());`}
      />

      <h3 className="mt-8 mb-4 text-[17px] font-semibold tracking-[-0.01em]">GTK 4 / libadwaita</h3>
      <CodeBlock
        lang="css"
        title="style.css  (load with gtk::CssProvider)"
        code={`@define-color accent_bg_color #00797a;
@define-color accent_fg_color #ffffff;
@define-color accent_color #00797a;
@define-color destructive_bg_color #a42423;
@define-color window_bg_color #edf0ef;
@define-color window_fg_color #0f1716;
@define-color view_bg_color #ffffff;
@define-color card_bg_color #ffffff;
@define-color headerbar_bg_color #edf0ef;

button.suggested-action { border-radius: 999px; }`}
      />

      <Pager prev={{ to: "/docs/theming", label: "Theming" }} next={{ to: "/docs/components/button", label: "Button" }} />
    </article>
  )
}
