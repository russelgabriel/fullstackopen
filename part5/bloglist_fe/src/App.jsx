import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [showNotification, setShowNotification] = useState(false)
	const [notificationMessage, setNotificationMessage] = useState('')
	const [notificationType, setNotificationType] = useState('') // 'error' or 'success'

	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				let initBlogs = await blogService.getAll()
				initBlogs = initBlogs.sort((a, b) => b.likes - a.likes)
				setBlogs(initBlogs)
			} catch (error) {
				console.log(error)
			}
		}

		fetchBlogs()
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async ({ username, password }) => {
		try {
			const user = await loginService.login({ username, password })
			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
			setUser(user)
			blogService.setToken(user.token)
			setShowNotification(false)
		} catch (error) {
			setNotificationType('error')
			setNotificationMessage('Incorrect username or password')
			setShowNotification(true)
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogappUser')
		setUser(null)
	}

	if (!user) {
		return (
			<div>
				<Notification 
					message={notificationMessage}
					isVisible={showNotification}
					onHide={() => setShowNotification(false)}
					type={notificationType}
				/>
				<LoginForm
					handleLogin={handleLogin}
				/>
			</div>
		)
	}

	return (
		<div>
			<Notification 
				message={notificationMessage}
				isVisible={showNotification}
				onHide={() => setShowNotification(false)}
				type={notificationType}
			/>
			<Home
				blogs={blogs}
				setBlogs={setBlogs}
				user={user}
				handleLogout={handleLogout}
				setNotificationMessage={setNotificationMessage}
				setShowNotification={setShowNotification}
				setNotificationType={setNotificationType}
			/>
		</div>
	)
}

export default App