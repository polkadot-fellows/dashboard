// Copyright 2023 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { useEffect, useState } from "react"
import { Grid } from "@polkadot-cloud/react"

import "./RequestsGrid.scss"
import { useApi } from "contexts/Api"
import { AccountInfo } from "./AccountInfo"

interface AccountInfo {
  name?: string
  address?: string
  rank?: number
}

export const RequestsGrid = () => {
  const { api } = useApi()
  const members: AccountInfo[] = []

  const [mem, setMem] = useState<AccountInfo[]>([])

  useEffect(() => {
    const fetchMembers = async () => {
      api &&
        (await api?.isReady) &&
        api.query.fellowshipCollective.memberCount(0).then((res) => {
          for (let i = 0; i < parseInt(res.toString()); i++) {
            const account: AccountInfo = {}
            api.query.fellowshipCollective.indexToId(0, i).then((result) => {
              account.address = result.toHuman() as string
              api.query.fellowshipCollective
                .members(account.address)
                .then((r) => {
                  const j: any = r.toHuman()
                  account.rank = j?.rank
                  api!.query?.identity
                    ?.identityOf(account.address)
                    .then((name) => {
                      account.name = name.toString() || "-"
                    })
                  members.push(account)
                })
                .finally(() => {
                  setMem([...members])
                })
            })
          }
        })
    }
    fetchMembers()
  }, [api, api?.isReady])

  return (
    <>
      <Grid row key={"random_key"} style={{ padding: "2rem", width: "100%" }}>
        <Grid column sm={1}>
          Index
        </Grid>
        <Grid column sm={7}>
          Account Address
        </Grid>
        <Grid column sm={2}>
          Name
        </Grid>
        <Grid column sm={2}>
          Rank
        </Grid>
      </Grid>
      {mem.map((m, i) => (
        <Grid row key={m.address} style={{ padding: "0.2rem 0" }}>
          <Grid column sm={1}>
            {i + 1}
          </Grid>
          <Grid column sm={7}>
            <AccountInfo key={m.address} address={m.address} />
          </Grid>
          <Grid column sm={2}>
            <span>{m.name || "-"}</span>
          </Grid>
          <Grid column sm={2}>
            <span>{m.rank}</span>
          </Grid>
        </Grid>
      ))}
    </>
  )
}
