import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { GET_AUTHORS, EDIT_AUTHOR } from '../queries'

import Select from 'react-select'

const BirthYearForm = ({ authors }) => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: GET_AUTHORS } ],
    onError: (error) => {
      console.log(error)
    }
  })

  const options = authors.map((author) => {
    return (
      {
        value: author.name,
        label: author.name
      }
    )
  })

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name: name.value, born: parseInt(born) } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set Birth Year</h2>
      <form onSubmit={submit}>
        <div>
          <Select
            value={name}
            onChange={setName}
            options={options}
          />
        </div>
        <div>
          born <input value={born} onChange={({ target }) => setBorn(target.value)}/>
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default BirthYearForm