import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'


import Navbar from './components/Navbar'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const App = () => {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) setToken(token)
  }, [])



  return (
    <Router>

      <Navbar token={token} setToken={setToken} />

      <Routes>
        <Route path='/' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/addbook' element={<NewBook />} />
        <Route path='/login' element={<LoginForm setToken={setToken}/>} />
      </Routes>

    </Router>
  )
}

export default App
