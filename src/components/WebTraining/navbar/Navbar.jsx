import { useEffect, useState } from 'react'
import { TextSearch } from 'lucide-react'
import imgLogo from '@images/index/logoSIn.png'
import { SecondaryNavbar } from './components/SecondaryNav'
import LEDLine from './components/LedLine'
import dataNavbar from '@/data/dataNavbar.json'
import BuscadorWT from './components/search/Buscador'
import TopNavbar from './components/TopNavbar'

export default function Navbar() {
	const [activeSegment, setActiveSegment] = useState(() => {
		return localStorage.getItem('activeSegment') || 'Personas'
	})
	const [searchOpen, setSearchOpen] = useState(false)
	const [leftItems, setLeftItems] = useState([])
	const [rightItems, setRightItems] = useState([])

	useEffect(() => {
		const itemsBySegment = dataNavbar.NAVBAR.filter(item => {
			if (item.segments && item.segments.includes(activeSegment)) {
				return true
			} else if (!item.segments) {
				return true
			}
			return false
		})

		const left = []
		const right = []

		itemsBySegment.forEach((item, index) => {
			if (index % 2 === 0) {
				left.push(item)
			} else {
				right.push(item)
			}
		})

		setLeftItems(left)
		setRightItems(right)
		localStorage.setItem('activeSegment', activeSegment)
	}, [activeSegment])

	return (
		<div className="w-full relative z-1000">
			{/* Top navbar */}
			<TopNavbar segmentos={dataNavbar.SEGMENTS} activeSegment={activeSegment} setActiveSegment={setActiveSegment} />

			{/* Secondary navbar */}
			<div className="bg-background border-b shadow-sm relative z-8">
				<div className="flex items-center justify-between h-20 relative">
					<div className="bg-[hsl(var(--primary-dark))] dark:bg-[hsl(var(--primary-light))] w-full h-full">
						<div className="flex items-center justify-between w-full h-full rounded-l-full relative bg-background ">
							{/* Círculos animados */}
							<ul className="circles absolute top-0 left-0 w-full h-full overflow-hidden z-0">
								{[...Array(10)].map((_, i) => (
									<li
										key={i}
										className={`
            absolute block bg-red-500/20 rounded-none animate-floating
            ${i === 0 ? 'left-1/4 w-20 h-20 animate-delay-0' : ''}
            ${i === 1 ? 'left-[10%] w-5 h-5 animate-delay-2s animate-duration-12s' : ''}
            ${i === 2 ? 'left-[70%] w-5 h-5 animate-delay-4s' : ''}
            ${i === 3 ? 'left-[40%] w-[60px] h-[60px] animate-delay-0 animate-duration-18s' : ''}
            ${i === 4 ? 'left-[65%] w-5 h-5 animate-delay-0' : ''}
            ${i === 5 ? 'left-[75%] w-[110px] h-[110px] animate-delay-3s' : ''}
            ${i === 6 ? 'left-[35%] w-[150px] h-[150px] animate-delay-7s' : ''}
            ${i === 7 ? 'left-1/2 w-[25px] h-[25px] animate-delay-15s animate-duration-45s' : ''}
            ${i === 8 ? 'left-[20%] w-[15px] h-[15px] animate-delay-2s animate-duration-35s' : ''}
            ${i === 9 ? 'left-[85%] w-[150px] h-[150px] animate-delay-0 animate-duration-11s' : ''}
          `}
									/>
								))}
							</ul>

							{/* Contenido del navbar (con z-index para estar por encima de los círculos) */}
							<div className="flex items-center w-full mr-6 relative z-10">
								<div className="hidden md:flex items-center justify-end space-x-1 px-6 w-full">
									{leftItems.length > 0 && (
										<SecondaryNavbar data={leftItems} activeSegment={activeSegment} className="justify-end" />
									)}
								</div>
							</div>

							{/* Botón de búsqueda central */}
							<button
								onClick={() => setSearchOpen(!searchOpen)}
								className="group bg-[hsl(var(--primarywt))] rounded absolute left-1/2 transform -translate-x-1/2 hover:bg-[hsl(var(--primary-light))] py-1 px-3 shadow-xl shadow-primary transition-all z-20 aspect-square cursor-pointer [box-shadow:#3c40434d_0_1px_2px_0,#3c404326_0_2px_6px_2px,#0000004d_0_30px_60px_-30px,#34343459_0_-2px_6px_0_inset] flex items-center justify-center flex-col"
								aria-label="Buscar">
								<div className="flex items-center flex-col group-hover:scale-110 transition-all duration-300 p-1">
									<TextSearch className="w-14 h-14 text-white" />
									<span className="text-white text-sm">Buscar</span>
								</div>
							</button>

							{/* Navbar derecho */}
							<div className="flex items-center w-full ml-6 relative z-10">
								<div className="hidden md:flex items-center space-x-1 px-6 w-full">
									{rightItems.length > 0 && (
										<SecondaryNavbar data={rightItems} activeSegment={activeSegment} className="justify-start" />
									)}
								</div>
							</div>
						</div>
					</div>

					{/* Barra de búsqueda que aparece debajo del navbar */}
					<BuscadorWT open={searchOpen} />

					{/* Segmento logo y nombre */}
					<div className="flex items-center justify-end space-x-4 w-1/4 h-full bg-gradient-to-r from-background via-background to-[hsl(var(--primary-dark))] dark:bg-gradient-to-r dark:from-background dark:via-background dark:to-[hsl(var(--primary-light))]">
						<div className="w-1 h-12 rounded bg-gradient-to-b from-primary to-[hsl(var(--primary-dark))]"></div>
						<div className="flex items-center bg-background h-full rounded-r-full">
							<div className="flex items-center">
								<figure className="w-20">
									<img src={imgLogo} alt="logo" />
								</figure>

								<div className="mx-4 relative">
									<h2 className="text-primary dark:text-white text-4xl text-nowrap text-center">Web Training</h2>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<LEDLine />
		</div>
	)
}
