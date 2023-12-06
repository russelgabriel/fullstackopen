import styled from 'styled-components'

const PersonForm = ({ handleAddContact, name, handleNameChange, number, handleNumberChange }) => {
  return (
    <FormWrapper onSubmit={handleAddContact}>
      <FormLine>
        <label htmlFor="nameInput">Name: </label>
        <input id="nameInput" value={name} onChange={handleNameChange}/>
      </FormLine>
      <FormLine>
        <label htmlFor="numberInput">Number: </label>
        <input id="numberInput" value={number} onChange={handleNumberChange}/>
      </FormLine>
      <button type="submit">save</button>
    </FormWrapper>
  )
}

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 1rem;
`

const FormLine = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
`

export default PersonForm