import { useEffect, useState } from "react"
import { Grid, Card } from "@polkadot-ui/react"
import { RevolvingDot } from "react-loader-spinner"
import { GithubApiUrl, GithubOwner, GithubRfc } from "consts"
import ReactMarkdown from "react-markdown"
import MdxCode from "./index.mdx"

import "./RequestsGrid.scss"
import { Link } from "react-router-dom"

export const RequestsGrid = () => {
  const [data, setData] = useState<Array<any> | undefined>()
  // const [rfcText, setRfcText] = useState<Array<any> | undefined>()

  useEffect(() => {
    const fetchOpenPRs = async () => {
      const response = await (await fetch(`${GithubApiUrl}/pulls`)!).json()
      setData(response)
    }
    fetchOpenPRs()
  }, [])

  return (
    <>
      <MdxCode />
      <h1>Open RFCs</h1>
      <Grid row>
        {data ? (
          data.length ? (
            data!.map((d: any, i: number) => {
              return (
                <Grid
                  key={"index" + i}
                  column
                  lg={4}
                  md={6}
                  sm={12}
                  style={{ padding: "1rem" }}
                >
                  <Card style={{ padding: "1rem" }}>
                    <Grid row alignItems="center">
                      <h2
                        style={{
                          padding: "1rem 0",
                          position: "relative",
                          top: 0,
                        }}
                      >
                        <Link
                          to={`https://www.github.com/${GithubOwner}/${GithubRfc}/pull/${d.number}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          #{d.number} - {d.title}
                        </Link>
                      </h2>

                      <div className="rfc-content">
                        <ReactMarkdown>{d.body}</ReactMarkdown>
                      </div>
                    </Grid>
                    <Grid
                      row
                      alignItems="center"
                      style={{
                        padding: "1rem 0",
                        borderTop: "0.2rem solid var(--accent-color-primary)",
                      }}
                    >
                      <Grid column md={3} style={{ paddingRight: "1rem" }}>
                        <img
                          width="40"
                          style={{ borderRadius: "10rem", width: "4rem" }}
                          src={`${d.user.avatar_url}`}
                        />
                      </Grid>
                      <Grid column md={6}>
                        <Link
                          to={d.user.html_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {d.user.login}
                        </Link>
                      </Grid>
                      <Grid column md={3}>
                        <p className="rfc-date">
                          {new Date(d.created_at).toDateString()}
                        </p>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              )
            })
          ) : (
            "Nothing to see here"
          )
        ) : (
          <Grid
            column
            sm={12}
            style={{ justifyItems: "cemter", display: "flex" }}
          >
            <RevolvingDot
              visible={true}
              height="80"
              width="80"
              color="#E6007A"
              ariaLabel="revolving-dot-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </Grid>
        )}
      </Grid>
    </>
  )
}
