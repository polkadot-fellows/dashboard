import { RequestsGrid } from "./RequestsGrid"

export const Members = () => {
  return (
    <>
      <div className="header">
        <h1>Polkadot Fellowship - Members</h1>
      </div>
      <div style={{ padding: "0 2rem" }}>
        <RequestsGrid />
      </div>
    </>
  )
}
