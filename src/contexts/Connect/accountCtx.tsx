import type { InjectedPolkadotAccount } from "polkadot-api/pjs-signer"
import { createContext } from "react"

export const SelectedAccountCtx = createContext<InjectedPolkadotAccount | null>(
  null
)
