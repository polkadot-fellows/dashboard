import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { RouterType, resources, routes, cn } from '@/lib/utils'

import {
  PanelLeft,
  NotebookText,
  BookOpenText,
  Wallet,
  Check,
  ChevronDown,
} from 'lucide-react'
import { getLinks } from './Resources'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './components/ui/dialog'
import PolkadotNewLogo from '@/assets/img/newLogo.svg?react'
import PolkadotNewLogoBlack from '@/assets/img/newLogoBlack.svg?react'

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@radix-ui/react-accordion'
import { SiElement } from 'react-icons/si'
import { Link, useLocation } from 'react-router-dom'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { ConnectionButton } from 'dot-connect/react.js'
import { useAccount } from './contexts/AccountContextProvider'
import { useTheme } from './components/theme-provider'

export const Header = () => {
  const { accounts, selectedAccount, setSelectedAccount } = useAccount()
  const [accountDialogOpen, setAccountDialogOpen] = useState(false)
  const { pathname } = useLocation()
  const { theme } = useTheme()

  const navLinkClasses = (isActive?: boolean) =>
    cn(
      'rounded-full px-3 py-1 text-sm font-semibold transition-colors',
      isActive
        ? 'bg-primary/10 text-primary'
        : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground',
    )

  const isLinkActive = (link: string) => {
    if (!link) {
      return pathname === '/' || pathname === ''
    }
    return pathname === `/${link}`
  }

  return (
    <header className="bg-background/80 supports-backdrop-filter:bg-background/60 fixed inset-x-0 top-0 z-30 border-b backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center py-4">
        <div className="flex items-center gap-3 md:flex-1">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="md:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <div className="text-primary flex text-2xl font-extrabold">
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
              <nav className="grid gap-4 pt-4 text-lg font-medium">
                {routes.map((r) => {
                  if (r.childs?.length) {
                    return (
                      <Accordion key={r.link} type="single" collapsible>
                        <AccordionItem value={`item-${r.link}`}>
                          <AccordionTrigger className="text-muted-foreground hover:text-foreground flex items-center justify-start gap-4 px-2.5 py-2 transition-colors">
                            <r.icon className="h-5 w-5" />
                            <span>{r.name}</span>
                          </AccordionTrigger>
                          <AccordionContent className="pl-4">
                            {r.childs.map((c: RouterType) => (
                              <Link
                                key={c.link}
                                className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
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
                  }
                  return (
                    <Link
                      key={r.link}
                      className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
                      to={r.link}
                    >
                      <r.icon className="h-5 w-5" />
                      <div className="left">{r.name}</div>
                    </Link>
                  )
                })}
                <Link
                  target="_blank"
                  to="https://polkadot-fellows.github.io/RFCs/"
                  className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
                >
                  <BookOpenText className="h-5 w-5" />
                  RFCs
                </Link>
                <Dialog>
                  <DialogTrigger asChild>
                    <a
                      href="#resources"
                      className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
                    >
                      <NotebookText className="h-5 w-5" />
                      Resources
                    </a>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="text-primary font-bold">
                        Resources
                      </DialogTitle>
                      <DialogDescription>
                        Useful resources on the Polkadot Technical Fellowship
                      </DialogDescription>
                    </DialogHeader>
                    <div className="columns-1">
                      {resources.map((r) => getLinks(r.title, r.resources))}
                    </div>
                  </DialogContent>
                </Dialog>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-element">
                    <AccordionTrigger className="text-muted-foreground hover:text-foreground flex items-center justify-start gap-4 px-2.5 py-2 transition-colors">
                      <SiElement className="h-5 w-5" />
                      <span>Element</span>
                    </AccordionTrigger>
                    <AccordionContent className="p-0">
                      <a
                        className="text-muted-foreground hover:text-foreground flex items-center justify-start gap-4 px-2.5 py-2 transition-colors"
                        href="https://matrix.to/#/#fellowship-members:parity.io"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Fellowship Members
                      </a>
                    </AccordionContent>
                    <AccordionContent className="p-0">
                      <a
                        className="text-muted-foreground hover:text-foreground flex items-center justify-start gap-4 px-2.5 py-2 transition-colors"
                        href="https://matrix.to/#/#fellowship-open-channel:parity.io"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open Channel
                      </a>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </nav>
            </SheetContent>
          </Sheet>
          <Link
            to="/"
            className="text-primary flex items-center gap-3 text-2xl font-extrabold"
          >
            {theme === 'dark' ? (
              <PolkadotNewLogo
                className="pl-2.4 max-h-full w-[3.2rem]"
                width={'2rem'}
                height={'2rem'}
              />
            ) : (
              <PolkadotNewLogoBlack
                className="pl-2.4 max-h-full w-[3.2rem]"
                width={'2rem'}
                height={'2rem'}
              />
            )}
            <span className="hidden sm:inline">Fellowship</span>
          </Link>
        </div>
        <div className="hidden flex-1 items-center justify-center gap-2 font-sans! md:flex">
          {routes.map((route) => {
            if (route.childs?.length) {
              const childActive = route.childs.some((child) =>
                isLinkActive(child.link),
              )
              return (
                <DropdownMenu key={route.link}>
                  <DropdownMenuTrigger
                    className={cn(
                      navLinkClasses(childActive),
                      'flex cursor-pointer items-center gap-1 outline-none',
                    )}
                  >
                    {route.name}
                    <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center">
                    {route.childs.map((child) => (
                      <DropdownMenuItem asChild key={child.link}>
                        <Link
                          to={child.link}
                          className="flex cursor-pointer items-center gap-2 font-sans"
                        >
                          <child.icon className="h-4 w-4" />
                          {child.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            }

            return (
              <Link
                key={route.link}
                to={route.link}
                className={navLinkClasses(isLinkActive(route.link))}
              >
                {route.name}
              </Link>
            )
          })}
          <a
            href="https://polkadot-fellows.github.io/RFCs/"
            target="_blank"
            rel="noreferrer"
            className={navLinkClasses()}
          >
            RFCs
          </a>
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className={cn(navLinkClasses(), 'flex items-center gap-1')}
              >
                <NotebookText className="h-4 w-4" />
                Resources
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-primary font-bold">
                  Resources
                </DialogTitle>
                <DialogDescription>
                  Useful resources on the Polkadot Technical Fellowship
                </DialogDescription>
              </DialogHeader>
              <div className="columns-1">
                {resources.map((r) => getLinks(r.title, r.resources))}
              </div>
            </DialogContent>
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                navLinkClasses(),
                'flex items-center gap-1 outline-none',
              )}
            >
              <SiElement className="h-4 w-4" />
              Element
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem asChild>
                <a
                  href="https://matrix.to/#/#fellowship-members:parity.io"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2"
                >
                  Fellowship Members
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href="https://matrix.to/#/#fellowship-open-channel:parity.io"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2"
                >
                  Open Channel
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-3 md:flex-1 md:justify-end">
          {accounts.length > 0 && (
            <Dialog
              open={accountDialogOpen}
              onOpenChange={setAccountDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline" size="lg" className="rounded-3xl p-5">
                  Manage accounts
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[420px]">
                <DialogHeader>
                  <DialogTitle className="text-primary font-bold">
                    Connected accounts
                  </DialogTitle>
                  <DialogDescription>
                    Choose which account the dashboard should use.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                  {accounts.map((account) => {
                    const isSelected =
                      selectedAccount?.address === account.address
                    const shortAddress =
                      account.address.length > 12
                        ? `${account.address.slice(0, 6)}...${account.address.slice(-4)}`
                        : account.address

                    return (
                      <button
                        type="button"
                        key={account.address}
                        onClick={() => {
                          setSelectedAccount(account)
                          setAccountDialogOpen(false)
                        }}
                        className={cn(
                          'hover:bg-muted flex w-full items-center justify-between rounded-md border p-3 text-left transition-colors',
                          isSelected
                            ? 'border-primary bg-primary/5'
                            : 'border-border bg-background',
                        )}
                      >
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {account.name || 'Wallet account'}
                          </span>
                          <span className="text-muted-foreground text-xs">
                            {shortAddress}
                          </span>
                        </div>
                        {isSelected ? (
                          <Check className="text-primary h-4 w-4" />
                        ) : (
                          <Wallet className="text-muted-foreground h-4 w-4" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </DialogContent>
            </Dialog>
          )}
          <ConnectionButton />
        </div>
      </div>
    </header>
  )
}
