import { useSyncExternalStore } from 'react'
import { Binary } from 'polkadot-api'
import type { IdentityData, PeopleQueries } from '@polkadot-api/descriptors'
import { api, people_api } from '@/clients'

export type Member = {
  address: string
  rank: number
  /** `false` when the member has declared themselves as passive */
  isActive?: boolean
  /** On-chain identity */
  display?: string
  /** Whether a registrar has given a positive judgement to the identity */
  verified?: boolean
  legal?: string
  web?: string
  email?: string
  matrix?: string
  twitter?: string
  github?: string
}

type MembersState = {
  members: Member[]
  /**
   * - `loading`: nothing to show yet, the light client is still syncing
   * - `cached`: showing the members of the previous visit while syncing
   * - `live`: showing the members as they currently are on-chain
   */
  status: 'loading' | 'cached' | 'live' | 'error'
}

type Identity = PeopleQueries['Identity']['IdentityOf']['Value']

const CACHE_KEY = 'fellowship-members-v2'

const dataToString = (data: IdentityData): string | undefined => {
  if (data.type === 'Raw1') return String.fromCharCode(data.value)
  if (data.type.startsWith('Raw') && typeof data.value === 'string')
    return Binary.toText(Binary.fromHex(data.value)).trim() || undefined
  return undefined
}

const mapIdentity = (identity: Identity, subName?: string) => {
  const { info, judgements } = identity
  const display = dataToString(info.display)
  return {
    display: subName && display ? `${display} / ${subName}` : display,
    verified: judgements.some(
      ([, { type }]) => type === 'Reasonable' || type === 'KnownGood',
    ),
    legal: dataToString(info.legal),
    web: dataToString(info.web),
    email: dataToString(info.email),
    matrix: dataToString(info.matrix),
    twitter: dataToString(info.twitter),
    github: dataToString(info.github),
  }
}

const fetchMembers = async (): Promise<Member[]> => {
  const [ranks, statuses] = await Promise.all([
    api.query.FellowshipCollective.Members.getEntries(),
    api.query.FellowshipCore.Member.getEntries(),
  ])
  const activity = new Map(
    statuses.map(({ keyArgs: [address], value }) => [address, value.is_active]),
  )
  const addresses = ranks.map(({ keyArgs: [address] }) => address)

  const { IdentityOf, SuperOf } = people_api.query.Identity
  const identities = await IdentityOf.getValues(addresses.map((a) => [a]))

  // Accounts without an identity of their own may be a sub-account of one
  const orphans = addresses.filter((_, idx) => !identities[idx])
  const supers = await SuperOf.getValues(orphans.map((a) => [a]))
  const parents = await IdentityOf.getValues(
    supers.map((sup) => [sup?.[0] ?? orphans[0]]),
  )
  const subIdentities = new Map(
    orphans.flatMap((address, idx) => {
      const sup = supers[idx]
      const parent = parents[idx]
      return sup && parent
        ? [[address, mapIdentity(parent, dataToString(sup[1]))] as const]
        : []
    }),
  )

  return ranks
    .map(({ keyArgs: [address], value: rank }, idx) => ({
      address,
      rank,
      isActive: activity.get(address),
      ...(identities[idx]
        ? mapIdentity(identities[idx])
        : subIdentities.get(address)),
    }))
    .sort(
      (a, b) =>
        b.rank - a.rank ||
        (a.display ?? '~').localeCompare(b.display ?? '~') ||
        a.address.localeCompare(b.address),
    )
}

const readCache = (): Member[] => {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) ?? '[]')
    return Array.isArray(cached) ? cached : []
  } catch {
    return []
  }
}

const cached = readCache()
let state: MembersState = {
  members: cached,
  status: cached.length ? 'cached' : 'loading',
}
const listeners = new Set<() => void>()
const setState = (next: MembersState) => {
  state = next
  listeners.forEach((listener) => listener())
}

let started = false
const start = () => {
  if (started) return
  started = true
  fetchMembers().then(
    (members) => {
      localStorage.setItem(CACHE_KEY, JSON.stringify(members))
      setState({ members, status: 'live' })
    },
    (error) => {
      console.error('Unable to load the Fellowship members', error)
      setState({ ...state, status: state.members.length ? 'cached' : 'error' })
    },
  )
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  start()
  return () => listeners.delete(listener)
}

export const useMembers = () => useSyncExternalStore(subscribe, () => state)
