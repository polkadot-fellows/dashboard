import { Button } from '@/components/ui/button'
import whitelist from './fellowship-whitelist-xcm.png'
import { openInNewTab } from '@/lib/utils'

export const Governance = () => {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:mx-[5%] xl:mx-[20%] mx-0 sm:px-6 sm:py-0 md:gap-8">
      <div className="header">
        <h1 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Governance
        </h1>
      </div>
      <div className="pageTop">
        <h2 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight sm:grow-0">
          Technical Fellowship Referenda
        </h2>
        <p>
          The fellowship's governance model has multiple tracks with their own
          approval and support parameters, where the votes are weighted by the
          rank of the member. Members of the Fellowship can vote on any given
          Fellowship proposal and the aggregated opinion of the members
          (weighted by their rank) constitutes the Fellowship's collective
          opinion. The list of current and historic fellowship referenda can be
          viewed on{' '}
          <a target="_blank" href={'https://collectives.polkassembly.io/'}>
            Polkassembly
          </a>{' '}
          or{' '}
          <a target="_blank" href={'https://collectives.subsquare.io'}>
            Subsquare
          </a>
          . The fellowship governance is primarily used for its membership
          management,{' '}
          <a target="_blank" href={'https://github.com/polkadot-fellows/RFCs'}>
            approving RFCs
          </a>
          and whitelisting Polkadot OpenGov proposals created on the whitelist
          track.
        </p>

        <h2 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight sm:grow-0 my-6">
          Whitelisting
        </h2>

        <p>
          Polkadot OpenGov allows the Technical Fellowship to authorize an
          origin known as "Whitelisted-Caller" to execute with Root-level
          privileges for calls approved by the Fellowship (currently only rank 3
          members and above can vote for whitelist calls). Note that the
          fellowship cannot unanimously change the network parameters, conduct
          rescues or move assets. The whitelisted proposals still have to go
          through the whole life cycle of an OpenGov referendum and can only be
          enacted when the referendum passes successfully. The whitelisting
          process starts as a fellowship referenda with embedded XCM call from
          the collectives system chain to the Polkadot relay chain. For
          instance,{' '}
          <a
            className="text-[#E6007A] font-bold"
            target="_blank"
            href={'https://collectives.polkassembly.io/referenda/68'}
          >
            the Polkadot Fellowship referenda 68
          </a>{' '}
          was used to <span className="font-bold">whitelist</span>{' '}
          <a
            className="text-[#E6007A] font-bold"
            target="_blank"
            href={'https://polkadot.polkassembly.io/referenda/440'}
          >
            the Polkadot OpenGov referenda 440
          </a>
          .
        </p>

        <img className="my-6" src={whitelist} alt="whitelist" />

        <div className="note secondary">
          <h2 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight sm:grow-0 my-6">
            Submitting Whitelisted Proposals
          </h2>
          <p>
            For more information about how to submit a whitelisted proposal see
            the{' '}
            <Button
              className="mt-6"
              onClick={() =>
                openInNewTab(
                  'https://wiki.polkadot.network/docs/learn-guides-polkadot-opengov#submitting-a-referendum-on-the-whitelisted-caller-track',
                )
              }
            >
              dedicated advanced how-to guides
            </Button>
          </p>
        </div>
      </div>
    </main>
  )
}
