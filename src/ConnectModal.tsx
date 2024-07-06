import { AccountProvider, ExtensionProvider } from "contexts/Connect"
import { Modal } from "antd"
import { useState } from "react"

export const ConnectModal: React.FC<{
  isOpen: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ isOpen, setOpen }) => {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null)

  console.log("selectedAccount", selectedAccount)

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
