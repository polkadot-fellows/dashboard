import { dot, collectives, people } from '@polkadot-api/descriptors'
import { createClient } from 'polkadot-api'
import { WebSocketProvider } from 'polkadot-api/ws-provider/web'

export const polkadotClient = createClient(
  WebSocketProvider('wss://polkadot.api.onfinality.io/public-ws'),
)
export const collectiveClient = createClient(
  WebSocketProvider('wss://polkadot-collectives-rpc.polkadot.io'),
)

export const peopleClient = createClient(
  WebSocketProvider('wss://polkadot-people-rpc.polkadot.io'),
)

export const api = collectiveClient?.getTypedApi(collectives)
export const papi = polkadotClient?.getTypedApi(dot)
export const people_api = peopleClient?.getTypedApi(people)
