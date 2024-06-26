import { ConfigProvider, Divider, Layout, Menu, Modal } from "antd"
import type { GetProp, MenuProps } from "antd"
import {
  HiMiniUserGroup,
  HiGlobeAlt,
  HiMiniUserPlus,
  HiBuildingLibrary,
  HiMiniCubeTransparent,
  HiMiniInboxStack,
} from "react-icons/hi2"
import { GrResources } from "react-icons/gr"

import {
  PolkadotUrl,
  collapsedWidth,
  uncollapsedWidth,
  colorPrimary,
  colorBgContainer,
  colorFillAlter,
  lightBg,
  darkBg,
  lightColor,
  darkColor,
} from "consts"
import { useLocalStorage } from "usehooks-ts"

import PolkadotIcon from "./img/polkadotIcon.svg?react"
import FellowshipB from "./img/fellowshipLogo_b.svg?react"
import { useTheme } from "./contexts/Themes"
import {
  IoSunnyOutline,
  IoMoon,
  IoLogoGithub,
  IoChatbubblesOutline,
  IoDocumentText,
} from "react-icons/io5"
import {
  BsArrowsCollapseVertical,
  BsArrowsExpandVertical,
} from "react-icons/bs"

import { MdDocumentScanner } from "react-icons/md"
import { SiElement } from "react-icons/si"
import { FaInfo } from "react-icons/fa"

import { useEffect, useState } from "react"
import { Link, Route, Routes, useLocation } from "react-router-dom"

import { Overview } from "pages/Overview"
import { Membership } from "pages/Membership"
import { Interactions } from "pages/Interactions"
import { Governance } from "pages/Governance"
import { Modules } from "pages/Modules"
import { Rfc } from "pages/Rfc"
import { Members } from "pages/Members"
import { OpenDevMonthlyCalls } from "pages/OpenDevMonthlyCalls"

type MenuItem = GetProp<MenuProps, "items">[number]

const pages = [
  {
    path: "",
    element: <Overview />,
  },
  {
    path: "overview",
    element: <Overview />,
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
    path: "interactions",
    element: <Interactions />,
  },
  {
    path: "modules",
    element: <Modules />,
  },
  {
    path: "members",
    element: <Members />,
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

const iconSize = "1.25rem"
const { Content, Sider } = Layout

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
  getItem(getLink("Members", "members"), "members", <HiMiniUserGroup />),
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
  getItem(getLink("Open RFCs", "rfcs"), "rfcs", <MdDocumentScanner />),
  getItem(
    getLink("Monthly Calls", "opendev"),
    "opendev",
    <HiBuildingLibrary />
  ),
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

const linksItems: MenuItem[] = [
  getItem(
    getLink("RFCs Book", "https://polkadot-fellows.github.io/RFCs/", "_blank"),
    "rfcs book",
    <IoDocumentText />
  ),
  getItem(
    getLink(
      "Manifesto",
      "https://github.com/polkadot-fellows/manifesto/blob/0c3df46d76625980b8b48742cb86f4d8fa6dda8d/manifesto.pdf",
      "_blank"
    ),
    "manifesto",
    <IoDocumentText />
  ),
]

const type = "vertical"

export const RouterInner = () => {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [token, setToken] = useState({})
  const { mode, toggleTheme } = useTheme()

  const [openModal, setOpenModal] = useState(false)

  const [settings, setSettings] = useLocalStorage("fellowship-settings", {
    themeMode: "light",
    collapsed,
  })

  useEffect(() => {
    setCollapsed(settings.collapsed)
  }, [settings.collapsed])

  const size = collapsed ? "2rem" : "2.2rem"
  const autoWidth = collapsed ? collapsedWidth : uncollapsedWidth

  const Svg = collapsed ? (
    <PolkadotIcon
      style={{
        maxHeight: "100%",
        width: "4rem",
        fill: colorPrimary,
      }}
      width={size}
      height={size}
    />
  ) : (
    <FellowshipB
      style={{
        maxHeight: "100%",
        height: "100%",
        width: "13rem",
        fill: colorPrimary,
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
            colorPrimary,
            colorBgContainer,
            colorFillAlter,
            /* here is your component tokens */
          },
        },
      })
    } else {
      setToken({
        components: {
          Menu: {
            colorPrimary,
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
          width={uncollapsedWidth}
          breakpoint="md"
          collapsedWidth={collapsedWidth}
          collapsed={collapsed}
          onBreakpoint={(val: boolean | ((prevState: boolean) => boolean)) => {
            setCollapsed(val)
          }}
        >
          <div
            style={{
              height: "3rem",
              marginBottom: "2rem",
              marginTop: collapsed ? "3rem" : "2rem",
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
          <Divider />
          <Menu
            theme={mode}
            mode={type}
            items={[
              ...linksItems,
              getItem(
                <a href="#" onClick={() => setOpenModal(true)}>
                  Resources
                </a>,
                "resources",
                <GrResources />
              ),
            ]}
          />
          <section
            style={{
              position: "absolute",
              bottom: "6rem",
              width: collapsed ? "6rem" : "16rem",
              height: collapsed ? "7rem" : "1rem",
              display: "flex",
              flexDirection: collapsed ? "column" : "row",
              justifyContent: "space-around",
            }}
          >
            {mode === "dark" ? (
              <button
                style={{ color: colorPrimary }}
                type="button"
                onClick={() => {
                  toggleTheme()
                }}
              >
                <IoSunnyOutline
                  size={iconSize}
                  style={{ color: colorPrimary }}
                />
              </button>
            ) : (
              <button type="button" onClick={() => toggleTheme()}>
                <IoMoon size={iconSize} style={{ color: colorPrimary }} />
              </button>
            )}
            <button
              style={{ color: colorPrimary }}
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
              style={{ color: colorPrimary }}
              type="button"
              onClick={() =>
                window.open("https://github.com/polkadot-fellows", "_blank")
              }
            >
              <IoLogoGithub size={iconSize} />
            </button>
          </section>
          {/* Copyright footer  */}
          <div
            style={{
              position: "fixed",
              bottom: 0,
              padding: "2rem 1rem",
              zIndex: 1,
              color: colorPrimary,
              fontWeight: "bolder",
              display: "flex",
              justifyContent: "flex-end",
              filter: "alpha(opacity=75)",
              opacity: "0.75",
            }}
          >
            {!collapsed ? "Polkadot Fellowship " : ""}©
            {new Date().getFullYear()}
          </div>
        </Sider>
        <Layout>
          <Content
            className={"theme-" + mode}
            style={{
              overflow: "auto",
              height: "100vh",
              marginLeft: autoWidth,
              background: mode === "light" ? lightBg : darkBg,
              color: mode === "light" ? darkColor : lightColor,
            }}
          >
            <Routes>
              {pages.map(({ path, element }, i) => {
                return <Route key={`page_${i}`} path={path} element={element} />
              })}
            </Routes>
          </Content>

          <Modal
            centered
            open={openModal}
            onCancel={() => setOpenModal(false)}
            footer={[]}
          >
            <h4>Useful Links</h4>
            <p>
              {getLink(
                "Governance v2",
                "https://medium.com/polkadot-network/gov2-polkadots-next-generation-of-decentralised-governance-4d9ef657d11b",
                "_blank"
              )}
            </p>
            <p>
              {getLink(
                "Democracy Pallet",
                "https://github.com/paritytech/polkadot-sdk/blob/master/substrate/frame/democracy/README.md",
                "_blank"
              )}
            </p>
            <p>
              {getLink(
                "Polkadot Wiki - Technical Fellowship",
                "https://wiki.polkadot.network/docs/learn-polkadot-technical-fellowship",
                "_blank"
              )}
            </p>
            <Divider />
            <h4>Alternative Fellowship UIs</h4>
            <p>
              {getLink(
                "Polkassembly",
                "https://collectives.polkassembly.io/",
                "_blank"
              )}
            </p>
            <p>
              {getLink(
                "SubSquare",
                "https://collectives.subsquare.io/fellowship",
                "_blank"
              )}
            </p>
          </Modal>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}
