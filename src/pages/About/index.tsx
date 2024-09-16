import { Button } from '@/components/ui/button'
import { RequestsGrid } from './RequestsGrid'
import { openInNewTab } from '@/lib/utils'
import { reusableH1 } from '@/consts'

type Props = {
  lcStatus: boolean
}

export const About = ({ lcStatus }: Props) => {
  return (
    <>
      <h1 className={reusableH1}>About</h1>
      <div className="pageTop">
        <p>
          The Polkadot Technical Fellowship is a self-governing body of experts
          and developers of Polkadot and Kusama networks. It operates on-chain
          through the Polkadot{' '}
          <a
            target="_blank"
            href={
              'https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot-collectives-rpc.polkadot.io#/fellowship/referenda'
            }
          >
            Collectives
          </a>{' '}
          system chain and off-chain through the{' '}
          <a target="_blank" href={'https://github.com/polkadot-fellows'}>
            Polkadot Fellows
          </a>{' '}
          repository.
        </p>
        <Button
          className="mt-6"
          onClick={() =>
            openInNewTab(
              'https://github.com/polkadot-fellows/manifesto/blob/0c3df46d76625980b8b48742cb86f4d8fa6dda8d/manifesto.pdf',
            )
          }
        >
          Read through the Fellowship Manifesto
        </Button>
      </div>
      <h1 className={reusableH1}>Members</h1>
      <div className="pageTop">
        List of members and candidates currently inducted in the Fellowship
        Collective.
      </div>
      <div style={{ paddingTop: '2rem' }}>
        <RequestsGrid lcStatus={lcStatus} />
      </div>
    </>
  )
}
