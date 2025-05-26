import '@styles/app.scss'
import { Routes, Route } from 'react-router-dom'
import imgCtrlAccesss from './assets/images/index/sessionBackground.jpg'
import imgSectionPage from './assets/images/index/backApp.jpg'
import dataNavbar from './components/Navbar/dataNavbar.json'
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
import BasesNoti from './components/Test/BasesNoti.jsx'
import Biblioteca from './components/Biblioteca/Biblioteca.jsx'
import Navbar from './components/WebTraining/navbar/Navbar.jsx'

const App = () => {
	const { activeAppNote, showApp, admin } = useContext(GlobalContext)

	useEffect(() => {
		document.body.addEventListener('keydown', e => {
			if (e.key == 'Escape') {
				showApp(false)
			}
		})

		const sessionRec = document.querySelector('.sessionRec')

		if (sessionRec) {
			if (sessionStorage.getItem('session') != 'true') {
				const sessionRec = document.querySelector('.sessionRec')
				sessionRec.style.backgroundImage = `url(${imgCtrlAccesss})`
				sessionRec.style.backgroundSize = 'cover'
				sessionRec.style.backgroundRepeat = 'no-repeat'
				sessionRec.style.backgroundPosition = 'center'
			}
		}
	})

	return (
		<div className="flex flex-col-reverse h-dvh bg-cover bg-center relative">
			<div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:6rem_4rem]">
				<div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#ffc5c5,transparent)]"></div>
			</div>

			<section
				style={{ backgroundImage: `url(${imgSectionPage})` }}
				className="w-[calc(100%-32px)] h-full rounded-xl border-2 border-red-500 shadow-xl shadow-foreground/50 mx-auto my-4 overflow-x-hidden overflow-y-auto bg-cover bg-center bg-white relative">
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
			{activeAppNote && <NoteApp />}
			<Navbar />
		</div>
	)
}

export default App
