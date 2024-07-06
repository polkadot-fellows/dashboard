import type { InjectedExtension } from "polkadot-api/pjs-signer"
import { createContext } from "react"

export const extensionCtx = createContext<InjectedExtension[]>([])
