// Copyright 2024 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { PageRow, PageTitle } from "@polkadot-ui/react"
import MdxCode from "./index.mdx"

export const Interactions = () => {
  return (
    <>
      <PageTitle title="Polkadot Fellowship - Interactions" />
      <PageRow style={{ paddingTop: "1rem" }}>
        <MdxCode />
      </PageRow>
    </>
  )
}
