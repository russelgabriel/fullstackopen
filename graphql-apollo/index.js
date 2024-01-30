const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const Person = require('./models/person');
const User = require('./models/user');
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
		},
		me: (root, args, context) => {
			return context.currentUser;
		}
	},
	Mutation: {
		addPerson: async (root, args, context) => {
			const person = new Person({ ...args });
			const currentUser = context.currentUser;

			if (!currentUser) {
				throw new GraphQLError('not authenticated', {
					extensions: {
						code: 'UNAUTHENTICATED'
					}
				});
			}
			
			try {
				await person.save();
				currentUser.friends = currentUser.friends.concat(person);
				await currentUser.save();
			} catch (error) {
				console.log(error.message);
				throw new GraphQLError('Saving person failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name,
						error
					}
				});
			}

			return person;
		},
		addAsFriend: async (root, args, context) => {
			const currentUser = context.currentUser;
			const isFriend = (person) => {
				return currentUser.friends.find((f) => f._id.toString() === person._id.toString());
			};

			if (!currentUser) {
				throw new GraphQLError('not authenticated', {
					extensions: {
						code: 'UNAUTHENTICATED'
					}
				});
			}

			const person = await Person.findOne({ name: args.name });
			if (!isFriend(person)) {
				currentUser.friends = currentUser.friends.concat(person);
			}

			await currentUser.save();

			return currentUser;
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
		},
		createUser: async (root, args) => {
			const user = new User({ username: args.username });
			try {
				await user.save();
			} catch (error) {
				throw new GraphQLError('Saving user failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.username,
						error
					}
				});
			}
			return user;
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });

			if (!user || args.password !== 'secret') {
				throw new GraphQLError('wrong credentials', {
					extensions: {
						code: 'UNAUTHENTICATED'
					}
				});
			}

			const userForToken = {
				username: user.username,
				id: user._id
			};

			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
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
	context: async ({ req, res }) => {
		const auth = req ? req.headers.authorization : null;
		if (auth && auth.startsWith('Bearer ')) {
			const decodedToken = jwt.verify(
				auth.substring(7), process.env.JWT_SECRET
			);
			const currentUser = await User.findById(decodedToken.id).populate('friends');
			return { currentUser };
		}
	}
}).then(({ url }) => {
	console.log(`Server ready at ${url}`);
});