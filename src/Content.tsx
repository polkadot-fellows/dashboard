import { Route, Routes } from 'react-router-dom'

import { About } from '@/pages/About'
import { Governance } from '@/pages/Governance'
import { Membership } from '@/pages/Membership'
import { Modules } from '@/pages/Modules'
import { OpenDevMonthlyCalls } from '@/pages/OpenDevMonthlyCalls'
import { Rfc } from '@/pages/Rfc'
import { Salary } from '@/pages/Salary'

import { useEffect, useState } from 'react'
import { collectiveClient } from '@/clients'
import { toast } from 'sonner'

const pages = (lcStatus: boolean) => [
  {
    path: '',
    element: <About lcStatus={lcStatus} />,
  },
  {
    path: 'about',
    element: <About lcStatus={lcStatus} />,
  },
  {
    path: 'membership',
    element: <Membership />,
  },
  {
    path: 'governance',
    element: <Governance />,
  },
  {
    path: 'salary',
    element: <Salary />,
  },
  {
    path: '/modules',
    element: <Modules />,
  },
  {
    path: 'rfcs',
    element: <Rfc />,
  },
  {
    path: 'monthlycalls',
    element: <OpenDevMonthlyCalls />,
  },
]

export const Content = () => {
  const [lightClientLoaded, setLightClientLoaded] = useState<boolean>(false)

  useEffect(() => {
    collectiveClient.finalizedBlock$.subscribe((finalizedBlock) => {
      if (finalizedBlock.number && !lightClientLoaded) {
        setLightClientLoaded(true)
      }
    })
  }, [lightClientLoaded])

  useEffect(() => {
    lightClientLoaded && toast.success('Light client: Synced')
  }, [lightClientLoaded])

  return (
    <>
      <Routes>
        {pages(lightClientLoaded).map(({ path, element }, i) => {
          return <Route key={`page_${i}`} path={path} element={element} />
        })}
      </Routes>
    </>
  )
}
