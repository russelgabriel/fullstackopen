import styled from 'styled-components'
import trashIcon from '../assets/trash-solid.svg'

const Contacts = ({ contactsShown, handleDelete }) => {
  return (
    <ul style={{
      listStyle: 'none',
      maxHeight: '600px',
      overflowY: 'scroll',
      width: 'fit-content',
      padding: '0.5rem',
      border: '2px solid black',
      borderRadius: '8px'
    }}>
      {contactsShown.map(person => {
        return (
          <ContactCard key={person.id}>
            <Name>{person.name}</Name>
            <Number>{person.number}</Number>
            <DelButton onClick={() => handleDelete(person.id)}>
              <img src={trashIcon} alt="delete icon"/>
            </DelButton>
          </ContactCard>
        )
      })}
    </ul>
  )
}

const ContactCard = styled.li`
  position: relative;
  padding: 0.5rem;
  width: 300px;
  border: 1px solid black;
  margin-bottom: 0.5rem;
  border-radius: 8px;

  &:last-of-type {
    margin-bottom: 0;
  }
`

const Name = styled.h1`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const Number = styled.h2`
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
`

const DelButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`

export default Contacts