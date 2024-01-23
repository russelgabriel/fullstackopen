import styled from "styled-components"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"

import usersService from "../services/users"

const SingleUserView = () => {
	const id = useParams().id
	const result = useQuery({
		queryKey: ["users", id],
		queryFn: () => usersService.getUser(id)
	})

	if (result.isLoading) {
		return <div>Loading...</div>
	}

	if (result.isError) {
		return <div>Error fetching user</div>
	}

	const user = result.data

	return (
		<Wrapper>
			<h2>{user.name}</h2>
			<h3>Added blogs</h3>
			<ul>
				{user.blogs.map(blog => (
					<li key={blog.id}>
						<Link to={`/blogs/${blog.id}`}>
							{blog.title}
						</Link>
					</li>
				))}
			</ul>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	padding: 1rem;
`

export default SingleUserView