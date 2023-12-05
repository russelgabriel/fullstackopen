import { useState } from 'react'
import styled from 'styled-components'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const handleChangeQuote = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <Anecdote>
        <h1>Anecdote of the day</h1>
        {anecdotes[selected]}
        <Actions>
          {votes[selected]} likes
          <button onClick={handleVote} style={{width: "fit-content"}}>❤️</button>
          <button onClick={handleChangeQuote} style={{width: "fit-content"}}>next anecdote</button>
        </Actions>
      </Anecdote>
      <div>
        <h1>Anecdote with the most votes</h1>
        {anecdotes[votes.indexOf(Math.max(...votes))]}
      </div>
    </div>
  )
}

const Anecdote = styled.div`
  width: fit-content;
  max-width: 600px;
  padding: 2rem 3rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  margin: 4rem auto;
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  gap: 8px;
  width: 100%;
  margin-top: 2rem;
`


export default App