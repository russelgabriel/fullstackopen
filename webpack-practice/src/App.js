import React, { useState, useEffect } from "react"
import axios from "axios"

const useNotes = (url) => {
	const [notes, setNotes] = useState([])
	useEffect(() => {
		axios.get(url).then(response => {
			setNotes(response.data)
		})
	}, [url])	
	return notes
}

const App = () => {
	const [count, setCount] = useState(0)
	const [values, setValues] = useState([])
	const notes = useNotes(BACKEND_URL)

	const handleClick = () => {
		setCount(count + 1)
		setValues(values.concat(count))
	}
	return (
		<div className="container">
			hello webpack {count} clicks
			<button onClick={handleClick}>click</button>
			<div>
				{notes.length} notes on server {BACKEND_URL}
			</div>
		</div>
	)
}

export default App