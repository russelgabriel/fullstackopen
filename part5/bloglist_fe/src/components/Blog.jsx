import styled from 'styled-components'

const Blog = ({ blog }) => {
	return (
		<BlogCard>
			<h2>{blog.title}</h2>
			<p>by <i>{blog.author}</i></p>
		</BlogCard>
	)
}

const BlogCard = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1rem;

	& > h2 {
		font-size: 1.25rem;
	}

	& > p {
		font-size: 0.8rem;
	}
`

export default Blog