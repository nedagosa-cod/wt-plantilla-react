import { StrictMode } from 'react'
import App from './App.jsx'
import './styles/index.scss'
import './styles/session.scss'
import './js/session.js'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { GlobalProvider } from './context/GlobalContext.jsx'
import { SearchProvider } from './context/SearchProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
	<StrictMode>
		<HashRouter>
			<GlobalProvider>
				<SearchProvider>
					<App />
				</SearchProvider>
			</GlobalProvider>
		</HashRouter>
	</StrictMode>
)
