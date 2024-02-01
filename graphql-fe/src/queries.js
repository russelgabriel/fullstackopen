import { gql } from '@apollo/client'

// Fragments
const PERSON_DETAILS = gql`
	fragment PersonDetails on Person {
		id
		name
		phone
		address {
			street
			city
		}
	}
`

// Queries
export const ALL_PERSONS = gql`
query {
  allPersons {
    name
    phone
    id
  }
}
`

export const FIND_PERSON = gql`
query findPersonByName($nameToSearch: String!) {
  findPerson(name: $nameToSearch) {
		...PersonDetails
  }
}
${PERSON_DETAILS}
`

// Mutations
export const CREATE_PERSON = gql`
mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String) {
  addPerson(
    name: $name,
    phone: $phone,
    street: $street,
    city: $city
  ) {
    name
    phone
    id
    address {
      street
      city
    }
  }
}
`

export const CHANGE_NUMBER = gql`
mutation changeNumber($name: String!, $phone: String!) {
  editNumber(
    name: $name,
    phone: $phone
  ) {
    name
    phone
    id
  }
}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
	login(
		username: $username,
		password: $password
	) {
		value
	}
}
`