import '@styles/app.scss'
import { Routes, Route } from 'react-router-dom'

import imgBackground from './assets/images/index/background.jpg'

import Navbar from './components/Navbar/Navbar'
import Bienvenida from './components/Bienvenida/Bienvenida'
import Checklist from './components/Checklist/Checklist'
import Corrector from './components/Corrector/Corrector'
import { SessionAccess } from './components/SessionAccess.jsx/SessionAccess'
import { Page } from './components/Test/Page'
import { ContadorProvider } from './context/ContadorContext'
import CheckListBase from './components/Checklist/CheckListBase'

const App = () => {
	const style = {
		backgroundImage: `url(${imgBackground})`,
		backgroundSize: '100% 100%',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
	}

	return (
		<ContadorProvider>
			<div className="app" style={style}>
				<SessionAccess campana="Nombre Campaña" segmento="Nombre Segmento" />
				<Navbar />

				<Routes>
					<Route path="/" element={<Bienvenida />} />
					<Route path="/checklist" element={<CheckListBase />} />
					<Route path="/corrector" element={<Corrector />} />
				</Routes>
			</div>
		</ContadorProvider>
	)
}

export default App
