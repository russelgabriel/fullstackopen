import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

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
  const anecdotes = useSelector(state => 
		state.sort((a, b) => b.votes - a.votes)
	)

	const handleVote = (id) => {
		dispatch(vote(id))
	}

	return (
		<div>
			<h2>Anecdotes</h2>
			{anecdotes.map(anecdote => 
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