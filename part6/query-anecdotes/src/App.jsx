import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

import { getAll, update } from './requests'
import { useNotificationDispatch } from './NotificationContext'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
	const queryClient = useQueryClient()
	const notificationDispatch = useNotificationDispatch()

	const updateAnecdoteMutation = useMutation({
		mutationFn: update,
		onSuccess: (updatedAnecdote) => {
			const anecdotes = queryClient.getQueryData(['anecdotes'])
			queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote))
		}
	})

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
		notificationDispatch({ type: 'SET_NOTIFICATION', payload: `you voted '${anecdote.content}'` })
		setTimeout(() => {
			notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
		}, 5000)
  }

	const result = useQuery({
		queryKey: ['anecdotes'],
		queryFn: getAll
	})

	if (result.isLoading) {
		return (
			<div>
				<h3>Anecdote app</h3>
				<div>Loading...</div>
			</div>
		)
	}

	if (result.isError) {
		return (
			<div>
				<h3>Anecdote app</h3>
				<div>Error fetching data</div>
			</div>
		)
	}

	const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
