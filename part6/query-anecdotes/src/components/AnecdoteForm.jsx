import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createNew } from '../requests'

const AnecdoteForm = () => {
	const queryClient = useQueryClient()

	const newAnecdoteMutation = useMutation({
		mutationFn: createNew,
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData(['anecdotes'])
			queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
		}
	})

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
		newAnecdoteMutation.mutate({ content, votes: 0 })
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
