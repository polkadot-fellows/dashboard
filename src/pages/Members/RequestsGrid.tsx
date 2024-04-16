import { useEffect, useState } from "react"
import { Grid, AccountCard } from "@polkadot-ui/react"
import { AccountName } from "./AccountName"
import { useLocalStorage, useMediaQuery } from "usehooks-ts"
import { RevolvingDot } from "react-loader-spinner"

import type { DotQueries } from "@polkadot-api/descriptors"
import { dot, collectives } from "@polkadot-api/descriptors"
import { createClient, Binary } from "polkadot-api"
import type { PolkadotClient } from "polkadot-api"
import { WebSocketProvider } from "polkadot-api/ws-provider/web"

import "./RequestsGrid.scss"

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

const identityDataToString = (value: number | string | Binary | undefined) =>
  typeof value === "object" ? value.asText() : value ?? ""
const mapRawIdentity = (
  rawIdentity?: DotQueries["Identity"]["IdentityOf"]["Value"]
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
          x instanceof Binary ? x.asText() : x?.value?.toString()
        ),
      ])
      .filter(([, value]) => value)
  )

  return { ...info, ...additionalInfo }
}

const client: PolkadotClient = createClient(
  WebSocketProvider("wss://dot-rpc.stakeworld.io")
)
const pclient: PolkadotClient = createClient(
  WebSocketProvider("wss://polkadot-collectives-rpc.polkadot.io")
)

export const RequestsGrid = () => {
  const [members, setMembers] = useState<AccountInfoIF[]>([])
  const [fellowshipMembers, setFellowshipMembers] = useLocalStorage<any[]>(
    "fellowship-members",
    []
  )

  const isMobile = useMediaQuery("(max-width: 1000px)")

  useEffect(() => {
    const fetchMembers = async () => {
      const api = client?.getTypedApi(collectives)
      const papi = pclient?.getTypedApi(dot)

      const collectiveAddresses: any =
        await api?.query.FellowshipCollective.Members.getEntries().then(
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

    if (fellowshipMembers.length) {
      setMembers(fellowshipMembers)
    }
    fetchMembers()
  }, [])

  useEffect(() => {
    setFellowshipMembers(members)
  }, [members])

  return (
    <>
      <Grid row key={"random_key"} style={{ padding: "0rem 0", width: "100%" }}>
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
                  active: isMobile,
                  amount: 10,
                }}
                icon={{
                  address: m.address,
                  copy: true,
                  size: 38,
                  gridSize: 2,
                  justify: "space-between",
                }}
              />
            </Grid>
            <Grid column sm={1} md={2}>
              <p style={{ textAlign: "center", width: "100%" }}>
                {!isMobile ? rankings[m.rank] : null} ({m.rank})
              </p>
            </Grid>
          </Grid>
        ))
      ) : (
        <Grid column sm={12} style={{ padding: "10rem" }}>
          <RevolvingDot
            visible={true}
            height="80"
            width="80"
            color="#E6007A"
            ariaLabel="revolving-dot-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </Grid>
      )}
    </>
  )
}
