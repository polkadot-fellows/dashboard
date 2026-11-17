import { useMemo, useState } from 'react'
import { Polkicon } from '@polkadot-ui/react'
import {
  ArrowDown,
  ArrowUp,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Copy,
  Search,
  X,
} from 'lucide-react'
import { RankBadge } from '@/components/RankBadge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { getRank } from '@/consts'
import { useAccount } from '@/contexts/AccountContextProvider'
import { cn, copyToClipboard, shortAddress } from '@/lib/utils'
import type { Member } from '@/state/members'

const PAGE_SIZE = 12

export const MemberName = ({ member }: { member: Member }) => (
  <span className="flex min-w-0 items-center gap-1.5">
    <span
      className={cn('truncate font-medium', !member.display && 'font-mono')}
    >
      {member.display || shortAddress(member.address)}
    </span>
    {member.verified && (
      <span title="Identity verified by a registrar" className="shrink-0">
        <BadgeCheck className="text-success h-4 w-4" />
      </span>
    )}
  </span>
)

const statusLabel: Record<string, string> = {
  cached:
    'Showing the members of your last visit while the light client syncs…',
  live: 'Up to date, verified by the light client',
  error: 'Unable to load the members. Please reload the page.',
}

export const MembersTable = ({
  members,
  status,
  rankFilter,
  onRankFilter,
  onSelect,
}: {
  members: Member[]
  status: 'loading' | 'cached' | 'live' | 'error'
  rankFilter: number | null
  onRankFilter: (rank: number | null) => void
  onSelect: (member: Member) => void
}) => {
  const { selectedAccount } = useAccount()
  const [search, setSearch] = useState('')
  const [descending, setDescending] = useState(true)
  const [page, setPage] = useState(0)

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    const result = members.filter(
      (member) =>
        (rankFilter === null || member.rank === rankFilter) &&
        (!term ||
          [member.display, member.legal, member.github, member.address].some(
            (value) => value?.toLowerCase().includes(term),
          )),
    )
    // `members` comes sorted by descending rank
    return descending ? result : [...result].reverse()
  }, [members, search, rankFilter, descending])

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = Math.min(page, pages - 1)
  const rows = filtered.slice(current * PAGE_SIZE, (current + 1) * PAGE_SIZE)
  const SortIcon = descending ? ArrowDown : ArrowUp

  return (
    <section aria-labelledby="members-title">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2
            id="members-title"
            className="text-xl font-semibold tracking-tight"
          >
            Members
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            {statusLabel[status] ??
              'Members and candidates currently inducted in the Fellowship.'}
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value)
              setPage(0)
            }}
            placeholder="Search by name or address"
            aria-label="Search members"
            className="bg-card pl-9"
          />
        </div>
      </div>

      {rankFilter !== null && (
        <button
          type="button"
          onClick={() => onRankFilter(null)}
          className="bg-accent text-accent-foreground mb-4 inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
        >
          Rank: {getRank(rankFilter).name}
          <X className="h-3 w-3" />
        </button>
      )}

      <div className="bg-card overflow-hidden rounded-xl border">
        <table className="w-full text-left text-sm">
          <thead className="text-muted-foreground bg-muted/50 border-b text-xs">
            <tr>
              <th className="px-4 py-3 font-medium">Member</th>
              <th className="px-4 py-3 font-medium">
                <button
                  type="button"
                  className="hover:text-foreground inline-flex cursor-pointer items-center gap-1"
                  onClick={() => setDescending((value) => !value)}
                  aria-label={`Sort by ${descending ? 'ascending' : 'descending'} rank`}
                >
                  Rank
                  <SortIcon className="h-3.5 w-3.5" />
                </button>
              </th>
              <th className="hidden px-4 py-3 font-medium md:table-cell">
                Status
              </th>
              <th className="w-12 px-4 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {status === 'loading' &&
              Array.from({ length: 8 }, (_, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-3" colSpan={4}>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-9 w-9 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-3.5 w-40" />
                        <Skeleton className="h-3 w-28" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            {rows.map((member) => {
              const isYou = member.address === selectedAccount?.address
              return (
                <tr
                  key={member.address}
                  onClick={() => onSelect(member)}
                  className={cn(
                    'hover:bg-muted/50 cursor-pointer transition-colors',
                    isYou && 'bg-accent/40',
                  )}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="shrink-0">
                        <Polkicon address={member.address} size={36} />
                      </span>
                      <div className="min-w-0">
                        <button
                          type="button"
                          className="flex max-w-full cursor-pointer items-center gap-2 text-left"
                          aria-label={`View the details of ${member.display || member.address}`}
                        >
                          <MemberName member={member} />
                          {isYou && (
                            <span className="bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 text-[10px] leading-none font-semibold">
                              You
                            </span>
                          )}
                        </button>
                        {member.display && (
                          <p className="text-muted-foreground font-mono text-xs">
                            {shortAddress(member.address)}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <RankBadge rank={member.rank} />
                      <span className="hidden sm:inline">
                        {getRank(member.rank).name}
                      </span>
                    </div>
                  </td>
                  <td className="text-muted-foreground hidden px-4 py-3 md:table-cell">
                    {member.isActive === undefined ? (
                      '—'
                    ) : (
                      <span className="inline-flex items-center gap-2">
                        <span
                          className={cn(
                            'h-1.5 w-1.5 rounded-full',
                            member.isActive
                              ? 'bg-success'
                              : 'bg-muted-foreground/50',
                          )}
                        />
                        {member.isActive ? 'Active' : 'Passive'}
                      </span>
                    )}
                  </td>
                  <td className="px-2 py-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground h-8 w-8"
                      aria-label="Copy address"
                      title="Copy address"
                      onClick={(event) => {
                        event.stopPropagation()
                        copyToClipboard(member.address)
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              )
            })}
            {status !== 'loading' && rows.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-muted-foreground px-4 py-12 text-center"
                >
                  {status === 'error'
                    ? 'The members could not be loaded.'
                    : 'No members match your search.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filtered.length > 0 && (
        <div className="text-muted-foreground mt-4 flex items-center justify-between gap-4 text-sm">
          <p>
            {current * PAGE_SIZE + 1}–
            {Math.min((current + 1) * PAGE_SIZE, filtered.length)} of{' '}
            {filtered.length}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(current - 1)}
              disabled={current === 0}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(current + 1)}
              disabled={current >= pages - 1}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </section>
  )
}
