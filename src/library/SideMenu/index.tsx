// Copyright 2023 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { faCompressAlt, faExpandAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import throttle from "lodash.throttle"
import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import LogoGithubSVG from "img/logoGithub.svg?react"
import InfoIcon from "img/manifest.svg?react"
import InfoSVG from "img/info.svg?react"
import MoonOutlineSVG from "img/moonOutline.svg?react"
import SunnyOutlineSVG from "img/sunnyOutline.svg?react"
import { SideMenuStickyThreshold } from "consts"
import { useHelp } from "contexts/Help"
import { useTheme } from "contexts/Themes"
import { useUi } from "contexts/UI"
import type { UIContextInterface } from "contexts/UI/types"
import { useOutsideAlerter } from "library/Hooks"
import { Heading } from "./Heading/Heading"
import { Main } from "./Main"
import { Secondary } from "./Secondary"
import { Separator, Wrapper } from "./Wrapper"
// import { useModal } from 'contexts/Modal';

export const SideMenu = () => {
  const { t } = useTranslation("base")
  const { mode, toggleTheme } = useTheme()
  // const { openModalWith } = useModal();
  const {
    setSideMenu,
    sideMenuMinimised,
    userSideMenuMinimised,
    setUserSideMenuMinimised,
  }: UIContextInterface = useUi()
  const { openHelp } = useHelp()

  // listen to window resize to hide SideMenu
  useEffect(() => {
    window.addEventListener("resize", windowThrottle)
    return () => {
      window.removeEventListener("resize", windowThrottle)
    }
  }, [])

  const throttleCallback = () => {
    if (window.innerWidth >= SideMenuStickyThreshold) {
      setSideMenu(false)
    }
  }
  const windowThrottle = throttle(throttleCallback, 200, {
    trailing: true,
    leading: false,
  })

  const ref = useRef(null)
  useOutsideAlerter(ref, () => {
    setSideMenu(false)
  })

  return (
    <Wrapper ref={ref} $minimised={sideMenuMinimised}>
      <section>
        <Main />
        <Separator />
        <Secondary
          onClick={() => {
            window.open(
              "https://github.com/polkadot-fellows/manifesto/blob/0c3df46d76625980b8b48742cb86f4d8fa6dda8d/manifesto.pdf",
              "_blank"
            )
          }}
          name={t("manifesto")}
          minimised={sideMenuMinimised}
          icon={{
            Svg: InfoIcon,
            size: sideMenuMinimised ? "1.4em" : "1.2em",
          }}
        />
        <Heading title={t("support")} minimised={sideMenuMinimised} />
        <Secondary
          onClick={() => {
            openHelp(null)
          }}
          name={t("resources")}
          minimised={sideMenuMinimised}
          icon={{
            Svg: InfoSVG,
            size: sideMenuMinimised ? "1.4em" : "1.2em",
          }}
        />
        <Separator />
      </section>

      <section>
        <button
          type="button"
          onClick={() => setUserSideMenuMinimised(!userSideMenuMinimised)}
        >
          <FontAwesomeIcon
            icon={userSideMenuMinimised ? faExpandAlt : faCompressAlt}
          />
        </button>
        <button
          type="button"
          onClick={() =>
            window.open("https://github.com/polkadot-fellows", "_blank")
          }
        >
          <LogoGithubSVG width="1.2em" height="1.2em" />
        </button>
        {mode === "dark" ? (
          <button type="button" onClick={() => toggleTheme()}>
            <SunnyOutlineSVG width="1.25em" height="1.25em" />
          </button>
        ) : (
          <button type="button" onClick={() => toggleTheme()}>
            <MoonOutlineSVG width="1.1em" height="1.1em" />
          </button>
        )}
      </section>
    </Wrapper>
  )
}
