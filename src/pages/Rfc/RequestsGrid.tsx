// Copyright 2023 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { useEffect, useState } from "react"
import { Grid, Card, Loader } from "@polkadot-cloud/react"
import { GithubApiUrl, GithubOwner, GithubRfc } from "consts"
import ReactMarkdown from "react-markdown"

import "./RequestsGrid.scss"
import { Link } from "react-router-dom"

export const RequestsGrid = () => {
  const [data, setData] = useState<Array<any> | undefined>()

  useEffect(() => {
    const fetchOpenPRs = async () => {
      const response = await (await fetch(`${GithubApiUrl}/pulls`)!).json()
      setData(response)
    }
    fetchOpenPRs()
  }, [])

  return (
    <>
      <Grid row style={{ marginTop: "5rem" }}>
        {!data ? (
          <Grid column sm={12} style={{ padding: "10rem" }}>
            <Loader type="cube" />
          </Grid>
        ) : data.length ? (
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
                    <h2 style={{ padding: "1rem 0" }}>
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
                      padding: "2rem 0",
                      borderTop: "0.2rem solid var(--accent-color-primary)",
                    }}
                  >
                    <Grid column md={2}>
                      <img
                        width="40"
                        style={{ borderRadius: "10rem" }}
                        src={`${d.user.avatar_url}`}
                      />
                    </Grid>
                    <Grid column md={3}>
                      <Link
                        to={d.user.html_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {d.user.login}
                      </Link>
                    </Grid>
                    <Grid column md={7} className="rfc-date">
                      {new Date(d.created_at).toDateString()}
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            )
          })
        ) : (
          "Nothing to see here"
        )}
      </Grid>
    </>
  )
}
