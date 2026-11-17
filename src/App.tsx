import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Toaster } from '@/components/ui/sonner'
import { AccountContextProvider } from '@/contexts/AccountContextProvider'
import { Governance } from '@/pages/Governance'
import { Home } from '@/pages/Home'
import { Membership } from '@/pages/Membership'
import { Modules } from '@/pages/Modules'
import { MonthlyCalls } from '@/pages/MonthlyCalls'
import { Resources } from '@/pages/Resources'
import { Rfc } from '@/pages/Rfc'
import { Runtimes } from '@/pages/Runtimes'
import { Salary } from '@/pages/Salary'
import { ThemeProvider } from '@/state/theme'

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

const App = () => (
  <ThemeProvider>
    <AccountContextProvider>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/salary" element={<Salary />} />
            <Route path="/governance" element={<Governance />} />
            <Route path="/monthly-calls" element={<MonthlyCalls />} />
            <Route path="/rfcs" element={<Rfc />} />
            <Route path="/runtimes" element={<Runtimes />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/resources" element={<Resources />} />
            {/* Links to the previous version of the site */}
            <Route path="/about" element={<Navigate to="/" replace />} />
            <Route
              path="/monthlycalls"
              element={<Navigate to="/monthly-calls" replace />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster />
    </AccountContextProvider>
  </ThemeProvider>
)

export default App
