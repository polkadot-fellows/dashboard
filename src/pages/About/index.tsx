import { Button } from "antd"
import MdxCode from "./index.mdx"
import { RequestsGrid } from "./RequestsGrid"

type Props = {
  lcStatus: boolean
}

const openInNewTab = (url: string | URL | undefined) => {
  window.open(url, "_blank", "noopener,noreferrer")
}

export const About = ({ lcStatus }: Props) => {
  return (
    <>
      <div className="header">
        <h1>About</h1>
      </div>
      <div className="pageTop">
        <MdxCode />
        <Button
          onClick={() =>
            openInNewTab(
              "https://github.com/polkadot-fellows/manifesto/blob/0c3df46d76625980b8b48742cb86f4d8fa6dda8d/manifesto.pdf"
            )
          }
        >
          Read through the Fellowship Manifesto
        </Button>
      </div>
      <h1>Members</h1>
      <div className="pageTop">
        List of members and candidates currently inducted in the Fellowship
        Collective.
      </div>
      <div style={{ paddingTop: "2rem" }}>
        <RequestsGrid lcStatus={lcStatus} />
      </div>
    </>
  )
}
