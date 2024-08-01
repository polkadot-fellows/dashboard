import { type ClassValue, clsx } from 'clsx'
import {
  LucideProps,
  Globe,
  Users,
  PiggyBank,
  Landmark,
  Component,
  ScanText,
  Speech,
  NotebookText,
  Atom,
} from 'lucide-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type RouterType = {
  link?: string
  name: string
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
}

export const routes: RouterType[] = [
  { link: 'about', name: 'About', icon: Globe },
  { link: 'membership', name: 'Membership', icon: Users },
  { link: 'salary', name: 'Salary', icon: PiggyBank },
  { link: 'governance', name: 'Governance', icon: Landmark },
  { link: 'modules', name: 'Modules', icon: Component },
  { link: 'rfcs', name: 'RFCs', icon: ScanText },
  { link: 'monthlycalls', name: 'Monthly Calls', icon: Speech },
  { link: 'resources', name: 'Resources', icon: NotebookText },
  { link: 'element', name: 'Element (Members)', icon: Atom },
  { link: 'elementopen', name: 'Element (Open)', icon: Atom },
  { link: 'explorer', name: 'TESTER', icon: Atom },
]
