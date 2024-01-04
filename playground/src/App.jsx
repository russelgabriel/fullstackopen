import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import noteService from './services/notes'
import loginService from './services/login'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
	const [user, setUser] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(response => setNotes(response))
  }, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
		if (loggedUserJSON !== 'null') {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			noteService.setToken(user.token)
		}
	}, [])

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

	const addNote = (noteObject) => {
		noteFormRef.current.toggleVisibility()
		noteService
			.create(noteObject)
			.then(response => {
				setNotes(notes.concat(response))
			})
	}

	const handleLogin = async ({ username, password }) => {
		try {
			const loggedUser = await loginService.login({ username, password })
			window.localStorage.setItem('loggedNoteappUser', JSON.stringify(loggedUser))
			noteService.setToken(loggedUser.token)
			setUser(loggedUser)
		} catch (error) {
			setErrorMessage('Wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

	const noteFormRef = useRef()

	const noteForm = () => {
		return (
      <Togglable buttonLabel="new note" ref={noteFormRef}>
				<NoteForm createNote={addNote}/>
			</Togglable>
		)
	}

	const loginForm = () => {
		return (
			<Togglable buttonLabel="log in">
				<LoginForm handleLogin={handleLogin} />
			</Togglable>
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