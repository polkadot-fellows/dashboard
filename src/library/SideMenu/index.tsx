// Copyright 2024 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only
import { useState } from "react"

import { PolkadotUrl } from "consts"
import { Menu, Switch, Layout, Button } from "antd"
import { IconWrapper, LogoWrapper } from "library/SideMenu/Wrapper"

import PolkadotIcon from "img/polkadotIcon.svg?react"
// import FellowshipW from "img/fellowshipLogo_w.svg?react"
import FellowshipB from "img/fellowshipLogo_b.svg?react"
import type { GetProp, MenuProps } from "antd"

import {
  HiMiniUserGroup,
  HiGlobeAlt,
  HiMiniUserPlus,
  HiBuildingLibrary,
  HiMiniCubeTransparent,
} from "react-icons/hi2"
import { MdDocumentScanner } from "react-icons/md"
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go"
import { useTheme } from "contexts/Themes"

const { Sider } = Layout

type MenuItem = GetProp<MenuProps, "items">[number]

const getItem = (
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

const getLink = (
  label: string,
  link: string = "#",
  target: "_parent" | "_blank" = "_parent"
): React.ReactNode => (
  <a href={"#/" + link} target={target} rel="noopener noreferrer">
    {label}
  </a>
)

const mainItems: MenuItem[] = [
  getItem(getLink("Overview", "overview"), "1", <HiGlobeAlt />),
  getItem(getLink("Members", "members"), "2", <HiMiniUserGroup />),
  getItem(getLink("Membership", "membership"), "3", <HiMiniUserPlus />),
  //   [
  //     getItem("Option 3", "3"),
  //     getItem("Option 4", "4"),
  //     getItem("Submenu", "sub1-2", null, [
  //       getItem("Option 5", "5"),
  //       getItem("Option 6", "6"),
  //     ]),
  //   ]),
  getItem(getLink("Governance", "governance"), "4", <HiBuildingLibrary />),
  getItem(
    getLink("Interactions", "interactions"),
    "6",
    <HiMiniCubeTransparent />
  ),
  getItem(getLink("RFCs", "rfcs"), "8", <MdDocumentScanner />),
]

export const SideMenu = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [type, setType] = useState<"vertical" | "inline">("inline")
  const { mode, toggleTheme } = useTheme()

  console.log("mode", mode)

  const changeType = (value: boolean) => {
    setType(value ? "vertical" : "inline")
  }

  const size = collapsed ? "1.4rem" : "2.2rem"
  const Svg = collapsed ? (
    <PolkadotIcon
      style={{
        maxHeight: "100%",
        width: "2rem",
        fill: "var(--accent-color-primary)",
      }}
      width={size}
      height={size}
    />
  ) : (
    <FellowshipB
      style={{
        maxHeight: "100%",
        height: "100%",
        width: "9.2rem",
        fill: "var(--accent-color-primary)",
      }}
      width={size}
      height={size}
    />
  )

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <LogoWrapper
        $minimised={collapsed}
        onClick={() => window.open(PolkadotUrl, "_blank")}
      >
        <IconWrapper
          $minimised={collapsed}
          className="icon"
          style={{ width: size, height: size }}
        >
          {Svg}
        </IconWrapper>
      </LogoWrapper>
      <Menu
        style={{ width: "100%" }}
        defaultSelectedKeys={["1"]}
        mode={type}
        theme={mode}
        items={mainItems}
      />
      <Button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          width: "100%",
          alignContent: "center",
          border: "0",
          borderRadius: "0",
        }}
      >
        <div style={{ display: "flex" }}>
          {collapsed ? <GoSidebarCollapse /> : <GoSidebarExpand />}
        </div>
      </Button>

      <div style={{ position: "absolute", bottom: "3rem" }}>
        <Switch onChange={changeType} />
        <Switch
          onChange={() => toggleTheme(mode === "dark" ? "light" : "dark")}
        />
      </div>
    </Sider>
  )
}
