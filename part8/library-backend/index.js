const { ApolloServer } = require("@apollo/server")
const { expressMiddleware } = require("@apollo/server/express4")
const { ApolloServerPluginDrainHttpServer } = require("@apollo/server/plugin/drainHttpServer")
const { makeExecutableSchema } = require("@graphql-tools/schema")
const { WebSocketServer } = require("ws")
const { useServer } = require("graphql-ws/lib/use/ws")
const express = require("express")
const cors = require("cors")
const http = require("http")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const typeDefs = require("./graphQL/schema")
const resolvers = require("./graphQL/resolvers")

const mongoose = require("mongoose")

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

mongoose.set("debug", true)

const start = async () => {
	const app = express()
	
	// Create a wrapper server
	const httpServer = http.createServer(app)

	const wsServer = new WebSocketServer({
		server: httpServer,
		path: "/graphql"
	})

	const schema = makeExecutableSchema({ typeDefs, resolvers })

	const serverCleanup = useServer({ schema }, wsServer)

	const server = new ApolloServer({
		schema,
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }),
			{
				async serverWillStart() {
					return {
						async drainServer() {
							await serverCleanup()
						}
					}
				}
			}
		]
	})

	await server.start()

	app.use(cors())
	app.use(express.json())
	app.use(
		"/graphql",
		expressMiddleware(server, {
			context: async ({ req }) => {
				const auth = req ? req.headers.authorization : null
				if (auth && auth.startsWith("Bearer ")) {
					const decodedToken = jwt.verify(
						auth.substring(7), process.env.JWT_SECRET
					)
					const currentUser = await User.findById(decodedToken.id)
					return { currentUser }
				}
			}
		})
	)

	const PORT = process.env.PORT || 4000

	httpServer.listen(PORT, () => {
		console.log(`Server is now running on http://localhost:${PORT}/graphql`)
	})
}

start()