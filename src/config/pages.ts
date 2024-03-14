// Copyright 2024 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { Overview } from "pages/Overview"
import { Members } from "pages/Members"
import { Membership } from "pages/Membership"
import { Governance } from "pages/Governance"
import { Rfc } from "pages/Rfc"
import type { PageCategoryItems } from "types"
import { Interactions } from "pages/Interactions"
import { Modules } from "pages/Modules"

export const PageCategories: PageCategoryItems = [
  {
    id: 1,
    key: "default",
  },
]

export const PagesConfig: any[] = [
  {
    hash: "/overview",
    Entry: Overview,
  },
  {
    hash: "/members",
    Entry: Members,
  },
  {
    hash: "/membership",
    Entry: Membership,
  },
  {
    hash: "/governance",
    Entry: Governance,
  },
  {
    hash: "/interactions",
    Entry: Interactions,
  },
  {
    hash: "/modules",
    Entry: Modules,
  },
  {
    hash: "/rfcs",
    Entry: Rfc,
  },
]
