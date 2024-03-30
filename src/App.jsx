import '@styles/app.scss'
import { Routes, Route } from 'react-router-dom'

import imgBackground from './assets/images/index/background.jpg'

import Navbar from './components/Navbar/Navbar'
import Bienvenida from './components/Bienvenida/Bienvenida'
import Corrector from './components/Corrector/Corrector'
import { SessionAccess } from './components/SessionAccess.jsx/SessionAccess'
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
					<Route path="/checklist" element={<CheckListBase checklist="ejemploA" />} />
					<Route path="/checklist/ejemploA" element={<CheckListBase checklist="ejemploA" />} />
					<Route path="/checklist/ejemploB" element={<CheckListBase checklist="ejemploB" />} />
					<Route path="/checklist/ejemploC" element={<CheckListBase checklist="ejemploC" />} />
					<Route path="/corrector" element={<Corrector />} />
				</Routes>
			</div>
		</ContadorProvider>
	)
}

export default App
