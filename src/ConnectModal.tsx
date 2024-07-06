import { AccountProvider } from "contexts/Connect/AccountProvider"
import { ExtensionProvider } from "contexts/Connect/ExtensionProvider"
import { Modal } from "antd"
import { useState } from "react"
type ConnectModalProps = {
  isOpen: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ConnectModal = ({ isOpen, setOpen }: ConnectModalProps) => {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null)

  console.log("Modal selectedAccount ", selectedAccount)

  return (
    <Modal centered open={isOpen} onCancel={() => setOpen(false)} footer={[]}>
      <ExtensionProvider>
        <AccountProvider
          selected={selectedAccount}
          setSelected={setSelectedAccount}
        />
      </ExtensionProvider>
    </Modal>
  )
}
