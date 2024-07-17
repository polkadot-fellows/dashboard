import { Modal } from "antd"
import { ExtensionProvider, AccountProvider } from "@polkadot-ui/react"
import { useSelAccounts } from "contexts/Account"

export const ConnectModal: React.FC<{
  isOpen: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ isOpen, setOpen }) => {
  const { selectedAccount, setSelectedAccount } = useSelAccounts()

  return (
    <Modal centered open={isOpen} onCancel={() => setOpen(false)} footer={[]}>
      <ExtensionProvider setSelected={setSelectedAccount}>
        <AccountProvider
          selected={selectedAccount}
          setSelected={setSelectedAccount}
        />
      </ExtensionProvider>
    </Modal>
  )
}
