// Copyright 2017-2023 @polkadot/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveAccountInfo } from "@polkadot/api-derive/types"
import type {
  AccountId,
  AccountIndex,
  Address,
} from "@polkadot/types/interfaces"
import { ApiPromise, WsProvider } from "@polkadot/api"

import { useCall } from "./useCall"
import { useEffect, useState } from "react"
import type { ApiStatus } from "contexts/Api/types"

import { useEffectIgnoreInitial } from "@polkadot-ui/react/hooks"

export const useDeriveAccountInfo = (
  value?: AccountId | AccountIndex | Address | Uint8Array | string | null
): DeriveAccountInfo | undefined => {
  const [api, setApi] = useState<ApiPromise | null>(null)
  const [provider, setProvider] = useState<WsProvider | null>(null)
  const [, setApiStatus] = useState<ApiStatus>("disconnected")

  const getChainState = async () => {
    if (!provider) return

    // initiate new api and set connected.
    const newApi = await ApiPromise.create({ provider })

    // store active network in localStorage.
    // NOTE: this should ideally refer to above `chain` value.
    localStorage.setItem("network", "polkadot")

    // Assume chain state is correct and bootstrap network consts.
    setApi(newApi)
  }

  // Connect function sets provider and updates active network.
  const connectProvider = () => {
    const newProvider = new WsProvider("wss://rpc.polkadot.io")
    setProvider(newProvider)
  }

  // Handle an initial RPC connection.
  useEffect(() => {
    if (!provider) {
      connectProvider()
    }
  })

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

  return useCall<DeriveAccountInfo>(api?.derive.accounts.info, [value])
}
