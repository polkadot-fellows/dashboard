import { Polkicon } from "@polkadot-ui/react"
import { AccountName } from "./AccountName"
import { ellipsisFn } from "@polkadot-ui/utils"
import { darkTheme, lightTheme } from "consts"
import { useTheme } from "../../contexts/Themes"
import type { AccountInfoIF } from "./RequestsGrid"
import copy from "copy-to-clipboard"

import { IoCopyOutline, IoMailOutline } from "react-icons/io5"
import { FaXTwitter } from "react-icons/fa6"
import { TbWorldWww } from "react-icons/tb"
import { Linker } from "./Linker"
import { SiElement } from "react-icons/si"

// import { Card, Col, Row, Statistic } from "antd"
// import { papi } from "../../clients"
// import { useEffect } from "react"

type MemberDrawerProps = {
  member: AccountInfoIF
}

type MemberDetailsProps = {
  address: string
}

const iconSize = 24

const MemberDetails = ({ address }: MemberDetailsProps) => (
  <>
    <div>{ellipsisFn(address, 6)}</div>
    <IoCopyOutline
      style={{ marginLeft: "0.75rem", cursor: "pointer" }}
      onClick={() => copy(address)}
    />
  </>
)

export const MemberDrawer = ({ member }: MemberDrawerProps) => {
  const { mode } = useTheme()
  const { address, display, web, twitter, email, riot } = member

  // const [balance, setBalance] = useState()

  // useEffect(() => {
  //   const getBalance = async () => {
  //     const bal = await papi.query.System.Account.getValue(address)
  //     console.log("balance?", bal?.data)
  //   }
  //   console.log("address", address)

  //   getBalance()
  // }, [address])

  return member && Object.keys(member)?.length ? (
    <>
      <Polkicon
        copy
        size={72}
        address={address}
        outerColor={
          mode === "dark" ? darkTheme.invert : lightTheme.colorFillAlter
        }
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {display ? (
          <div
            style={{
              margin: "1rem 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <AccountName display={display} address={address} />
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
        ) : (
          <MemberDetails address={address} />
        )}
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
      {/* <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic
              title="Active Salary"
              value={11.28}
              precision={2}
              valueStyle={{
                color: mode === "dark" ? darkTheme.accent : lightTheme.accent,
              }}
              suffix="DOT"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="Passive Salary"
              value={9.3}
              precision={2}
              valueStyle={{
                color: mode === "dark" ? darkTheme.accent : lightTheme.accent,
              }}
              suffix="DOT"
            />
          </Card>
        </Col>
      </Row> */}
    </>
  ) : null
}
