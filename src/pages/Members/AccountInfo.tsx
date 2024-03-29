import { Polkicon } from "@polkadot-ui/react"

export const AccountInfo = ({ address }: any) => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <Polkicon address={address} />
        {address}
      </div>
    </>
  )
}
