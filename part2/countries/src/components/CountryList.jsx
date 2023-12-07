import styled from "styled-components"

const CountryList = ({ filteredCountries, handleCountryClick, spotlightCountry }) => {
  if (spotlightCountry) return null

  return (
    <List>
      {filteredCountries.length > 10
      ? <p>Too many matches, specify another filter</p>
      : filteredCountries.map(country => {
        return (
          <li key={country.ccn3}>
            {country.name.common}
            <Button onClick={() => handleCountryClick(country)}>show</Button>
          </li>
        )
      })
      }
    </List>
  )
}

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`

const Button = styled.button`
  
`

export default CountryList