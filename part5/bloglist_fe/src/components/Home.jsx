import styled from 'styled-components'
import { useState } from 'react'
import blogService from '../services/blogs'
import Blogs from './Blogs'
import Header from './Header'
import NewBlogForm from './NewBlogForm'

// 720px is the breakpoint for mobile devices

const Home = ({
	blogs,
	setBlogs,
	user,
	handleLogout,
	setNotificationMessage,
	setShowNotification,
	setNotificationType
}) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleCreateBlog = async (event) => {
		event.preventDefault()
		try {
			const newBlog = await blogService.create({ title, author, url })
			setBlogs(blogs.concat(newBlog))
			setNotificationType('success')
			setNotificationMessage(`a new blog ${title} by ${author} added`)
			setShowNotification(true)
		} catch (error) {
			console.log(error)
			setNotificationType('error')
			setNotificationMessage('Error creating blog')
			setShowNotification(true)
		} finally {
			setTitle('')
			setAuthor('')
			setUrl('')
		}
	}

	const handleTitleChange = (event) => {
		setTitle(event.target.value)
	}

	const handleAuthorChange = (event) => {
		setAuthor(event.target.value)
	}

	const handleUrlChange = (event) => {
		setUrl(event.target.value)
	}

	return (
		<GridContainer>
			<Header user={user} handleLogout={handleLogout} />
			<Blogs blogs={blogs} />
			<NewBlogForm
				handleCreateBlog={handleCreateBlog}
				handleTitleChange={handleTitleChange}
				handleAuthorChange={handleAuthorChange}
				handleUrlChange={handleUrlChange}
				title={title}
				author={author}
				url={url}
			/>
		</GridContainer>
	)
}

const GridContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: auto 1fr auto;
	grid-template-areas:
		"header header"
		"form content"
		"footer footer";
`



export default Home