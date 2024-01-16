import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { getNotes, addNote, updateNote } from './requests'

const App = () => {
	const queryClient = useQueryClient()

	const newNoteMutation = useMutation({
		mutationFn: addNote,
		onSuccess: (newNote) => {
			const notes = queryClient.getQueryData(['notes'])
			queryClient.setQueryData(['notes'], notes.concat(newNote))
		}
	})

	const updateNoteMutation = useMutation({
		mutationFn: updateNote,
		onSuccess: (updatedNote) => {
			const notes = queryClient.getQueryData(['notes'])
			queryClient.setQueryData(['notes'], notes.map(note => note.id === updatedNote.id ? updatedNote : note))
		}
	})

  const handleAddNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
		newNoteMutation.mutate({ content, important: true })
  }

  const toggleImportance = (note) => {
		updateNoteMutation.mutate({...note, important: !note.important})
  }

	const result = useQuery({
		queryKey: ['notes'],
		queryFn: getNotes,
		refetchOnWindowFocus: false, // React query's by default refetches data when the window regains focus. This is not what we want in this case, so we disable it.
	})

	console.log(JSON.parse(JSON.stringify(result)))

	if (result.isLoading) {
		return <div>loading data...</div>
	}

  const notes = result.data

  return(
    <div>
      <h2>Notes app</h2>
      <form onSubmit={handleAddNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map(note =>
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content} 
          <strong> {note.important ? 'important' : ''}</strong>
        </li>
      )}
    </div>
  )
}

export default App