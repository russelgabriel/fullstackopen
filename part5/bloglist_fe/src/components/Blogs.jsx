import Blog from "./Blog"
import styled from 'styled-components'

const Blogs = ({ blogs }) => {
	return (
		<Wrapper>
			{blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
		</Wrapper>
	)
}

const Wrapper = styled.div`
	grid-area: content;
	display: flex;
	flex-direction: column;
	padding: 1rem;
	gap: 1rem;
	background: whitesmoke;
	border-radius: 0.5rem;
	border: 1px solid lightgray;
	box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.1);
	margin: 1.5rem;
`

export default Blogs