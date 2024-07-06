import { AccountProvider, ExtensionProvider } from "contexts/Connect"
import { Modal } from "antd"
import { useState } from "react"
import type { SelectedAccountType } from "./contexts/Connect"

export const ConnectModal: React.FC<{
  isOpen: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ isOpen, setOpen }) => {
  const [selectedAccount, setSelectedAccount] =
    useState<SelectedAccountType>(null)

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
