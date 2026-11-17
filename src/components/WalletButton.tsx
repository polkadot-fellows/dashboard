import { useState } from 'react'
import { Polkicon } from '@polkadot-ui/react'
import { Check, ChevronDown, LogOut, Wallet } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { RankBadge } from '@/components/RankBadge'
import { useAccount, walletName } from '@/contexts/AccountContextProvider'
import { shortAddress } from '@/lib/utils'
import { useMembers } from '@/state/members'

const ConnectMenu = () => {
  const { getWallets, connect, connecting } = useAccount()
  const [wallets, setWallets] = useState<string[]>([])

  return (
    <DropdownMenu onOpenChange={(open) => open && setWallets(getWallets())}>
      <DropdownMenuTrigger asChild>
        <Button className="gap-2 rounded-full" disabled={connecting}>
          <Wallet className="h-4 w-4" />
          <span className="hidden sm:inline">
            {connecting ? 'Connecting…' : 'Connect wallet'}
          </span>
          <span className="sm:hidden">Connect</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        {wallets.length ? (
          <>
            <DropdownMenuLabel className="text-muted-foreground text-xs font-medium">
              Choose a wallet
            </DropdownMenuLabel>
            {wallets.map((id) => (
              <DropdownMenuItem
                key={id}
                className="cursor-pointer"
                onSelect={() =>
                  connect(id).catch(() =>
                    toast.error(`Unable to connect to ${walletName(id)}`),
                  )
                }
              >
                <Wallet className="text-muted-foreground mr-2 h-4 w-4" />
                {walletName(id)}
              </DropdownMenuItem>
            ))}
          </>
        ) : (
          <div className="p-3 text-sm">
            <p className="font-medium">No wallet found</p>
            <p className="text-muted-foreground mt-1 text-xs leading-5">
              Install a Polkadot wallet extension such as Talisman, SubWallet or
              Polkadot.js, then reload the page.
            </p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const WalletButton = () => {
  const { wallet, accounts, selectedAccount, selectAccount, disconnect } =
    useAccount()
  const { members } = useMembers()

  if (!wallet) return <ConnectMenu />

  const rankOf = (address: string) =>
    members.find((member) => member.address === address)?.rank
  const selectedRank = selectedAccount && rankOf(selectedAccount.address)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 rounded-full pr-3 pl-2">
          {selectedAccount ? (
            <>
              <Polkicon address={selectedAccount.address} size={24} />
              <span className="hidden max-w-32 truncate sm:inline">
                {selectedAccount.name ||
                  shortAddress(selectedAccount.address, 4)}
              </span>
              {selectedRank !== undefined && <RankBadge rank={selectedRank} />}
            </>
          ) : (
            <span className="pl-2">No accounts</span>
          )}
          <ChevronDown className="text-muted-foreground h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel className="text-muted-foreground text-xs font-medium">
          {walletName(wallet)} accounts
        </DropdownMenuLabel>
        <div className="max-h-72 overflow-y-auto">
          {accounts.length === 0 && (
            <p className="text-muted-foreground p-3 text-xs leading-5">
              This wallet hasn't shared any accounts with this site.
            </p>
          )}
          {accounts.map((account) => {
            const rank = rankOf(account.address)
            return (
              <DropdownMenuItem
                key={account.address}
                className="cursor-pointer gap-3"
                onSelect={() => selectAccount(account.address)}
              >
                <Polkicon address={account.address} size={28} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium">
                      {account.name || 'Account'}
                    </span>
                    {rank !== undefined && <RankBadge rank={rank} />}
                  </div>
                  <div className="text-muted-foreground font-mono text-xs">
                    {shortAddress(account.address)}
                  </div>
                </div>
                {account.address === selectedAccount?.address && (
                  <Check className="text-primary h-4 w-4 shrink-0" />
                )}
              </DropdownMenuItem>
            )
          })}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onSelect={disconnect}>
          <LogOut className="mr-2 h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
