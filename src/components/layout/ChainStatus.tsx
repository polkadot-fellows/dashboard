import { useFinalizedBlock } from '@/state/chain'
import { cn } from '@/lib/utils'

/** Shows whether the light client has synced, and the latest finalized block */
export const ChainStatus = ({ className }: { className?: string }) => {
  const block = useFinalizedBlock()
  const synced = block !== null

  return (
    <div
      title={
        synced
          ? 'Connected to Polkadot through a light client running in your browser: all the data shown is verified locally.'
          : 'The light client is syncing with the Polkadot network…'
      }
      className={cn(
        'text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs whitespace-nowrap',
        className,
      )}
    >
      <span className="relative flex h-2 w-2">
        {!synced && (
          <span className="bg-warning absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
        )}
        <span
          className={cn(
            'relative inline-flex h-2 w-2 rounded-full',
            synced ? 'bg-success' : 'bg-warning',
          )}
        />
      </span>
      {synced ? (
        <>
          <span>Light client</span>
          <span className="text-foreground font-mono tabular-nums">
            #{block.toLocaleString('en-US')}
          </span>
        </>
      ) : (
        <span>Syncing light client…</span>
      )}
    </div>
  )
}
