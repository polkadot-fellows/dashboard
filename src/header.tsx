/* eslint-disable react-hooks/exhaustive-deps */
import {
  // AccountProvider,
  // ExtensionProvider,
  SelectedAccountType,
} from '@polkadot-ui/react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { RouterType, openInNewTab, resources, routes } from '@/lib/utils'

import { PanelLeft, Moon, Sun, NotebookText, BookOpenText } from 'lucide-react'
import { getLinks } from './Resources'
import { FaCheckCircle, FaGithub } from 'react-icons/fa'
import { TbLoaderQuarter } from 'react-icons/tb'
import { useTheme } from './components/theme-provider'
import { useEffect, useState } from 'react'
import { collectiveClient } from './clients'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './components/ui/dialog'
import PolkadotIcon from '@/assets/img/polkadotIcon.svg?react'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@radix-ui/react-accordion'
import { SiElement } from 'react-icons/si'
import { Link } from 'react-router-dom'

// import { Polkicon } from '@polkadot-ui/react'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'

import { useAccount } from './contexts/AccountContextProvider'

interface Props {
  lightClientLoaded: boolean
  setLightClientLoaded: React.Dispatch<React.SetStateAction<boolean>>
}

export const Header = ({ lightClientLoaded, setLightClientLoaded }: Props) => {
  const { setSelectedAccount } = useAccount()

  const [
    selAccount,
    //  setSelAccount
  ] = useState<SelectedAccountType>({} as SelectedAccountType)

  useEffect(() => {
    collectiveClient.finalizedBlock$.subscribe((finalizedBlock) => {
      if (finalizedBlock.number && !lightClientLoaded) {
        setLightClientLoaded(true)
      }
    })
  }, [lightClientLoaded, setLightClientLoaded])
  const { theme, setTheme } = useTheme()

  // TODO Correctly map the account
  useEffect(() => {
    selAccount?.address && setSelectedAccount(selAccount)
  }, [selAccount])

  return (
    <header className="sticky top-5 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:sticky sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <div className="flex text-2xl font-extrabold text-primary">
            <PolkadotIcon
              className="pl-2.4 max-h-[100%] w-[3.2rem] pr-3"
              width={'2rem'}
              height={'2rem'}
            />
            <span>Fellowship</span>
          </div>
          <nav className="grid gap-4 pt-4 text-lg font-medium">
            {routes.map((r) => {
              if (r.childs?.length) {
                return (
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="flex items-center justify-start gap-4 px-2.5 py-2 text-muted-foreground transition-colors hover:text-foreground">
                        <r.icon className="h-5 w-5" />
                        <span>{r.name}</span>
                      </AccordionTrigger>
                      <AccordionContent className="pl-4">
                        {r.childs.map((c: RouterType) => (
                          <Link
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
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
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
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
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <BookOpenText className="h-5 w-5" />
              RFCs Book
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <a
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <NotebookText className="h-5 w-5" />
                  Resources
                </a>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="font-bold text-primary">
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
              <AccordionItem value="item-1">
                <AccordionTrigger className="flex items-center justify-start gap-4 px-2.5 py-2 text-muted-foreground transition-colors hover:text-foreground">
                  <SiElement className="h-5 w-5" />
                  <span>Element</span>
                </AccordionTrigger>
                <AccordionContent className="p-0">
                  <a
                    className="flex items-center justify-start gap-4 px-2.5 py-2 text-muted-foreground transition-colors hover:text-foreground"
                    href="https://matrix.to/#/#fellowship-members:parity.io"
                    target="_blank"
                  >
                    Fellowship Members
                  </a>
                </AccordionContent>
                <AccordionContent className="p-0">
                  <a
                    className="flex items-center justify-start gap-4 px-2.5 py-2 text-muted-foreground transition-colors hover:text-foreground"
                    href="https://matrix.to/#/#fellowship-open-channel:parity.io"
                    target="_blank"
                  >
                    Open Channel
                  </a>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </nav>
          <nav className="fixed bottom-16 flex flex-col gap-4">
            <a
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              {!lightClientLoaded ? (
                <TbLoaderQuarter className="h-5 w-5 animate-spin" />
              ) : (
                <FaCheckCircle className="text-[#00b300]" />
              )}
              Light Client {!lightClientLoaded ? `syncing` : `synced`}
            </a>
            <a
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <FaGithub
                className="h-5 w-5"
                onClick={() =>
                  openInNewTab('https://github.com/polkadot-fellows')
                }
              />
              Github
            </a>
            <a
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              Toggle theme
            </a>
          </nav>

          <div className="fixed bottom-2 flex flex-col text-center align-middle text-sm font-bold text-primary">
            <span>©2024</span>
            <span>Polkadot Technical Fellowship</span>
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex w-full justify-between">
        <div>
          {/* <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>New Window</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Share</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Print</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar> */}
        </div>
        {/* TODO - ACTIVATE THIS FOR CONNECT BUTTON
        <div>
          {!enchancedAccount?.address ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button>Connect</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-primary font-bold">
                    Connect Wallet
                  </DialogTitle>
                </DialogHeader>
                <ExtensionProvider setSelected={setSelAccount}>
                  <AccountProvider
                    selected={selAccount}
                    setSelected={setSelAccount}
                  />
                </ExtensionProvider>
              </DialogContent>
            </Dialog>
          ) : (
            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full"
                  >
                    <Polkicon size={36} address={enchancedAccount?.address} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DialogTrigger asChild>
                    <DropdownMenuItem className="cursor-pointer">
                      Switch Account
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => setSelectedAccount(undefined)}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-primary font-bold">
                    Connect Wallet
                  </DialogTitle>
                </DialogHeader>
                <ExtensionProvider setSelected={setSelAccount}>
                  <AccountProvider
                    selected={selAccount}
                    setSelected={setSelAccount}
                  />
                </ExtensionProvider>
              </DialogContent>
            </Dialog>
          )}
        </div> */}
      </div>
    </header>
  )
}
