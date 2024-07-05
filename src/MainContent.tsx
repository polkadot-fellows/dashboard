import {
  Button,
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
  HiGlobeAlt,
  HiMiniUserPlus,
  HiBuildingLibrary,
  HiMiniInboxStack,
} from "react-icons/hi2"
import { TbPigMoney } from "react-icons/tb"
import { IoMdContact } from "react-icons/io"
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
} from "react-icons/io5"
import {
  BsArrowsCollapseVertical,
  BsArrowsExpandVertical,
} from "react-icons/bs"

import { MdDocumentScanner } from "react-icons/md"
import { SiElement } from "react-icons/si"

import { useEffect, useState } from "react"
import { Link, Route, Routes, useLocation } from "react-router-dom"

import { About } from "pages/About"
import { Membership } from "pages/Membership"
import { Salary } from "pages/Salary"
import { Governance } from "pages/Governance"
import { Modules } from "pages/Modules"
import { Rfc } from "pages/Rfc"
import { OpenDevMonthlyCalls } from "pages/OpenDevMonthlyCalls"
import { collectiveClient } from "./clients"
import { FaCircleCheck } from "react-icons/fa6"
import { SyncOutlined } from "@ant-design/icons"
import { ConnectModal } from "ConnectModal"
type MenuItem = GetProp<MenuProps, "items">[number]

const pages = (lcStatus: boolean) => [
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

const menuItems = (
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

export const MainContent = () => {
  const [api, contextHolder] = notification.useNotification()

  const isMobile = useMediaQuery("(max-width: 1000px)")

  const location = useLocation()
  const [collapsed, setCollapsed] = useState<boolean>(isMobile)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [extModal, setExtModal] = useState<boolean>(false)

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
          <Button onClick={() => setExtModal(true)}>Connect</Button>
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
              bottom: collapsed ? "3rem" : "6rem",
              width: collapsed ? "6rem" : "16rem",
              height: collapsed ? "9rem" : "1rem",
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
              {pages(lightClientLoaded).map(({ path, element }, i) => {
                return <Route key={`page_${i}`} path={path} element={element} />
              })}
            </Routes>
          </Content>
        </Layout>
      </Layout>
      <Modal
        centered
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={[]}
      >
        <h4>Fellowship Admin</h4>
        <p>
          {getLink(
            "Manifesto",
            "https://github.com/polkadot-fellows/manifesto/blob/0c3df46d76625980b8b48742cb86f4d8fa6dda8d/manifesto.pdf",
            "_blank"
          )}
        </p>
        <p>
          {getLink(
            "Pallets and Docs",
            "https://paritytech.github.io/polkadot-sdk/master/polkadot_sdk_docs/index.html",
            "_blank"
          )}
        </p>
        <p>
          {getLink(
            "Fellows repo",
            "https://github.com/polkadot-fellows",
            "_blank"
          )}
        </p>
        <Divider />
        <h4>Fellowship UIs</h4>
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

        <p>
          {getLink(
            "PolkadotJS Collectives",
            "https://dotapps-io.ipns.dweb.link/?rpc=wss%3A%2F%2Fpolkadot-collectives-rpc.polkadot.io#/explorer",
            "_blank"
          )}
        </p>
        <Divider />
        <h4>Fellowship Onboarding</h4>
        <p>
          {getLink(
            "Polkadot Blockchain Academy",
            "https://polkadot.network/development/blockchain-academy/",
            "_blank"
          )}
        </p>
        <p>
          {getLink(
            "Kudos",
            "https://www.morekudos.com/explore/open-contributions-for-polkadot-sdk",
            "_blank"
          )}
        </p>
        <p>
          {getLink(
            "Polkadot SDK Mentor issues",
            "https://mentor.tasty.limo/",
            "_blank"
          )}
        </p>
        <p>
          {getLink(
            "Polkadot Project Ideas",
            "https://gist.github.com/xlc/ebc2476afb7ecacdaa5ce95ae3b991c8#polkadot-project-ideas",
            "_blank"
          )}
        </p>
      </Modal>
      <ConnectModal isOpen={extModal} setOpen={setExtModal} />
    </ConfigProvider>
  )
}
