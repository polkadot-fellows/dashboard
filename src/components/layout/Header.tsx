import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Logo } from '@/components/icons'
import { WalletButton } from '@/components/WalletButton'
import { cn } from '@/lib/utils'
import { nav } from '@/nav'
import { useTheme } from '@/state/theme'
import { ChainStatus } from './ChainStatus'

const navLink = (active: boolean) =>
  cn(
    'flex cursor-pointer items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
    active
      ? 'bg-accent text-accent-foreground'
      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
  )

const Brand = ({ onClick }: { onClick?: () => void }) => (
  <Link to="/" onClick={onClick} className="flex items-center gap-2.5">
    <Logo className="h-7 w-auto" />
    <span className="font-display text-base leading-none tracking-tight">
      Fellowship
    </span>
  </Link>
)

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  )
}

const DesktopNav = () => {
  const { pathname } = useLocation()
  return (
    <nav className="hidden items-center gap-1 lg:flex">
      {nav.map((entry) =>
        'to' in entry ? (
          <NavLink
            key={entry.label}
            to={entry.to}
            end
            className={({ isActive }) => navLink(isActive)}
          >
            {entry.label}
          </NavLink>
        ) : (
          <DropdownMenu key={entry.label}>
            <DropdownMenuTrigger
              className={navLink(entry.items.some(({ to }) => to === pathname))}
            >
              {entry.label}
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-80 p-2">
              {entry.items.map(({ to, label, description, icon: Icon }) => (
                <DropdownMenuItem key={to} asChild>
                  <Link
                    to={to}
                    className="flex cursor-pointer items-start gap-3 rounded-md p-2.5"
                  >
                    <span className="bg-muted text-foreground mt-0.5 rounded-md p-1.5">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium">{label}</span>
                      <span className="text-muted-foreground block text-xs leading-5">
                        {description}
                      </span>
                    </span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      )}
    </nav>
  )
}

const MobileNav = () => {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const item = ({ isActive }: { isActive: boolean }) =>
    cn(
      'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium',
      isActive
        ? 'bg-accent text-accent-foreground'
        : 'text-foreground hover:bg-muted',
    )

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full lg:hidden"
          aria-label="Open the menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 overflow-y-auto">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Site navigation</SheetDescription>
        <Brand onClick={close} />
        <nav className="mt-8 space-y-6">
          {nav.map((entry) =>
            'to' in entry ? (
              <NavLink
                key={entry.label}
                to={entry.to}
                end
                onClick={close}
                className={item}
              >
                {entry.label}
              </NavLink>
            ) : (
              <div key={entry.label} className="space-y-1">
                <p className="text-muted-foreground px-3 text-xs font-semibold tracking-wider uppercase">
                  {entry.label}
                </p>
                {entry.items.map(({ to, label, icon: Icon }) => (
                  <NavLink key={to} to={to} onClick={close} className={item}>
                    <Icon className="h-4 w-4 opacity-70" />
                    {label}
                  </NavLink>
                ))}
              </div>
            ),
          )}
        </nav>
        <ChainStatus className="mt-8" />
      </SheetContent>
    </Sheet>
  )
}

export const Header = () => (
  <header className="bg-background/80 sticky top-0 z-30 border-b backdrop-blur">
    <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-2 px-4 sm:gap-6 sm:px-6">
      <MobileNav />
      <Brand />
      <DesktopNav />
      <div className="ml-auto flex items-center gap-2">
        <ChainStatus className="hidden md:inline-flex" />
        <ThemeToggle />
        <WalletButton />
      </div>
    </div>
  </header>
)
