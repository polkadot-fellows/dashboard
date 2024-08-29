import { ThemedLink } from '@/components/ThemedComponents'

export const RFCText = () => {
  return (
    <>
      <ThemedLink
        target="_blank"
        className="text-primary font-bold"
        to="https://github.com/polkadot-fellows/RFCs/"
      >
        RFCs repository
      </ThemedLink>{' '}
      contains a number of Requests for Comment (RFCs) detailing proposed
      changes to the technical implementation of the Polkadot network. These
      RFCs are for the discussion and design of features which have been
      submitted for consideration to the developer Fellowship of Polkadot, as
      well as targets for the Fellowship's on-chain bodies to signal approval or
      disapproval of.
      <h1 className="my-4 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        Scope
      </h1>
      <p>
        According to the{' '}
        <ThemedLink
          target="_blank"
          to="https://github.com/polkadot-fellows/manifesto/blob/0c3df46d76625980b8b48742cb86f4d8fa6dda8d/manifesto.pdf"
        >
          Fellowship Manifesto
        </ThemedLink>
        , members of the Polkadot Fellowship are responsible for expertise in
        the strict description(s) and/or implementation(s) of these areas of
        contribution:
        <ul>
          <li>
            - the internals of all functional Polkadot node implementations;
          </li>
          <li>
            - cryptographic data-structures, algorithms, languages and APIs
            required for the continued upkeep of the Polkadot (Main) Network;
          </li>
          <li>
            - consensus algorithms concerning the Relay-chain (BABE \& GRANDPA);
          </li>
          <li>
            - trust-free bridges relying on said consensus algorithms (planned
            to be) utilised by system chains;
          </li>
          <li>- parachain consensus;</li>
          <li>- cross-chain message passing (XCMP, HRMP, DMP \& UMP);</li>
          <li>- the Polkadot libp2p-based peer networking protocol;</li>
          <li>- the Polkadot topology strategies;</li>
          <li>- chain synchronisation strategies utilised by Polkadot;</li>
          <li>- the Polkadot business-logic (aka the 'runtime');</li>
          <li>
            - pallets utilised by the Polkadot (Main) Network and its system
            chains;
          </li>
          <li>- the internals of the frame pallet framework;</li>
          <li>- runtime and host APIs;</li>
          <li>- the XCM specification and realisation;</li>
          <li>- standard RPCs;</li>
          <li>
            - user-interface code required to practically execute upgrades to
            the Polkadot (Main) Network; and
          </li>
          <li>
            - code or technology required by, and utilised primarily for, any
            code or technology already included.
          </li>
        </ul>
      </p>
      <p>
        These RFCs are scoped to the subset of these concerns which must be held
        consistent across all implementations. Various implementation details,
        such as internal node algorithms, programming languages, or database
        formats are out of scope. Non-exhaustively, changes to network protocol
        descriptions, runtime logic and runtime public interfaces, inherents,
        transaction formats should be discussed via RFCs.
      </p>
      <h1 className="my-4 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        Significance
      </h1>
      <p>
        These RFCs are in practice only a signaling mechanism to determine and
        indicate the Fellowship's design and architecture preferences and to
        coordinate discussion and social consensus on architectures and designs
        according to open-source principles.
      </p>
      <p>
        The Fellowship holds only the powers vested in it by Polkadot's
        governance, which are limited to the expression of expert opinion and
        the ability to move proposals to more lenient governance tracks when
        necessary. It is not an arbiter of the "correctness" of any particular
        runtime or node implementation, and the practical meaning of these RFCs
        follows as a consequence of its limited powers.
      </p>
      <p>
        For any RFC concerning runtime logic or interfaces, the Fellowship's
        capabilities are bounded by relay-chain governance, which is the
        ultimate decider of what code is adopted for block processing. As such,
        these RFCs are only loosely binding - the chains' governance has no
        obligation to accept the features as implemented and may accept features
        which have not gone through the RFC process. When it comes to node-side
        areas of expertise, the Fellowship's vote is more strongly binding, as
        the governance systems of the chains can't determine the environment the
        runtime is executed within, and in practice all node implementations
        should conform to some foundational standards in order to communicate.
      </p>
      <p>
        Merged RFCs are only an indication of support for a specific design, not
        a commitment to an implementation of a feature on any particular
        timeframe or roadmap ordering.
      </p>
      <h1 className="my-4 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        Process
      </h1>
      <p>
        The RFC process is open to all contributors. Anyone may open an RFC or
        provide comments on open RFCs.
      </p>
      <p>To open an RFC, follow these steps:</p>
      <ul>
        <li>
          - Copy the `0000-template.md` file into the `text` folder and rename
          to match the title of the RFC
        </li>
        <li>- Fill out the RFC template and open a PR.</li>
        <li>
          - Rename the file to correspond to the GitHub pull request number and
          update the "RFC PR" field in the file.
        </li>
      </ul>
      <p>
        The Fellowship will decide, via an on-chain voting mechanism including
        members III-Dan or above, when to approve and merge RFCs. It does so by
        issuing an on-chain remark with the body `RFC_APPROVE(xxxx, h)` from the
        `Fellows` origin on the Polkadot Collectives blockchain, where xxxx is
        the number of the RFC and h is the blake2-256 hash of the raw proposal
        text. Once this remark has been made, the PR can be merged. This
        on-chain process is designed to be resilient to where the RFCs are
        hosted and in what format, so it can be migrated away from GitHub in the
        future. The fellowship should not approve more than one RFC with the
        same number.
      </p>
      <p>
        The Fellowship may also decide to reject an RFC by issuing a remark with
        the text `RFC_REJECT(xxxx, h)`. This is a formality to provide clarity
        on when PRs (or their analogue on non-GitHub platforms) may be closed.
        PRs may be closed by their author, as well. PRs may be closed when
        sufficiently stale, as well - after a period of 1 year without
        acceptance.
      </p>
      <p>
        Problems, requirements, and descriptions in RFC text should be stated
        using the following definitions of terms, roughly as laid out in{' '}
        <ThemedLink
          target="_blank"
          to="https://datatracker.ietf.org/doc/html/rfc2119IETF"
        >
          RFC 2119
        </ThemedLink>
        :
      </p>
      <ul>
        <li>
          - The terms "MUST", "MUST NOT", "SHALL", "SHALL NOT", or "REQUIRED"
          mean that the requirement is fixed and must be adhered to by
          implementations. These statements should be limited to those required
          for interoperability and security.
        </li>
        <li>
          - The terms "SHOULD", "RECOMMENDED", "SHOULD NOT", or "NOT
          RECOMMENDED" mean that there are only limited valid circumstances in
          which a requirement may be ignored.
        </li>
        <li>
          - The terms "MAY" or "OPTIONAL" mean that the requirement is optional,
          though interoperability between implementations making different
          choices in this respect is required.
        </li>
      </ul>
      <h1 className="my-4 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        Bots
      </h1>
      <ThemedLink
        target="_blank"
        to="https://github.com/polkadot-fellows/RFCs/"
      >
        RFCs repository
      </ThemedLink>{' '}
      provides a bot for:
      <ul>
        <li>
          - Proposing RFCs on chain in a referenda to let the fellowship vote on
          the RFC. The referenda can only be created by accounts that are part
          of the fellowship.
        </li>
        <li>
          - Processing (merging or closing) the PR after the on-chain referendum
          gets confirmed.
        </li>
      </ul>
      <p>
        To use the bot you need to write the following comment into a pull
        request:
      </p>
      <div className="py-10">
        <code className="bg-black text-[#ccc] px-2 py-5">
          /rfc (help|propose|process)
        </code>
      </div>
      <p>
        It takes a moment and then the bot should answer with a comment with
        more instructions on how to proceed.
      </p>
    </>
  )
}
