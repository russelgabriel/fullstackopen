import { useQuery, useApolloClient } from '@apollo/client'
import { useState } from 'react'

import { ALL_PERSONS } from './queries'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'
import LoginForm from './components/LoginForm'


const Notification = ({ message }) => {
  if (!message) {
    return null
  }

  return (
    <div style={{ color: 'red' }}>
      {message}
    </div>
  )
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
	const [token, setToken] = useState(null)
	const client = useApolloClient()

  const result = useQuery(ALL_PERSONS)

	const logout = () => {
		setToken(null)
		localStorage.clear()
		client.resetStore()
	}

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  if (result.loading) {
    return <div>loading...</div>
  }

	if (!token) {
		return (
			<div>
				<Notification message={errorMessage} />
				<LoginForm 
					setToken={setToken}
					setError={notify}
				/>
			</div>
		)
	}

  return (
    <div>
      <Notification message={errorMessage} />
			<button onClick={logout}>Log out</button>
      <PersonForm setError={notify}/>
      <Persons persons={result.data.allPersons} />
      <PhoneForm setError={notify}/>
    </div>
  )
}

export default App