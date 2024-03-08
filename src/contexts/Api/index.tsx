// Copyright 2024 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { createContext, useContext, useEffect, useState } from "react"
import type { APIContextInterface, APIProviderProps } from "contexts/Api/types"
import { defaultApiContext } from "./defaults"

import { createClient } from "@polkadot-api/client"

import { getLegacyProvider } from "@polkadot-api/legacy-polkadot-provider"
import { createScClient } from "@substrate/connect"
import collectivesChainspec from "./collectives-polkadot"

import collectiveTypes from "../../codegen/collectives"

export const APIProvider = ({ children }: APIProviderProps) => {
  const [client, setClient] = useState<any>()

  // API instance state.
  const [api, setApi] = useState()

  useEffect(() => {
    const create = async () => {
      const scProvider = createScClient()
      const { relayChains } = getLegacyProvider(scProvider)

      const collectivesParachain =
        await relayChains.polkadot.getParachain(collectivesChainspec)

      const cl = createClient(collectivesParachain.connect)
      setClient(cl)
    }

    if (!client) {
      create()
    }
  }, [])

  useEffect(() => {
    setApi(client?.getTypedApi(collectiveTypes))
  }, [client])

  return (
    <APIContext.Provider
      value={{
        client,
        api,
      }}
    >
      {children}
    </APIContext.Provider>
  )
}

export const APIContext = createContext<APIContextInterface>(defaultApiContext)

export const useApi = () => useContext(APIContext)
