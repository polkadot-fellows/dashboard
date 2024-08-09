import { IconType } from 'react-icons/lib'
import { Link } from 'react-router-dom'

type LinkerProps = {
  where?: string
  icon: IconType
  iconSize: number
}

export const Linker = ({ where, icon, iconSize = 36 }: LinkerProps) => {
  const Icon = icon
  return where ? (
    <Link to={where} target={'_blank'}>
      <Icon size={iconSize} className="pointer" />
    </Link>
  ) : null
}
