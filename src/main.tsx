import { StrictMode, Suspense } from 'react'
import { HashRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import './index.css'
import 'dot-connect/font.css'
import { ReactiveDotProvider, ChainProvider } from '@reactive-dot/react'
import { reactiveConfig } from './reactiveConfig.ts'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <ReactiveDotProvider config={reactiveConfig}>
      <ChainProvider chainId="collectives">
        <Suspense fallback={null}>
          <HashRouter>
            <App />
          </HashRouter>
        </Suspense>
      </ChainProvider>
    </ReactiveDotProvider>
  </StrictMode>,
)
