/* eslint-disable react-hooks/exhaustive-deps */
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { routes } from '@/lib/utils'
import { NotebookText } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import PolkadotIcon from '@/assets/img/polkadotIcon.svg?react'
import { FaCheckCircle, FaGithub } from 'react-icons/fa'
import { TbLoaderQuarter } from 'react-icons/tb'

import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme-provider'
import { collectiveClient } from './clients'
import { useEffect, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export const getLink = ({
  label,
  link,
  target,
}: GetLinksType): React.ReactNode => {
  return (
    <Link to={link} target={target}>
      {label}
    </Link>
  )
}

type GetLinksType = {
  label: string
  link: string
  target: '_parent' | '_blank'
}

const getLinks = (title: string, arrays: GetLinksType[]) => (
  <div className="divide-y divide-dashed">
    <div>
      <h4 className="text-primary font-extrabold my-4">{title}</h4>
      {arrays.map((arr) => (
        <p className="underline text-[#999]">{getLink(arr)}</p>
      ))}
    </div>
  </div>
)

const linkStyle = (pathname: string, link: string) => {
  return `link ${
    pathname === link
      ? 'bg-accent text-accent-foreground '
      : 'text-muted-foreground'
  } flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`
}

export const Navigation = () => {
  const { pathname } = useLocation()
  const { theme, setTheme } = useTheme()
  const [lightClientLoaded, setLightClientLoaded] = useState<boolean>(false)

  useEffect(() => {
    collectiveClient.finalizedBlock$.subscribe((finalizedBlock) => {
      if (finalizedBlock.number && !lightClientLoaded) {
        setLightClientLoaded(true)
      }
    })
  }, [lightClientLoaded])

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <PolkadotIcon
          style={{
            maxHeight: '100%',
            width: '4rem',
          }}
          width={'2.2rem'}
          height={'2.2rem'}
        />
        {routes.map((r) => (
          <Tooltip key={r.name}>
            <TooltipTrigger asChild>
              <a
                className={linkStyle(pathname, '/' + (r.link || ''))}
                href={`/#/${r.link || ''}`}
              >
                <r.icon className="h-5 w-5" />
                <span className="sr-only">{r.name}</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">{r.name}</TooltipContent>
          </Tooltip>
        ))}
        <div className="pt-8">
          <Dialog>
            <Tooltip key={'1'}>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <NotebookText className="h-5 w-5" />
                    <span className="sr-only">Resources</span>
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent side="right">Resources</TooltipContent>
            </Tooltip>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-primary font-bold">
                  Resources
                </DialogTitle>
                <DialogDescription>
                  Some resources of Felloship specific information.
                </DialogDescription>
              </DialogHeader>
              <div className="columns-1">
                {getLinks('Fellowship Admin', [
                  {
                    label: 'Manifesto',
                    link: 'https://github.com/polkadot-fellows/manifesto/blob/0c3df46d76625980b8b48742cb86f4d8fa6dda8d/manifesto.pdf',
                    target: '_blank',
                  },
                  {
                    label: 'Pallets and Docs',
                    link: 'https://paritytech.github.io/polkadot-sdk/master/polkadot_sdk_docs/index.html',
                    target: '_blank',
                  },
                  {
                    label: 'Fellows repo',
                    link: 'https://github.com/polkadot-fellows',
                    target: '_blank',
                  },
                ])}
                {getLinks('Fellowship UIs', [
                  {
                    label: 'Polkassembly',
                    link: 'https://collectives.polkassembly.io/',
                    target: '_blank',
                  },
                  {
                    label: 'SubSquare',
                    link: 'https://collectives.subsquare.io/fellowship',
                    target: '_blank',
                  },
                  {
                    label: 'PolkadotJS Collectives',
                    link: 'https://dotapps-io.ipns.dweb.link/?rpc=wss%3A%2F%2Fpolkadot-collectives-rpc.polkadot.io#/explorer',
                    target: '_blank',
                  },
                ])}
                {getLinks('Fellowship Onboarding', [
                  {
                    label: 'Polkadot Blockchain Academy',
                    link: 'https://polkadot.network/development/blockchain-academy/',
                    target: '_blank',
                  },
                  {
                    label: 'Kudos',
                    link: 'https://www.morekudos.com/explore/open-contributions-for-polkadot-sdk',
                    target: '_blank',
                  },
                  {
                    label: 'Polkadot SDK Mentor issues',
                    link: 'https://mentor.tasty.limo/',
                    target: '_blank',
                  },
                  {
                    label: 'Polkadot Project Ideas',
                    link: 'https://gist.github.com/xlc/ebc2476afb7ecacdaa5ce95ae3b991c8#polkadot-project-ideas',
                    target: '_blank',
                  },
                ])}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              {!lightClientLoaded ? (
                <TbLoaderQuarter className="h-5 w-5 animate-spin" />
              ) : (
                <FaCheckCircle className="text-[#00b300]" />
              )}
              <span className="sr-only">
                Light Client {!lightClientLoaded ? `syncing` : `synced`}
              </span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="right">
            Light Client {!lightClientLoaded ? `syncing` : `synced`}
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <FaGithub
                className="h-5 w-5"
                onClick={() =>
                  window.open('https://github.com/polkadot-fellows', '_blank')
                }
              />
              <span className="sr-only">Github</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="right">Github</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Toggle theme</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  )
}
