// Copyright 2023 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { useDeriveAccountInfo } from "./useDeriveAccountInfo"
import { BsCheckCircleFill } from "react-icons/bs"

export const AccountName = ({ address }: any) => {
  const info = useDeriveAccountInfo(address)
  return (
    <div style={{ display: "flex" }}>
      <p>
        {info?.identity?.display ? (
          <BsCheckCircleFill
            style={{ color: "green", marginRight: "0.5rem" }}
          />
        ) : null}
      </p>
      <p>{info?.identity?.display || "-"}</p>
    </div>
  )
}
