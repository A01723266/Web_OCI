import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResponsiveAppBar from './components/AppBar';
import './App.css'
import Login from './views/Login';
import Profile from './views/Profile';

function App() {

  return (
    <>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
    </>
  )
}

export default App
