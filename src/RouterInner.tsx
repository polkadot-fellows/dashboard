import {
  ConfigProvider,
  Divider,
  Layout,
  Menu,
  Modal,
  notification,
  Popover,
} from "antd"
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
  collapsedWidth,
  uncollapsedWidth,
  lightTheme,
  darkTheme,
  lightTokens,
  darkTokens,
  type,
} from "consts"
import { useLocalStorage, useMediaQuery } from "usehooks-ts"

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

import { About } from "pages/About"
import { Membership } from "pages/Membership"
import { Interactions } from "pages/Interactions"
import { Governance } from "pages/Governance"
import { Modules } from "pages/Modules"
import { Rfc } from "pages/Rfc"
import { Members } from "pages/Members"
import { OpenDevMonthlyCalls } from "pages/OpenDevMonthlyCalls"
import { collectiveClient } from "pages/Members/clients"
import { FaCircleCheck } from "react-icons/fa6"
import { SyncOutlined } from "@ant-design/icons"

type MenuItem = GetProp<MenuProps, "items">[number]

const pages = [
  {
    path: "",
    element: <About />,
  },
  {
    path: "about",
    element: <About />,
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

const menuItems = (
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
): MenuItem[] => [
  {
    key: "1",
    type: "group",
    children: [
      getItem(getLink("About", "about"), "about", <HiGlobeAlt />),
      getItem(getLink("Members", "members"), "members", <HiMiniUserGroup />),
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
      getItem(getLink("Open RFCs", "rfcs"), "rfcs", <MdDocumentScanner />),
      getItem(
        getLink("Monthly Calls", "opendev"),
        "opendev",
        <HiBuildingLibrary />
      ),
    ],
  },
  {
    type: "divider",
  },
  {
    key: "2",
    label: "Element",
    type: "group",
    children: [
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
    ],
  },
  {
    type: "divider",
  },
  {
    key: "3",
    type: "group",
    children: [
      getItem(
        getLink(
          "RFCs Book",
          "https://polkadot-fellows.github.io/RFCs/",
          "_blank"
        ),
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
      getItem(
        <a href="#" onClick={() => setOpenModal(true)}>
          Resources
        </a>,
        "resources",
        <GrResources />
      ),
    ],
  },
]

export const RouterInner = () => {
  const [api, contextHolder] = notification.useNotification()

  const isMobile = useMediaQuery("(max-width: 1000px)")

  const location = useLocation()
  const [collapsed, setCollapsed] = useState<boolean>(isMobile)
  const [openModal, setOpenModal] = useState<boolean>(false)

  const [lightClientLoaded, setLightClientLoaded] = useState<boolean>(false)

  const [token, setToken] = useState({})
  const { mode, toggleTheme } = useTheme()

  const [settings, setSettings] = useLocalStorage("fellowship-settings", {
    themeMode: "light",
    collapsed,
  })

  useEffect(() => {
    setCollapsed(settings.collapsed)
  }, [settings.collapsed])

  const size = collapsed ? "2rem" : "2.2rem"

  const Svg = collapsed ? (
    <PolkadotIcon
      style={{
        maxHeight: "100%",
        width: "4rem",
        fill: mode === "dark" ? darkTheme.accent : lightTheme.accent,
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
        fill: mode === "dark" ? darkTheme.accent : lightTheme.accent,
      }}
      width={size}
      height={size}
    />
  )

  useEffect(() => {
    setToken(mode === "light" ? lightTokens : darkTokens)
  }, [mode])

  useEffect(() => {
    api.warning({
      key: "lc_status",
      message: "Light client: Syncing",
      description: "Synchronizing light client. This may take some time.",
      placement: "bottomRight",
      duration: 15,
    })

    collectiveClient.finalizedBlock$.subscribe((finalizedBlock) => {
      if (finalizedBlock.number && !lightClientLoaded) {
        setLightClientLoaded(true)
      }
    })
  }, [])

  useEffect(() => {
    lightClientLoaded &&
      api.success({
        key: "lc_status",
        message: "Light Client: Completed",
        description: "Sync is completed. You may go on 😄",
        placement: "bottomRight",
        duration: 10,
      })
  }, [lightClientLoaded])

  return (
    <ConfigProvider theme={token}>
      {contextHolder}
      <Layout>
        <Sider
          style={{
            background:
              mode === "dark" ? darkTheme.primary : lightTheme.primary,
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
            <Link style={{ height: "4rem" }} to={"/"}>
              {Svg}
            </Link>
          </div>
          <Menu
            style={{
              background:
                mode === "dark" ? darkTheme.primary : lightTheme.primary,
            }}
            selectedKeys={[location?.pathname.replace("/", "")]}
            theme={mode}
            mode={type}
            items={menuItems(setOpenModal)}
          />
          <section
            style={{
              position: "absolute",
              bottom: "6rem",
              width: collapsed ? "6rem" : "16rem",
              height: collapsed ? "10rem" : "1rem",
              display: "flex",
              flexDirection: collapsed ? "column" : "row",
              justifyContent: "space-around",
            }}
          >
            {mode === "dark" ? (
              <button
                style={{ color: lightTheme.accent }}
                type="button"
                onClick={() => {
                  toggleTheme()
                }}
              >
                <IoSunnyOutline
                  size={iconSize}
                  style={{ color: lightTheme.accent }}
                />
              </button>
            ) : (
              <button type="button" onClick={() => toggleTheme()}>
                <IoMoon size={iconSize} style={{ color: darkTheme.accent }} />
              </button>
            )}
            <button
              style={{
                color: mode === "dark" ? darkTheme.accent : lightTheme.accent,
              }}
              type="button"
              onClick={() => {
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
              style={{
                color: mode === "dark" ? darkTheme.accent : lightTheme.accent,
              }}
              type="button"
              onClick={() =>
                window.open("https://github.com/polkadot-fellows", "_blank")
              }
            >
              <IoLogoGithub size={iconSize} />
            </button>
            <Popover
              placement="right"
              content={`Light Client ${lightClientLoaded ? "synced" : "syncing"}`}
            >
              <button
                disabled
                style={{
                  color: mode === "dark" ? darkTheme.accent : lightTheme.accent,
                }}
                type="button"
              >
                {!lightClientLoaded ? (
                  <SyncOutlined
                    spin
                    style={{
                      color:
                        mode === "dark"
                          ? darkTheme.warning
                          : lightTheme.warning,
                    }}
                  />
                ) : (
                  <FaCircleCheck
                    size={18}
                    style={{
                      color:
                        mode === "dark"
                          ? darkTheme.success
                          : lightTheme.success,
                    }}
                  />
                )}
              </button>
            </Popover>
          </section>
          {/* Copyright footer  */}
          <div
            style={{
              position: "fixed",
              bottom: 0,
              padding: collapsed ? "0rem 1rem 1rem" : "0rem 1rem 1rem 0",
              zIndex: 1,
              color: mode === "dark" ? darkTheme.accent : lightTheme.accent,
              fontWeight: "bolder",
              display: "flex",
              justifyContent: "flex-end",
              filter: "alpha(opacity=75)",
              opacity: "0.75",
              width: collapsed ? "auto" : "16rem",
              alignItems: "center",
            }}
          >
            {collapsed ? (
              ""
            ) : (
              <div style={{ textAlign: "center" }}>
                Polkadot Technical Fellowship
              </div>
            )}
            <div>©{new Date().getFullYear()}</div>
          </div>
        </Sider>
        <Layout>
          <Content
            className={"theme-" + mode}
            style={{
              overflow: "auto",
              height: "100vh",
              color: mode === "light" ? lightTheme.invert : darkTheme.invert,
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
