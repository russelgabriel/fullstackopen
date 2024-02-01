import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

// GraphQL Websocket stuff
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('user-token')
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : null,
		}
	}
})

const httpLink = createHttpLink({
	uri: "http://localhost:4000"
})

const wsLink = new GraphQLWsLink(
	createClient({ url: 'ws://localhost:4000' })
)

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query)
		return (
			definition.kind === 'OperationDefinition' &&
			definition.operation === 'subscription'
		)
	},
	// If the query is a subscription, use the wsLink, otherwise use the httpLink
	wsLink,
	authLink.concat(httpLink)
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
	link: splitLink
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
