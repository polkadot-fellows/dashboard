import type { Dispatch, PropsWithChildren, SetStateAction } from "react"
import React, { useSyncExternalStore } from "react"
import type { InjectedExtension } from "polkadot-api/pjs-signer"
import { useSelectedExtensions } from "./extensionCtx"
import { SignerCtx } from "./signerCtx"

const Accounts: React.FC<{
  extension: InjectedExtension
  setSelectedAccount: React.Dispatch<React.SetStateAction<string | null>>
  selectedAccount: string | null
}> = ({ extension, setSelectedAccount, selectedAccount }) => {
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
            setSelectedAccount(account.address + "-" + extension.name)
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

export const AccountProvider: React.FC<
  PropsWithChildren<{
    selected: string | null
    setSelected: Dispatch<SetStateAction<string | null>>
  }>
> = ({ children, selected, setSelected }) => {
  const extensions = useSelectedExtensions()

  return (
    <>
      {extensions.map((extension) => (
        <Accounts
          key={extension.name}
          {...{ extension }}
          setSelectedAccount={setSelected}
          selectedAccount={selected}
        />
      ))}
      <SignerCtx account={selected}>{children}</SignerCtx>
    </>
  )
}
