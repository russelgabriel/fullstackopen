import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import { useState } from 'react'

import { ALL_PERSONS, PERSON_ADDED } from './queries'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'
import LoginForm from './components/LoginForm'

// Function that takes care of manipulating cache
export const updateCache = (cache, query, addedPerson) => {
  // Helper that is used to eliminate saving the same person twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allPersons }) => {
    return {
      allPersons: uniqByName(allPersons.concat(addedPerson))
    }
  })
}

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

  useSubscription(PERSON_ADDED, {
    onData: ({ data, client }) => {
      const addedPerson = data.data.personAdded
      notify(`Person added: ${addedPerson.name}`)
      updateCache(client.cache, { query: ALL_PERSONS }, addedPerson)
    }
  })


  const result = useQuery(ALL_PERSONS)


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