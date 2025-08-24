import './App.css'
import { Outlet } from 'react-router-dom'
import MapPage from './pages/MapPage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <>
      <Outlet />
    </>
  )
}

export default App
