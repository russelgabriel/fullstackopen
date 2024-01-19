import { useState, useEffect } from 'react'

import { useNotificationDispatch } from './context/NotificationContext'
import { setNotification } from './context/NotificationContext'
import { useUserDispatch, useUserValue } from './context/UserContext'
import blogService from './services/blogs'
import loginService from './services/login'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Notification from './components/Notification'


const App = () => {
	const notificationDispatch = useNotificationDispatch()
	const userDispatch = useUserDispatch()
	const user = useUserValue()

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON && loggedUserJSON !== 'null') {
			const user = JSON.parse(loggedUserJSON)
			userDispatch({ type: 'SET_USER', payload: user })
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async ({ username, password }) => {
		try {
			const user = await loginService.login({ username, password })
			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
			userDispatch({ type: 'SET_USER', payload: user })
			blogService.setToken(user.token)
		} catch (error) {
			console.log(error)
			const notificationConfig = {
				message: 'Incorrect username or password',
				type: 'error',
				timeout: 5
			}
			notificationDispatch(setNotification(notificationConfig))
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogappUser')
		userDispatch({ type: 'CLEAR_USER' })
	}

	if (!user) {
		return (
			<div>
				<Notification />
				<LoginForm
					handleLogin={handleLogin}
				/>
			</div>
		)
	}

	return (
		<div>
			<Notification	/>
			<Home
				user={user}
				handleLogout={handleLogout}
			/>
		</div>
	)
}

export default App