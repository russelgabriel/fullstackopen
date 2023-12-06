import { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const Notification = ({ message, alertType }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
    setTimeout(() => {
      setShow(false)
    }, 7000)
  }, [message])

  if (message === null) {
    return null
  }

  return (
    <NotiWrapper $show={show} $alertType={alertType}>
      <p>{message}</p>
    </NotiWrapper>
  )
}

const slideIn = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
`;

const slideOut = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
`;

const NotiWrapper = styled.div`
  color: ${props => props.$alertType === 'success' ? 'darkgreen' : 'darkred'};
  position: fixed;
  width: 100%;
  display: flex;
  top: 0;
  justify-content: center;
  background-color: ${props => props.$alertType === 'success' ? 'rgba(152, 251, 152, 0.5)' : 'rgba(255, 0, 0, 0.5)'};
  animation: ${props => props.$show ? slideIn : slideOut} 0.25s linear forwards;
`

export default Notification