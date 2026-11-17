import { useSyncExternalStore } from 'react'
import { polkadotClient } from '@/clients'

// Latest finalized block of the relay chain, as verified by the light client.
let finalized: number | null = null
const listeners = new Set<() => void>()
let started = false

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  if (!started) {
    started = true
    polkadotClient.finalizedBlock$.subscribe({
      next: (block) => {
        finalized = block.number
        listeners.forEach((l) => l())
      },
      error: console.error,
    })
  }
  return () => listeners.delete(listener)
}

/** `null` while the light client is still syncing */
export const useFinalizedBlock = () =>
  useSyncExternalStore(subscribe, () => finalized)
