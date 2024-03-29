import { MDXProvider } from "@mdx-js/react"
import { ThemesProvider } from "./contexts/Themes"

// Network classes.
import "./index.css"

// Fonts with light and dark themes.
import "@polkadot-ui/core/theme/default/fonts/index.css"
import "@polkadot-ui/core/accent/polkadot-relay.css"

// Core UI styles.
import "@polkadot-ui/core/css/styles/index.css"

import { createRoot } from "react-dom/client"
import { App } from "./App"

const rootElement = document.getElementById("root")
if (!rootElement) throw new Error("Failed to find the root element")
const root = createRoot(rootElement)

root.render(
  <MDXProvider>
    <ThemesProvider>
      <App />
    </ThemesProvider>
  </MDXProvider>
)
