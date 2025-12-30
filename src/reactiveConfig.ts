import { collectives, dot } from '@polkadot-api/descriptors'
import { defineConfig } from '@reactive-dot/core'
import { createLightClientProvider } from '@reactive-dot/core/providers/light-client.js'
import { InjectedWalletProvider } from '@reactive-dot/core/wallets.js'
import { registerDotConnect } from 'dot-connect'

const lightClientProvider = createLightClientProvider()
const polkadotRelay = lightClientProvider.addRelayChain({ id: 'polkadot' })

const config = defineConfig({
  chains: {
    polkadot: {
      descriptor: dot,
      provider: polkadotRelay,
    },
    collectives: {
      descriptor: collectives,
      provider: polkadotRelay.addParachain({ id: 'polkadot_collectives' }),
    },
  },
  wallets: [new InjectedWalletProvider()],
})

declare module '@reactive-dot/core' {
  export interface Register {
    config: typeof config
  }
}

registerDotConnect(config)

export const reactiveConfig = config
