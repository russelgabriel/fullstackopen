import { useState, useEffect } from 'react'
import styled from 'styled-components'

import countryServices from './services/country'
import weatherServices from './services/weather'

import Display from './components/Display'
import Filter from './components/Filter'
import UserPrompts from './components/UserPrompts'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countriesFilter, setCountriesFilter] = useState('')
  const [spotlightName, setSpotlightName] = useState(null)
  const [spotlightCountry, setSpotlightCountry] = useState(null)
  const [spotlightWeather, setSpotlightWeather] = useState(null)

  useEffect(() => {
    countryServices
      .getAllNames()
      .then(countries => setCountries(countries))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    if (!spotlightName) {
      setSpotlightCountry(null)
    } else {
      countryServices
        .getCountry(spotlightName)
        .then(country => setSpotlightCountry(country))
        .catch(err => console.log(err))
    }
  }, [spotlightName])

  useEffect(() => {
    if (!spotlightCountry) {
      setSpotlightWeather(null)
    } else {
      weatherServices
        .getCountryWeather(spotlightCountry.capitalInfo.latlng[0], spotlightCountry.capitalInfo.latlng[1])
        .then(weather => setSpotlightWeather(weather))
        .catch(err => console.log(err))
    }
  }, [spotlightCountry])

  const filteredCountries = 
  countriesFilter.length !== 0 
  ? countries.filter(country => country.toLowerCase().includes(countriesFilter.toLowerCase())).sort()
  : countries

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setSpotlightName(filteredCountries[0])
    }

    if (spotlightCountry && filteredCountries.length === 0) {
      setSpotlightName(null)
    }

    if (spotlightCountry && filteredCountries.length > 10) {
      setSpotlightName(null)
    }
  }, [filteredCountries, spotlightName, spotlightCountry])

  const handleFilterChange = (event) => {
    const oldLength = filteredCountries.length
    setCountriesFilter(event.target.value)
    if (oldLength > event.target.value.length) {
      setSpotlightCountry(null)
    }
  }

  const handleExitClick = () => {
    setSpotlightName(null)
    if (filteredCountries.length === 1) {
      setCountriesFilter('')
    }
  }

  const handleCountryClick = (country) => {
    setSpotlightName(country)
  }

  const userPrompts = 
    countries.length === 0
    ? <p>Loading...</p>
    : countriesFilter.length === 0
      ? <p>Type to search for a country</p>
      : filteredCountries.length > 10
        ? <p>Too many matches, specify another filter</p>
        : filteredCountries.length === 0 && countriesFilter.length !== 0
          ? <p>No matches found</p>
          : null
  
  return (
    <Wrapper>
      <Filter handleFilterChange={handleFilterChange} countriesFilter={countriesFilter}/>
      <UserPrompts userPrompts={userPrompts}/>
      <Display 
        filteredCountries={filteredCountries}
        spotlightCountry={spotlightCountry}
        spotlightWeather={spotlightWeather}
        handleExitClick={handleExitClick}
        handleCountryClick={handleCountryClick}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

export default App