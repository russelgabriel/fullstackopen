import { useDispatch } from "react-redux"

import { changeFilter } from "../reducers/filterReducer"

const Filter = () => {
	const dispatch = useDispatch()
	
	const handleChange = (event) => {
		const filter = event.target.value
		dispatch(changeFilter(filter))
	}

	return (
		<div>
			filter <input onChange={handleChange} />
		</div>
	)
}

export default Filter