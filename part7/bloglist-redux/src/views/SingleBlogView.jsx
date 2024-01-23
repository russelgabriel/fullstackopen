import styled from "styled-components"
import { useParams } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useDispatch } from "react-redux"

import { likeBlog } from "../redux/reducers/blogsReducer"
import blogsService from "../services/blogs"

import CommentForm from "../components/CommentForm"

const SingleBlogView = () => {
	const dispatch = useDispatch()
	const queryClient = useQueryClient()
	const id = useParams().id
	const result = useQuery({
		queryKey: ["blogs", id],
		queryFn: () => blogsService.getBlog(id)
	})

	
	if (result.isLoading) {
		return <div>Loading...</div>
	}
	
	if (result.isError) {
		return <div>Error fetching blog</div>
	}
	
	const blog = result.data

	const handleLikeBlog = async () => {
		try {
			// await turns the return into a promise
			// which we can use to invalidate the cache
			await dispatch(likeBlog(blog));
			queryClient.invalidateQueries(["blogs", id])
		} catch (error) {
			console.log(error);
		}
	}

	console.log(blog)

	return (
		<Wrapper>
			<h2>{blog.title}</h2>
			<p>{blog.url}</p>
			<div>
				<p>{blog.likes}</p>
				<button onClick={handleLikeBlog}>like</button>
			</div>
			<p>{blog.author}</p>
			<br />
			<h3>Comments</h3>
			<CommentForm blogId={blog.id} />
			<ul>
				{blog.comments.map(comment => (
					<li key={comment.id}>{comment.content}</li>
				))}
			</ul>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	padding: 1rem;
`

export default SingleBlogView