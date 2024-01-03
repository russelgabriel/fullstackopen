import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [showNotification, setShowNotification] = useState(false)
	const [notificationMessage, setNotificationMessage] = useState('')
	const [notificationType, setNotificationType] = useState('') // 'error' or 'success'

	useEffect(() => {
		blogService.getAll().then(initBlogs =>
			setBlogs(initBlogs)
		)
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleUsernameChange = event => {
		setUsername(event.target.value)
	}

	const handlePasswordChange = event => {
		setPassword(event.target.value)
	}

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({ username, password })
			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
			setUser(user)
			setShowNotification(false)
		} catch (error) {
			setNotificationType('error')
			setNotificationMessage('Incorrect username or password')
			setShowNotification(true)
		} finally {
			setUsername('')
			setPassword('')
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
					handleUsernameChange={handleUsernameChange}
					handlePasswordChange={handlePasswordChange}
					username={username}
					password={password}
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