import styled from 'styled-components'

const LoginForm = ({
	handleLogin,
	handleUsernameChange,
	handlePasswordChange,
	username,
	password
	}) => {

	return (
		<Wrapper>
			<Form onSubmit={handleLogin}>
				<Header>Log in to Blogs List</Header>
				<InputField>
					username
					<input onChange={handleUsernameChange} value={username}/>
				</InputField>
				<InputField>
					password
					<input onChange={handlePasswordChange} type='password' value={password}/>
				</InputField>
				<Button type="submit">login</Button>
			</Form>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	display: grid;
	place-items: center;
`

const Form = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 30%;
	min-width: 350px;
	height: 50%;
	min-height: 300px;
	gap: 1rem;
	border: 2px solid grey;
	border-radius: 8px;
	background-color: whitesmoke;
`

const Header = styled.h2`
	font-size: 2rem;
	margin-bottom: 1rem;
`

const InputField = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 275px;
`

const Button = styled.button`
	width: 275px;
	height: 50px;
`



export default LoginForm