import { Link } from "react-router-dom"
import MdxCode from "./index.mdx"
import { Table } from "antd"

const source = [
  {
    key: "1",
    dan: "I",
    title: "Member",
    salary: "$10,000",
  },
  {
    key: "2",
    dan: "II",
    title: "Proficient",
    salary: "$20,000",
  },
  {
    key: "3",
    dan: "III",
    title: "Fellow",
    salary: "$80,000",
  },
  {
    key: "4",
    dan: "IV",
    title: "Architect",
    salary: "$120,000",
  },
  {
    key: "5",
    dan: "V",
    title: "Architect Adept",
    salary: "$160,000",
  },
  {
    key: "6",
    dan: "VI",
    title: "Grand Architect",
    salary: "$200,000",
  },
  {
    key: "7",
    dan: "VII",
    title: "Free Master",
    salary: "$200,000",
  },
  {
    key: "8",
    dan: "VIII",
    title: "Master Constant",
    salary: "$200,000",
  },
  {
    key: "9",
    dan: "IX",
    title: "Grand Master",
    salary: "$200,000",
  },
]

const columns = [
  {
    title: "Dan",
    dataIndex: "dan",
    key: "dan",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Salary",
    dataIndex: "salary",
    key: "salary",
  },
]

export const Salary = () => {
  return (
    <>
      <div className="header">
        <h1>Salary</h1>
      </div>
      <div className="pageTop">
        <h2>Salary and Ranking</h2>

        <p>
          The Fellowship{" "}
          <Link
            to={"https://github.com/polkadot-fellows/manifesto"}
            target="_blank"
          >
            manifesto
          </Link>{" "}
          outlines the requirements and expectations for individuals to attain
          and retain any given rank, ranging between 0 to 9. By default, an
          active account on the collectives system chain has no assigned rank
          and can be inducted into the Polkadot Fellowship starting with rank 0.
          The Fellowship Manifesto states that members should receive a monthly
          allowance on par with gross income in OECD countries. A{" "}
          <Link
            to={"https://github.com/polkadot-fellows/RFCs/pull/50"}
            target="_blank"
          >
            fellowship RFC
          </Link>{" "}
          was proposed with concrete amounts for each ranked members.
        </p>
        <div style={{ width: "30rem" }}>
          <Table
            dataSource={source}
            columns={columns}
            pagination={false}
            size="small"
          />
        </div>
        <MdxCode />
      </div>
    </>
  )
}
