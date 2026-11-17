import { Skeleton } from '@/components/ui/skeleton'
import { getRank } from '@/consts'
import { cn } from '@/lib/utils'
import type { Member } from '@/state/members'

const Stat = ({
  label,
  value,
  hint,
  loading,
}: {
  label: string
  value: number
  hint: string
  loading: boolean
}) => (
  <div className="bg-card rounded-xl border p-5">
    <p className="text-muted-foreground text-sm">{label}</p>
    {loading ? (
      <Skeleton className="mt-2 h-9 w-16" />
    ) : (
      <p className="mt-1 text-3xl font-semibold tracking-tight tabular-nums">
        {value}
      </p>
    )}
    <p className="text-muted-foreground mt-1 text-xs">{hint}</p>
  </div>
)

export const Stats = ({
  members,
  loading,
  rankFilter,
  onRankFilter,
}: {
  members: Member[]
  loading: boolean
  rankFilter: number | null
  onRankFilter: (rank: number | null) => void
}) => {
  const ranked = members.filter(({ rank }) => rank > 0)
  const counts = new Map<number, number>()
  members.forEach(({ rank }) => counts.set(rank, (counts.get(rank) ?? 0) + 1))
  const distribution = [...counts].sort(([a], [b]) => a - b)

  return (
    <section aria-label="Fellowship in numbers" className="mb-12">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat
          label="Members"
          value={ranked.length}
          hint="Rank I and above"
          loading={loading}
        />
        <Stat
          label="Candidates"
          value={members.length - ranked.length}
          hint="Inducted, not yet promoted"
          loading={loading}
        />
        <Stat
          label="Active members"
          value={ranked.filter(({ isActive }) => isActive).length}
          hint="Currently receiving the full allowance"
          loading={loading}
        />
      </div>

      <div className="bg-card mt-4 rounded-xl border p-5">
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-muted-foreground text-sm">Distribution by rank</p>
          {rankFilter !== null && (
            <button
              type="button"
              className="text-link cursor-pointer text-xs font-medium hover:underline"
              onClick={() => onRankFilter(null)}
            >
              Clear filter
            </button>
          )}
        </div>
        {loading ? (
          <Skeleton className="mt-4 h-3 w-full rounded-full" />
        ) : (
          <>
            <div className="mt-4 flex h-3 gap-0.5 overflow-hidden rounded-full">
              {distribution.map(([rank, count]) => (
                <div
                  key={rank}
                  title={`${getRank(rank).name}: ${count}`}
                  className={cn(
                    'transition-opacity',
                    rankFilter !== null && rankFilter !== rank && 'opacity-25',
                  )}
                  style={{ flexGrow: count, background: getRank(rank).color }}
                />
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {distribution.map(([rank, count]) => {
                const { name, color } = getRank(rank)
                const selected = rankFilter === rank
                return (
                  <button
                    key={rank}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => onRankFilter(selected ? null : rank)}
                    className={cn(
                      'inline-flex cursor-pointer items-center gap-2 rounded-full border px-2.5 py-1 text-xs transition-colors',
                      selected
                        ? 'border-primary bg-accent text-accent-foreground'
                        : 'hover:bg-muted',
                    )}
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: color }}
                    />
                    {name}
                    <span className="text-muted-foreground tabular-nums">
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
