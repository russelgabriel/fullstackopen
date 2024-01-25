const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const { GraphQLError } = require("graphql")

require("dotenv").config()
const mongoose = require("mongoose")
const Book = require("./models/book")
const Author = require("./models/author")

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
	},
	Mutation: {
		addBook: async (root, args) => {
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
			}

			return book
		},
		editAuthor: async (root, args) => {
			const author = await Author.findOne({ name: args.name })
			author.born = args.setBornTo
			try {
				await author.save()
			} catch (error) {
				console.log(error.message)
			}
			return author
		}
	},
	Author: {
		bookCount: (root, args) => {
			return null
		}
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

startStandaloneServer(server, {
	listen: { port: 4000 },
}).then(({ url }) => {
	console.log(`Server ready at ${url}`)
})