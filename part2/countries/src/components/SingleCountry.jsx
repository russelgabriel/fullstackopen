import styled from "styled-components"

import Weather from './Weather'

const SingleCountry = ({ country, weather, handleExitClick }) => {
  if (!country) return null

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <CountryCard>
      <ExitButton onClick={handleExitClick}>X</ExitButton>
      <CountryName>{country.name.common}</CountryName>
      <Info>
        <Left>
          <CountryImage src={country.flags.png} alt={country.flags.alt} />
          {
          weather
          ? <Weather weather={weather} country={country}/>
          : null
          }
        </Left>
        <CountryDetails>
          <div>
            <h2>Basic Information</h2>
            <br />
            <p>Capital City: {country.capital}</p>
            <p>Population: {numberWithCommas(country.population)}</p>
            <p>area: {numberWithCommas(country.area)}km<sup>2</sup></p>
            <br />
            <h4>languages</h4>
            <ul>
              {Object.values(country.languages).map((language, i) => <li key={i}>{language}</li>)}
            </ul>
            <br />
            <p>Region: {country.region}</p>
            <p>Sub Region: {country.subregion}</p>
          </div>
          <div style={{marginTop: '3.75rem'}}>
            <h4>Bordering Countries</h4>
            <ul>
              {country?.borders 
              ? Object.values(country.borders).map((c, i) => <li key={i}>{c}</li>)
              : <li>None</li>
            }
            </ul>
          </div>
        </CountryDetails>
      </Info>
      
    </CountryCard>
  )
}

const CountryCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 20px;
  background-color: #f5f5f5;

  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  height: fit-content;
`;

const CountryImage = styled.img`
  max-width: 100%;
  margin-bottom: 20px;
`;

const CountryDetails = styled.div`
  display: flex;
  gap: 16px;
`;

const CountryName = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const ExitButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  height: 2rem;
  width: 2rem;
  border: none;
  border-radius: 8px;
  background-color: #e0e0e0;

  &:hover {
    background-color: #f44336;
    color: white;
    cursor: pointer;
  }
`

const Info = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`

const Left = styled.div`
  border-right: 1px solid black;
  padding-right: 20px;
`

export default SingleCountry