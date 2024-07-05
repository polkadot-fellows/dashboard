import { useEffect, useState } from "react"
import { Polkicon } from "@polkadot-ui/react"
import { AccountName } from "./AccountName"
import { useLocalStorage, useMediaQuery } from "usehooks-ts"

import type { DotQueries } from "@polkadot-api/descriptors"
import type { Binary } from "polkadot-api"

import { Badge, Drawer, Popover, Table } from "antd"
import type { TableColumnsType } from "antd"

import { ellipsisFn } from "@polkadot-ui/utils"
import { MemberDrawer } from "./MemberDrawer"
import { api, papi } from "../../clients"
import { rankInfo } from "consts"

export type AccountInfoIF = {
  key?: number
  address: string
  rank: number
  display?: string
  github?: string
  legal?: string
  riot?: string
  email?: string
  twitter?: string
  web?: string
}

const dataToString = (value: number | string | Binary | undefined) =>
  typeof value === "object" ? value.asText() : value ?? ""

const mapRawIdentity = (
  rawIdentity?: DotQueries["Identity"]["IdentityOf"]["Value"]
) => {
  if (!rawIdentity) return rawIdentity
  const {
    info: { additional, display, email, legal, riot, twitter, web },
  } = rawIdentity[0]

  const display_id = dataToString(display.value)
  const additionalInfo = Object.fromEntries(
    additional.map(([key, { value }]) => [
      dataToString(key.value!),
      dataToString(value),
    ])
  )

  return {
    ...additionalInfo,
    display: display_id,
    web: dataToString(web.value),
    email: dataToString(email.value),
    legal: dataToString(legal.value),
    riot: dataToString(riot.value),
    twitter: dataToString(twitter.value),
  }
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
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const [drawerMember, setDrawerMember] = useState<AccountInfoIF>(
    {} as AccountInfoIF
  )
  const isMobile = useMediaQuery("(max-width: 1000px)")

  useEffect(() => {
    const fetchMembers = async () => {
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
      setMembers(fellowshipMembers)
    }
    fetchMembers()
  }, [])

  useEffect(() => {
    let i = 0
    members.forEach((m) => {
      fellMembers.push({
        key: i++,
        display: m.legal || m.display || ellipsisFn(m.address, 6),
        rank: m.rank,
        address: m.address,
      })
    })
    setFellowshipMembers(members)
    if (members.length) setLoading(false)
  }, [members])

  useEffect(() => {
    const cols: TableColumnsType<AccountInfoIF> = [
      {
        title: "Name",
        dataIndex: "display",
        key: "display",
        render: (_, r) => (
          <div style={{ display: "flex" }}>
            <div style={{ padding: "0 2rem" }}>
              <Polkicon address={r.address} size={38} />
            </div>
            <AccountName display={r.display} address={r.address} />
          </div>
        ),
      },
      {
        title: "Rank",
        width: 180,
        dataIndex: "rank",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.rank - b.rank,
        key: "rank",
        render: (_, r) => {
          const { name, rank, color } = rankInfo[r.rank]
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {!isMobile ? (
                <span style={{ marginRight: "1rem" }}>{name}</span>
              ) : null}
              {!isMobile ? (
                <Badge count={rank} color={color} showZero />
              ) : (
                <Popover placement="top" content={name}>
                  <Badge count={rank} color={color} showZero />
                </Popover>
              )}
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
    <>
      <Table
        size="small"
        style={{ cursor: "pointer" }}
        onRow={(record) => {
          return {
            onClick: async () => {
              setDrawerMember(record)
              setOpenDrawer(true)
            },
          }
        }}
        pagination={false}
        loading={loading}
        columns={columns}
        dataSource={members}
      />
      <Drawer
        onClose={() => {
          setOpenDrawer(false)
          setDrawerMember({} as AccountInfoIF)
        }}
        open={openDrawer}
        title={drawerMember?.address && ellipsisFn(drawerMember?.address, 8)}
      >
        <MemberDrawer member={drawerMember} />
      </Drawer>
    </>
  )
}
