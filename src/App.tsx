import { Navigation } from './navigation'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Header } from './header'
import { Theme, ThemeProvider } from './components/theme-provider'
import { useLocalStorage } from 'usehooks-ts'
import { Toaster } from '@/components/ui/sonner'
import './index.css'
import { Content } from './Content'

const App = () => {
  const [settings] = useLocalStorage('fellowship-settings', {
    themeMode: 'light',
  })

  return (
    <>
      <ThemeProvider defaultTheme={settings?.themeMode as Theme}>
        <TooltipProvider>
          <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <Navigation />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
              <Header />
              <Content />
            </div>
          </div>
        </TooltipProvider>
      </ThemeProvider>
      <Toaster />
    </>
  )
}

export default App
