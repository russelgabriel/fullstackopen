import CountryList from "./CountryList"
import SingleCountry from "./SingleCountry"

const Display = ({ countriesFilter, filteredCountries, spotlightCountry, handleExitClick, handleCountryClick }) => {
  return (
    <div>
    {
      countriesFilter.length === 0 || filteredCountries.length === 1
      ? null
      : <CountryList filteredCountries={filteredCountries} handleCountryClick={handleCountryClick} spotlightCountry={spotlightCountry}/>
    }
    <SingleCountry country={spotlightCountry} handleExitClick={handleExitClick}/>
  </div>
  )
}

export default Display