import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export const ThemedLink: React.FC<{
  children: ReactNode
  to: string
  target?: '_blank' | '_parent'
  className?: string
}> = ({ children, to, target = '_parent', className }) => (
  <Link
    className={`text-primary font-bold ${className}`}
    to={to}
    target={target}
  >
    {children}
  </Link>
)