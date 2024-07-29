import type { FellowshipAccountType } from "utils"
import { enrichAccount } from "utils"
import { useSelAccounts } from "contexts/Account"
import { useState, useEffect } from "react"
import { Skeleton } from "antd"
export const Account: React.FC<{ lcStatus: boolean }> = ({ lcStatus }) => {
  const { selectedAccount } = useSelAccounts()

  const [account, setAccount] = useState<FellowshipAccountType>(null)
  const [loader, setLoader] = useState<boolean>(true)

  useEffect(() => {
    const enrich = async () => {
      const enriched = await enrichAccount(selectedAccount)
      console.log(enriched)
      setAccount(enriched)
      setLoader(false)
    }
    console.log("!!!!", lcStatus, selectedAccount)
    setLoader(true)
    lcStatus && enrich()
  }, [selectedAccount, lcStatus])

  return loader ? (
    <Skeleton />
  ) : account ? (
    <>
      <h1>Account Page</h1>
      <div>{account?.address}</div>
    </>
  ) : null
}
