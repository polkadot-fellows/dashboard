/* eslint-disable react-refresh/only-export-components */
import React, {
  useState,
  createContext,
  useContext,
  useCallback,
  useEffect,
} from 'react'
import { InjectedPolkadotAccount } from 'polkadot-api/pjs-signer'

import { useAccountLocalStorage, useConnect } from '@polkadot-ui/react'

type AccountContextProps = {
  children: React.ReactNode | React.ReactNode[]
}

export interface IAccountContext {
  selectedAccount?: InjectedPolkadotAccount
  accounts: InjectedPolkadotAccount[]
  selectAccount: (account: InjectedPolkadotAccount | undefined) => void
  setConnectedAccounts: (accounts: InjectedPolkadotAccount[]) => void
}

const AccountContext = createContext<IAccountContext | undefined>(undefined)

const AccountContextProvider = ({ children }: AccountContextProps) => {
  const [localStorageAccount, setLocalStorageAccount] = useAccountLocalStorage()

  const { connectedAccounts, connectedExtensions } = useConnect()

  const [connAccounts, setConnAccounts] =
    useState<InjectedPolkadotAccount[]>(connectedAccounts)

  useEffect(() => {
    const acc: InjectedPolkadotAccount[] = []
    for (const [, value] of connectedExtensions) {
      acc.push(...value.getAccounts())
    }
    setConnAccounts(acc)
  }, [connectedExtensions])

  const [selectedAccount, setSelected] = useState<
    InjectedPolkadotAccount | undefined
  >()

  const setConnectedAccounts = useCallback(
    (accounts: InjectedPolkadotAccount[]) => {
      setConnAccounts(accounts)
    },
    [],
  )

  const selectAccount = useCallback(
    (account: InjectedPolkadotAccount | undefined) => {
      if (!account) {
        setLocalStorageAccount('')
      }

      if (account?.address) setLocalStorageAccount(account)

      setSelected(account)
    },
    [setLocalStorageAccount],
  )

  useEffect(() => {
    if (localStorageAccount?.address && connAccounts?.length !== 0) {
      const account = connAccounts.find(
        (account) => account.address === localStorageAccount?.address,
      )

      if (account?.address) {
        selectAccount(account)
      }
    } else {
      if (connAccounts?.length === 0) {
        setLocalStorageAccount('')
        setSelected(undefined)
        selectAccount(undefined)
      } else {
        selectAccount(connAccounts[0])
      }
    }
  }, [connAccounts, localStorageAccount, selectAccount, setLocalStorageAccount])

  return (
    <AccountContext.Provider
      value={{
        accounts: connAccounts,
        selectedAccount,
        selectAccount,
        setConnectedAccounts,
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}

const useAccounts = () => {
  const context = useContext(AccountContext)
  if (context === undefined) {
    throw new Error('useAccounts must be used within a AccountContextProvider')
  }
  return context
}

export { AccountContextProvider, useAccounts }
