import type { InjectedPolkadotAccount } from "polkadot-api/dist/reexports/pjs-signer"
import type { PropsWithChildren } from "react"
import { useState, useEffect } from "react"

import { SelectedAccountCtx } from "./accountCtx"
import { useSelectedExtensions } from "./extensionCtx"

export const SignerCtx: React.FC<
  PropsWithChildren<{ account: string | null }>
> = ({ account, children }) => {
  const extensions = useSelectedExtensions()
  const [injectedPolkadotAccount, setInjectedPolkadotAccount] =
    useState<InjectedPolkadotAccount | null>(null)

  useEffect(() => {
    if (!account) {
      setInjectedPolkadotAccount(null)
      return
    }

    const separator = account.indexOf("-")
    const address = account.slice(0, separator)
    const extensionName = account.slice(separator + 1)

    setInjectedPolkadotAccount(
      extensions
        .find((x) => x.name === extensionName)
        ?.getAccounts()
        .find((account) => account.address === address) ?? null
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
