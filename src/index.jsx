import { StrictMode } from 'react'
import App from './App.jsx'
import './styles/index.scss'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
	<StrictMode>
		<HashRouter>
			<App />
		</HashRouter>
	</StrictMode>
)
