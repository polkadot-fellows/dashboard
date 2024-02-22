// Copyright 2024 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

// Network classes.
import "@polkadot-ui/core/theme/default/index.css"

// Fonts with light and dark themes.
import "@polkadot-ui/core/theme/default/fonts/index.css"
import "@polkadot-ui/core/accent/polkadot-relay.css"

// Core UI styles.
import "@polkadot-ui/core/css/styles/index.css"

import { createRoot } from "react-dom/client"
import { App } from "App"
import "./styles/index.scss"

const rootElement = document.getElementById("root")
if (!rootElement) throw new Error("Failed to find the root element")
const root = createRoot(rootElement)

root.render(
  <div className="theme-polkadot-relay theme-light">
    <App />
  </div>
)
