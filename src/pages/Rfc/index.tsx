import { RequestsGrid } from "./RequestsGrid"
import "../../App.css"

export const Rfc = () => {
  return (
    <>
      <h1>Polkadot Fellowship - RFCs</h1>
      <div style={{ padding: "2rem" }}>
        <RequestsGrid />
      </div>
    </>
  )
}
