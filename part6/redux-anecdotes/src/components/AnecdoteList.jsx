import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

import Filter from './Filter'

const Anecdote = ({ anecdote, handleClick }) => {
	return (
		<div>
			<div>{anecdote.content}</div>
			<div>
				has {anecdote.votes} votes
				<button onClick={() => handleClick(anecdote.id)}>vote</button>
			</div>
		</div>
	)
}

const AnecdoteList = () => {
	const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
	const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

	const filteredAnecdotes = useSelector(state => {
		const filter = state.filter
		return filter === ''
			? sortedAnecdotes
			: sortedAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
	})

	const handleVote = (id) => {
		dispatch(vote(id))
	}

	return (
		<div>
			<h2>Anecdotes</h2>
			<Filter />
			{filteredAnecdotes.map(anecdote => 
				<Anecdote 
					key={anecdote.id} 
					anecdote={anecdote} 
					handleClick={handleVote}
				/>
			)}
		</div>
	)
}

export default AnecdoteList