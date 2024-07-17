import type { FellowshipAccountType } from "utils"
import { enrichAccount } from "utils"
import { useSelAccounts } from "contexts/Account"
import { useState, useEffect } from "react"

export const Account = () => {
  const { selectedAccount } = useSelAccounts()

  const [account, setAccount] = useState<FellowshipAccountType>(null)

  useEffect(() => {
    const enrich = async () => {
      const enriched = await enrichAccount(selectedAccount)
      console.log(enriched)
      setAccount(enriched)
    }

    enrich()
  }, [selectedAccount])

  return account ? (
    <>
      <h1>Account Page</h1>
      <div>account?.address</div>
    </>
  ) : null
}
