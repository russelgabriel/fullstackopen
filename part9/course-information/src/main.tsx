import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import GlobalStyles from './GlobalStyles'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<>
		<App />
		<GlobalStyles />
	</>
)
