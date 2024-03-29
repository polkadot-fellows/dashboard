import { ConfigProvider, Divider, Layout, Menu } from "antd"
import type { GetProp, MenuProps } from "antd"
import {
  HiMiniUserGroup,
  HiGlobeAlt,
  HiMiniUserPlus,
  HiBuildingLibrary,
  HiMiniCubeTransparent,
  HiMiniInboxStack,
} from "react-icons/hi2"

import { PolkadotUrl } from "consts"
import { useLocalStorage } from "usehooks-ts"

import PolkadotIcon from "./img/polkadotIcon.svg?react"
import FellowshipB from "./img/fellowshipLogo_b.svg?react"
import { useTheme } from "./contexts/Themes"
import {
  IoSunnyOutline,
  IoMoon,
  IoLogoGithub,
  IoChatbubblesOutline,
} from "react-icons/io5"
import {
  BsArrowsCollapseVertical,
  BsArrowsExpandVertical,
} from "react-icons/bs"

import { MdDocumentScanner } from "react-icons/md"
import { SiElement } from "react-icons/si"
import { FaInfo } from "react-icons/fa"

import { useEffect, useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"

import "./App.scss"

type MenuItem = GetProp<MenuProps, "items">[number]

const iconSize = "1.25rem"
const { Content, Footer, Sider } = Layout

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
  <Link to={link} target={target}>
    {label}
  </Link>
)

const mainItems: MenuItem[] = [
  getItem(getLink("Overview", "overview"), "overview", <HiGlobeAlt />),
  getItem("About", "sub0", <FaInfo />, [
    getItem(
      getLink("Membership", "membership"),
      "membership",
      <HiMiniUserPlus />
    ),
    getItem(
      getLink("Governance", "governance"),
      "governance",
      <HiBuildingLibrary />
    ),
    getItem(
      getLink("Interactions", "interactions"),
      "interactions",
      <HiMiniCubeTransparent />
    ),
    getItem(getLink("Modules", "modules"), "modules", <HiMiniInboxStack />),
  ]),
  getItem(getLink("Members", "members"), "members", <HiMiniUserGroup />),
  getItem(getLink("Open RFCs", "rfcs"), "rfcs", <MdDocumentScanner />),
]

const secondaryItems: MenuItem[] = [
  getItem("Element", "sub1", <SiElement />, [
    getItem(
      getLink(
        "Members",
        "https://matrix.to/#/#fellowship-members:parity.io",
        "_blank"
      ),
      "sub1-1",
      <SiElement />
    ),
    getItem(
      getLink(
        "Open",
        "https://matrix.to/#/#fellowship-open-channel:parity.io",
        "_blank"
      ),
      "sub1-2",
      <IoChatbubblesOutline />
    ),
  ]),
]

// const linksItems: MenuItem[] = [
//   getItem(getLink("Overview", "overview"), "overview", <HiGlobeAlt />),
// ]

const type = "vertical"

export const App = () => {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [token, setToken] = useState({})
  const { mode, toggleTheme } = useTheme()

  const [settings, setSettings] = useLocalStorage("fellowship-settings", {
    themeMode: "light",
    collapsed,
  })

  useEffect(() => {
    setCollapsed(settings.collapsed)
  }, [settings.collapsed])

  const size = collapsed ? "1.8rem" : "2.2rem"
  const autoWidth = collapsed ? "4rem" : "12rem"

  const Svg = collapsed ? (
    <PolkadotIcon
      style={{
        maxHeight: "100%",
        width: "2rem",
        fill: "#E6007A",
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
        fill: "#E6007A",
      }}
      width={size}
      height={size}
    />
  )

  useEffect(() => {
    if (mode === "light") {
      setToken({
        components: {
          Menu: {
            colorPrimary: "#E6007A",
            colorBgContainer: "#fefefe",
            colorFillAlter: "#eee",
            /* here is your component tokens */
          },
        },
      })
    } else {
      setToken({
        components: {
          Menu: {
            colorPrimary: "#E6007A",
            colorBgContainer: "var(--background-primary)",
            /* here is your component tokens */
          },
        },
      })
    }
  }, [mode])

  return (
    <ConfigProvider theme={token}>
      <Layout style={{ width: "100vw", height: "100vh" }}>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
          theme={mode}
          width="12rem"
          breakpoint="md"
          collapsedWidth="4rem"
          collapsed={collapsed}
          onBreakpoint={(val) => {
            setCollapsed(val)
          }}
        >
          <div
            style={{
              height: "3rem",
              marginBottom: "2rem",
              marginTop: "2rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link style={{ height: "4rem" }} to={PolkadotUrl}>
              {Svg}
            </Link>
          </div>
          <Menu
            selectedKeys={[location?.pathname.replace("/", "")]}
            theme={mode}
            mode={type}
            items={mainItems}
          />
          <Divider />
          <Menu
            selectedKeys={[location?.pathname.replace("/", "")]}
            theme={mode}
            mode={type}
            items={secondaryItems}
          />
          {/* <Menu theme={mode} mode={type} items={linksItems} /> */}
          <section
            style={{
              position: "absolute",
              bottom: "6rem",
              width: collapsed ? "4rem" : "11rem",
              height: collapsed ? "7rem" : "1rem",
              display: "flex",
              flexDirection: collapsed ? "column" : "row",
              justifyContent: "space-around",
            }}
          >
            {mode === "dark" ? (
              <button
                style={{ color: "#E6007A" }}
                type="button"
                onClick={() => {
                  toggleTheme()
                }}
              >
                <IoSunnyOutline size={iconSize} style={{ color: "#E6007A" }} />
              </button>
            ) : (
              <button type="button" onClick={() => toggleTheme()}>
                <IoMoon size={iconSize} style={{ color: "#E6007A" }} />
              </button>
            )}
            <button
              style={{ color: "#E6007A" }}
              type="button"
              onClick={() => {
                console.log(settings)
                setSettings({
                  themeMode: settings.themeMode,
                  collapsed: !collapsed,
                })
              }}
            >
              {collapsed ? (
                <BsArrowsExpandVertical />
              ) : (
                <BsArrowsCollapseVertical />
              )}
            </button>
            <button
              style={{ color: "#E6007A" }}
              type="button"
              onClick={() =>
                window.open("https://github.com/polkadot-fellows", "_blank")
              }
            >
              <IoLogoGithub size={iconSize} />
            </button>
          </section>
        </Sider>
        <Layout>
          <Content
            className={"theme-" + mode}
            style={{
              overflow: "auto",
              height: "100vh",
              paddingBottom: "3rem",
              marginLeft: autoWidth,
              background:
                mode === "light" ? "#f8f7f7" : "var(--background-primary)",
              color: mode === "light" ? "#00152A" : "#f8f7f7",
            }}
          >
            <Outlet />
          </Content>
          <Footer
            style={{
              position: "fixed",
              bottom: 0,
              zIndex: 1,
              width: "100vw",
              background: mode === "light" ? "#fff" : "#000D18",
              color: "#E6007A",
              fontWeight: "bolder",
              display: "flex",
              justifyContent: "flex-end",
              filter: "alpha(opacity=75)",
              opacity: "0.75",
            }}
          >
            Polkadot Fellowship ©{new Date().getFullYear()}
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}
