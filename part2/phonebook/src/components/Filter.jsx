import styled from 'styled-components'

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <Wrapper>
      <label htmlFor="contactFilter">Search for Contact:</label>
      <Input id="contactFilter" value={filter} onChange={handleFilterChange}/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
  gap: 8px;
  width: calc(300px + 1rem + 4px);
  align-items: baseline;
`

const Input = styled.input`
  flex: 1;
`

export default Filter