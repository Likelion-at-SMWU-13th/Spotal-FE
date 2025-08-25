import './App.css'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

function App() {
  return (
    <>
      <Outlet />
      <Toaster richColors position='top-center' />
    </>
  )
}

export default App
