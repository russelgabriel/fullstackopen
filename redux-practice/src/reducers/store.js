import { configureStore } from '@reduxjs/toolkit'

import noteReducer from './noteReducer'
import filterReducer from './filterReducer'

const store = configureStore({
	reducer: {
		notes: noteReducer,
		filter: filterReducer
	}
})

export default store