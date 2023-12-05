import { useState } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Contacts from "./components/Contacts"

const App = () => {
  const [people, setPeople] = useState([
    {
      name: 'Ayra Starr',
      number: '08012345678'
    },
    {
      name: 'Bad Bunny',
      number: '6467875397'
    },
    {
      name: 'Ozuna',
      number: '09778211000'
    },
    {
      name: 'Maluma',
      number: '4206969420'
    },
  ])

  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleAddContact = (event) => {
    event.preventDefault()
    const newPerson = {
      name: name,
      number: number
    }
    const duplicate = people.find(person => person.name === name)
    if (duplicate) {
      alert(`${name} is already added to phonebook`)
    } else {
      setPeople(people.concat(newPerson))
    }
    setName('')
    setNumber('')
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const contactsShown = filter.length === 0 ? people : people.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <div>
        <h2>Add a new</h2>
        <PersonForm handleAddContact={handleAddContact} name={name} handleNameChange={handleNameChange} number={number} handleNumberChange={handleNumberChange}/>
      </div>
      <div>
        <h2>Contacts</h2>
        <Contacts contactsShown={contactsShown}/>
      </div>
    </div>
  )
}

export default App