import styled from "styled-components"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"

import usersService from "../services/users"

const UsersView = () => {

	const usersResult = useQuery({
		queryKey: ["users"],
		queryFn: usersService.getAll
	})

	if (usersResult.isLoading) {
		return <div>Loading...</div>
	}

	if (usersResult.isError) {
		return <div>Error fetching users</div>
	}

	const users = usersResult.data

	const usersTable = () => {
		return (
			<table>
				<thead>
					<tr>
						<th>User Name</th>
						<th>Blogs created</th>
					</tr>
				</thead>
				<tbody>
					{users.map(user => (
						<tr key={user.id}>
							<td style={{ padding: "0 10px" }}>
								<Link to={`/users/${user.id}`}>{user.name}</Link>
							</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		)
	}

	return (
		<Wrapper>
			<h2>Users</h2>
			{usersTable()}
		</Wrapper>
	)
}

const Wrapper = styled.div`
	padding: 1rem;
`

export default UsersView