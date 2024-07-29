import { setStateWithRef } from "@polkadot-ui/utils"
import React, { useRef } from "react"
import { defaultThemeContext } from "./defaults"
import type { Theme, ThemeContextInterface } from "./types"
import { useLocalStorage } from "usehooks-ts"

export const ThemesProvider = ({ children }: { children: React.ReactNode }) => {
  let initialTheme: Theme = "light"

  // get the current theme
  const [settings, setSettings] = useLocalStorage("fellowship-settings", {
    themeMode: "light",
    collapsed: false,
  })

  // Provide system theme if raw theme is not valid.
  if (!["light", "dark"].includes(settings.themeMode)) {
    const systemTheme =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"

    initialTheme = systemTheme
  } else {
    // `localThemeRaw` is a valid theme.
    initialTheme = settings.themeMode as Theme
  }

  // the theme mode
  const [theme, setTheme] = React.useState<Theme>(initialTheme)
  const themeRef = useRef(theme)

  // Automatically change theme on system change.
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      const newTheme = event.matches ? "dark" : "light"
      setSettings({
        themeMode: newTheme,
        collapsed: settings.collapsed,
      })
      setStateWithRef(newTheme, setTheme, themeRef)
    })

  const toggleTheme = (maybeTheme: Theme | null = null): void => {
    const newTheme =
      maybeTheme || (themeRef.current === "dark" ? "light" : "dark")

    setSettings({
      themeMode: newTheme,
      collapsed: settings.collapsed,
    })
    setStateWithRef(newTheme, setTheme, themeRef)
  }

  return (
    <ThemeContext.Provider
      value={{
        toggleTheme,
        mode: themeRef.current,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const ThemeContext =
  React.createContext<ThemeContextInterface>(defaultThemeContext)

export const useTheme = () => React.useContext(ThemeContext)
