import type { DotQueries } from "@polkadot-api/descriptors"
import { api, papi } from "clients"
import { AccountId } from "polkadot-api"
import type { Binary, SS58String } from "polkadot-api"
import type { SelectedAccountType } from "@polkadot-ui/react"

let collectiveAddresses: any = []
const init = async () => {
  collectiveAddresses = await getFellowshipAddresses()
}

export const dataToString = (value: number | string | Binary | undefined) =>
  typeof value === "object" ? value.asText() : value ?? ""

export const mapRawIdentity = (
  rawIdentity?: DotQueries["Identity"]["IdentityOf"]["Value"]
) => {
  if (!rawIdentity) return rawIdentity
  const {
    info: { additional, display, email, legal, riot, twitter, web },
  } = rawIdentity[0]

  const display_id = dataToString(display.value)
  const additionalInfo = Object.fromEntries(
    additional.map(([key, { value }]) => [
      dataToString(key.value!),
      dataToString(value),
    ])
  )

  return {
    ...additionalInfo,
    display: display_id,
    web: dataToString(web.value),
    email: dataToString(email.value),
    legal: dataToString(legal.value),
    riot: dataToString(riot.value),
    twitter: dataToString(twitter.value),
  }
}

export const convertAnyToGenericSs58 = (input: string | SS58String) => {
  const codec = AccountId()
  return codec.dec(codec.enc(input as SS58String))
}

export const enrichAccount = async (
  account: any
): Promise<FellowshipAccountType> => {
  if (!collectiveAddresses) init()
  console.log("collectiveAddresses", collectiveAddresses)
  const new_account = collectiveAddresses?.filter(
    (a: any) =>
      convertAnyToGenericSs58(a.address) ===
      convertAnyToGenericSs58(account?.address)
  )

  return Object.assign({}, account, ...new_account)
}

export type FellowshipAccountType =
  | ({
      rank: number
      display?: string
      email?: string
      github?: string
      legal?: string
      riot?: string
      twitter?: string
      web?: string
    } & SelectedAccountType)
  | null

export const getFellowshipAddresses = async () => {
  return await api?.query.FellowshipCollective.Members.getEntries().then(
    (mems: any[]) =>
      papi.query.Identity?.IdentityOf?.getValues(
        mems.map((m) => m.keyArgs)
      ).then((identities: any[]) =>
        identities.map((identity, idx) => ({
          address: mems[idx].keyArgs[0],
          rank: mems[idx].value,
          ...mapRawIdentity(identity),
        }))
      )
  )
}
