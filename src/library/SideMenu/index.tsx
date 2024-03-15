// Copyright 2024 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only
import { useState } from "react"

import { PolkadotUrl } from "consts"
import { Menu, Layout, Button, Divider } from "antd"
import type { GetProp, MenuProps } from "antd"

import { IconWrapper, LogoWrapper } from "library/SideMenu/Wrapper"

import PolkadotIcon from "img/polkadotIcon.svg?react"
// import FellowshipW from "img/fellowshipLogo_w.svg?react"
import FellowshipB from "img/fellowshipLogo_b.svg?react"

import {
  HiMiniUserGroup,
  HiGlobeAlt,
  HiMiniUserPlus,
  HiBuildingLibrary,
  HiMiniCubeTransparent,
  HiMiniInboxStack,
} from "react-icons/hi2"

import {
  IoSunnyOutline,
  IoMoon,
  IoLogoGithub,
  IoChatbubblesOutline,
} from "react-icons/io5"
import { MdDocumentScanner } from "react-icons/md"
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go"
import { useTheme } from "contexts/Themes"
import { SiElement } from "react-icons/si"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCompressAlt, faExpandAlt } from "@fortawesome/free-solid-svg-icons"

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
  isLocal: boolean = true,
  target: "_parent" | "_blank" = "_parent"
): React.ReactNode => (
  <a
    href={isLocal ? "#/" + link : link}
    target={target}
    rel="noopener noreferrer"
  >
    {label}
  </a>
)

const iconSize = "1.25rem"

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
  getItem(getLink("Modules", "modules"), "8", <HiMiniInboxStack />),
  getItem(getLink("Open RFCs", "rfcs"), "9", <MdDocumentScanner />),
]

const secondaryItems: MenuItem[] = [
  getItem("Fellowship Element", "sub1", <SiElement />, [
    getItem(
      getLink(
        "Members",
        "https://matrix.to/#/#fellowship-members:parity.io",
        false,
        "_blank"
      ),
      "sub1-1",
      <SiElement />
    ),
    getItem(
      getLink(
        "Open",
        "https://matrix.to/#/#fellowship-open-channel:parity.io",
        false,
        "_blank"
      ),
      "sub1-1",
      <IoChatbubblesOutline />
    ),
  ]),
  // getItem(getLink("Members", "members"), "2", <HiMiniUserGroup />),
  // getItem(getLink("Membership", "membership"), "3", <HiMiniUserPlus />),
  // //   [
  // //     getItem("Option 3", "3"),
  // //     getItem("Option 4", "4"),
  // //     getItem("Submenu", "sub1-2", null, [
  // //       getItem("Option 5", "5"),
  // //       getItem("Option 6", "6"),
  // //     ]),
  // //   ]),
  // getItem(getLink("Governance", "governance"), "4", <HiBuildingLibrary />),
  // getItem(
  //   getLink("Interactions", "interactions"),
  //   "6",
  //   <HiMiniCubeTransparent />
  // ),
  // getItem(getLink("RFCs", "rfcs"), "8", <MdDocumentScanner />),
]

export const SideMenu = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [type, setType] = useState<"vertical" | "inline">("vertical")
  const { mode, toggleTheme } = useTheme()

  const size = collapsed ? "1.8rem" : "2.2rem"
  const bottomWidth = collapsed ? "5rem" : "14rem"
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
      trigger={null}
    >
      <section>
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
        <Menu
          style={{ width: "100%" }}
          defaultSelectedKeys={["1"]}
          mode={type}
          theme={mode}
          items={secondaryItems}
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
          <div
            style={
              collapsed
                ? { display: "flex", justifyContent: "center" }
                : { display: "flex", padding: "0 1rem" }
            }
          >
            {collapsed ? <GoSidebarCollapse /> : <GoSidebarExpand />}
          </div>
        </Button>
      </section>

      <section
        style={{
          position: "absolute",
          bottom: "3rem",
          width: bottomWidth,
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {mode === "dark" ? (
          <button
            style={{ color: "white" }}
            type="button"
            onClick={() => toggleTheme()}
          >
            <IoSunnyOutline size={iconSize} />
          </button>
        ) : (
          <button type="button" onClick={() => toggleTheme()}>
            <IoMoon size={iconSize} />
          </button>
        )}
        <button
          style={mode === "dark" ? { color: "white" } : {}}
          type="button"
          onClick={() => setCollapsed(!collapsed)}
        >
          <FontAwesomeIcon icon={collapsed ? faExpandAlt : faCompressAlt} />
        </button>
        <button
          style={mode === "dark" ? { color: "white" } : {}}
          type="button"
          onClick={() =>
            window.open("https://github.com/polkadot-fellows", "_blank")
          }
        >
          <IoLogoGithub size={iconSize} />
        </button>
        {/* <Switch onChange={changeType} />
        <Switch
          onChange={() => toggleTheme(mode === "dark" ? "light" : "dark")}
        /> */}
      </section>
    </Sider>
  )
}
