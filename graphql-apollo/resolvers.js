const { GraphQLError } = require('graphql');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
const jwt = require('jsonwebtoken');
const Person = require('./models/person');
const User = require('./models/user');

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

			pubsub.publish('PERSON_ADDED', { personAdded: person });

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
	},
	Subscription: {
		personAdded: {
			// Must return an AsyncIterator which listens to the event
			subscribe: () => pubsub.asyncIterator(['PERSON_ADDED'])
		}
	}
};

module.exports = resolvers;