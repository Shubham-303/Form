import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@mantine/core/styles.css' 
import TableComponent from './Components/TanstackTable.tsx'
import { createTheme, MantineProvider } from '@mantine/core'
import CopyPage from './Components/CopyPage.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RenderComponent />
  </StrictMode>,
)


function RenderComponent () {
  // Define the theme
const theme = createTheme({
  // Define your theme here if needed
});
  return <>
  <MantineProvider theme={theme}>
    <App />
    </MantineProvider>
   </>
}
