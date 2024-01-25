const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { GraphQLError } = require('graphql');

const mongoose = require('mongoose');
const Person = require('./models/person');
require('dotenv').config();

mongoose.set('strictQuery', false);
const MONGODB_URI = process.env.MONGODB_URI;

console.log('connecting to', MONGODB_URI);

mongoose.connect(MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB');
	})
	.catch((error) => {
		console.log('error connection to MongoDB:', error.message);
	});

const typeDefs = `
	type Address {
		street: String!
		city: String!
	}

  type Person {
    name: String!
    phone: String
		address: Address!
    id: ID!
  }

	enum YesNo {
		YES
		NO
	}

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
  }

	type Mutation {
		addPerson(
			name: String!
			phone: String
			street: String!
			city: String!
		): Person
		editNumber(
			name: String!
			phone: String!
		): Person
	}
`;

const resolvers = {
	Query: {
		personCount: async () => {
			const count = await Person.collection.countDocuments();
			return count;
		},
		allPersons: async (root, args) => {
			if (!args.phone) {
				return await Person.find({});
			}
			return await Person.find({ phone: { $exists: args.phone === 'YES' } });
		},
		findPerson: async (root, args) => {
			const person = await Person.findOne({ name: args.name });
			return person;
		}
	},
	Mutation: {
		addPerson: async (root, args) => {
			const person = new Person({ ...args });
			
			try {
				await person.save();
			} catch (error) {
				throw new GraphQLError('Saving person failes', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name,
						error
					}
				});
			}

			return person;
		},
		editNumber: async (root, args) => {
			const person = await Person.findOne({ name: args.name });
			person.phone = args.phone;
			try {
				await person.save();
			} catch (error) {
				throw new GraphQLError('Saving number failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name,
						error
					}
				});
			}
			return person;
		}
	},
	Person: {
		address: (root) => {
			return {
				street: root.street,
				city: root.city
			};
		}
	}
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

startStandaloneServer(server, {
	listen: { port: 4000 },
}).then(({ url }) => {
	console.log(`Server ready at ${url}`);
});