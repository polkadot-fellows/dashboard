import { Link } from 'react-router-dom'
import { GithubIcon } from '@/components/icons'
import { GithubUrl, ManifestoUrl } from '@/consts'

const link = 'hover:text-foreground transition-colors'

export const Footer = () => (
  <footer className="mt-16 border-t">
    <div className="text-muted-foreground mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div>
        <p className="text-foreground font-medium">
          Polkadot Technical Fellowship
        </p>
        <p className="mt-1 text-xs leading-5">
          On-chain data is fetched and verified in your browser by a{' '}
          <a
            className="hover:text-foreground underline underline-offset-2"
            href="https://papi.how/providers/sm"
            target="_blank"
            rel="noreferrer"
          >
            light client
          </a>
          , with no centralized RPC in between.
        </p>
      </div>
      <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <a
          className={link}
          href={ManifestoUrl}
          target="_blank"
          rel="noreferrer"
        >
          Manifesto
        </a>
        <Link className={link} to="/resources">
          Resources
        </Link>
        <a
          className={`${link} inline-flex items-center gap-1.5`}
          href={GithubUrl}
          target="_blank"
          rel="noreferrer"
        >
          <GithubIcon className="h-4 w-4" />
          GitHub
        </a>
      </nav>
    </div>
  </footer>
)
