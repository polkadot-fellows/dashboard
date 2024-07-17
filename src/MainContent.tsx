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
import { PiPlugsConnectedFill } from "react-icons/pi"
import { VscDebugDisconnect } from "react-icons/vsc"

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

import { useTheme } from "./contexts/Themes"
import { IoSunnyOutline, IoMoon, IoLogoGithub } from "react-icons/io5"
import {
  BsArrowsCollapseVertical,
  BsArrowsExpandVertical,
} from "react-icons/bs"

import { useEffect, useState } from "react"
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom"

import { collectiveClient } from "./clients"
import { FaCircleCheck } from "react-icons/fa6"
import { SyncOutlined } from "@ant-design/icons"
import { ConnectModal } from "ConnectModal"
import { useSelAccounts } from "contexts/Account"
import { Polkicon } from "@polkadot-ui/react"
import type { ThemeType } from "MainContentConsts"
import { getLink, iconSize, menuItems, pages, Svg } from "MainContentConsts"

const { Content, Sider } = Layout

export const MainContent = () => {
  const isMobile = useMediaQuery("(max-width: 1000px)")

  const location = useLocation()
  const [collapsed, setCollapsed] = useState<boolean>(isMobile)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [extModal, setExtModal] = useState<boolean>(false)
  const [lightClientLoaded, setLightClientLoaded] = useState<boolean>(false)
  const [token, setToken] = useState({})

  const [api, contextHolder] = notification.useNotification()

  const { mode, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const { selectedAccount } = useSelAccounts()

  const [settings, setSettings] = useLocalStorage("fellowship-settings", {
    themeMode: "light",
    collapsed,
  })

  useEffect(() => {
    if (!selectedAccount?.address) {
      navigate("/")
    }
  }, [selectedAccount])

  const themeColor = (type: ThemeType): string =>
    mode === "dark" ? darkTheme[type] : lightTheme[type]

  const handleClick = () => navigate("/account")

  useEffect(() => {
    setCollapsed(settings.collapsed)
  }, [settings.collapsed])

  useEffect(() => {
    setToken(mode === "dark" ? darkTokens : lightTokens)
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
            background: themeColor("primary"),
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
              marginTop: collapsed ? "3rem" : "2rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link style={{ height: "4rem" }} to={"/"}>
              {Svg(collapsed, themeColor)}
            </Link>
          </div>

          <Menu
            style={{
              background: themeColor("primary"),
              height: "calc(80vh - 15rem)",
              overflow: "auto",
            }}
            selectedKeys={[location?.pathname.replace("/", "")]}
            theme={mode}
            mode={type}
            items={menuItems(setOpenModal)}
          />
          <section
            style={{
              position: "absolute",
              bottom: collapsed ? "13rem" : "10rem",
              width: collapsed ? "6rem" : "16rem",
              height: collapsed ? "6rem" : "6rem",
              display: "flex",
              padding: "0 1rem",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <Button
              disabled={!selectedAccount?.address}
              onClick={handleClick}
              style={{
                display: selectedAccount?.address ? "flex" : "none",
                background:
                  location?.pathname.replace("/", "") === "account"
                    ? themeColor("accent")
                    : themeColor("primary"),
              }}
            >
              {selectedAccount?.address && (
                <Polkicon size={24} address={selectedAccount.address || ""} />
              )}
              {!collapsed && "Fellow Page"}
            </Button>
            <Button onClick={() => setExtModal(true)}>
              {selectedAccount?.address ? (
                collapsed ? (
                  <VscDebugDisconnect style={{ color: themeColor("accent") }} />
                ) : (
                  "Disconnect/Change"
                )
              ) : collapsed ? (
                <PiPlugsConnectedFill style={{ color: themeColor("accent") }} />
              ) : (
                "Connect"
              )}
            </Button>
          </section>
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
                color: themeColor("accent"),
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
                color: themeColor("accent"),
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
                  color: themeColor("accent"),
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
              color: themeColor("accent"),
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
              color: themeColor("invert"),
            }}
          >
            <Routes>
              {pages(lightClientLoaded, selectedAccount).map(
                ({ path, element }, i) => {
                  return (
                    <Route key={`page_${i}`} path={path} element={element} />
                  )
                }
              )}
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
