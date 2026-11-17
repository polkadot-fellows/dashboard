/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  connectInjectedExtension,
  getInjectedExtensions,
  type InjectedExtension,
  type InjectedPolkadotAccount,
} from 'polkadot-api/pjs-signer'
import { DappName } from '@/consts'

const WALLET_KEY = 'fellowship-wallet'
const ACCOUNT_KEY = 'fellowship-account'

const walletNames: Record<string, string> = {
  'polkadot-js': 'Polkadot.js',
  'subwallet-js': 'SubWallet',
  talisman: 'Talisman',
  'nova-wallet': 'Nova Wallet',
  'fearless-wallet': 'Fearless',
  polkagate: 'PolkaGate',
  enkrypt: 'Enkrypt',
}
export const walletName = (id: string) =>
  walletNames[id] ?? id.charAt(0).toUpperCase() + id.slice(1)

export interface IAccountContext {
  /** Id of the connected wallet extension, if any */
  wallet?: string
  connecting: boolean
  accounts: InjectedPolkadotAccount[]
  selectedAccount?: InjectedPolkadotAccount
  selectAccount: (address: string) => void
  getWallets: () => string[]
  connect: (wallet: string) => Promise<void>
  disconnect: () => void
}

const AccountContext = createContext<IAccountContext | undefined>(undefined)

const AccountContextProvider = ({ children }: PropsWithChildren) => {
  const [extension, setExtension] = useState<InjectedExtension>()
  const [connecting, setConnecting] = useState(false)
  const [accounts, setAccounts] = useState<InjectedPolkadotAccount[]>([])
  const [selectedAddress, setSelectedAddress] = useState(() =>
    localStorage.getItem(ACCOUNT_KEY),
  )

  const connect = useCallback(async (wallet: string) => {
    setConnecting(true)
    try {
      const connected = await connectInjectedExtension(wallet, DappName)
      localStorage.setItem(WALLET_KEY, wallet)
      setExtension((previous) => {
        previous?.disconnect()
        return connected
      })
    } finally {
      setConnecting(false)
    }
  }, [])

  const disconnect = useCallback(() => {
    localStorage.removeItem(WALLET_KEY)
    setExtension((previous) => {
      previous?.disconnect()
      return undefined
    })
  }, [])

  const selectAccount = useCallback((address: string) => {
    localStorage.setItem(ACCOUNT_KEY, address)
    setSelectedAddress(address)
  }, [])

  // Reconnect to the wallet that was used on the previous visit
  useEffect(() => {
    const wallet = localStorage.getItem(WALLET_KEY)
    if (!wallet) return
    // Extensions may take a moment to inject themselves into the page
    const timeout = setTimeout(() => {
      if (getInjectedExtensions().includes(wallet))
        connect(wallet).catch(console.error)
    }, 500)
    return () => clearTimeout(timeout)
  }, [connect])

  useEffect(() => {
    if (!extension) {
      setAccounts([])
      return
    }
    setAccounts(extension.getAccounts())
    return extension.subscribe(setAccounts)
  }, [extension])

  const selectedAccount =
    accounts.find((account) => account.address === selectedAddress) ??
    accounts[0]

  return (
    <AccountContext.Provider
      value={{
        wallet: extension?.name,
        connecting,
        accounts,
        selectedAccount,
        selectAccount,
        getWallets: getInjectedExtensions,
        connect,
        disconnect,
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
