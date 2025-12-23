/* eslint-disable react-refresh/only-export-components */
import React, { useState, createContext, useContext, useEffect } from 'react'
import { api } from '@/clients'
import { SS58String } from 'polkadot-api'
import { useAccounts } from '@reactive-dot/react'
import type { WalletAccount } from '@reactive-dot/core/wallets.js'
// const LOCALSTORAGE_SELECTED_ACCOUNT_KEY = 'polkadot-fellowship.selectedAccount'

type AccountContextProps = {
  children: React.ReactNode | React.ReactNode[]
}

type ExtraInfo = {
  isMember?: boolean
  isActive?: boolean
  lastPromotion?: number
  lastProof?: number
}

type ExtraPolkadotAccount = WalletAccount & {
  membership?: ExtraInfo
}

export interface IAccountContext {
  enchancedAccount?: ExtraPolkadotAccount
  selectedAccount?: WalletAccount
  accounts: WalletAccount[]
  setSelectedAccount: (account: WalletAccount | undefined) => void
}

const AccountContext = createContext<IAccountContext | undefined>(undefined)

const AccountContextProvider = ({ children }: AccountContextProps) => {
  const accounts = useAccounts()
  const [enchancedAccount, setEnchancedAccount] = useState<
    ExtraPolkadotAccount | undefined
  >()
  const [selectedAccount, setSelectedAccount] = useState<
    WalletAccount | undefined
  >()

  useEffect(() => {
    if (!accounts.length) {
      setSelectedAccount(undefined)
      setEnchancedAccount(undefined)
      return
    }

    if (
      selectedAccount &&
      accounts.some((account) => account.address === selectedAccount.address)
    ) {
      return
    }

    setSelectedAccount(accounts[0])
  }, [accounts, selectedAccount])

  useEffect(() => {
    if (!selectedAccount?.address) {
      setEnchancedAccount(undefined)
      return
    }

    const getExtraInfo = async () => {
      const member = await api.query.FellowshipCore.Member.getValue(
        selectedAccount.address as SS58String,
      )
      const updateAccount: ExtraPolkadotAccount = {
        ...selectedAccount,
        membership: member
          ? {
              isActive: member.is_active,
              lastPromotion: member.last_promotion,
              lastProof: member.last_proof,
            }
          : undefined,
      }
      setEnchancedAccount(updateAccount)
    }

    getExtraInfo()
  }, [selectedAccount])

  // const selectAccount = useCallback(
  //   (account: InjectedPolkadotAccount | undefined) => {
  //     account?.address &&
  //       localStorage.setItem(
  //         LOCALSTORAGE_SELECTED_ACCOUNT_KEY,
  //         account?.address,
  //       )
  //     setSelectedAccount(account)
  //   },
  //   [],
  // )

  // useEffect(() => {
  //   const accountAddress = localStorage.getItem(
  //     LOCALSTORAGE_SELECTED_ACCOUNT_KEY,
  //   )

  //   if (accountAddress) {
  //     const account = accounts.find(
  //       (account) => account.address === previousAccountAddress,
  //     )
  //     !!account && selectAccount(account)
  //   } else {
  //     selectAccount(accounts[0])
  //   }
  // }, [selectAccount])

  return (
    <AccountContext.Provider
      value={{
        accounts,
        enchancedAccount,
        selectedAccount,
        setSelectedAccount,
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}

const useAccount = () => {
  const context = useContext(AccountContext)
  if (context === undefined) {
    throw new Error('useAccount must be used within a AccountContextProvider')
  }
  return context
}

export { AccountContextProvider, useAccount }
