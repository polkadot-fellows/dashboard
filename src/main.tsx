import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.tsx'

import './index.css'

const queryClient = new QueryClient()

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <App />
      </HashRouter>
    </QueryClientProvider>
  </StrictMode>,
)
