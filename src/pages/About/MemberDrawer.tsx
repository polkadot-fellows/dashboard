import { Polkicon } from "@polkadot-ui/react"
import { AccountName } from "./AccountName"
import { ellipsisFn, transformToBaseUnit } from "@polkadot-ui/utils"
import { darkTheme, lightTheme, rankInfo } from "consts"
import { useTheme } from "../../contexts/Themes"
import type { AccountInfoIF } from "./RequestsGrid"
import copy from "copy-to-clipboard"

import {
  IoCopyOutline,
  IoCheckmarkCircleSharp,
  IoMailOutline,
} from "react-icons/io5"
import { FaXTwitter } from "react-icons/fa6"
import { TbWorldWww } from "react-icons/tb"
import { Linker } from "./Linker"
import { SiElement } from "react-icons/si"

import { Card, Col, Row, Skeleton, Statistic } from "antd"
import { api } from "../../clients"
import { useEffect, useState } from "react"

type MemberDrawerProps = {
  member: AccountInfoIF
  lcStatus: boolean
}

type MemberDetailsProps = {
  address: string
}

const iconSize = 24
const block = true
const size = "small"
const precision = 2

// TODO - fix the chain units to be loaded from the chain and not hardcoded
const roundUp = (num: bigint): string => {
  const n = parseFloat(transformToBaseUnit(num.toString(), 10))
  const prec = Math.pow(10, precision)
  return (Math.ceil(n * prec) / prec).toString()
}

const MemberDetails = ({ address }: MemberDetailsProps) => {
  const [copyClicked, setCopyClicked] = useState<boolean>(false)

  useEffect(() => {
    if (copyClicked) {
      setTimeout(() => {
        setCopyClicked(false)
      }, 2000)
    }
  }, [copyClicked])

  const props = {
    style: { marginLeft: "0.75rem", cursor: "pointer" },
    onClick: () => {
      copy(address)
      setCopyClicked(true)
    },
  }

  return (
    <>
      <div>{ellipsisFn(address, 6)}</div>
      {copyClicked ? (
        <IoCheckmarkCircleSharp {...props} />
      ) : (
        <IoCopyOutline {...props} />
      )}
    </>
  )
}

export const MemberDrawer = ({ member, lcStatus }: MemberDrawerProps) => {
  const { mode } = useTheme()
  const themeColor = (type: "primary" | "accent") =>
    mode === "dark" ? darkTheme[type] : lightTheme[type]
  const { address, display, web, twitter, email, riot } = member

  const [reserved, setReserved] = useState<string>("")
  const [transferrable, setTransferrable] = useState<string>("")
  const [total, setTotal] = useState<string>("")

  useEffect(() => {
    const getBalance = async () => {
      const bal = await api.query.System.Account.getValue(address)
      if (bal?.data) {
        const { free, reserved } = bal.data

        setTransferrable(roundUp(free))
        setReserved(roundUp(reserved))
        setTotal(roundUp(free + reserved))
      }
    }
    getBalance()
    return () => {
      setTransferrable("")
      setReserved("")
      setTotal("")
    }
  }, [address])

  return member && Object.keys(member)?.length ? (
    <>
      <Polkicon
        copy
        size={72}
        address={address}
        outerColor={themeColor("primary")}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            margin: "1rem 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {display && <AccountName display={display} address={address} />}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <MemberDetails address={address} />
          </div>
        </div>
      </div>
      <div
        style={{
          margin: "2rem 0",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        {twitter && (
          <Linker
            where={`https://x.com/${twitter}`}
            icon={FaXTwitter}
            iconSize={iconSize}
          />
        )}
        {riot && (
          <Linker
            where={`https://matrix.to/#/${riot}`}
            icon={SiElement}
            iconSize={iconSize}
          />
        )}
        {<Linker where={web} icon={TbWorldWww} iconSize={iconSize} />}
        {email && (
          <Linker
            where={`mailto:${email}`}
            icon={IoMailOutline}
            iconSize={iconSize}
          />
        )}
      </div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card
            size={size}
            title="Total"
            style={{
              color: themeColor("accent"),
            }}
          >
            {!total || !lcStatus ? (
              <Skeleton.Input size="small" active block={block} />
            ) : (
              <Statistic
                prefix="≃"
                value={total}
                precision={precision}
                valueStyle={{
                  textAlign: "center",
                  fontSize: "1.6rem",
                  color: themeColor("accent"),
                }}
                suffix="DOT"
              />
            )}
          </Card>
        </Col>
        <Col span={12}>
          <Card
            size={size}
            title="Transferrable"
            style={{
              color: themeColor("accent"),
            }}
          >
            {!transferrable || !lcStatus ? (
              <Skeleton.Input size="small" active block={block} />
            ) : (
              <Statistic
                prefix="≃"
                value={transferrable}
                precision={precision}
                valueStyle={{
                  textAlign: "center",
                  fontSize: "1.4rem",
                  color: themeColor("accent"),
                }}
                suffix="DOT"
              />
            )}
          </Card>
        </Col>
        <Col span={12}>
          <Card
            size={size}
            title="Reserved"
            style={{
              color: themeColor("accent"),
            }}
          >
            {!reserved || !lcStatus ? (
              <Skeleton.Input size="small" active block={block} />
            ) : (
              <Statistic
                prefix="≃"
                value={reserved}
                precision={precision}
                valueStyle={{
                  textAlign: "center",
                  fontSize: "1.4rem",
                  color: themeColor("accent"),
                }}
                suffix="DOT"
              />
            )}
          </Card>
        </Col>
        <Col span={24}>
          <Card
            size={size}
            title="Salary"
            style={{
              color: themeColor("accent"),
            }}
          >
            <Statistic
              prefix="≃"
              value={rankInfo[member.rank].salary / 12}
              precision={precision}
              valueStyle={{
                textAlign: "center",
                fontSize: "1.4rem",
                color: themeColor("accent"),
              }}
              suffix="USDT"
            />
          </Card>
        </Col>
      </Row>
    </>
  ) : null
}
