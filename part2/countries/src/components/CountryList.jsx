import { useState } from "react"
import styled from "styled-components"

const CountryList = ({ filteredCountries, handleCountryClick }) => {
  const [boldedCountries, setBoldedCountries] = useState(Array(filteredCountries.length).fill(false))

  return (
    <List>
      {filteredCountries.map((country, index) => {
        return (
          <ListItem key={country}>
            <ButtonWrapper>
              <Button 
                onClick={() => handleCountryClick(country)}
                onMouseEnter={() => setBoldedCountries([...boldedCountries.slice(0, index), true, ...boldedCountries.slice(index + 1)])}
                onMouseLeave={() => setBoldedCountries(Array(filteredCountries.length).fill(false))}
              >
                show
              </Button>
            </ButtonWrapper>
            <Name $bolded={boldedCountries[index]}>{country}</Name>
          </ListItem>
        )
      })
      }
    </List>
  )
}

const List = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  margin-top: 50px;
  width: 80vw;
  max-width: 700px;
  min-width: 650px;
  border-radius: 8px;
  gap: 1rem;
  padding: 1rem 0;
`

const ListItem = styled.li`
  display: flex;
  flex-direction: row-reverse;
  justify-content: stretch;
  align-items: center;
  gap: 1rem;
`

const Button = styled.button`
  &:hover {
    cursor: pointer;
  }
`

const ButtonWrapper = styled.span`
  display: flex;
  flex-direction: row;
  flex: 1;
`

const Name = styled.span`
  display: flex;
  flex-direction: row-reverse;
  flex: 1;
  font-weight: ${({ $bolded }) => $bolded ? 'bold' : 'normal'};
`

export default CountryList