/* eslint-disable react-hooks/exhaustive-deps */
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { resources, routes } from '@/lib/utils'

import { PanelLeft, Moon, Sun, NotebookText } from 'lucide-react'
import { getLinks } from './Resources'
import { FaCheckCircle, FaGithub } from 'react-icons/fa'
import { TbLoaderQuarter } from 'react-icons/tb'
import { useTheme } from './components/theme-provider'
import { useEffect } from 'react'
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

// import { Polkicon } from '@polkadot-ui/react'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'

// import {
//   Menubar,
//   MenubarContent,
//   MenubarItem,
//   MenubarMenu,
//   MenubarSeparator,
//   MenubarShortcut,
//   MenubarTrigger,
// } from '@/components/ui/menubar'

interface Props {
  lightClientLoaded: boolean
  setLightClientLoaded: React.Dispatch<React.SetStateAction<boolean>>
}

export const Header = ({ lightClientLoaded, setLightClientLoaded }: Props) => {
  useEffect(() => {
    collectiveClient.finalizedBlock$.subscribe((finalizedBlock) => {
      if (finalizedBlock.number && !lightClientLoaded) {
        setLightClientLoaded(true)
      }
    })
  }, [lightClientLoaded, setLightClientLoaded])
  const { theme, setTheme } = useTheme()
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:sticky sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <div className="flex text-primary font-extrabold text-2xl">
            <PolkadotIcon
              className="max-h-[100%] w-[3.2rem] pr-3 pl-2.4"
              width={'2rem'}
              height={'2rem'}
            />
            <span>Fellowship</span>
          </div>
          <nav className="grid gap-4 pt-4 text-lg font-medium">
            {routes.map((r) => (
              <a
                key={r.name}
                href={`/#/${r.link || ''}`}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <r.icon className="h-5 w-5" />
                {r.name}
              </a>
            ))}
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
                  <DialogTitle className="text-primary font-bold">
                    Resources
                  </DialogTitle>
                  <DialogDescription>
                    Some resources of Felloship specific information.
                  </DialogDescription>
                </DialogHeader>
                <div className="columns-1">
                  {resources.map((r) => getLinks(r.title, r.resources))}
                </div>
              </DialogContent>
            </Dialog>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground transition-colors py-2 justify-start">
                  <SiElement className="h-5 w-5" />
                  <span>Element</span>
                </AccordionTrigger>
                <AccordionContent className="p-0">
                  <a
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground transition-colors py-2 justify-start"
                    href="https://matrix.to/#/#fellowship-members:parity.io"
                    target="_blank"
                  >
                    Fellowship Members
                  </a>
                </AccordionContent>
                <AccordionContent className="p-0">
                  <a
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground transition-colors py-2 justify-start"
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
                  window.open('https://github.com/polkadot-fellows', '_blank')
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

          <div className="fixed flex bottom-2 align-middle text-center text-sm text-primary font-bold flex-col">
            <span>©2024</span>
            <span>Polkadot Technical Fellowship</span>
          </div>
        </SheetContent>
      </Sheet>
      {/* <div className="flex justify-between w-full">
        <div>
          <Menubar>
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
          </Menubar>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Polkicon
                  size={36}
                  address={'5CoZdwD8KpAaax4oD5bKgHy23wkVKpwuaf9Gb2HTeZQaDijr'}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div> */}
    </header>
  )
}