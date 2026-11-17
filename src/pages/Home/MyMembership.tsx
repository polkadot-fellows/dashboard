import { Link } from 'react-router-dom'
import { Polkicon } from '@polkadot-ui/react'
import { RankBadge } from '@/components/RankBadge'
import { Button } from '@/components/ui/button'
import { useAccount } from '@/contexts/AccountContextProvider'
import { shortAddress } from '@/lib/utils'
import { type Member, useMembers } from '@/state/members'

/** Fellowship status of the account selected in the connected wallet */
export const MyMembership = ({
  onShowDetails,
}: {
  onShowDetails: (member: Member) => void
}) => {
  const { selectedAccount } = useAccount()
  const { members, status } = useMembers()
  if (!selectedAccount) return null

  const { address, name } = selectedAccount
  const member = members.find((m) => m.address === address)

  return (
    <section
      aria-label="Your membership"
      className="bg-card mb-12 flex flex-wrap items-center gap-4 rounded-xl border p-5"
    >
      <Polkicon address={address} size={44} />
      <div className="min-w-0 flex-1">
        <p className="flex flex-wrap items-center gap-2 font-medium">
          <span className="truncate">
            {member?.display || name || shortAddress(address)}
          </span>
          {member && <RankBadge rank={member.rank} showName />}
        </p>
        <p className="text-muted-foreground mt-1 text-sm">
          {member
            ? member.rank === 0
              ? 'You have been inducted as a candidate of the Fellowship.'
              : `You are a member of the Fellowship${
                  member.isActive === false ? ', currently passive' : ''
                }.`
            : status === 'live'
              ? 'This account is not part of the Fellowship.'
              : 'Checking the Fellowship membership of this account…'}
        </p>
      </div>
      {member ? (
        <Button variant="outline" onClick={() => onShowDetails(member)}>
          View details
        </Button>
      ) : (
        status === 'live' && (
          <Button variant="outline" asChild>
            <Link to="/membership">How to join</Link>
          </Button>
        )
      )}
    </section>
  )
}
