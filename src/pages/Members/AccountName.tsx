// Copyright 2023 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { useDeriveAccountInfo } from "./useDeriveAccountInfo"

export const AccountName = ({ address }: any) => {
  const info = useDeriveAccountInfo(address)
  return (
    <>
      <div style={{ display: "flex" }}>{info?.identity?.display || "-"}</div>
    </>
  )
}
