import { StrictMode } from 'react'
import App from './App.jsx'
import './styles/index.scss'
import './styles/session.scss'
import './js/session.js'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { GlobalProvider } from './context/GlobalContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
	<StrictMode>
		<HashRouter>
			<GlobalProvider>
				<App />
			</GlobalProvider>
		</HashRouter>
	</StrictMode>
)
