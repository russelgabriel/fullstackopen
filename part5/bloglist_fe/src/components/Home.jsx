import styled from 'styled-components'
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

	const handleCreateBlog = async ({ title, author, url }) => {
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
		}
	}

	const handleLikeBlog = async (blog) => {
		try {
			const newBlog = { ...blog, likes: blog.likes + 1 }
			await blogService.update(blog.id, newBlog)
			let newBlogs = await blogService.getAll()
			newBlogs = newBlogs.sort((a, b) => b.likes - a.likes)
			setBlogs(newBlogs)
			setNotificationType('success')
			setNotificationMessage(`you liked ${blog.title}`)
			setShowNotification(true)
		} catch (error) {
			console.log(error)
			setNotificationType('error')
			setNotificationMessage('Error liking blog')
			setShowNotification(true)
		}
	}

	const handleDeleteBlog = async (blog) => {
		try {
			if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
				return
			}
			await blogService.remove(blog.id)
			let newBlogs = await blogService.getAll()
			newBlogs = newBlogs.sort((a, b) => b.likes - a.likes)
			setBlogs(newBlogs)
			setNotificationType('success')
			setNotificationMessage(`you deleted ${blog.title}`)
			setShowNotification(true)
		} catch (error) {
			console.log(error)
			setNotificationType('error')
			setNotificationMessage('Error deleting blog')
			setShowNotification(true)
		}
	}

	return (
		<GridContainer>
			<Header user={user} handleLogout={handleLogout} />
			<Blogs blogs={blogs} user={user} handleLikeBlog={handleLikeBlog} handleDeleteBlog={handleDeleteBlog}/>
			<NewBlogForm
				handleCreateBlog={handleCreateBlog}
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