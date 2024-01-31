import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

import { CREATE_BOOK, GET_AUTHORS, GET_BOOKS } from '../queries'

const NewBook = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook, result ] = useMutation(CREATE_BOOK, {
    refetchQueries: [ { query: GET_BOOKS }, { query: GET_AUTHORS } ],
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      navigate('/books')
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    createBook({ variables: { title, author, genres, published: parseInt(published) } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
    navigate('/books')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook