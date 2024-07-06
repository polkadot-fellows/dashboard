import type { InjectedPolkadotAccount } from "polkadot-api/pjs-signer"
import type { PropsWithChildren } from "react"
import { useState, useEffect } from "react"

import { SelectedAccountCtx } from "./accountCtx"
import { useSelectedExtensions } from "./hooks"
import type { SelectedAccountType } from "./types"

export const SignerCtx: React.FC<
  PropsWithChildren<{ account: SelectedAccountType }>
> = ({ account, children }) => {
  const extensions = useSelectedExtensions()
  const [injectedPolkadotAccount, setInjectedPolkadotAccount] =
    useState<InjectedPolkadotAccount | null>(null)

  useEffect(() => {
    if (!account) {
      setInjectedPolkadotAccount(null)
      return
    }

    const address = account.address
    const extensionName = account.extension

    setInjectedPolkadotAccount(
      extensions
        .find((x) => x.name === extensionName)
        ?.getAccounts()
        .find((acc) => acc.address === address) ?? null
    )
  }, [extensions, account])

  return (
    injectedPolkadotAccount && (
      <SelectedAccountCtx.Provider value={injectedPolkadotAccount}>
        {children}
      </SelectedAccountCtx.Provider>
    )
  )
}
