import { useSelector, useDispatch } from 'react-redux'
import { vote } from './reducers/anecdoteReducer'

import NewAnecdoteForm from './components/NewAnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  return (
    <div>
			<AnecdoteList />
			<NewAnecdoteForm />
    </div>
  )
}

export default App