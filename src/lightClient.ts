// Everything in this module (smoldot, the sm-provider and the chain specs) is
// loaded through a dynamic import from `clients.ts`, so that the light client
// stays out of the main chunk and boots in the background.
import { getSmProvider } from 'polkadot-api/sm-provider'
import { startFromWorker } from 'polkadot-api/smoldot/from-worker'
import SmWorker from 'polkadot-api/smoldot/worker?worker'

const smoldot = startFromWorker(new SmWorker())

// `getSmProvider` must receive a function that adds the chain on every call:
// smoldot can destroy chains and the provider recovers by calling it again.
// Adding the same chain spec more than once is safe, smoldot de-duplicates it.
const addRelayChain = () =>
  import('polkadot-api/chains/polkadot').then(({ chainSpec }) =>
    smoldot.addChain({ chainSpec }),
  )

const addParachain = (spec: Promise<{ chainSpec: string }>) =>
  Promise.all([addRelayChain(), spec]).then(([relayChain, { chainSpec }]) =>
    smoldot.addChain({ chainSpec, potentialRelayChains: [relayChain] }),
  )

export const polkadot = getSmProvider(addRelayChain)
export const collectives = getSmProvider(() =>
  addParachain(import('polkadot-api/chains/polkadot_collectives')),
)
export const people = getSmProvider(() =>
  addParachain(import('polkadot-api/chains/polkadot_people')),
)
