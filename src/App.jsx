import '@styles/app.scss'
import { Routes, Route } from 'react-router-dom'

import imgBackground from './assets/images/index/backgroundLight.jpg'
import imgBackgroundD from './assets/images/index/background.jpg'
import imgApp from './assets/images/index/backApp.jpg'
import imgCtrlAccesss from './assets/images/index/sessionBackground.jpg'

import dataNavbar from './components/Navbar/dataNavbar.json'
import Navbar from './components/Navbar/Navbar'
import Bienvenida from './components/Bienvenida/Bienvenida'
import Corrector from './components/Corrector/Corrector'
import GlobalContext from './context/GlobalContext'
import CheckListBase from './components/Checklist/CheckListBase'
import Testeos from './components/Test/Testeos'
import { useContext, useEffect } from 'react'
import TimeLine from './components/TimeLine/TimeLine'
import Tipificador from './components/Tipificador/Tipificador'
import { NoteApp } from './components/NoteApp/NoteApp.jsx'
import IconsTest from './components/WebTraining/IconsTest.jsx'
import HorNav from './components/Navbar/HorNav.jsx'
import BasesNoti from './components/Test/BasesNoti.jsx'
import Biblioteca from './components/Biblioteca/Biblioteca.jsx'

const App = () => {
	const { scheme, activeAppNote, showApp, admin } = useContext(GlobalContext)

	const style = {
		app: {
			backgroundImage: `url(${scheme === 'light' ? imgBackground : imgBackgroundD})`,
			colorScheme: scheme,
		},
		body: {
			backgroundImage: `url(${imgApp})`,
			colorScheme: scheme,
		},
	}
	useEffect(() => {
		document.body.addEventListener('keydown', e => {
			if (e.key == 'Escape') {
				showApp(false)
			}
		})
		if (sessionStorage.getItem('session') != 'true') {
			const sessionRec = document.querySelector('.sessionRec')
			sessionRec.style.backgroundImage = `url(${imgCtrlAccesss})`
			sessionRec.style.backgroundSize = 'cover'
			sessionRec.style.backgroundRepeat = 'no-repeat'
			sessionRec.style.backgroundPosition = 'center'
		}
	})
	return (
		<div className="app h" style={style.app}>
			{/* <Navbar /> */}
			<HorNav />
			{activeAppNote && <NoteApp />}
			<section className="app__body" style={style.body}>
				<Routes>
					{admin && (
						<>
							<Route path="/admin" element={<Bienvenida />} />
							<Route path="/checkplantilla" element={<Bienvenida />} />
							<Route path="/checklist/plantilla" element={<CheckListBase checklist="checkplantilla" />} />
						</>
					)}
					{dataNavbar.SEGMENTS.map((segment, i) => {
						return <Route key={i} path={'/' + segment.segment} element={<Bienvenida />} />
					})}
					<Route path="/" element={<Bienvenida />} />
					<Route path="/checklist" element={<CheckListBase checklist="ejemploA" />} />
					<Route path="/checklist/ejemploA" element={<CheckListBase checklist="ejemploA" />} />
					<Route path="/checklist/ejemploB" element={<CheckListBase checklist="ejemploB" />} />
					<Route path="/checklist/ejemploC" element={<CheckListBase checklist="ejemploC" />} />
					<Route path="/tipificador" element={<Tipificador />} />
					<Route path="/calculadoras/estandar" element={<Tipificador />} />
					<Route path="/timeline" element={<TimeLine />} />
					<Route path="/corrector" element={<Corrector />} />
					<Route path="/testeos" element={<Testeos />} />
					<Route path="/iconTest" element={<IconsTest />} />
					<Route path="/testbases" element={<BasesNoti />} />
					<Route path="/biblioteca" element={<Biblioteca />} />
				</Routes>
			</section>
		</div>
	)
}

export default App
