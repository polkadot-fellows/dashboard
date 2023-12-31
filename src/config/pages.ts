// Copyright 2023 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { Overview } from "pages/Overview"
import { Members } from "pages/Members"
import { Rfc } from "pages/Rfc"
import type { PageCategoryItems, PagesConfigItems } from "types"
import { HiMiniUserGroup, HiGlobeAlt } from "react-icons/hi2"
import { MdDocumentScanner } from "react-icons/md"

const BASE_URL = import.meta.env.BASE_URL

export const PageCategories: PageCategoryItems = [
  {
    id: 1,
    key: "default",
  },
]

export const PagesConfig: PagesConfigItems = [
  {
    category: 1,
    key: "overview",
    uri: `${BASE_URL}`,
    hash: "/overview",
    Entry: Overview,
    icon: HiGlobeAlt,
  },
  {
    category: 1,
    key: "members",
    uri: `${BASE_URL}`,
    hash: "/members",
    Entry: Members,
    icon: HiMiniUserGroup,
  },
  {
    category: 1,
    key: "RFCs",
    uri: `${BASE_URL}`,
    hash: "/rfcs",
    Entry: Rfc,
    icon: MdDocumentScanner,
  },
]
