// Copyright 2024 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only
import { Page } from "@polkadot-ui/react"
// import { AnimatePresence } from "framer-motion"
import { useEffect } from "react"
import { ErrorBoundary } from "react-error-boundary"
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom"
import { Headers } from "library/Headers"
import { ErrorFallbackApp, ErrorFallbackRoutes } from "library/ErrorBoundary"
import { Help } from "library/Help"
import { NetworkBar } from "library/NetworkBar"

import { SideMenu } from "library/SideMenu"
import { Overlay } from "library/Overlay"

import { PagesConfig } from "config/pages"

import { Layout, ConfigProvider } from "antd"
import { useTheme } from "contexts/Themes"

export const RouterInner = () => {
  const { pathname } = useLocation()
  const { mode } = useTheme()

  // Scroll to top of the window on every page change or network change.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const lightToken = {
    token: {
      navTheme: "dark",
      colorPrimaryBg: "#fefefe",
      colorPrimary: "#e6007a",
      colorInfo: "#e6007a",
      colorWarning: "#ffc357",
      colorTextBase: "#3f3f3f",
      colorBgContainer: "#fefefe",
      sizeStep: 4,
      sizeUnit: 4,
      borderRadius: 7,
      wireframe: false,
    },
    // algorithm: "light",
    components: {
      Layout: {
        bodyBg: "#fff",
      },
    },
  }
  const darkToken = {
    token: {
      navTheme: "light",
      colorPrimaryBg: "#505050",
      colorPrimary: "#e6007a",
      colorInfo: "#e6007a",
      colorWarning: "#ffc357",
      colorTextBase: "#fefefe",
      colorBgContainer: "red",
      sizeStep: 4,
      sizeUnit: 4,
      borderRadius: 7,
      wireframe: false,
    },
    // algorithm: "dark",
    components: {
      Layout: {
        bodyBg: "#505050",
      },
    },
  }

  return (
    <ConfigProvider theme={mode === "light" ? lightToken : darkToken}>
      <ErrorBoundary FallbackComponent={ErrorFallbackApp}>
        <Layout hasSider>
          {/* Prompting background: closed by default */}
          <Overlay />

          {/* Resources: closed by default */}
          <Help />
          {/* Left side menu */}
          <SideMenu />
          <Layout style={{ marginLeft: 200 }}>
            {/* Main content window */}
            {/* <Main ref={mainInterfaceRef}> */}
            {/* Fixed headers */}
            <Headers />
            <ErrorBoundary FallbackComponent={ErrorFallbackRoutes}>
              <Routes>
                {PagesConfig.map((page, i) => {
                  const { Entry, hash } = page
                  return (
                    <Route
                      key={`main_interface_page_${i}`}
                      path={hash}
                      element={
                        <Page>
                          <title>Polkadot Fellowship</title>
                          <Entry page={page} />
                        </Page>
                      }
                    />
                  )
                })}
                <Route
                  key="main_interface_navigate"
                  path="*"
                  element={<Navigate to="/overview" />}
                />
              </Routes>
            </ErrorBoundary>
            {/* </Main> */}
            {/* Network status and network details */}
            <NetworkBar />
            {/* Notification popups */}
            {/* <Notifications /> */}
          </Layout>
        </Layout>
      </ErrorBoundary>
    </ConfigProvider>
  )
}

export const Router = () => (
  <HashRouter basename="/">
    <RouterInner />
  </HashRouter>
)
