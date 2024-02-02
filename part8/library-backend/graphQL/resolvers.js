const { GraphQLError } = require("graphql")
const { PubSub } = require("graphql-subscriptions")
const pubsub = new PubSub()
const jwt = require("jsonwebtoken")

const Book = require("../models/book")
const Author = require("../models/author")
const User = require("../models/user")

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
			return await Author.aggregate([
				{
					$lookup: {
						from: "books",
						localField: "_id",
						foreignField: "author",
						as: "books"
					}
				},
				{
					$addFields: {
						bookCount: { $size: "$books" }
					}
				}
			])
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

				pubsub.publish("BOOK_ADDED", { bookAdded: book })
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
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"])
		}
	},
	Book: {
		author: async (root, args) => {
			return await Author.findById(root.author)
		}
	}
}

module.exports = resolvers