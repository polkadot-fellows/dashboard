import { Modal } from "antd"
import type { SelectedAccountType } from "@polkadot-ui/react"
import { ExtensionProvider, AccountProvider } from "@polkadot-ui/react"
import { useEffect, useState } from "react"
import { useSelAccounts } from "contexts/Account"
import { enrichAccount } from "utils"

export const ConnectModal: React.FC<{
  isOpen: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ isOpen, setOpen }) => {
  const { setSelectedAccount } = useSelAccounts()
  const [selAccount, setSelAccount] = useState<SelectedAccountType>(
    {} as SelectedAccountType
  )

  useEffect(() => {
    const enrich = async () => {
      const enriched = await enrichAccount(selAccount)
      setSelectedAccount(enriched)
    }

    enrich()
  }, [selAccount])

  return (
    <Modal centered open={isOpen} onCancel={() => setOpen(false)} footer={[]}>
      <ExtensionProvider setSelected={setSelAccount}>
        <AccountProvider selected={selAccount} setSelected={setSelAccount} />
      </ExtensionProvider>
    </Modal>
  )
}
