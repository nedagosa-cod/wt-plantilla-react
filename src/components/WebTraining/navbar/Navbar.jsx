import { useEffect, useState } from 'react'
import LEDLine from './components/LedLine'
import dataNavbar from '@/data/dataNavbar.json'
import TopNavbar from './components/TopNavbar'
import HorNav from './components/HorNav'

export default function Navbar() {
	const [activeSegment, setActiveSegment] = useState(() => {
		return localStorage.getItem('activeSegment') || 'SWAT'
	})

	useEffect(() => {
		const itemsBySegment = dataNavbar.NAVBAR.filter(item => {
			if (item.segments && item.segments.includes(activeSegment)) {
				return true
			} else if (!item.segments) {
				return true
			}
			return false
		})

		localStorage.setItem('activeSegment', activeSegment)
	}, [activeSegment])

	return (
		<div className="relative w-full z-1000">
			{/* Top navbar */}
			<TopNavbar segmentos={dataNavbar.SEGMENTS} activeSegment={activeSegment} setActiveSegment={setActiveSegment} />

			{/* Secondary navbar */}

			<div className="flex relative justify-between items-center h-20">
				<HorNav activeSegment={activeSegment} />

				{/* Barra de búsqueda que aparece debajo del navbar */}
				{/* <BuscadorWT open={searchOpen} /> */}
			</div>

			<LEDLine />
		</div>
	)
}
