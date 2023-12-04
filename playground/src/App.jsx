import { useState } from 'react'
import styled from 'styled-components'

const App = () => {
  const [clicks, setClicks] = useState({ left: 0, right: 0 })
  const [userClicks, setUserClicks] = useState([])
  const [totalClicks, setTotalClicks] = useState(0)

  const handleLeftClick = () => {
    const newLeftClicks = clicks.left + 1
    const newClicks = {
      ...clicks,
      left: newLeftClicks
    }
    setClicks(newClicks)
    setUserClicks(userClicks.concat('L'))
    setTotalClicks(clicks.right + newLeftClicks)
  }
  const handleRightClick = () => {
    const newRightClicks = clicks.right + 1
    const newClicks = {
      ...clicks,
      right: newRightClicks
    }
    setClicks(newClicks)
    setUserClicks(userClicks.concat('R'))
    setTotalClicks(clicks.left + newRightClicks)
  }

  return (
    <div>
      <ActionWrapper>
        <ButtonWrapper>
          <Button handleClick={handleLeftClick} text='left' />
          {clicks.left}
        </ButtonWrapper>
        <ButtonWrapper>
          <Button handleClick={handleRightClick} text='right' />
          {clicks.right}
        </ButtonWrapper>
      </ActionWrapper>
      <History userClicks={userClicks} />
      <div style={{width: 'fit-content', margin: '0 auto'}}>{totalClicks}</div>
    </div>
  )
}

const History = ({ userClicks }) => {
  if (userClicks.length === 0) {
    return (
      <div style={{width: 'fit-content', margin: '0 auto'}}>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div style={{width: 'fit-content', margin: '0 auto'}}>Button press history: {userClicks.join(' ')}</div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const ButtonWrapper = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ActionWrapper = styled.div`
  display: flex;
  gap: 1rem;
  width: fit-content;
  margin: 0 auto;
  border: 1px solid black;
  padding: 2rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
`

export default App
