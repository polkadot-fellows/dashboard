// Copyright 2023 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { useEffect } from "react"
import { Grid } from "@polkadot-cloud/react"

import "./RequestsGrid.scss"

export const RequestsGrid = () => {
  useEffect(() => {
    const fetchOpenPRs = async () => {
      // const response = await (await fetch(`${GithubApiUrl}/pulls`)!).json()
      // setData(response)
    }
    fetchOpenPRs()
  }, [])

  return (
    <>
      <Grid row style={{ marginTop: "5rem" }}>
        Nothing to see here
      </Grid>
    </>
  )
}
