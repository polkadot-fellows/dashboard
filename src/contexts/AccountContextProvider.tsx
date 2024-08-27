/* eslint-disable react-refresh/only-export-components */
import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  // useCallback,
  // useEffect,
} from 'react'
import { InjectedPolkadotAccount } from 'polkadot-api/pjs-signer'
import { api } from '@/clients'
import { SS58String } from 'polkadot-api'
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

type ExtraPolkadotAccount = InjectedPolkadotAccount & {
  membership: ExtraInfo
}

export interface IAccountContext {
  enchancedAccount?: ExtraPolkadotAccount
  selectedAccount?: InjectedPolkadotAccount
  setSelectedAccount: (account: InjectedPolkadotAccount | undefined) => void
}

const AccountContext = createContext<IAccountContext | undefined>(undefined)

const AccountContextProvider = ({ children }: AccountContextProps) => {
  const [enchancedAccount, setEnchancedAccount] = useState<
    ExtraPolkadotAccount | undefined
  >()
  const [selectedAccount, setSelectedAccount] = useState<
    InjectedPolkadotAccount | undefined
  >()

  useEffect(() => {
    const getExtraInfo = async () => {
      let updateAccount: ExtraPolkadotAccount = {} as ExtraPolkadotAccount
      const member = await api.query.FellowshipCore.Member.getValue(
        selectedAccount?.address as SS58String,
      )
      updateAccount = {
        ...selectedAccount,
        membership: member
          ? {
              isActive: member?.is_active,
              lastPromotion: member?.last_promotion,
              lastProof: member?.last_proof,
            }
          : undefined,
      } as ExtraPolkadotAccount
      setEnchancedAccount(updateAccount)
    }
    selectedAccount?.address && getExtraInfo()
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
