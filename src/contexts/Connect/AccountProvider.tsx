import type { PropsWithChildren } from "react"
import React, { useState, useSyncExternalStore } from "react"
import { useSelectedExtensions } from "./extensionCtx"
import { SignerCtx } from "./signerCtx"
import type { InjectedExtension } from "polkadot-api/dist/reexports/pjs-signer"

const Accounts: React.FC<{
  extension: InjectedExtension
  setSelectedAcount: React.Dispatch<React.SetStateAction<string | null>>
  selectedAccount: string | null
}> = ({ extension, setSelectedAcount, selectedAccount }) => {
  const accounts = useSyncExternalStore(
    extension.subscribe,
    extension.getAccounts
  )

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>{extension.name}</div>
      {accounts.map((account) => (
        <button
          onClick={() =>
            setSelectedAcount(account.address + "-" + extension.name)
          }
          key={account.address}
          style={{
            color:
              account.address + "-" + extension.name === selectedAccount
                ? "red"
                : "black",
          }}
        >
          {account.name ?? account.address}
        </button>
      ))}
    </div>
  )
}

export const AccountProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [selectedAccount, setSelectedAcount] = useState<string | null>(null)
  const extensions = useSelectedExtensions()

  return (
    <>
      {extensions.map((extension) => (
        <Accounts
          key={extension.name}
          {...{ extension }}
          setSelectedAcount={setSelectedAcount}
          selectedAccount={selectedAccount}
        />
      ))}
      <SignerCtx account={selectedAccount}>{children}</SignerCtx>
    </>
  )
}
