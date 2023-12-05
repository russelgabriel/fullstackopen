

const Contacts = ({ contactsShown }) => {
  return (
    <ul>
      {contactsShown.map(person => <li key={person.name}>{person.name}</li>)}
    </ul>
  )
}

export default Contacts