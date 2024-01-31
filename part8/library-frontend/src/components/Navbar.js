import React from 'react'
import styled from 'styled-components'
import { useNavigate, Link } from 'react-router-dom'

const Navbar = ({ token, setToken }) => {
  const navigate = useNavigate()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    navigate('/')
  }

  if (token) return (
    <Nav>
      <Link to={'/'} style={linkStyle}>authors</Link>
      <Link to={'books'} style={linkStyle}>books</Link>
      <Link to={'addbook'} style={linkStyle}>add book</Link>
      <button onClick={logout} style={linkStyle}>logout</button>
    </Nav>
  )
  return (
    <Nav>
      <Link to={'/'} style={linkStyle}>authors</Link>
      <Link to={'books'} style={linkStyle}>books</Link>
      <Link to={'login'} style={linkStyle}>login</Link>
    </Nav>
  )
}

const linkStyle = {
  padding: 5,
  margin: 5,
  border: '1px solid black',
  borderRadius: 5,
  backgroundColor: '#ddd',
  textDecoration: 'none',
  color: 'black'
}

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: fit-content;
  background-color: #eee;
  padding: 10px;
  margin-bottom: 10px;
`

export default Navbar