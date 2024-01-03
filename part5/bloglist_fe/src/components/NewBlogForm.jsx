import styled from 'styled-components'

const NewBlogForm = ({
	handleCreateBlog,
	handleTitleChange,
	handleAuthorChange,
	handleUrlChange,
	title,
	author,
	url
}) => {
	return (
		<Wrapper>
			<Form onSubmit={handleCreateBlog}>
				<h2>Add blog</h2>
				<InputField>
					<label htmlFor="title">Title</label>
					<StyledInput
						type="text"
						id="title"
						onChange={handleTitleChange}
						value={title}
					/>
				</InputField>
				<InputField>
					<label htmlFor="author">Author</label>
					<StyledInput
						type="text"
						id="author"
						onChange={handleAuthorChange}
						value={author}
					/>
				</InputField>
				<InputField>
					<label htmlFor="URL">URL</label>
					<StyledInput
						type="text"
						id="URL"
						onChange={handleUrlChange}
						value={url}
					/>
				</InputField>
				<InputField>
					<Button type="submit">Add</Button>
				</InputField>
			</Form>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	grid-area: form;
	display: flex;
	flex-direction: column;
	padding: 2rem;
	margin: 1.5rem;
	height: fit-content;
	background: whitesmoke;
	border-radius: 0.5rem;
	border: 1px solid lightgray;
	box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.1);
`

const Form = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	gap: 0.5rem;

	& > h2 {
		margin-bottom: 1rem;
	}
`

const InputField = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: clamp(100px, 100%, 360px);
`

const StyledInput = styled.input`
	width: clamp(100px, 75%, 275px);
`

const Button = styled.button`
	width: 100%;
	font-size: 1rem;
`

export default NewBlogForm