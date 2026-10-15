import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Course from './pages/Course'
import Certificate from './pages/Certificate'
import Legal from './pages/Legal'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/course/:id" element={<Course />} />
        <Route path="/certificate/:id" element={<Certificate />} />
        <Route path="/legal" element={<Legal />} />
      </Routes>
    </BrowserRouter>
  )
}