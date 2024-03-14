// Copyright 2024 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { useEffect, useState } from "react"
import { Grid, AccountCard, Loader } from "@polkadot-ui/react"
import { AccountName } from "./AccountName"
import { Binary } from "@polkadot-api/client"
import type { Queries } from "../../codegen/polkadot"
import { useLocalStorage } from "usehooks-ts"

import "./RequestsGrid.scss"
import { useApi } from "contexts/Api"

export interface AccountInfoIF {
  address: string
  rank: number
  display?: string
  github?: string
  legal?: string
  riot?: string
  twitter?: string
  web?: string
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

const identityDataToString = (value: string | Binary | undefined) =>
  typeof value === "object" ? value.asText() : value ?? ""

const mapRawIdentity = (
  rawIdentity?: Queries["Identity"]["IdentityOf"]["Value"]
) => {
  if (!rawIdentity) return rawIdentity

  const {
    info: { additional, ...rawInfo },
  } = rawIdentity

  const additionalInfo = Object.fromEntries(
    additional.map(([key, { value }]) => [
      identityDataToString(key.value!),
      identityDataToString(value),
    ])
  )

  const info = Object.fromEntries(
    Object.entries(rawInfo)
      .map(([key, x]) => [
        key,
        identityDataToString(
          x instanceof Binary ? x.asText() : x?.value?.asText()
        ),
      ])
      .filter(([, value]) => value)
  )

  return { ...info, ...additionalInfo }
}

export const RequestsGrid = () => {
  const [members, setMembers] = useState<AccountInfoIF[]>([])
  const [fellowshipMembers, setFellowshipMembers] = useLocalStorage<any[]>(
    "fellowship-members",
    []
  )

  const { api, papi } = useApi()

  useEffect(() => {
    const fetchMembers = async () => {
      const collectiveAddresses: any =
        await api.query.FellowshipCollective.Members.getEntries().then(
          (mems: any[]) =>
            papi.query.Identity.IdentityOf.getValues(
              mems.map((m) => m.keyArgs)
            ).then((identities: any[]) =>
              identities.map((identity, idx) => ({
                address: mems[idx].keyArgs[0],
                rank: mems[idx].value,
                ...mapRawIdentity(identity),
              }))
            )
        )

      setMembers([
        ...collectiveAddresses.sort(
          (a: { rank: number }, b: { rank: number }) =>
            a.rank > b.rank ? -1 : 1
        ),
      ])
    }

    if (api && papi) {
      if (fellowshipMembers.length) {
        setMembers(fellowshipMembers)
      }
      fetchMembers()
    }
    api && papi && fetchMembers()
  }, [api, papi])

  useEffect(() => {
    setFellowshipMembers(members)
  }, [members])

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
      {members.length ? (
        members.map((m) => (
          <Grid row key={m.address} style={{ padding: "0.5rem 0" }}>
            <Grid column sm={3} md={3}>
              <AccountName display={m.display || "-"} />
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
        ))
      ) : (
        <Grid column sm={12} style={{ padding: "10rem" }}>
          <Loader type="cube" />
        </Grid>
      )}
    </>
  )
}
