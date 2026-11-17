import { collectives, getMetadata, people } from '@polkadot-api/descriptors'
import { createClient, type JsonRpcProvider } from 'polkadot-api'

type LightClientChain = 'polkadot' | 'collectives' | 'people'

// Kick off the download of the light client right away, in the background.
const lightClient = import('./lightClient')

/**
 * A provider that can be handed to `createClient` synchronously while the
 * light client chunk is still loading: requests are buffered until it's ready.
 */
const lightClientProvider =
  (chain: LightClientChain): JsonRpcProvider =>
  (onMessage) => {
    type Connection = ReturnType<JsonRpcProvider>
    let connection: Connection | null = null
    let disconnected = false
    const pending: Parameters<Connection['send']>[0][] = []

    lightClient.then(
      (providers) => {
        if (disconnected) return
        connection = providers[chain](onMessage)
        pending.splice(0).forEach((message) => connection!.send(message))
      },
      (error) => console.error('Unable to load the light client', error),
    )

    return {
      send: (message) => {
        if (connection) connection.send(message)
        else pending.push(message)
      },
      disconnect: () => {
        disconnected = true
        connection?.disconnect()
      },
    }
  }

// Only used for the finalized block number shown in the footer.
export const polkadotClient = createClient(lightClientProvider('polkadot'))

// The metadata that ships with the descriptors saves the light client from
// having to download it from its peers, unless there's been a runtime upgrade.
export const collectiveClient = createClient(
  lightClientProvider('collectives'),
  { getMetadata },
)
export const peopleClient = createClient(lightClientProvider('people'), {
  getMetadata,
})

export const api = collectiveClient.getTypedApi(collectives)
export const people_api = peopleClient.getTypedApi(people)
