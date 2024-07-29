export type Theme = "light" | "dark"

export interface ThemeContextInterface {
  toggleTheme: (str?: Theme) => void
  mode: Theme
}
