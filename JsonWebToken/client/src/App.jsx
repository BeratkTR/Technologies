import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import "./App.css";
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Bist100 from "./pages/Bist100"
import Nasdaq from "./pages/Nasdaq"
import {AuthProvider} from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar/>
          <main className='main-content'>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/signup" element={<Signup/>} />
              <Route path="/bist100" element={<Bist100/>} />
              <Route path="/nasdaq" element={<Nasdaq/>} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
