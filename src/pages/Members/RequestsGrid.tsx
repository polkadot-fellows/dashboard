import { useEffect, useState } from "react"
import { Polkicon } from "@polkadot-ui/react"
import { IoCopyOutline } from "react-icons/io5"
import { AccountName } from "./AccountName"
import { useLocalStorage, useMediaQuery } from "usehooks-ts"

import type { DotQueries } from "@polkadot-api/descriptors"
import { dot, collectives } from "@polkadot-api/descriptors"
import type { Binary } from "polkadot-api"
import { collectiveClient, polkadotClient } from "./clients"

import { Badge, Table } from "antd"
import type { TableColumnsType, TableProps } from "antd"

import "./RequestsGrid.scss"

type OnChange = NonNullable<TableProps<AccountInfoIF>["onChange"]>

export interface AccountInfoIF {
  key?: number
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
  { rank: 0, name: "Candidate", color: "lime" },
  { rank: 1, name: "Member", color: "blue" },
  { rank: 2, name: "Proficient", color: "cyan" },
  { rank: 3, name: "Fellow", color: "green" },
  { rank: 4, name: "Architect", color: "yellow" },
  { rank: 5, name: "Architect Adept", color: "orange" },
  { rank: 6, name: "Grand Architect", color: "volcano" },
  { rank: 7, name: "Free Master", color: "pink" },
  { rank: 8, name: "Master Constant", color: "magenta" },
  { rank: 9, name: "Grand Master", color: "gold" },
]

const identityDataToString = (value: number | string | Binary | undefined) =>
  typeof value === "object" ? value.asText() : value ?? ""

const mapRawIdentity = (
  // rawIdentity?: DotQueries["Identity"]["IdentityOf"]["Value"]
  rawIdentity?: DotQueries["Identity"]["IdentityOf"]["Value"]
) => {
  if (!rawIdentity) return rawIdentity
  const {
    info: { additional, display },
  } = rawIdentity[0]

  const display_id = identityDataToString(display.value)
  const additionalInfo = Object.fromEntries(
    additional.map(([key, { value }]) => [
      identityDataToString(key.value!),
      identityDataToString(value),
    ])
  )

  return { ...additionalInfo, display: display_id }
}

const handleChange: OnChange = (pagination, filters, sorter) => {
  console.log("Various parameters", pagination, filters, sorter)
}

const fellMembers: AccountInfoIF[] = []

export const RequestsGrid = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [members, setMembers] = useState<AccountInfoIF[]>([])
  const [columns, setColumns] = useState<TableColumnsType<AccountInfoIF>>([])
  const [fellowshipMembers, setFellowshipMembers] = useLocalStorage<any[]>(
    "fellowship-members",
    []
  )

  const isMobile = useMediaQuery("(max-width: 1000px)")

  useEffect(() => {
    const fetchMembers = async () => {
      const api = collectiveClient?.getTypedApi(collectives)
      const papi = polkadotClient?.getTypedApi(dot)

      const collectiveAddresses: any =
        await api?.query.FellowshipCollective.Members.getEntries().then(
          (mems: any[]) =>
            papi.query.Identity?.IdentityOf?.getValues(
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
      console.log("fellowshipMembers", fellowshipMembers)
      setMembers(fellowshipMembers)
      setLoading(false)
    }
    fetchMembers()
  }, [])

  useEffect(() => {
    let i = 0
    console.log(members)
    members.forEach((m) => {
      fellMembers.push({
        key: i++,
        display: m.legal || m.display || "-",
        rank: m.rank,
        address: m.address,
      })
    })
    setFellowshipMembers(members)
  }, [members])

  useEffect(() => {
    const cols: TableColumnsType<AccountInfoIF> = [
      {
        title: "Name",
        dataIndex: "display",
        key: "display",
        render: (_, r) => {
          console.log(r)
          return (
            <div style={{ display: "flex" }}>
              <div style={{ padding: "0 2rem" }}>
                <Polkicon address={r.address} copy size={38} />
              </div>
              <AccountName display={r.display || "-"} />
            </div>
          )
        },
      },
      {
        title: "Rank",
        dataIndex: "rank",
        key: "rank",
        render: (_, r) => {
          console.log(rankings[r.rank])
          const { name, rank, color } = rankings[r.rank]
          return (
            <div
              style={{
                display: "flex",
              }}
            >
              {!isMobile ? (
                <span style={{ marginRight: "1rem" }}>{name}</span>
              ) : null}
              <Badge count={rank} color={color} showZero />
            </div>
          )
        },
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        render: (m) => m,
      },
    ]

    setColumns(cols)
  }, [])

  return (
    <Table
      pagination={false}
      loading={loading}
      columns={columns}
      dataSource={members}
      onChange={handleChange}
    />
  )
}
