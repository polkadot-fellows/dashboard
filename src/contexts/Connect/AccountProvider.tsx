import type { Dispatch, PropsWithChildren, SetStateAction } from "react"
import React, { useSyncExternalStore } from "react"
import type { InjectedExtension } from "polkadot-api/pjs-signer"
import { useSelectedExtensions } from "./hooks"
import { SignerCtx } from "./signerCtx"

import { ellipsisFn } from "@polkadot-ui/utils"
import { getExtensionIcon } from "@polkadot-ui/assets/extensions"
import type { SelectedAccountType } from "./types"

const Accounts: React.FC<{
  extension: InjectedExtension
  setSelectedAccount: React.Dispatch<React.SetStateAction<SelectedAccountType>>
  selectedAccount: SelectedAccountType
}> = ({ extension, setSelectedAccount, selectedAccount }) => {
  const accounts = useSyncExternalStore(
    extension.subscribe,
    extension.getAccounts
  )

  const ExtensionIcon = getExtensionIcon(extension.name)

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {accounts.map((account) => {
        const concat = account.address
        const equalizer = concat === selectedAccount?.address

        return (
          <button
            onClick={() =>
              setSelectedAccount({
                address: account.address,
                name: account.name,
                extension: extension.name,
              })
            }
            key={account.address}
            style={{
              border: "1px solid #8A8A8A",
              borderRadius: "0.5rem",
              margin: "0.3rem",
              padding: "0.5rem",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              background: equalizer ? "#CACACA" : "",
            }}
          >
            {ExtensionIcon && (
              <div
                style={{
                  display: "flex",
                  width: "1.5rem",
                  height: "2rem",
                  marginRight: "1rem",
                }}
              >
                <ExtensionIcon />
              </div>
            )}
            <div style={{ display: "flex", width: "40%" }}>
              {account.name ?? account.address}
            </div>
            {account.name && (
              <div style={{ display: "flex", width: "30%" }}>
                {ellipsisFn(account.address)}
              </div>
            )}

            <div style={{ display: "flex", width: "15%", color: "#6A6A6A" }}>
              {equalizer ? "Selected" : ""}
            </div>
          </button>
        )
      })}
    </div>
  )
}

export const AccountProvider: React.FC<
  PropsWithChildren<{
    selected: SelectedAccountType
    setSelected: Dispatch<SetStateAction<SelectedAccountType>>
  }>
> = ({ children, selected, setSelected }) => {
  const extensions = useSelectedExtensions()

  return (
    <>
      <h4 style={{ paddingTop: "1rem" }}>Accounts</h4>
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
