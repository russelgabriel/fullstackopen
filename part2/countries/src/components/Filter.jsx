import styled from "styled-components"

const Filter = ({ handleFilterChange, countriesFilter }) => {
  return (
    <Wrapper>
      <label htmlFor="countriesFilter">Search for a country</label>
      <input type="text" id="countriesFilter" onChange={handleFilterChange} value={countriesFilter}/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`

export default Filter