import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

import NewAnecdoteForm from './components/NewAnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeAnecdotes())
	})
  return (
    <div>
			<Notification />
			<AnecdoteList />
			<NewAnecdoteForm />
    </div>
  )
}

export default App