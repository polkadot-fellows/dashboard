// Copyright 2024 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { PageRow, PageTitle } from "@polkadot-ui/react"
import MdxCode from "./index.mdx"

export const Membership = () => {
  return (
    <>
      <PageTitle title="Polkadot Fellowship - Membership" />
      <PageRow style={{ paddingTop: "1rem" }}>
        <MdxCode />
      </PageRow>
    </>
  )
}
