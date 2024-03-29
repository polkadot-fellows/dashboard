import { StrictMode } from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { MDXProvider } from "@mdx-js/react"
import { ErrorPage } from "./ErrorPage"
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

import { Overview } from "pages/Overview"
import { Membership } from "pages/Membership"
import { Interactions } from "pages/Interactions"
import { Governance } from "pages/Governance"
import { Modules } from "pages/Modules"
import { Rfc } from "pages/Rfc"
import { Members } from "pages/Members"

const router = createBrowserRouter([
  {
    path: "/dashboard/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Overview />,
      },
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "membership",
        element: <Membership />,
      },
      {
        path: "governance",
        element: <Governance />,
      },
      {
        path: "interactions",
        element: <Interactions />,
      },
      {
        path: "modules",
        element: <Modules />,
      },
      {
        path: "members",
        element: <Members />,
      },
      {
        path: "rfcs",
        element: <Rfc />,
      },
    ],
  },
])

const rootElement = document.getElementById("root")
if (!rootElement) throw new Error("Failed to find the root element")
const root = createRoot(rootElement)

root.render(
  <MDXProvider>
    <ThemesProvider>
      <RouterProvider router={router} />
    </ThemesProvider>
  </MDXProvider>
)
