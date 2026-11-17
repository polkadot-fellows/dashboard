import { useEffect } from 'react'

const SITE_TITLE = 'Polkadot Technical Fellowship'

export const usePageTitle = (title?: string) => {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE_TITLE}` : SITE_TITLE
  }, [title])
}
