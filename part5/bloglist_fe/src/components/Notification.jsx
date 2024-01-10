import styled, { keyframes, css } from 'styled-components'
import { useState, useEffect } from 'react'

const Notification = ({ message, isVisible, onHide, type }) => {
	const [visible, setVisible] = useState(false)
	const [shouldRender, setShouldRender] = useState(isVisible)

	useEffect(() => {
		if (isVisible) {
			setShouldRender(true)
			setVisible(true)
		} else {
			setVisible(false)
			setTimeout(() => setShouldRender(false), 500) // delay should match animation duration
		}
	}, [isVisible])

	useEffect(() => {
		if (isVisible) {
			const timeout = setTimeout(() => {
				setVisible(false)
				onHide()
			}, 3000)

			return () => clearTimeout(timeout)
		}
	}, [isVisible, onHide])

	return shouldRender ? (
		<Wrapper $visible={visible} $type={type} id='notification'>
			{message}
		</Wrapper>
	) : null
}

// Keyframe animation for sliding in and out
const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`

const Wrapper = styled.div`
	position: fixed;
	top: 20px;
	right: 20px;
	padding: 20px;
	border-radius: 5px;
	animation: ${({ $visible }) => ($visible ? slideIn : slideOut)} 0.5s ease-in-out;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	z-index: 1000;

  ${({ $type }) =>
		$type === 'success' &&
    css`
      background-color: #dff0d8;
      color: #3c763d;
    `}

  ${({ $type }) =>
		$type === 'error' &&
    css`
      background-color: #f2dede;
      color: #a94442;
    `}
`

export default Notification