import { ThemedLink } from '@/components/ThemedComponents'
import ReleaseProcess from './release-process.png'

export const Runtimes = () => {
  return (
    <>
      <h1 className="flex-1 shrink-0 whitespace-nowrap font-unbounded text-2xl font-semibold tracking-tight text-primary sm:grow-0">
        Runtimes
      </h1>
      <p>
        The{' '}
        <ThemedLink
          to="https://github.com/polkadot-fellows/runtimes"
          target="_blank"
        >
          Runtimes repository
        </ThemedLink>{' '}
        contains the various runtimes which make up the core subsystems of
        networks for which the Polkadot Technical Fellowship is represented. Its
        maintenance is overseen by the Fellowship, as decreed by the Polkadot
        and Kusama Governance.
      </p>
      <p>
        The approval rights for PRs are configured in a review-bot that uses the
        on-chain identity to map from a GitHub account to a Fellowship member.
        This requires that Fellowship members add their GitHub handle to their
        on-chain identity.
      </p>
      <h1 className="my-4 flex-1 shrink-0 whitespace-nowrap font-unbounded text-2xl font-semibold tracking-tight text-primary sm:grow-0">
        Runtime release process
      </h1>
      <p>
        The release process builds all runtimes and then puts them into a
        release in this github repository.{' '}
        <span className="font-bold text-primary">
          All PRs submitted for the runtime release require a CHANGELOG entry.
        </span>
      </p>
      <p>
        There are guidelines which include recommended steps for managing and
        communicating breaking changes and disruptions.
      </p>
      <h1 className="my-4 flex-1 shrink-0 whitespace-nowrap font-unbounded text-2xl font-semibold tracking-tight text-primary sm:grow-0">
        Ecosystem-wide collaboration
      </h1>
      <p>
        At times, runtime releases will contain breaking changes and/or
        temporary disruptions that have the potential to adversely affect the
        builders and service providers that operate in the Polkadot ecosystem at
        large.
      </p>
      <p>
        To improve the release process and ensure that scheduled upgrades with
        breaking changes and/or temporary disruptions do not dramatically impact
        existing teams, targeted messages are sent to Wallets, UIs and
        Explorers, DEXes, CEXes and Custodians, Parachains, Live networks, and
        various builders.
      </p>
      <ThemedLink
        to="https://docs.google.com/spreadsheets/d/1OnUzvKGM6Byy5lStVBbK7DXT93YYrkLmFElHMh8obt0/edit?usp=sharing"
        target="_blank"
      >
        Check out the working list of Ecosystem teams
      </ThemedLink>
    </>
  )
}
