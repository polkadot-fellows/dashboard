// Copyright 2024 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only
import { Polkicon } from "@polkadot-cloud/react"

export const AccountInfo = ({ address }: any) => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <Polkicon address={address} />
        {address}
      </div>
    </>
  )
}
