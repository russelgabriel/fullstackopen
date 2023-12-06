import styled from 'styled-components'

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <Wrapper>
      <Label htmlFor="contactFilter">Search:</Label>
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

const Label = styled.label`
  font-size: 0.9rem;
`

export default Filter