import { useState } from 'react'
import styled from 'styled-components'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleBad = () => {
    setBad(bad + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleGood = () => {
    setGood(good + 1)
  }

  return (
    <Wrapper>
      <ActionWrapper>
        <h1>Give Feedback</h1>
        <ButtonWrapper>
          <Button handleClick={handleGood} text='Good' />
          <Button handleClick={handleNeutral} text='Neutral' />
          <Button handleClick={handleBad} text='Bad' />
        </ButtonWrapper>
      </ActionWrapper>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </Wrapper>
  )
}

const Statistics = ({ good, bad, neutral }) => {
  if ([good, bad, neutral].every((item) => item === 0)) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = (good / all) * 100

  return (
    <div>
      <h1>Statistics</h1>
      <Stats>
        <tbody>
          <StatisticLine text='Good' value={good} />
          <StatisticLine text='Neutral' value={neutral} />
          <StatisticLine text='Bad' value={bad} />
          <StatisticLine text='All' value={all} />
          <StatisticLine text='Average' value={average} />
          <StatisticLine text='Positive' value={`${positive} %`} />
        </tbody>
      </Stats>
    </div>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = ({ handleClick, text }) => {
  return <StyledButton onClick={handleClick}>{text}</StyledButton>
}

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
`

const Wrapper = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  margin: 2rem;
  align-items: baseline;
`

const ActionWrapper = styled.div`
  width: fit-content;
  text-align: center;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 4px;
`

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 1rem;
`

const Stats = styled.table`
`

export default App
