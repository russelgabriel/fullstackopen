const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const express = require('express');
const cors = require('cors');
const http = require('http');
require('dotenv').config();

const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

const User = require('./models/user');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const MONGODB_URI = process.env.MONGODB_URI;

console.log(`connecting to ${MONGODB_URI}`);

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB');
	})
	.catch((error) => {
		console.log('error connection to MongoDB:', error.message);
	});

mongoose.set('debug', true);

const start = async () => {
	const app = express();

	// Create an HTTP server to wrap the ApolloServer and WebSocketServer
	const httpServer = http.createServer(app);

	const wsServer = new WebSocketServer({
		server: httpServer,
		// Same path as expressMiddlware from @apollo/server/express4
		path: '/'
	});

	const schema = makeExecutableSchema({ typeDefs, resolvers });

	// Use the WebSocket server with the schema
	// This will handle the WebSocket connection and 
	// upgrade the connection to a GraphQL WebSocket connection
	const serverCleanup = useServer({ schema }, wsServer);

	const server = new ApolloServer({
		schema,
		plugins: [
			// Proper shutdown for the HTTP server
			ApolloServerPluginDrainHttpServer({ httpServer }),

			// Proper shutdown for the WebSocket server
			{
				async serverWillStart() {
					return {
						async drainServer() {
							await serverCleanup.dispose();
						}
					};
				}
			}
		]
	});

	// Ensure GraphQL server is started before the express app
	// starts listening for requests
	await server.start();

	app.use(
		'/',
		cors(),
		express.json(),
		expressMiddleware(server, {
			context: async ({ req }) => {
				const auth = req ? req.headers.authorization : null;
				if (auth && auth.startsWith('Bearer ')) {
					const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
					const currentUser = await User.findById(decodedToken.id).populate('friends');
					return { currentUser };
				}
			}
		})
	);
	const PORT = 4000;
	
	httpServer.listen(PORT, () => {
		console.log(`Server is now running on http://localhost:${PORT}`);
	});
};

start();
