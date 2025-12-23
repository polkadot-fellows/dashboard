import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useTheme } from '@/components/theme-provider'
import { openInNewTab } from '@/lib/utils'
import { Moon, Sun } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { polkadotClient } from './clients'

export const Footer = () => {
  const { theme, setTheme } = useTheme()
  const [latestBlockNumber, setLatestBlockNumber] = useState<number | null>(
    null,
  )

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  useEffect(() => {
    const subscription = polkadotClient.finalizedBlock$.subscribe(
      (finalizedBlock) => {
        if (typeof finalizedBlock.number === 'number') {
          setLatestBlockNumber(finalizedBlock.number)
        }
      },
    )

    return () => subscription.unsubscribe()
  }, [])

  return (
    <footer className="bg-background/80 w-fill supports-backdrop-filter:bg-background/60 fixed bottom-0 border-t backdrop-blur">
      <div className="text-muted-foreground mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm sm:flex-row sm:items-center sm:px-6">
        <div className="text-center sm:text-left">
          <p className="text-foreground text-base font-semibold">
            Polkadot Technical Fellowship
          </p>
          <p className="text-muted-foreground/80 text-xs">
            © {new Date().getFullYear()} · Building the future of Polkadot
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button
            type="button"
            variant="outline"
            className="border-border/60 bg-card/30 text-foreground hover:bg-primary/10 hover:text-primary rounded-full px-4"
            onClick={() => openInNewTab('https://github.com/polkadot-fellows')}
          >
            <FaGithub className="h-4 w-4" />
            <span className="ml-2 text-xs font-semibold">GitHub</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="border-border/60 bg-card/30 text-foreground hover:bg-primary/10 hover:text-primary rounded-full"
            onClick={toggleTheme}
          >
            <Sun className="absolute h-[1.1rem] w-[1.1rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <Moon className="h-[1.1rem] w-[1.1rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Badge variant="secondary" className="p-3 text-nowrap">
            {latestBlockNumber
              ? `#${latestBlockNumber.toLocaleString()}`
              : 'Syncing block...'}
          </Badge>
        </div>
      </div>
    </footer>
  )
}
