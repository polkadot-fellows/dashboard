import { getRank } from '@/consts'
import { cn } from '@/lib/utils'

export const RankBadge = ({
  rank,
  showName = false,
  className,
}: {
  rank: number
  showName?: boolean
  className?: string
}) => {
  const { dan, name, color, textColor } = getRank(rank)
  return (
    <span
      title={`Rank ${rank}: ${name}`}
      className={cn(
        'inline-flex h-6 min-w-6 items-center justify-center gap-1.5 rounded-full px-2 text-xs font-semibold whitespace-nowrap tabular-nums',
        className,
      )}
      style={{ background: color, color: textColor }}
    >
      {dan || '0'}
      {showName && <span className="font-medium">{name}</span>}
    </span>
  )
}
