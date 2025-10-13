import { TypedApi, createClient } from 'polkadot-api'
// import { getSmProvider } from 'polkadot-api/sm-provider'
// import SmWorker from 'polkadot-api/smoldot/worker?worker'
// import { startFromWorker } from 'polkadot-api/smoldot/from-worker'
import { dot, collectives, people } from '@polkadot-api/descriptors'
import { getWsProvider } from 'polkadot-api/ws-provider'
import { withPolkadotSdkCompat } from 'polkadot-api/polkadot-sdk-compat'

// const smoldot = startFromWorker(
//   new SmWorker() /*, {maxLogLevel: 9,
//       logCallback: (level: number, target: string, message: string) => {
//         messages.push(`${getTickDate()} (${level})${target}\n${message}\n\n`)
//       },
//     }*/,
// )

// const dotRelayChain = import('polkadot-api/chains/polkadot').then(
//   ({ chainSpec }) => smoldot.addChain({ chainSpec }),
// )
// const collectivesParaChain = Promise.all([
//   dotRelayChain,
//   import('polkadot-api/chains/polkadot_collectives'),
// ]).then(([relayChain, { chainSpec }]) =>
//   smoldot.addChain({ chainSpec, potentialRelayChains: [relayChain] }),
// )
// const peopleParaChain = Promise.all([
//   dotRelayChain,
//   import('polkadot-api/chains/polkadot_people'),
// ]).then(([relayChain, { chainSpec }]) =>
//   smoldot.addChain({ chainSpec, potentialRelayChains: [relayChain] }),
// )

// export const polkadotClient = createClient(
//   getSmProvider(dotRelayChain),
// )
// export const collectiveClient = createClient(
//   getSmProvider(collectivesParaChain),
// )
// export const peopleClient = createClient(getSmProvider(peopleParaChain))

export const polkadotClient = createClient(
  withPolkadotSdkCompat(
    getWsProvider([
      'wss://polkadot-public-rpc.blockops.network/ws',
      'wss://polkadot-rpc.dwellir.com',
      'wss://polkadot.api.onfinality.io/public-ws',
      'wss://rpc.ibp.network/polkadot',
      'wss://polkadot.dotters.network',
      'wss://polkadot.public.curie.radiumblock.co/ws',
      'wss://rpc-polkadot.luckyfriday.io',
      'wss://dot-rpc.stakeworld.io',
    ]),
  ),
)

export const collectiveClient = createClient(
  withPolkadotSdkCompat(
    getWsProvider(['wss://polkadot-collectives-rpc.polkadot.io']),
  ),
)

export const peopleClient = createClient(
  withPolkadotSdkCompat(
    getWsProvider(['wss://polkadot-people-rpc.polkadot.io']),
  ),
)

// API stuff
export const api: TypedApi<typeof collectives> =
  collectiveClient?.getTypedApi(collectives)
export const papi: TypedApi<typeof dot> = polkadotClient?.getTypedApi(dot)
export const people_api: TypedApi<typeof people> =
  peopleClient?.getTypedApi(people)

/// WSS Stuff
// import { dot, collectives, people } from '@polkadot-api/descriptors'
// import { createClient } from 'polkadot-api'
// import { getWsProvider } from 'polkadot-api/ws-provider/web'

// export const polkadotClient = createClient(
//   getWsProvider('wss://polkadot.api.onfinality.io/public-ws'),
// )
// export const collectiveClient = createClient(
//   getWsProvider('wss://polkadot-collectives-rpc.polkadot.io'),
// )

// export const peopleClient = createClient(
//   getWsProvider('wss://polkadot-people-rpc.polkadot.io'),
// )

// export const api = collectiveClient?.getTypedApi(collectives)
// export const papi = polkadotClient?.getTypedApi(dot)
// export const people_api = peopleClient?.getTypedApi(people)
