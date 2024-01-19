import styled, { keyframes, css } from "styled-components";
import { useState, useEffect } from "react";

import { useNotificationValue, useNotificationDispatch } from "../context/NotificationContext";

const Notification = () => {
  const [visible, setVisible] = useState(false);

	const notificationState = useNotificationValue()
	const notificationDispatch = useNotificationDispatch()

	const { message, type, timeout } = notificationState || {}

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
        setVisible(false);
    }, timeout * 1000 - 500);

		return () => {
			clearTimeout(timer)
		}
  }, [notificationState]);

	const handleClose = () => {
		setVisible(false)
		notificationDispatch({ type: "CLEAR_NOTIFICATION" })
	}

  if (!message || !type || !timeout) {
    return null;
  }

  return (
    <Wrapper $visible={visible} $type={type} id="notification">
      {message}
			<button style={{marginLeft: '20px', height: '30px', width: '30px'}} onClick={handleClose}>x</button>
    </Wrapper>
  );
};

// Keyframe animation for sliding in and out
const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const Wrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 20px;
  border-radius: 5px;
  animation: ${({ $visible }) => ($visible ? slideIn : slideOut)} 0.5s
    ease-in-out;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;

  ${({ $type }) =>
    $type === "success" &&
    css`
      background-color: #dff0d8;
      color: #3c763d;
    `}

  ${({ $type }) =>
    $type === "error" &&
    css`
      background-color: #f2dede;
      color: #a94442;
    `}
`;

export default Notification;
