import { createClient } from 'polkadot-api'
import { getSmProvider } from 'polkadot-api/sm-provider'
import SmWorker from 'polkadot-api/smoldot/worker?worker'
import { startFromWorker } from 'polkadot-api/smoldot/from-worker'
import { dot, collectives } from '@polkadot-api/descriptors'

const smoldot = startFromWorker(
  new SmWorker() /*, {maxLogLevel: 9,
      logCallback: (level: number, target: string, message: string) => {
        messages.push(`${getTickDate()} (${level})${target}\n${message}\n\n`)
      },
    }*/,
)

const dotRelayChain = import('polkadot-api/chains/polkadot').then(
  ({ chainSpec }) => smoldot.addChain({ chainSpec }),
)

const smoldotParaChain = Promise.all([
  dotRelayChain,
  import('polkadot-api/chains/polkadot_collectives'),
]).then(([relayChain, { chainSpec }]) =>
  smoldot.addChain({ chainSpec, potentialRelayChains: [relayChain] }),
)

export const polkadotClient = createClient(getSmProvider(dotRelayChain))
export const collectiveClient = createClient(getSmProvider(smoldotParaChain))

// API stuff
export const api = collectiveClient?.getTypedApi(collectives)
export const papi = polkadotClient?.getTypedApi(dot)
