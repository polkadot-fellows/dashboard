// Copyright 2024 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { ThemedRouter } from "Themes"
import { APIProvider } from "contexts/Api"
import { HelpProvider } from "contexts/Help"
import { UIProvider } from "contexts/UI"
import { withProviders } from "library/Hooks"
import { MDXProvider } from "@mdx-js/react"

// !! Provider order matters.
export const Providers = withProviders(
  MDXProvider,
  APIProvider,
  HelpProvider,
  UIProvider
)(ThemedRouter)
