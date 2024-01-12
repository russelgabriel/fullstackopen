import { useDispatch } from 'react-redux'

import { filterChange } from '../reducers/filterReducer'

const VisibilityFilter = () => {
	const dispatch = useDispatch()
	const filteredSelect = (filter) => {
		dispatch(filterChange(filter))
	
	}
	return (
		<div>
			{/* When name is all the same, they form a radio button group */}
			all <input type="radio" name="filter" onChange={() => filteredSelect('ALL')} />
			important <input type="radio" name="filter" onChange={() => filteredSelect('IMPORTANT')} />
			nonimportant <input type="radio" name="filter" onChange={() => filteredSelect('NONIMPORTANT')} />
		</div>
	)
}

export default VisibilityFilter