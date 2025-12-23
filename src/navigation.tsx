import { RouterType, routes } from '@/lib/utils'
import { Link, useLocation } from 'react-router-dom'
import PolkadotNewLogo from '@/assets/img/newLogo.svg?react'
import PolkadotNewLogoBlack from '@/assets/img/newLogoBlack.svg?react'

import { BookOpenText } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { Resources } from './Resources'
import { SiElement } from 'react-icons/si'
import { useTheme } from './components/theme-provider'

const linkStyle = (pathname: string, link: string) => {
  return `link ${
    pathname === link
      ? 'bg-accent text-accent-foreground rounded-md'
      : 'text-muted-foreground'
  }`
}

export const Navigation = () => {
  const { pathname } = useLocation()

  const { theme } = useTheme()

  return (
    <aside className="bg-background fixed inset-y-0 left-0 z-10 hidden w-56 flex-col border-r sm:flex">
      <nav className="items-left flex flex-col gap-4 px-4 sm:py-5">
        <div className="flex text-2xl font-extrabold">
          {theme === 'dark' ? (
            <PolkadotNewLogo
              className="pl-2.4 max-h-full w-[3.2rem] pr-3"
              width={'2rem'}
              height={'2rem'}
            />
          ) : (
            <PolkadotNewLogoBlack
              className="pl-2.4 max-h-full w-[3.2rem] pr-3"
              width={'2rem'}
              height={'2rem'}
            />
          )}
          <span>Fellowship</span>
        </div>
        {routes.map((r) => {
          if (r.childs?.length) {
            return (
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-muted-foreground hover:text-foreground flex items-center justify-start gap-4 px-2.5 py-2 transition-colors">
                    <r.icon className="h-5 w-5" />
                    <span>{r.name}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pl-4">
                    {r.childs.map((c: RouterType) => (
                      <Link
                        className={
                          linkStyle(pathname, '/' + (c.link || '')) +
                          ' text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5 py-2 transition-colors'
                        }
                        to={c.link}
                      >
                        <c.icon className="h-5 w-5" />
                        <div className="left">{c.name}</div>
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )
          } else {
            return (
              <Link
                className={
                  linkStyle(pathname, '/' + (r.link || '')) +
                  ' text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5 py-2 transition-colors'
                }
                to={r.link}
              >
                <r.icon className="h-5 w-5" />
                <div className="left">{r.name}</div>
              </Link>
            )
          }
        })}

        <Link
          target="_blank"
          to="https://polkadot-fellows.github.io/RFCs/"
          className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
        >
          <BookOpenText className="h-5 w-5" />
          RFCs Book
        </Link>
        <Resources />
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-muted-foreground hover:text-foreground flex items-center justify-start gap-4 px-2.5 py-2 transition-colors">
              <SiElement className="h-5 w-5" />
              <span>Element</span>
            </AccordionTrigger>
            <AccordionContent className="pl-4">
              <Link
                className="text-muted-foreground hover:text-foreground flex items-center justify-start gap-4 px-2.5 py-2 transition-colors"
                to="https://matrix.to/#/#fellowship-members:parity.io"
                target="_blank"
              >
                Fellowship Members
              </Link>
              <Link
                className="text-muted-foreground hover:text-foreground flex items-center justify-start gap-4 px-2.5 py-2 transition-colors"
                to="https://matrix.to/#/#fellowship-open-channel:parity.io"
                target="_blank"
              >
                Open Channel
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </nav>
    </aside>
  )
}
