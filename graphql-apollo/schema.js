const gql = String.raw;

const typeDefs = gql`
	type User {
		username: String!
		id: ID!
		friends: [Person!]!
	}

	type Token {
		value: String!
	}

	type Address {
		street: String!
		city: String!
	}

  type Person {
    name: String!
    phone: String
		address: Address!
		friendOf: [User!]!
    id: ID!
  }

	type Subscription {
		personAdded: Person!
	}

	enum YesNo {
		YES
		NO
	}

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
		me: User
  }

	type Mutation {
		addPerson(
			name: String!
			phone: String
			street: String!
			city: String!
		): Person
		addAsFriend(
			name: String!
		): User
		editNumber(
			name: String!
			phone: String!
		): Person
		createUser(
			username: String!
		): User
		login(
			username: String!
			password: String!
		): Token
	}
`;

module.exports = typeDefs;