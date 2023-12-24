// Copyright 2023 @polkadot-fellows/dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { ApiPromise, WsProvider } from "@polkadot/api"
import { createContext, useContext, useEffect, useState } from "react"
import type {
  APIContextInterface,
  APIProviderProps,
  ApiStatus,
} from "contexts/Api/types"
import { useEffectIgnoreInitial } from "@polkadot-cloud/react/hooks"
import { defaultApiContext } from "./defaults"

export const APIProvider = ({ children, network }: APIProviderProps) => {
  // Store povider instance.
  const [provider, setProvider] = useState<WsProvider | null>(null)

  // API instance state.
  const [api, setApi] = useState<ApiPromise | null>(null)

  // Store API connection status.
  const [apiStatus, setApiStatus] = useState<ApiStatus>("disconnected")

  // Fetch chain state. Called once `provider` has been initialised.
  const getChainState = async () => {
    if (!provider) return

    // initiate new api and set connected.
    const newApi = await ApiPromise.create({ provider })

    // set connected here in case event listeners have not yet initialised.
    setApiStatus("connected")

    // store active network in localStorage.
    // NOTE: this should ideally refer to above `chain` value.
    localStorage.setItem("network", String(network))

    // Assume chain state is correct and bootstrap network consts.
    setApi(newApi)
  }

  // Connect function sets provider and updates active network.
  const connectProvider = () => {
    const newProvider = new WsProvider(
      // "wss://polkadot-collectives-rpc.polkadot.io"
      "wss://polkadot-collectives-rpc.dwellir.com"
    )
    setProvider(newProvider)
  }

  // Handle an initial RPC connection.
  useEffect(() => {
    if (!provider) {
      connectProvider()
    }
  })

  // Initialise provider event handlers when provider is set.
  useEffectIgnoreInitial(() => {
    if (provider) {
      provider.on("connected", () => {
        setApiStatus("connected")
      })
      provider.on("error", () => {
        setApiStatus("disconnected")
      })
      getChainState()
    }
  }, [provider])

  return (
    <APIContext.Provider
      value={{
        api,
        apiStatus,
        isReady: apiStatus === "connected" && api !== null,
      }}
    >
      {children}
    </APIContext.Provider>
  )
}

export const APIContext = createContext<APIContextInterface>(defaultApiContext)

export const useApi = () => useContext(APIContext)
