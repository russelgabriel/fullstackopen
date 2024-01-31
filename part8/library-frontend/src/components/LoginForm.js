import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

import { LOGIN } from '../queries'

const LoginForm = ({ setToken }) => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error)
    }
  })

  useEffect(() => {
    if (result.data?.login) {
      const token = result.data.login?.value
      localStorage.setItem('library-user-token', token)
      setToken(token)
      navigate('/')
    }
  }, [result.data?.login, setToken, navigate])



  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })

    setUsername('')
    setPassword('')
  }


  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          username <input value={username} onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          password <input type='password' value={password} onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm