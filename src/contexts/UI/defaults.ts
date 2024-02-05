// Copyright 2024 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import type { UIContextInterface } from "./types"

export const defaultUIContext: UIContextInterface = {
  // eslint-disable-next-line
  setSideMenu: (v) => {},
  // eslint-disable-next-line
  setUserSideMenuMinimised: (v) => {},
  // eslint-disable-next-line
  setContainerRefs: (v) => {},
  sideMenuOpen: false,
  userSideMenuMinimised: false,
  sideMenuMinimised: false,
  containerRefs: {},
  isSyncing: false,
}
