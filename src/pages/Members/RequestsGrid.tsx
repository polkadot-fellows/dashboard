// Copyright 2024 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { useEffect, useState } from "react"
import { Grid, AccountCard } from "@polkadot-ui/react"

import "./RequestsGrid.scss"
import { AccountName } from "./AccountName"

import { Binary, createClient } from "@polkadot-api/client"

import { getLegacyProvider } from "@polkadot-api/legacy-polkadot-provider"
import { createScClient } from "@substrate/connect"
import collectivesChainspec from "./collectives-polkadot"

import collectiveTypes from "../../codegen/collectives"
import type { Queries } from "../../codegen/polkadot"
import polkadotTypes from "../../codegen/polkadot"

import { useLocalStorage } from "usehooks-ts"

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

const scProvider = createScClient()
const { relayChains } = getLegacyProvider(scProvider)

const collectivesParachain =
  await relayChains.polkadot.getParachain(collectivesChainspec)

const p_client = createClient(relayChains.polkadot.connect)
const client = createClient(collectivesParachain.connect)
const api = client?.getTypedApi(collectiveTypes)
const p_api = p_client?.getTypedApi(polkadotTypes)

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
  const [mem, setMem] = useState<AccountInfoIF[]>([])
  const [fellowshipMembers, setFellowshipMembers] = useLocalStorage<any[]>(
    "fellowship-members",
    []
  )

  useEffect(() => {
    const fetchMembers = async () => {
      const collectiveAddresses: any =
        await api.query.FellowshipCollective.Members.getEntries().then(
          (members: any[]) =>
            p_api.query.Identity.IdentityOf.getValues(
              members.map((m) => m.keyArgs)
            ).then((identities: any[]) =>
              identities.map((identity, idx) => ({
                address: members[idx].keyArgs[0],
                rank: members[idx].value,
                ...mapRawIdentity(identity),
              }))
            )
        )

      setMem([
        ...collectiveAddresses.sort(
          (a: { rank: number }, b: { rank: number }) =>
            a.rank > b.rank ? -1 : 1
        ),
      ])
    }

    if (api) {
      if (fellowshipMembers.length) {
        setMem(fellowshipMembers)
      }
      fetchMembers()
    }
    api && fetchMembers()
  }, [api])

  useEffect(() => {
    setFellowshipMembers(mem)
  }, [mem])

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
      ))}
    </>
  )
}
