import { localStorageOrDefault, setStateWithRef } from "@polkadot-ui/utils"
import React, { useEffect, useRef, useState } from "react"
import { SideMenuStickyThreshold } from "../../consts"
import * as defaults from "./defaults"
import type { UIContextInterface } from "./types"

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  // set whether app is syncing. Includes workers (active nominations).
  const [isSyncing, setIsSyncing] = useState(false)

  // side menu control
  const [sideMenuOpen, setSideMenuOpen] = useState(false)

  // get side menu minimised state from local storage, default to false.
  const [userSideMenuMinimised, setUserSideMenuMinimisedState] = useState(
    localStorageOrDefault("side_menu_minimised", false, true) as boolean
  )
  const userSideMenuMinimisedRef = useRef(userSideMenuMinimised)
  const setUserSideMenuMinimised = (v: boolean) => {
    localStorage.setItem("side_menu_minimised", String(v))
    setStateWithRef(v, setUserSideMenuMinimisedState, userSideMenuMinimisedRef)
  }

  // automatic side menu minimised
  const [sideMenuMinimised, setSideMenuMinimised] = useState(
    window.innerWidth <= SideMenuStickyThreshold
      ? true
      : userSideMenuMinimisedRef.current
  )

  // resize side menu callback
  const resizeCallback = () => {
    if (window.innerWidth <= SideMenuStickyThreshold) {
      setSideMenuMinimised(false)
    } else {
      setSideMenuMinimised(userSideMenuMinimisedRef.current)
    }
  }

  // resize event listener
  useEffect(() => {
    window.addEventListener("resize", resizeCallback)
    return () => {
      window.removeEventListener("resize", resizeCallback)
    }
  }, [])

  // re-configure minimised on user change
  useEffect(() => {
    resizeCallback()
  }, [userSideMenuMinimised])

  // app syncing updates
  useEffect(() => {
    const syncing = false
    setIsSyncing(syncing)
  }, [])

  const setSideMenu = (v: boolean) => {
    setSideMenuOpen(v)
  }

  const [containerRefs, _setContainerRefs] = useState({})
  const setContainerRefs = (v: any) => {
    _setContainerRefs(v)
  }

  return (
    <UIContext.Provider
      value={{
        setSideMenu,
        setUserSideMenuMinimised,
        setContainerRefs,
        sideMenuOpen,
        userSideMenuMinimised: userSideMenuMinimisedRef.current,
        sideMenuMinimised,
        isSyncing,
        containerRefs,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

export const UIContext = React.createContext<UIContextInterface>(
  defaults.defaultUIContext
)

export const useUi = () => React.useContext(UIContext)
