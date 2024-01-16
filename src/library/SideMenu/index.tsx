// Copyright 2023 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { faCompressAlt, faExpandAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import throttle from "lodash.throttle"
import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
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
import {
  IoSunnyOutline,
  IoMoon,
  IoLogoGithub,
  IoDocumentText,
} from "react-icons/io5"
import { GrResources } from "react-icons/gr"

const iconSize = "1.25rem"

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
            window.open("https://polkadot-fellows.github.io/RFCs/", "_blank")
          }}
          name={t("RFCs Book")}
          minimised={sideMenuMinimised}
          icon={IoDocumentText}
        />
        <Secondary
          onClick={() => {
            window.open(
              "https://github.com/polkadot-fellows/manifesto/blob/0c3df46d76625980b8b48742cb86f4d8fa6dda8d/manifesto.pdf",
              "_blank"
            )
          }}
          name={t("manifesto")}
          minimised={sideMenuMinimised}
          icon={IoDocumentText}
        />
        <Heading title={t("support")} minimised={sideMenuMinimised} />
        <Secondary
          onClick={() => {
            openHelp(null)
          }}
          name={t("resources")}
          minimised={sideMenuMinimised}
          icon={GrResources}
        />
        <Separator />
      </section>

      <section>
        {mode === "dark" ? (
          <button type="button" onClick={() => toggleTheme()}>
            <IoSunnyOutline size={iconSize} />
          </button>
        ) : (
          <button type="button" onClick={() => toggleTheme()}>
            <IoMoon size={iconSize} />
          </button>
        )}
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
          <IoLogoGithub size={iconSize} />
        </button>
      </section>
    </Wrapper>
  )
}
