import { PolkadotIdenticon } from '@polkadot-api/react-components'
import { getSs58AddressInfo } from 'polkadot-api'
import { useMemo } from 'react'

export const Identicon = ({
  address,
  size,
  className,
}: {
  address: string
  size: number
  className?: string
}) => {
  const publicKey = useMemo(() => {
    const info = getSs58AddressInfo(address)
    return info.isValid ? info.publicKey : null
  }, [address])

  return (
    <PolkadotIdenticon
      className={className ?? 'shrink-0'}
      publicKey={publicKey}
      size={size}
    />
  )
}
