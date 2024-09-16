import { ellipsisFn } from '@polkadot-ui/utils'
import { CircleCheck } from 'lucide-react'

type AccountNameProps = {
  display?: string
  address?: string
}

export const AccountName = ({ display, address }: AccountNameProps) => {
  return (
    <div style={{ display: 'flex' }}>
      <p>
        {display ? (
          <CircleCheck style={{ color: 'green', marginRight: '0.5rem' }} />
        ) : null}
      </p>
      <p>{display || (address ? ellipsisFn(address, 6) : null) || '-'}</p>
    </div>
  )
}
