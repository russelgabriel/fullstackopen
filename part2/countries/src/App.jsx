import { useState, useEffect } from 'react'

import countryServices from './services/country'
import Display from './components/Display'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countriesFilter, setCountriesFilter] = useState('')
  const [spotlightCountry, setSpotlightCountry] = useState(null)

  useEffect(() => {
    countryServices
      .getAll()
      .then(countries => setCountries(countries))
      .catch(err => console.log(err))
  }, [])

  const filteredCountries = 
  countriesFilter.length !== 0 
  ? countries.filter(country => country.name.common.toLowerCase().includes(countriesFilter.toLowerCase()))
  : countries

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setSpotlightCountry(filteredCountries[0])
    }
  }, [filteredCountries])

  const handleFilterChange = (event) => {
    setCountriesFilter(event.target.value)
  }

  const handleExitClick = () => {
    setSpotlightCountry(null)
    if (filteredCountries.length === 1) {
      setCountriesFilter('')
    }
  }

  const handleCountryClick = (country) => {
    setSpotlightCountry(country)
  }

  const userPrompts = 
    countries.length === 0
    ? <p>Loading...</p>
    : countriesFilter.length === 0
      ? <p>Type to search for a country</p>
      : null
  
  return (
    <div>
      <Filter handleFilterChange={handleFilterChange} countriesFilter={countriesFilter}/>
      <div>
        {userPrompts}
        {filteredCountries.length === 0 && countriesFilter.length !== 0 ? <p>No matches found</p> : null}
      </div>
      <Display countriesFilter={countriesFilter} filteredCountries={filteredCountries} spotlightCountry={spotlightCountry} handleExitClick={handleExitClick} handleCountryClick={handleCountryClick}/>
    </div>
  )
}

export default App