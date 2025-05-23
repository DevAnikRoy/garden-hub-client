import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import BrowseTips from './pages/BrowseTips'
import Home from './pages/Home'
import ExploreGardeners from './pages/ExploreGardeners'
import Login from './pages/Login'
import Register from './pages/Register'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import TipDetails from './pages/TipDetails'
import PrivateRoute from './components/PrivateRoute'

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    })
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="explore-gardeners" element={<ExploreGardeners />} />
          <Route path="browse-tips" element={<BrowseTips />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
          <Route path="tip/:id" element={
            <PrivateRoute>
              <TipDetails />
            </PrivateRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App