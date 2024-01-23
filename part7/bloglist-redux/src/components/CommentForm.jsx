import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useQueryClient } from '@tanstack/react-query'

import { addComment } from '../redux/reducers/blogsReducer'

const CommentForm = ({ blogId }) => {
	const dispatch = useDispatch()
	const queryClient = useQueryClient()
	const [comment, setComment] = useState('')

	const handleSubmit = async (event) => {
		event.preventDefault()
		const commentObject = {
			content: comment
		}
		await dispatch(addComment(blogId, commentObject))
		queryClient.invalidateQueries(['blogs', blogId])
		setComment('')
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type="text" value={comment} onChange={(event) => setComment(event.target.value)} />
				<button type="submit">Add comment</button>
			</form>
		</div>
	)
}

export default CommentForm