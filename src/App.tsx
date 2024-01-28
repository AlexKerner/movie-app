import { HomePage } from "./pages/HomePage"
import { ThemeProvider } from "./shared/components/theme-provider"

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <HomePage />
    </ThemeProvider>
    
  )
}

export default App
