import { RequestsGrid } from "./RequestsGrid"

export const Rfc = () => {
  return (
    <>
      <div className="header">
        <h1>Polkadot Fellowship - RFCs</h1>
      </div>
      <div style={{ padding: "2rem" }}>
        <RequestsGrid />
      </div>
    </>
  )
}
