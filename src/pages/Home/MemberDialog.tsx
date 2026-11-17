import { type ReactNode, useEffect, useState } from 'react'
import { Polkicon } from '@polkadot-ui/react'
import { ArrowUpRight, Copy, Globe, Mail, MessageCircle } from 'lucide-react'
import { api } from '@/clients'
import { GithubIcon, XIcon } from '@/components/icons'
import { RankBadge } from '@/components/RankBadge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { getRank } from '@/consts'
import { copyToClipboard, formatBalance, shortAddress, usd } from '@/lib/utils'
import type { Member } from '@/state/members'
import { MemberName } from './MembersTable'

const handle = (value: string) => value.replace(/^@/, '')
const url = (value: string) =>
  /^https?:\/\//.test(value) ? value : `https://${value}`

const socials = (member: Member) =>
  [
    member.github && {
      label: 'GitHub',
      href: `https://github.com/${handle(member.github)}`,
      icon: <GithubIcon className="h-4 w-4" />,
    },
    member.twitter && {
      label: 'X',
      href: `https://x.com/${handle(member.twitter)}`,
      icon: <XIcon className="h-4 w-4" />,
    },
    member.matrix && {
      label: 'Matrix',
      href: `https://matrix.to/#/${member.matrix}`,
      icon: <MessageCircle className="h-4 w-4" />,
    },
    member.web && {
      label: 'Website',
      href: url(member.web),
      icon: <Globe className="h-4 w-4" />,
    },
    member.email && {
      label: 'Email',
      href: `mailto:${member.email}`,
      icon: <Mail className="h-4 w-4" />,
    },
  ].filter((social) => !!social)

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="bg-muted/50 rounded-lg p-3">
    <dt className="text-muted-foreground text-xs">{label}</dt>
    <dd className="mt-1 text-sm font-medium tabular-nums">{children}</dd>
  </div>
)

type Balance = { free: bigint; reserved: bigint }

const useBalance = (address?: string) => {
  const [balance, setBalance] = useState<{ address: string } & Balance>()

  useEffect(() => {
    if (!address) return
    let cancelled = false
    api.query.System.Account.getValue(address).then(({ data }) => {
      if (!cancelled)
        setBalance({ address, free: data.free, reserved: data.reserved })
    }, console.error)
    return () => {
      cancelled = true
    }
  }, [address])

  return balance?.address === address ? balance : undefined
}

const MemberDetails = ({ member }: { member: Member }) => {
  const { address, rank, isActive } = member
  const balance = useBalance(address)
  const { salary } = getRank(rank)
  const links = socials(member)

  return (
    <>
      <DialogHeader className="items-center text-center sm:text-center">
        <Polkicon address={address} size={72} />
        <DialogTitle className="mt-3 text-lg">
          <MemberName member={member} />
        </DialogTitle>
        <DialogDescription asChild>
          <div className="flex flex-col items-center gap-3">
            <RankBadge rank={rank} showName />
            <button
              type="button"
              onClick={() => copyToClipboard(address)}
              title="Copy address"
              className="hover:text-foreground inline-flex cursor-pointer items-center gap-2 font-mono text-xs transition-colors"
            >
              {shortAddress(address, 8)}
              <Copy className="h-3.5 w-3.5" />
            </button>
          </div>
        </DialogDescription>
      </DialogHeader>

      {links.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2">
          {links.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="hover:bg-muted inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
            >
              {icon}
              {label}
            </a>
          ))}
        </div>
      )}

      <dl className="grid grid-cols-2 gap-3">
        <Field label="Status">
          {isActive === undefined ? '—' : isActive ? 'Active' : 'Passive'}
        </Field>
        <Field label="Monthly allowance">
          {salary ? `${usd(salary / 12)} USDT` : '—'}
        </Field>
        <Field label="Transferable on Collectives">
          {balance ? (
            `${formatBalance(balance.free)} DOT`
          ) : (
            <Skeleton className="h-5 w-20" />
          )}
        </Field>
        <Field label="Reserved on Collectives">
          {balance ? (
            `${formatBalance(balance.reserved)} DOT`
          ) : (
            <Skeleton className="h-5 w-20" />
          )}
        </Field>
      </dl>

      <a
        href={`https://collectives.subsquare.io/user/${address}`}
        target="_blank"
        rel="noreferrer"
        className="text-link inline-flex items-center justify-center gap-1 text-sm font-medium hover:underline"
      >
        View activity on Subsquare
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </>
  )
}

export const MemberDialog = ({
  member,
  onClose,
}: {
  member: Member | null
  onClose: () => void
}) => {
  // Keep showing the last member while the dialog animates out
  const [shown, setShown] = useState(member)
  if (member && member !== shown) setShown(member)

  return (
    <Dialog open={!!member} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="gap-6 sm:max-w-md"
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        {shown && <MemberDetails member={shown} />}
      </DialogContent>
    </Dialog>
  )
}
