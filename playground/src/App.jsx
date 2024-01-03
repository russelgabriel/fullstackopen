import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(response => setNotes(response))
  }, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			noteService.setToken(user.token)
		}
	}, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    }
    noteService
      .create(noteObject)
      .then(response => {
        setNotes(notes.concat(response))
        setNewNote('')
      })
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(note => note.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then(response => {
        setNotes(notes.map(note => note.id !== id ? note : response))
      })
      .catch(err => {
        alert(`the note '${note.content}' was already deleted from server`)
				setErrorMessage(err)
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({ username, password })
			window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
			noteService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (error) {
			setErrorMessage('Wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

	const loginForm = () => {
		return (
			<form onSubmit={handleLogin}>
			<div>
				username
				<input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
			</div>
			<div>
				password
				<input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
			</div>
			<button type="submit">login</button>
		</form>
		)
	}

	const noteForm = () => {
		return (
      <form onSubmit={addNote}>
        <input onChange={handleNoteChange} value={newNote}/>
        <button type='submit'>save</button>
      </form>
		)
	}

  return (
    <div>
      <Notification message={errorMessage}/>
      <h1>Notes!</h1>
			<div>
				{
					user === null
					? loginForm()
					: <div>
							<p>{user.name} logged-in</p>
							{noteForm()}
						</div>
				}
			</div>
			<br />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>)}
      </ul>
    </div>
  )
}

export default App