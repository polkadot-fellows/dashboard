// Copyright 2024 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { createContext, useContext, useEffect, useState } from "react"
import type { APIContextInterface, APIProviderProps } from "contexts/Api/types"
import { defaultApiContext } from "./defaults"

import { createClient } from "@polkadot-api/client"

// import { getLegacyProvider } from "@polkadot-api/legacy-polkadot-provider"
// import { createScClient } from "@substrate/connect"
// import collectivesChainspec from "./collectives-polkadot"

import collectiveTypes from "../../codegen/collectives"
import polkadotTypes from "../../codegen/polkadot"
import { getChain } from "@polkadot-api/node-polkadot-provider"
import { WebSocketProvider } from "@polkadot-api/ws-provider/web"

// const scProvider = createScClient()
// const { relayChains } = getLegacyProvider(scProvider)

export const APIProvider = ({ children }: APIProviderProps) => {
  const [client, setClient] = useState<any>()
  const [pclient, setpClient] = useState<any>()

  // API instance state.
  const [api, setApi] = useState()
  const [papi, setPapi] = useState()

  useEffect(() => {
    const create = async () => {
      // const collectivesParachain =
      //   await relayChains.polkadot.getParachain(collectivesChainspec)

      // const cl = createClient(collectivesParachain.connect)
      // setClient(cl)
      try {
        const cl = createClient(
          getChain({
            provider: WebSocketProvider(
              "wss://polkadot-collectives-rpc.polkadot.io"
            ),
            keyring: [],
          })
        )
        setClient(cl)
      } catch (e) {
        console.log("=====", e)
      }
    }

    const p_create = () => {
      // const cl = createClient(relayChains.polkadot.connect)
      try {
        const cl = createClient(
          getChain({
            provider: WebSocketProvider("wss://rpc.polkadot.io"),
            keyring: [],
          })
        )
        setpClient(cl)
      } catch (e) {
        console.log("=====", e)
      }
    }

    if (!client) {
      create()
    }
    if (!pclient) {
      p_create()
    }
  }, [])

  useEffect(() => {
    setApi(client?.getTypedApi(collectiveTypes))
  }, [client])

  useEffect(() => {
    setPapi(pclient?.getTypedApi(polkadotTypes))
  }, [pclient])

  return (
    <APIContext.Provider
      value={{
        client,
        pclient,
        api,
        papi,
      }}
    >
      {children}
    </APIContext.Provider>
  )
}

export const APIContext = createContext<APIContextInterface>(defaultApiContext)

export const useApi = () => useContext(APIContext)
