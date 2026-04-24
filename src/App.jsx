import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ResponsiveAppBar from './components/AppBar';
import './App.css'
import Login from './views/Login';
import Profile from './views/Profile';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')

  const handleLogin = (nextUsername, password) => {
    if (!nextUsername.trim() || !password.trim()) return false

    setUsername(nextUsername.trim())
    setIsAuthenticated(true)
    return true
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUsername('')
  }

  return (
    <>
      {isAuthenticated && (
        <ResponsiveAppBar username={username} onLogout={handleLogout} />
      )}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated
              ? <Navigate to="/profile" replace />
              : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/profile"
          element={
            isAuthenticated
              ? <Profile username={username} />
              : <Navigate to="/" replace />
          }
        />
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? '/profile' : '/'} replace />}
        />
      </Routes>
    </>
  )
}

export default App
