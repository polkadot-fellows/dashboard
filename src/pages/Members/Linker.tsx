import { darkTheme, lightTheme } from "consts"
import type { IconType } from "react-icons"
import { Link } from "react-router-dom"
import { useTheme } from "../../contexts/Themes"

type LinkerProps = {
  where?: string
  icon: IconType
  iconSize: number
}

export const Linker = ({ where, icon, iconSize = 36 }: LinkerProps) => {
  const { mode } = useTheme()
  const Icon = icon
  return where ? (
    <Link
      style={{ color: mode === "dark" ? darkTheme.accent : lightTheme.accent }}
      to={where}
      target={"_blank"}
    >
      <Icon size={iconSize} style={{ cursor: "pointer" }} />
    </Link>
  ) : null
}
