import MdxCode from "./index.mdx"
import { RequestsGrid } from "./RequestsGrid"

type Props = {
  lcStatus: boolean
}

export const About = ({ lcStatus }: Props) => {
  return (
    <>
      <div className="header">
        <h1>About</h1>
      </div>
      <div className="pageTop">
        <MdxCode />
      </div>
      <h1>Members</h1>
      <div
        style={{
          height: "calc(100vh - 28rem)",
          overflow: "scroll",
          margin: "0 2rem",
        }}
      >
        <RequestsGrid lcStatus={lcStatus} />
      </div>
    </>
  )
}
