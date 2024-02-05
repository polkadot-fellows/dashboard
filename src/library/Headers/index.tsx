// Copyright 2024 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { useUi } from "contexts/UI"
import { SideMenuToggle } from "./SideMenuToggle"
import { Spinner } from "./Spinner"
import { LargeScreensOnly, Wrapper } from "./Wrappers"

export const Headers = () => {
  const { isSyncing } = useUi()

  return (
    <>
      <Wrapper>
        {/* side menu toggle: shows on small screens */}
        <SideMenuToggle />

        {/* spinner to show app syncing */}
        {isSyncing ? <Spinner /> : null}

        {/* connected accounts */}
        <LargeScreensOnly>{/* Right side buttons here */}</LargeScreensOnly>
      </Wrapper>
    </>
  )
}
