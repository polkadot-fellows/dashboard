import { MDXProvider } from "@mdx-js/react"
import { ThemesProvider } from "./contexts/Themes"
import { HashRouter } from "react-router-dom"
import { MainContent } from "MainContent"

import "./index.scss"
// Network classes.
import "./index.css"

// Fonts with light and dark themes.
import "@polkadot-ui/core/theme/default/fonts/index.css"
import "@polkadot-ui/core/accent/polkadot-relay.css"

// Core UI styles.
import "@polkadot-ui/core/css/styles/index.css"

import { createRoot } from "react-dom/client"

const rootElement = document.getElementById("root")
if (!rootElement) throw new Error("Failed to find the root element")
const root = createRoot(rootElement)

root.render(
  <MDXProvider>
    <ThemesProvider>
      <HashRouter basename="/">
        <MainContent />
      </HashRouter>
    </ThemesProvider>
  </MDXProvider>
)
