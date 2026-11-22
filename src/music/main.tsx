import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./music.css"
import { MusicLanding } from "./landing"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MusicLanding />
  </StrictMode>
)
