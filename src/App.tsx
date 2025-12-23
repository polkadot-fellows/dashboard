import { TooltipProvider } from '@/components/ui/tooltip'
import { Header } from '@/header'
import { Theme, ThemeProvider } from './components/theme-provider'
import { useLocalStorage } from 'usehooks-ts'
import { Toaster } from '@/components/ui/sonner'
import '@/App.css'
import '@/index.css'
import { Content } from '@/Content'
import { Footer } from '@/footer'
import { AccountContextProvider } from './contexts/AccountContextProvider'

const App = () => {
  const [settings] = useLocalStorage('fellowship-settings', {
    themeMode: 'light',
  })

  return (
    <>
      <ThemeProvider defaultTheme={settings?.themeMode as Theme}>
        <AccountContextProvider>
          <TooltipProvider>
            <div className="bg-muted/40 flex min-h-screen w-full flex-col">
              <Header />
              <div className="mt-24 mb-24 flex flex-col">
                <Content />
                <Footer />
              </div>
            </div>
          </TooltipProvider>
        </AccountContextProvider>
      </ThemeProvider>
      <Toaster />
    </>
  )
}

export default App
