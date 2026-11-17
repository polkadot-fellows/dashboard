import {
  BookOpenText,
  Boxes,
  CalendarDays,
  Cpu,
  GitPullRequest,
  Landmark,
  type LucideIcon,
  PiggyBank,
  Users,
} from 'lucide-react'
import { GithubUrl, ManifestoUrl } from './consts'

export type NavItem = {
  to: string
  label: string
  description: string
  icon: LucideIcon
}

export type NavEntry =
  { label: string; to: string } | { label: string; items: NavItem[] }

export const nav: NavEntry[] = [
  { label: 'Members', to: '/' },
  {
    label: 'Fellowship',
    items: [
      {
        to: '/membership',
        label: 'Membership',
        description: 'Joining, retaining and advancing through the ranks',
        icon: Users,
      },
      {
        to: '/salary',
        label: 'Salary',
        description: 'Allowances per rank and how to claim them',
        icon: PiggyBank,
      },
      {
        to: '/governance',
        label: 'Governance',
        description: 'Referenda, whitelisting and the sub-treasury',
        icon: Landmark,
      },
      {
        to: '/monthly-calls',
        label: 'Monthly calls',
        description: 'The OpenDev call and its recordings',
        icon: CalendarDays,
      },
    ],
  },
  {
    label: 'Development',
    items: [
      {
        to: '/rfcs',
        label: 'RFCs',
        description: 'Open proposals and how the process works',
        icon: GitPullRequest,
      },
      {
        to: '/runtimes',
        label: 'Runtimes',
        description: 'The runtimes repository and its release process',
        icon: Cpu,
      },
      {
        to: '/modules',
        label: 'Modules',
        description: 'The pallets that power the Fellowship on-chain',
        icon: Boxes,
      },
    ],
  },
  { label: 'Resources', to: '/resources' },
]

export const RfcBookIcon = BookOpenText

export type ResourceLink = { label: string; href: string; description?: string }

export const resources: { title: string; links: ResourceLink[] }[] = [
  {
    title: 'Fellowship',
    links: [
      {
        label: 'Manifesto',
        href: ManifestoUrl,
        description: 'The founding document of the Fellowship',
      },
      {
        label: 'Fellows on GitHub',
        href: GithubUrl,
        description: 'Runtimes, RFCs, evidences and more',
      },
      {
        label: 'RFCs book',
        href: 'https://polkadot-fellows.github.io/RFCs/',
        description: 'All approved and proposed RFCs, rendered',
      },
      {
        label: 'Polkadot SDK docs',
        href: 'https://paritytech.github.io/polkadot-sdk/master/polkadot_sdk_docs/index.html',
        description: 'Pallets and reference documentation',
      },
    ],
  },
  {
    title: 'Fellowship UIs',
    links: [
      {
        label: 'Subsquare',
        href: 'https://collectives.subsquare.io/fellowship',
        description: 'Referenda, members, salary and evidences',
      },
      {
        label: 'Polkassembly',
        href: 'https://collectives.polkassembly.io/',
        description: 'Fellowship referenda and discussions',
      },
      {
        label: 'Polkadot-JS Apps',
        href: 'https://dotapps-io.ipns.dweb.link/?rpc=wss%3A%2F%2Fpolkadot-collectives-rpc.polkadot.io#/explorer',
        description: 'Explorer for the Collectives system chain',
      },
    ],
  },
  {
    title: 'Onboarding',
    links: [
      {
        label: 'Polkadot Blockchain Academy',
        href: 'https://polkadot.network/development/blockchain-academy/',
      },
      {
        label: 'Kudos',
        href: 'https://www.morekudos.com/explore/open-contributions-for-polkadot-sdk',
        description: 'Open contributions for the Polkadot SDK',
      },
      {
        label: 'Polkadot SDK mentor issues',
        href: 'https://mentor.tasty.limo/',
      },
      {
        label: 'Polkadot project ideas',
        href: 'https://gist.github.com/xlc/ebc2476afb7ecacdaa5ce95ae3b991c8#polkadot-project-ideas',
      },
    ],
  },
  {
    title: 'Chat',
    links: [
      {
        label: 'Open channel',
        href: 'https://matrix.to/#/#fellowship-open-channel:parity.io',
        description: 'Public Matrix room, open to everyone',
      },
      {
        label: 'Fellowship members',
        href: 'https://matrix.to/#/#fellowship-members:parity.io',
        description: 'Matrix room for members',
      },
    ],
  },
]
