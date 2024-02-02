import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import { useApolloClient, useSubscription } from '@apollo/client'

import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import Navbar from './components/Navbar'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { BOOK_ADDED, GET_BOOKS } from './queries'

export const updateCache = (cache, query, addedBook) => {
  // Helper that is used to eliminate saving the same person twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook))
    }
  })
}

const App = () => {
  const client = useApolloClient()
  const [token, setToken] = useState(null)

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      Store.addNotification({
        title: 'New book',
        message: `Book ${addedBook.title} by ${addedBook.author.name} has been added`,
        type: 'success',
        insert: 'top',
        container: 'top-right',
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      })
      updateCache(client.cache, { query: GET_BOOKS }, addedBook)
    }
  })

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) setToken(token)
  }, [])



  return (
    <Router>
      <ReactNotifications />

      <Navbar token={token} setToken={setToken} />

      <Routes>
        <Route path='/' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/addbook' element={<NewBook />} />
        <Route path='/login' element={<LoginForm setToken={setToken}/>} />
      </Routes>

    </Router>
  )
}

export default App
