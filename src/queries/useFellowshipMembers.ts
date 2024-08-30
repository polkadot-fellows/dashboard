import { api, people_api } from '@/clients'
import { PeopleQueries } from '@polkadot-api/descriptors'
import { useQuery } from '@tanstack/react-query'
import { Binary } from 'polkadot-api'

export type FellowshipMember = {
  address: string
  rank: number
  display?: string
  github?: string
  legal?: string
  matrix?: string
  email?: string
  twitter?: string
  web?: string
}

const dataToString = (value: number | string | Binary | undefined) =>
  typeof value === 'object' ? value.asText() : (value ?? '')

const mapRawIdentity = (
  rawIdentity?: PeopleQueries['Identity']['IdentityOf']['Value'],
) => {
  if (!rawIdentity) return rawIdentity
  const {
    info: { display, email, legal, matrix, twitter, web },
  } = rawIdentity[0]

  const display_id = dataToString(display.value)

  return {
    display: display_id,
    web: dataToString(web.value),
    email: dataToString(email.value),
    legal: dataToString(legal.value),
    matrix: dataToString(matrix.value),
    twitter: dataToString(twitter.value),
  }
}

export function useFellowshipMembers(lcStatus: boolean) {
  return useQuery({
    queryKey: ['fellowship-members'],
    enabled: api !== null && people_api !== null && lcStatus,
    staleTime: 2000,
    queryFn: async () => {
      const memberEntries =
        await api?.query.FellowshipCollective.Members.getEntries()

      const identityEntries =
        await people_api.query.Identity.IdentityOf.getValues(
          memberEntries.map((m) => m.keyArgs),
        )

      const members = memberEntries.map((member, idx) => ({
        address: member.keyArgs[0],
        rank: member.value,
        ...mapRawIdentity(identityEntries[idx]),
      }))

      const sortedMembers = members.sort((a, b) => (a.rank > b.rank ? -1 : 1))

      return sortedMembers as FellowshipMember[]
    },
  })
}
