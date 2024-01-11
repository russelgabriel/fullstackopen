import NewAnecdoteForm from './components/NewAnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {
  return (
    <div>
			<Notification />
			<AnecdoteList />
			<NewAnecdoteForm />
    </div>
  )
}

export default App