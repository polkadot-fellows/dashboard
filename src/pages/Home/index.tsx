import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { A, ButtonLink } from '@/components/page'
import { usePageTitle } from '@/lib/usePageTitle'
import { buttonVariants } from '@/components/ui/button'
import { GithubUrl, ManifestoUrl } from '@/consts'
import { cn } from '@/lib/utils'
import { type Member, useMembers } from '@/state/members'
import { MemberDialog } from './MemberDialog'
import { MembersTable } from './MembersTable'
import { MyMembership } from './MyMembership'
import { Stats } from './Stats'

const Hero = () => (
  <section className="relative mb-12 overflow-hidden rounded-2xl border px-6 py-12 sm:px-12 sm:py-16">
    <div
      aria-hidden
      className="from-primary/15 via-primary/5 pointer-events-none absolute inset-0 bg-radial-[at_85%_0%] to-transparent to-70%"
    />
    <div className="relative max-w-2xl">
      <p className="text-accent-foreground bg-accent mb-5 inline-block rounded-full px-3 py-1 text-xs font-semibold">
        Polkadot Collectives
      </p>
      <h1 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl">
        The Polkadot Technical Fellowship
      </h1>
      <p className="text-muted-foreground mt-5 text-base leading-7 sm:text-lg">
        A self-governing body of experts and developers of the Polkadot and
        Kusama networks. It operates on-chain through the{' '}
        <A
          className="text-foreground underline underline-offset-4"
          href="https://collectives.subsquare.io/fellowship"
        >
          Collectives
        </A>{' '}
        system chain, and off-chain through the{' '}
        <A
          className="text-foreground underline underline-offset-4"
          href={GithubUrl}
        >
          Polkadot Fellows
        </A>{' '}
        repositories.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href={ManifestoUrl}>Read the Manifesto</ButtonLink>
        <Link
          to="/membership"
          className={cn(buttonVariants({ variant: 'outline' }), 'gap-1.5')}
        >
          How to join
          <ArrowRight className="h-4 w-4 opacity-70" />
        </Link>
      </div>
    </div>
  </section>
)

export const Home = () => {
  usePageTitle()
  const { members, status } = useMembers()
  const [selected, setSelected] = useState<Member | null>(null)
  const [rankFilter, setRankFilter] = useState<number | null>(null)

  return (
    <>
      <Hero />
      <MyMembership onShowDetails={setSelected} />
      <Stats
        members={members}
        loading={status === 'loading'}
        rankFilter={rankFilter}
        onRankFilter={setRankFilter}
      />
      <MembersTable
        members={members}
        status={status}
        rankFilter={rankFilter}
        onRankFilter={setRankFilter}
        onSelect={setSelected}
      />
      <MemberDialog member={selected} onClose={() => setSelected(null)} />
    </>
  )
}
