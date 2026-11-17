import { type ClassValue, clsx } from 'clsx'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const shortAddress = (address: string, chars = 6) =>
  address.length > chars * 2 + 3
    ? `${address.slice(0, chars)}…${address.slice(-chars)}`
    : address

export const copyToClipboard = (text: string, label = 'Address') =>
  navigator.clipboard.writeText(text).then(
    () => toast.success(`${label} copied`),
    () => toast.error('Unable to copy'),
  )

/** Formats a planck amount as a token amount with up to `precision` decimals */
export const formatBalance = (value: bigint, decimals = 10, precision = 3) => {
  const unit = 10n ** BigInt(decimals - precision)
  const scaled = Number(value / unit) / 10 ** precision
  return scaled.toLocaleString('en-US', { maximumFractionDigits: precision })
}

export const usd = (value: number) =>
  value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
