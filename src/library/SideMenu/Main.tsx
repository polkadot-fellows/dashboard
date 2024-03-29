// Copyright 2024 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"
import { PolkadotUrl } from "consts"
import { PageCategories, PagesConfig } from "config/pages"
import { useUi } from "contexts/UI"
import type { UIContextInterface } from "contexts/UI/types"
import type { PageCategory, PageItem, PagesConfigItems } from "types"

import PolkadotIcon from "img/polkadotIcon.svg?react"
import FellowshipW from "img/fellowshipLogo_w.svg?react"
import FellowshipB from "img/fellowshipLogo_b.svg?react"
import { Heading } from "./Heading/Heading"
import { Primary } from "./Primary"
import { useTheme } from "contexts/Themes"

import { IconWrapper, LogoWrapper } from "./Wrapper"

export const Main = () => {
  const { mode } = useTheme()
  const { t } = useTranslation("base")
  const { pathname } = useLocation()
  const { sideMenuMinimised }: UIContextInterface = useUi()

  const [pageConfig] = useState({
    categories: Object.assign(PageCategories),
    pages: Object.assign(PagesConfig),
  })

  // remove pages that network does not support
  const pagesToDisplay: PagesConfigItems = Object.values(pageConfig.pages)

  const size = sideMenuMinimised ? "1.4rem" : "2.2rem"
  const Svg = sideMenuMinimised ? (
    <PolkadotIcon
      style={{
        maxHeight: "100%",
        width: "2rem",
        fill: "var(--accent-color-primary)",
      }}
      width={size}
      height={size}
    />
  ) : mode === "dark" ? (
    <FellowshipW
      style={{
        maxHeight: "100%",
        height: "100%",
        width: "9.2rem",
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
    <>
      <LogoWrapper
        $minimised={sideMenuMinimised}
        onClick={() => window.open(PolkadotUrl, "_blank")}
      >
        <IconWrapper
          $minimised={sideMenuMinimised}
          className="icon"
          style={{ width: size, height: size }}
        >
          {Svg}
        </IconWrapper>
      </LogoWrapper>

      {pageConfig.categories.map(
        ({ id: categoryId, key: categoryKey }: PageCategory) => (
          <React.Fragment key={`sidemenu_category_${categoryId}`}>
            {/* display heading if not `default` (used for top links) */}
            {categoryKey !== "default" && (
              <Heading title={t(categoryKey)} minimised={sideMenuMinimised} />
            )}

            {/* display category links */}
            {pagesToDisplay.map(
              ({ category, hash, key, icon, action }: PageItem) => (
                <React.Fragment key={`sidemenu_page_${categoryId}_${key}`}>
                  {category === categoryId && (
                    <Primary
                      name={t(key)}
                      to={hash}
                      active={hash === pathname}
                      icon={icon}
                      action={action}
                      minimised={sideMenuMinimised}
                    />
                  )}
                </React.Fragment>
              )
            )}
          </React.Fragment>
        )
      )}
    </>
  )
}
