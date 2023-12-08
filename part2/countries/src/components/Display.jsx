import CountryList from "./CountryList"
import SingleCountry from "./SingleCountry"

const Display = ({ filteredCountries, spotlightCountry, spotlightWeather, handleExitClick, handleCountryClick }) => {
  return (
    <div>
    {
      filteredCountries.length === 0 || filteredCountries.length === 1 || filteredCountries.length > 10 || spotlightCountry
      ? null
      : <CountryList filteredCountries={filteredCountries} handleCountryClick={handleCountryClick}/>
    }
    <SingleCountry country={spotlightCountry} weather={spotlightWeather} handleExitClick={handleExitClick}/>
  </div>
  )
}

export default Display