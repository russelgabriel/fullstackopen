import { useState, useEffect } from "react"
import styled from "styled-components"

import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Contacts from "./components/Contacts"
import contactServices from "./services/contact"

const App = () => {
  const [people, setPeople] = useState([])

  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    contactServices
      .getAll()
      .then(initContacts => {
        setPeople(initContacts)
      })
  }, [])

  const handleAddContact = (event) => {
    event.preventDefault()
    const newPerson = {
      name,
      number
    }
    
    const duplicate = people.find(person => person.name === name)

    if (duplicate) {
      if (window.confirm(`${duplicate.name} is already added to phonebook, replace the old number with a new one?`)) {
        contactServices
          .updateContact(duplicate.id, newPerson)
          .then(response => {
            setPeople(people.map(person => person.id !== duplicate.id ? person : response))
          })
          .catch(err => {
            console.log(err);
          })
      }
      setName('')
      setNumber('')
      return
    }

    contactServices
      .createContact(newPerson)
      .then(response => {
        setPeople(people.concat(response))
      })
    setName('')
    setNumber('')
  }

  const handleDeleteContact = (id) => {
    const contact = people.find(person => person.id === id)
    if (window.confirm(`Delete ${contact.name}`)) {
      contactServices
        .deleteContact(id)
        .then(response => {
          console.log(response);
          setPeople(people.filter(person => person.id !== id))
        })
    }
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
    <>
      <BodyWrapper>
        <div>
          <Title>Phonebook</Title>
          <Form>
            <h2>Add New Contact</h2>
            <PersonForm handleAddContact={handleAddContact} name={name} handleNameChange={handleNameChange} number={number} handleNumberChange={handleNumberChange}/>
          </Form>
        </div>
        <div>
          <h2>Contacts</h2>
          <Filter filter={filter} handleFilterChange={handleFilterChange}/>
          <Contacts contactsShown={contactsShown} handleDelete={handleDeleteContact}/>
        </div>
      </BodyWrapper>
    </>
  )
}

const BodyWrapper = styled.div`
  max-width: 800px;
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  padding-top: 2rem;
  align-items: baseline;
`

const Title = styled.h1`
  margin-bottom: 1rem;
`

const Form = styled.div`
  padding: 1rem;
  box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.2);
  height: fit-content;
  border-radius: 8px;
  margin-top: 44px;
`

export default App