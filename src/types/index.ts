// Copyright 2024 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import type React from "react"
import type { IconType } from "react-icons/lib"

export interface PageCategory {
  id: number
  key: string
}

export type PageCategoryItems = PageCategory[]

export interface PageItem {
  category: number
  key: string
  uri: string
  hash: string
  Entry: React.FC<PageProps>
  icon: IconType
  action?: {
    type: string
    status: string
    text?: string | undefined
  }
}

export interface PageProps {
  page: PageProp
}

interface PageProp {
  key: string
}

export type MaybeString = string | null

export type PagesConfigItems = PageItem[]

// Any types to compress compiler warnings.

export type AnyApi = any
export type AnyJson = any
export type AnyFunction = any
export type AnyMetaBatch = any
export type AnySubscan = any
