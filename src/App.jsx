import '@styles/app.scss'
import { Routes, Route } from 'react-router-dom'

import imgBackground from '@images/index/back.jpg'

import Navbar from './components/Navbar/Navbar'
import Bienvenida from './components/Bienvenida/Bienvenida'
import Checklist from './components/Checklist/Checklist'
import Corrector from './components/Corrector/Corrector'
import Aplicativos from './components/Aplicativo/Aplicativo'

// import { SessionAccess } from './components/SessionAccess.jsx/SessionAccess'

export default function App() {
	const style = {
		backgroundImage: `url(${imgBackground})`,
		backgroundSize: '100% 100%',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
	}

	return (
		<div className="app" style={style}>
			{/* <SessionAccess /> */}
			<Navbar />
			<Routes>
				<Route path="/" element={<Bienvenida />} />
				<Route path="/checklist" element={<Checklist />} />
				<Route path="/corrector" element={<Corrector />} />
				<Route path="/aplicativo" element={<Aplicativos />} />
			</Routes>
		</div>
	)
}
