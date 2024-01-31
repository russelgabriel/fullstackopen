const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const { GraphQLError } = require("graphql")
const jwt = require("jsonwebtoken")

require("dotenv").config()
const mongoose = require("mongoose")
const Book = require("./models/book")
const Author = require("./models/author")
const User = require("./models/user")

mongoose.set("strictQuery", false)
const MONGODB_URI = process.env.MONGODB_URI
console.log("connecting to", MONGODB_URI)
mongoose.connect(MONGODB_URI)
	.then(() => {
		console.log("connected to MongoDB")
	})
	.catch((error) => {
		console.log("error connecting to MongoDB:", error.message)
	})

const gql = String.raw

const typeDefs = gql`
	type User {
		username: String!
		favoriteGenre: String!
		id: ID!
	}

	type Token {
		value: String!
	}

	type Author {
		name: String!
		id: ID!
		born: Int
		bookCount: Int!
	}

	type Book {
		title: String!
		published: Int!
		author: Author!
		id: ID!
		genres: [String!]!
	}

  type Query {
    bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]
		allAuthors: [Author!]!
		me: User
  }

	type Mutation {
		addBook(
			title: String!
			author: String!
			published: Int!
			genres: [String!]!
		): Book
		editAuthor(
			name: String!
			setBornTo: Int!
		): Author
		createUser(
			username: String!
			favoriteGenre: String!
		): User
		login(
			username: String!
			password: String!
		): Token
	}
`

const resolvers = {
	Query: {
		bookCount: async (root, args) => {
			return await Book.collection.countDocuments()
		},
		authorCount: async (root, args) => {
			return await Author.collection.countDocuments()
		},
		allBooks: async (root, args) => {
			try {
				let query = {}
		
				if (args.author) {
					const author = await Author.findOne({ name: args.author })
					if (author) {
						query.author = author._id
					} else {
						return []
					}
				}
		
				if (args.genre) {
					query.genres = { $in: [args.genre] }
				}
		
				const books = await Book.find(query).populate("author")
				return books
			} catch (error) {
				console.log(error.message)
			}
		},
		allAuthors: async (root, args) => {
			return await Author.find({})
		},
		me: (root, args, context) => {
			return context.currentUser
		}
	},
	Mutation: {
		addBook: async (root, args, context) => {
			const currentUser = context.currentUser

			if (!currentUser) {
				throw new GraphQLError("Not authenticated", {
					extensions: {
						code: "UNAUTHENTICATED"
					}
				})
			}

			const book = new Book({ ...args })
			let author = await Author.findOne({ name: args.author })

			if (!author) {
				author = new Author({ name: args.author })
			}

			try {
				await author.save()
				book.author = author
				await book.save()
			} catch (error) {
				console.log(error.message)
				let fieldName = null
				if (error.message.includes("name")) {
					fieldName = args.author
				} else if (error.message.includes("title")) {
					fieldName = args.title
				}
				throw new GraphQLError("Saving book failed", {
					extensions: {
						code: "BAD_USER_INPUT",
						invalidArgs: fieldName,
						error
					}
				})
			}

			return book
		},
		editAuthor: async (root, args, context) => {
			const currentUser = context.currentUser

			if (!currentUser) {
				throw new GraphQLError("Not authenticated", {
					extensions: {
						code: "UNAUTHENTICATED"
					}
				})
			}
			
			const author = await Author.findOne({ name: args.name })
			author.born = args.setBornTo
			try {
				await author.save()
			} catch (error) {
				console.log(error.message)
			}
			return author
		},
		createUser: async (root, args) => {
			const user = new User({ ...args })
			try {
				const newUser = await user.save()
				return newUser
			} catch (error) {
				throw new GraphQLError("Creating user failed", {
					extensions: {
						code: "BAD_USER_INPUT",
						invalidArgs: args,
						error
					}
				})
			}
		},
		login: async (root, args) => {
			try {
				const user = await User.findOne({ username: args.username })
				if (!user || args.password !== "secret") {
					throw new GraphQLError("Wrong credentials", {
						extensions: {
							code: "UNAUTHENTICATED"
						}
					})
				}

				const userForToken = {
					username: user.username,
					id: user._id
				}

				return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
			} catch (error) {
				console.log(error.message)
			}
		}
	},
	Author: {
		bookCount: async (root, args) => {
			return await Book.countDocuments({ author: root._id })
		}
	},
	Book: {
		author: async (root, args) => {
			return await Author.findById(root.author)
		}
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

startStandaloneServer(server, {
	listen: { port: 4000 },
	context: async ({ req, res }) => {
		const auth = req ? req.headers.authorization : null
		if (auth && auth.startsWith("Bearer ")) {
			const decodedToken = jwt.verify(
				auth.substring(7), process.env.JWT_SECRET
			)
			const currentUser = await User.findById(decodedToken.id)
			return { currentUser }
		}
	}
}).then(({ url }) => {
	console.log(`Server ready at ${url}`)
})