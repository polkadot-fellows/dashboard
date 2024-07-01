import { Table } from "antd"
import MdxCode from "./index.mdx"

const dataSource2024 = [
  {
    key: "9",
    sessions: "25th June 2024",
    videos: " https://www.youtube.com/watch?v=MU7tCyhBU7g",
    minutes:
      "https://forum.polkadot.network/t/2024-06-25-technical-fellowship-opendev-call/8890",
  },
  {
    key: "8",
    sessions: "21st May 2024",
    videos: "https://www.youtube.com/watch?v=War1weBu7yU",
    minutes:
      "https://forum.polkadot.network/t/2024-05-21-technical-fellowship-opendev-call/8264",
  },
  {
    key: "7",
    sessions: "23rd April 2024",
    videos: "https://www.youtube.com/watch?v=n6U-UbX546E",
    minutes:
      "https://forum.polkadot.network/t/2024-04-23-technical-fellowship-opendev-call/7592",
  },
  {
    key: "6",
    sessions: "19th March 2024",
    videos:
      "https://www.youtube.com/watch?v=zSKiAE7fBPI&list=PLtyd7v_I7PGlDJCCCLGLjJ0yv33JAEE_-&index=1&pp=iAQB",
    minutes:
      "https://forum.polkadot.network/t/2024-03-19-technical-fellowship-opendev-call/6901",
  },
  {
    key: "5",
    sessions: "20th February 2024",
    videos:
      "https://www.youtube.com/watch?v=bqLujRSs6iY&list=PLtyd7v_I7PGlDJCCCLGLjJ0yv33JAEE_-&index=2&pp=iAQB",
    minutes:
      "https://forum.polkadot.network/t/technical-fellowship-opendev-call-2024-02-20/6355",
  },
  {
    key: "4",
    sessions: "16th January 2024",
    videos:
      "https://www.youtube.com/watch?v=itUw-ndb-Tc&list=PLtyd7v_I7PGlDJCCCLGLjJ0yv33JAEE_-&index=3&pp=iAQB",
    minutes: "N/A",
  },
]

const dataSource2023 = [
  {
    key: "3",
    sessions: "19th December 2023",
    videos:
      "https://www.youtube.com/watch?v=VjHjRicXtl0&list=PLtyd7v_I7PGlDJCCCLGLjJ0yv33JAEE_-&index=4&pp=iAQB",
    minutes:
      "https://forum.polkadot.network/t/technical-fellowship-opendev-call-2023-12-19-notes/5356",
  },
  {
    key: "2",
    sessions: "17th October 2023",
    videos:
      "https://www.youtube.com/watch?v=WJ2NUPUgWF0&list=PLtyd7v_I7PGlDJCCCLGLjJ0yv33JAEE_-&index=5&pp=iAQB",
    minutes: "N/A",
  },
  {
    key: "1",
    sessions: "17th October 2023",
    videos:
      "https://www.youtube.com/watch?v=5P6Axm4JrmQ&list=PLtyd7v_I7PGlDJCCCLGLjJ0yv33JAEE_-&index=6&pp=iAQB",
    minutes: "N/A",
  },
]

const columns = [
  {
    title: "Sessions",
    dataIndex: "sessions",
    key: "sessions",
  },
  {
    title: "Videos",
    dataIndex: "videos",
    key: "videos",
    render: (_: any, { videos, key }: any) => (
      <a href={videos} target="_blank" rel="noreferrer">
        OpenDev #{key}
      </a>
    ),
  },
  {
    title: "Meeting Minutes",
    dataIndex: "minutes",
    key: "minutes",
    render: (_: any, { minutes, key }: any) => {
      console.log("minutes", minutes)
      if (minutes === "N/A") {
        return "N/A"
      } else {
        return (
          <a href={minutes} target="_blank" rel="noreferrer">
            Meeting minutes #{key}
          </a>
        )
      }
    },
  },
]

export const OpenDevMonthlyCalls = () => {
  return (
    <>
      <div className="header">
        <h1>Monthly calls</h1>
      </div>
      <div style={{ padding: "0 2rem" }}>
        <MdxCode />
      </div>
      <div style={{ padding: "0 2rem" }}>
        <h2>2024</h2>
        <Table dataSource={dataSource2024} columns={columns} />
        <h2>2023</h2>
        <Table dataSource={dataSource2023} columns={columns} />
      </div>
    </>
  )
}
