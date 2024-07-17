import type { Dispatch, SetStateAction } from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { SelectedAccountType } from "@polkadot-ui/react"

const defaultAccountContext: AccountsContextInterface = {
  selectedAccount: null,
  setSelectedAccount: (value: SetStateAction<SelectedAccountType>): void => {
    console.log(value)
  },
}

interface AccountsContextInterface {
  selectedAccount: SelectedAccountType
  setSelectedAccount: Dispatch<SetStateAction<SelectedAccountType>>
}

export const AccountsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [selectedAccount, setSelectedAccount] = useState<SelectedAccountType>(
    {} as SelectedAccountType
  )

  useEffect(() => {
    setSelectedAccount(selectedAccount)
  }, [selectedAccount])

  return (
    <accountsCtx.Provider value={{ selectedAccount, setSelectedAccount }}>
      {children}
    </accountsCtx.Provider>
  )
}

export const accountsCtx = createContext<AccountsContextInterface>(
  defaultAccountContext
)

export const useSelAccounts = () => useContext(accountsCtx)
