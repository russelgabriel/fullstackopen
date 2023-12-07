const Filter = ({ handleFilterChange, countriesFilter }) => {
  return (
    <div>
      <label htmlFor="countriesFilter">Search for a country: </label>
      <input type="text" id="countriesFilter" onChange={handleFilterChange} value={countriesFilter}/>
    </div>
  )
}

export default Filter