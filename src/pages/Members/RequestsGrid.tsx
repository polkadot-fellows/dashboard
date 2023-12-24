// Copyright 2023 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { useEffect, useState } from "react"
import { Grid } from "@polkadot-cloud/react"
import { AccountCard } from "@polkadot-cloud/recipes"

import "./RequestsGrid.scss"
import { useApi } from "contexts/Api"
import { AccountName } from "./AccountName"
// import { AccountInfo } from "./AccountInfo"

interface AccountInfo {
  name?: string
  address: string
  rank: number
}

const rankings = [
  "Candidate",
  "Member",
  "Proficient",
  "Fellow",
  "Architect",
  "Architect Adept",
  "Grand Architect",
  "Free Master",
  "Master Constant",
  "Grand Master",
]

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
            const account: AccountInfo = {} as AccountInfo
            api.query.fellowshipCollective.indexToId(0, i).then((result) => {
              account.address = result.toHuman() as string
              api.query.fellowshipCollective
                .members(account.address)
                .then((r) => {
                  const j: any = r.toHuman()
                  account.rank = j?.rank
                  members.push(account)
                })
                .finally(() => {
                  setMem([
                    ...members.sort((a, b) => (a.rank > b.rank ? -1 : 1)),
                  ])
                })
            })
          }
        })
    }
    fetchMembers()
  }, [api, api?.isReady])

  return (
    <>
      <Grid row key={"random_key"} style={{ padding: "2rem 0", width: "100%" }}>
        <Grid column sm={3} md={3} style={{ textAlign: "left" }}>
          <h3>Name</h3>
        </Grid>
        <Grid column sm={7} md={7} style={{ textAlign: "left" }}>
          <h3>Account Address</h3>
        </Grid>
        <Grid column sm={2} md={2} style={{ textAlign: "left" }}>
          <h3>Rank</h3>
        </Grid>
      </Grid>
      {mem.map((m) => (
        <Grid row key={m.address} style={{ padding: "0.5rem 0" }}>
          <Grid column sm={3} md={3}>
            <AccountName address={m.address} />
          </Grid>
          <Grid column sm={7} md={7}>
            <AccountCard
              style={{
                background: "transparent",
                border: 0,
                boxShadow: "none",
              }}
              title={{
                address: m.address,
                justify: "flex-start",
                align: "center",
              }}
              ellipsis={{
                active: true,
                amount: 10,
              }}
              icon={{
                copy: true,
                size: 38,
                gridSize: 1,
                justify: "space-between",
                outerColor: "transparent",
                dark: true,
              }}
            />
          </Grid>
          <Grid column sm={1} md={2}>
            <p>
              {rankings[m.rank]} ({m.rank})
            </p>
          </Grid>
        </Grid>
      ))}
    </>
  )
}
