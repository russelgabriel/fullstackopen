

const PersonForm = ({ handleAddContact, name, handleNameChange, number, handleNumberChange }) => {
  return (
    <form onSubmit={handleAddContact}>
      <div>
        <label htmlFor="nameInput">Name: </label>
        <input id="nameInput" value={name} onChange={handleNameChange}/>
      </div>
      <div>
        <label htmlFor="numberInput">Number: </label>
        <input id="numberInput" value={number} onChange={handleNumberChange}/>
      </div>
      <button type="submit">save</button>
    </form>
  )
}

export default PersonForm