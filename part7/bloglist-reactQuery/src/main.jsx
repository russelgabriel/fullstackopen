import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { NotificationProvider } from './context/NotificationContext.jsx'
import { UserProvider } from './context/UserContext.jsx'

import App from './App.jsx'
import GlobalStyles from './GlobalStyles'

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
	<QueryClientProvider client={client}>
		<UserProvider>
			<NotificationProvider>
				<GlobalStyles />
				<App />
			</NotificationProvider>
		</UserProvider>
	</QueryClientProvider>
)
