const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      <label htmlFor="contactFilter">Filter shown with: </label>
      <input id="contactFilter" value={filter} onChange={handleFilterChange}/>
    </div>
  )
}

export default Filter