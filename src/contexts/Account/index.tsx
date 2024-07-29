import type { Dispatch, SetStateAction } from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { enrichAccount, type FellowshipAccountType } from "utils"

const defaultAccountContext: AccountsContextInterface = {
  selectedAccount: null,
  setSelectedAccount: (value: SetStateAction<FellowshipAccountType>): void => {
    console.log(value)
  },
}

interface AccountsContextInterface {
  selectedAccount: FellowshipAccountType
  setSelectedAccount: Dispatch<SetStateAction<FellowshipAccountType>>
}

export const AccountsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [selectedAccount, setSelectedAccount] = useState<FellowshipAccountType>(
    {} as FellowshipAccountType
  )

  useEffect(() => {
    const enrich = async () => {
      const enriched = await enrichAccount(selectedAccount)
      console.log("enriched", enriched)
      // setSelectedAccount(enriched)
    }
    console.log(selectedAccount)
    enrich()
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
