import './App.css'

import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import { routes } from './pages/routes'

function App() {
  return (
    <Routes>
      <Route path={routes.home} element={<Home />} />
    </Routes>
  )
}

export default App
