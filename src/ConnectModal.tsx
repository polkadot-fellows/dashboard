import { AccountProvider } from "contexts/Connect/AccountProvider"
import { ExtensionProvider } from "contexts/Connect/ExtensionProvider"
import { Modal } from "antd"
import { useSelectedAccount } from "contexts/Connect/accountCtx"

type ConnectModalProps = {
  isOpen: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ConnectModal = ({ isOpen, setOpen }: ConnectModalProps) => {
  const account = useSelectedAccount()

  console.log("account -> ", account)

  return (
    <Modal centered open={isOpen} onCancel={() => setOpen(false)} footer={[]}>
      <ExtensionProvider>
        <AccountProvider />
      </ExtensionProvider>
    </Modal>
  )
}
