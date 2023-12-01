// Copyright 2023 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { Body, Main, Page, Side } from "@polkadot-cloud/react"
import { AnimatePresence } from "framer-motion"
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
import { PagesConfig } from "config/pages"
import { ErrorFallbackApp, ErrorFallbackRoutes } from "library/ErrorBoundary"
import { Help } from "library/Help"
import { NetworkBar } from "library/NetworkBar"
import { SideMenu } from "library/SideMenu"
import { useUi } from "contexts/UI"
import { Overlay } from "library/Overlay"

// import { SideMenu } from 'library/SideMenu';

export const RouterInner = () => {
  const { pathname } = useLocation()
  const { sideMenuOpen, sideMenuMinimised, setContainerRefs } = useUi()

  // Scroll to top of the window on every page change or network change.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // Set references to UI context and make available throughout app.
  useEffect(() => {
    setContainerRefs({
      mainInterface: mainInterfaceRef,
    })
  }, [])

  // References to outer containers
  const mainInterfaceRef = useRef<HTMLDivElement>(null)

  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackApp}>
      <Body>
        {/* Prompting background: closed by default */}
        <Overlay />

        {/* Modal: closed by default */}
        {/* <Modal /> */}

        {/* Help: closed by default */}
        <Help />

        {/* Canvas: closed by default */}
        {/* <Canvas /> */}

        {/* Menu: closed by default */}
        {/* <Menu /> */}

        {/* Tooltip: invisible by default */}
        {/* <Tooltip /> */}

        {/* Prompt: closed by default */}
        {/* <Prompt /> */}

        {/* Left side menu */}
        <Side open={sideMenuOpen} minimised={sideMenuMinimised}>
          <SideMenu />
        </Side>

        {/* Main content window */}
        <Main ref={mainInterfaceRef}>
          {/* Fixed headers */}
          <Headers />

          <ErrorBoundary FallbackComponent={ErrorFallbackRoutes}>
            <AnimatePresence>
              <Routes>
                {PagesConfig.map((page, i) => {
                  const { Entry, hash } = page

                  return (
                    <Route
                      key={`main_interface_page_${i}`}
                      path={hash}
                      element={
                        <Page>
                          <title>Polkadot Fellowship Dashboard</title>
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
            </AnimatePresence>
          </ErrorBoundary>
        </Main>
      </Body>

      {/* Network status and network details */}
      <NetworkBar />

      {/* Notification popups */}
      {/* <Notifications /> */}
    </ErrorBoundary>
  )
}

export const Router = () => (
  <HashRouter basename="/">
    <RouterInner />
  </HashRouter>
)
