import { createNote, toggleImportanceOf } from './reducers/noteReducer'

import NewNote from './NewNote'
import Notes from './Notes'
import VisibilityFilter from './VisibilityFilter'

const App = () => {
	const filteredSelect = (value) => {
		console.log(value)
	}

  return (
    <div>
			<NewNote />
			<VisibilityFilter />
			<Notes />
    </div>
  )
}

export default App