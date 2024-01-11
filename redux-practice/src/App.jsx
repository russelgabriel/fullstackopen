import { createNote, toggleImportanceOf } from './reducers/noteReducer'

import NewNote from './NewNote'
import Notes from './Notes'

const App = () => {
  return (
    <div>
			<NewNote />
			<Notes />
    </div>
  )
}

export default App