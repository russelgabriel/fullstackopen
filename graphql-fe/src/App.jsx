import { useQuery } from '@apollo/client'
import { useState } from 'react'

import { ALL_PERSONS } from './queries'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'


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

  const result = useQuery(ALL_PERSONS)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <Notification message={errorMessage} />
      <PersonForm setError={notify}/>
      <Persons persons={result.data.allPersons} />
      <PhoneForm setError={notify}/>
    </div>
  )
}

export default App