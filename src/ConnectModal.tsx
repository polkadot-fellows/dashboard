import { AccountProvider } from "contexts/Connect/AccountProvider"
import { ExtensionProvider } from "contexts/Connect/ExtensionProvider"
import { Modal } from "antd"
import { useState } from "react"

export const ConnectModal: React.FC<{
  isOpen: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ isOpen, setOpen }) => {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null)

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
