import { useQuery } from '@apollo/client'
import { useState } from 'react'

import { GET_BOOKS, GET_BOOKS_BY_GENRE } from '../queries'

import Select from 'react-select'

const Books = () => {
  const [genre, setGenre] = useState({ value: 'all genres', label: 'all genres' })
  const filteredBooks = useQuery(GET_BOOKS_BY_GENRE, {
    variables: { genre: genre.value },
    skip: genre.value === 'all genres'
  })

  const books = useQuery(GET_BOOKS)

  if (books.loading) {
    return (
      <div>loading...</div>
    )
  }

  const allBooks = books.data.allBooks

  let options = allBooks.map((book) => book.genres).flat() 
  options = [...new Set(options.concat('all genres'))]
  options = options.map((option) => {
    return (
      {
        value: option,
        label: option
      }
    )
  })

  const handleGenreChange = (selectedOption) => {
    filteredBooks.refetch()
    books.refetch()
    setGenre(selectedOption)
  }


  const booksToShow = filteredBooks.data
    ? filteredBooks.data.allBooks
    : books.data.allBooks

  return (
    <div>
      <h2>books</h2>
      <Select 
        value={genre}
        onChange={handleGenreChange}
        options={options}
      />
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
