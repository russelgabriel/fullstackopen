import styled from "styled-components"

const SingleCountry = ({ country, handleExitClick }) => {
  if (!country) return null

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <CountryWrapper>
      <ExitButton onClick={handleExitClick}>X</ExitButton>
      <CountryName>{country.name.common}</CountryName>
      <CountryImage src={country.flags.png} alt={country.flags.alt} />
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
    </CountryWrapper>
  )
}

const CountryWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 4rem 1fr 1fr;
  grid-template-areas: 
    'name name name'
    'image details details'
    'weather details details';
  grid-gap: 20px;
  margin: 20px;
  border: 1px solid black;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  height: 500px;
`;

const CountryImage = styled.img`
  grid-area: image;
  max-width: 100%;
`;

const CountryDetails = styled.div`
  grid-column: details;
  display: flex;
`;

const CountryName = styled.h1`
  grid-area: name;
  font-size: 2.5rem;
  margin: 0;
`;

const ExitButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  height: 2rem;
  width: 2rem;
`




export default SingleCountry