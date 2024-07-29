import PolkadotIcon from "./img/polkadotIcon.svg?react"
import type { GetProp, MenuProps } from "antd"
import { darkTheme, lightTheme } from "consts"
import { useTheme } from "contexts/Themes"
import { About } from "pages/About"
import { Account } from "pages/Account"
import { Governance } from "pages/Governance"
import { Membership } from "pages/Membership"
import { Modules } from "pages/Modules"
import { OpenDevMonthlyCalls } from "pages/OpenDevMonthlyCalls"
import { Rfc } from "pages/Rfc"
import { Salary } from "pages/Salary"
import { GrResources } from "react-icons/gr"
import {
  HiGlobeAlt,
  HiMiniUserPlus,
  HiBuildingLibrary,
  HiMiniInboxStack,
} from "react-icons/hi2"
import { IoMdContact } from "react-icons/io"
import { IoChatbubblesOutline } from "react-icons/io5"
import { MdDocumentScanner } from "react-icons/md"
import { SiElement } from "react-icons/si"
import { TbPigMoney } from "react-icons/tb"
import { Link } from "react-router-dom"
import FellowshipB from "./img/fellowshipLogo_b.svg?react"
import type { SelectedAccountType } from "@polkadot-ui/react"

export type MenuItem = GetProp<MenuProps, "items">[number]
export type ThemeType = "primary" | "accent" | "invert"

export const pages = (
  lcStatus: boolean,
  selectedAccount: SelectedAccountType | null
) => {
  const arr = [
    {
      path: "",
      element: <About lcStatus={lcStatus} />,
    },
    {
      path: "about",
      element: <About lcStatus={lcStatus} />,
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
      path: "salary",
      element: <Salary />,
    },
    {
      path: "modules",
      element: <Modules />,
    },
    {
      path: "rfcs",
      element: <Rfc />,
    },
    {
      path: "opendev",
      element: <OpenDevMonthlyCalls />,
    },
  ]

  selectedAccount &&
    arr.push({
      path: "account",
      element: <Account lcStatus={lcStatus} />,
    })

  return arr
}

export const iconSize = "1.25rem"

export const getItem = (
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

export const getLink = (
  label: string,
  link: string = "#",
  target: "_parent" | "_blank" = "_parent"
): React.ReactNode => {
  const { mode } = useTheme()

  return (
    <Link
      style={
        target === "_blank"
          ? { color: mode === "dark" ? darkTheme.invert : lightTheme.invert }
          : {}
      }
      to={link}
      target={target}
    >
      {label}
    </Link>
  )
}

export const menuItems = (
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
): MenuItem[] => [
  {
    key: "1",
    type: "group",
    children: [
      getItem(getLink("About", "about"), "about", <HiGlobeAlt />),
      getItem(
        getLink("Membership", "membership"),
        "membership",
        <HiMiniUserPlus />
      ),
      getItem(getLink("Salary", "salary"), "salary", <TbPigMoney />),
      getItem(
        getLink("Governance", "governance"),
        "governance",
        <HiBuildingLibrary />
      ),
      getItem(getLink("Modules", "modules"), "modules", <HiMiniInboxStack />),
      getItem(getLink("RFCs", "rfcs"), "rfcs", <MdDocumentScanner />),
      getItem(
        getLink("Monthly Calls", "opendev"),
        "opendev",
        <HiBuildingLibrary />
      ),
      getItem(
        <a href={location.toString()} onClick={() => setOpenModal(true)}>
          Resources
        </a>,
        "resources",
        <GrResources />
      ),
    ],
  },
  {
    type: "divider",
  },
  {
    key: "3",
    label: "Contact",
    icon: <IoMdContact />,
    children: [
      getItem(
        getLink(
          "Members (Element)",
          "https://matrix.to/#/#fellowship-members:parity.io",
          "_blank"
        ),
        "sub1-1",
        <SiElement />
      ),
      getItem(
        getLink(
          "Open  (Element)",
          "https://matrix.to/#/#fellowship-open-channel:parity.io",
          "_blank"
        ),
        "sub1-2",
        <IoChatbubblesOutline />
      ),
    ],
  },
]

const size = (collapsed: boolean) => (collapsed ? "2rem" : "2.2rem")

export const Svg = (
  collapsed: boolean,
  themeColor: (type: ThemeType) => string
) =>
  collapsed ? (
    <PolkadotIcon
      style={{
        maxHeight: "100%",
        width: "4rem",
        fill: themeColor("accent"),
      }}
      width={size(collapsed)}
      height={size(collapsed)}
    />
  ) : (
    <FellowshipB
      style={{
        maxHeight: "100%",
        height: "100%",
        width: "13rem",
        fill: themeColor("accent"),
      }}
      width={size(collapsed)}
      height={size(collapsed)}
    />
  )
