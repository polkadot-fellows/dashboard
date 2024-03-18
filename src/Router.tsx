// Copyright 2024 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only
import { Main, Page } from "@polkadot-ui/react"
// import { AnimatePresence } from "framer-motion"
import { useEffect, useRef } from "react"
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

import { Layout } from "antd"

export const RouterInner = () => {
  const { pathname } = useLocation()

  // Scroll to top of the window on every page change or network change.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const { Content } = Layout

  // References to outer containers
  const mainInterfaceRef = useRef<HTMLDivElement>(null)

  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackApp}>
      <Layout hasSider>
        <Content>
          {/* Prompting background: closed by default */}
          <Overlay />

          {/* Resources: closed by default */}
          <Help />
          {/* Left side menu */}
          <SideMenu />
          <Layout style={{ marginLeft: 200 }}>
            {/* Main content window */}
            <Main ref={mainInterfaceRef}>
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
            </Main>
            {/* Network status and network details */}
            <NetworkBar />
            {/* Notification popups */}
            {/* <Notifications /> */}
          </Layout>
        </Content>
      </Layout>
    </ErrorBoundary>
  )
}

export const Router = () => (
  <HashRouter basename="/">
    <RouterInner />
  </HashRouter>
)
