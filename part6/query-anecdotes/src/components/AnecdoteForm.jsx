import { useQueryClient, useMutation } from '@tanstack/react-query'

import { createNew } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
	const queryClient = useQueryClient()
	const notificationDispatch = useNotificationDispatch()

	const newAnecdoteMutation = useMutation({
		mutationFn: createNew,
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData(['anecdotes'])
			queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
		},
		onError: (error) => {
			notificationDispatch({ type: 'SET_NOTIFICATION', payload: error.response.data.error })
			setTimeout(() => {
				notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
			}, 5000)
		}
	})

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
		newAnecdoteMutation.mutate({ content, votes: 0 })
		notificationDispatch({ type: 'SET_NOTIFICATION', payload: `you created '${content}'` })
		setTimeout(() => {
			notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
		}, 5000)
    event.target.anecdote.value = ''
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
