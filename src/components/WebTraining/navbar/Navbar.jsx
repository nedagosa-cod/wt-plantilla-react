import { useEffect, useState } from 'react'
import {
	Search,
	ChevronDown,
	Home,
	Menu,
	User,
	Target,
	Building2,
	BarChart3,
	Volume2,
	Lock,
	Diamond,
	Info,
	User2,
	TextSearch,
	X,
} from 'lucide-react'
import imgLogo from '@images/index/logoSIn.png'
import { SecondaryNavbar } from './components/SecondaryNav'
import LEDLine from './components/LedLine'
import dataNavbar from '@/data/dataNavbar.json'
import BuscadorWT from './components/search/Buscador'
import TopNavbar from './components/TopNavbar'

export default function Navbar() {
	const [activeSegment, setActiveSegment] = useState(() => {
		return localStorage.getItem('activeSegment') || 'Terpel'
	})
	const [searchOpen, setSearchOpen] = useState(false)
	const [leftItems, setLeftItems] = useState([])
	const [rightItems, setRightItems] = useState([])
	const [showBuscador, setShowBuscador] = useState(false)

	const secondaryMenuItems = [
		{ icon: <Home className="w-4 h-4" />, label: 'Inicio', href: '#' },
		{
			icon: <span className="text-sm">📝</span>,
			label: 'Scripts',
			href: '#/checklist',
		},
		{
			icon: <span className="text-sm">💳</span>,
			label: 'Estudio de mercado',
			href: '#',
			hasDropdown: true,
			dropdownKey: 'tarjeta',
			dropdownItems: [
				{ label: 'Opción 1', href: '#' },
				{ label: 'Opción 2', href: '#' },
			],
		},
		{
			icon: <span className="text-sm">📊</span>,
			label: 'Argumentario',
			href: '#',
			hasDropdown: true,
			dropdownKey: 'creditos',
			dropdownItems: [
				{ label: 'Opción 1', href: '#' },
				{ label: 'Opción 2', href: '#' },
			],
		},
	]
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
		<div className="relative w-full z-1000">
			{/* Top navbar */}
			<TopNavbar segmentos={dataNavbar.SEGMENTS} activeSegment={activeSegment} setActiveSegment={setActiveSegment} />

			{/* Secondary navbar */}
			<div className="relative border-b shadow-sm z-8">
				<div className="flex relative justify-between items-center h-20">
					<div className="pl-2 w-full h-full bg-secondary dark:bg-secondary">
						<div className="flex relative justify-between items-center w-full h-full rounded-l-full bg-background">
							{/* Círculos animados */}
							<ul className="overflow-hidden absolute top-0 left-0 z-0 w-full h-full circles">
								{[...Array(10)].map((_, i) => (
									<li
										key={i}
										className={`
											absolute block  rounded-none animate-floating
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
										`}>
										{/* Logo Terpel */}
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="terpel">
											<path
												fill="#F44336"
												fillRule="evenodd"
												d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12v-.016c-.007 4.628-3.704 8.378-8.264 8.378-4.564 0-8.264-3.757-8.264-8.392s3.7-8.392 8.264-8.392c4.487 0 8.139 3.632 8.261 8.159C23.857 5.232 18.54 0 12 0z"
												clipRule="evenodd"></path>
											<path
												fill="#FF9800"
												fillRule="evenodd"
												d="M15.736 3.578C20.3 3.578 24 7.335 24 11.97s-3.7 8.392-8.264 8.392c-2.935 0-5.513-1.554-6.979-3.897a5.17 5.17 0 1 0 .04-9.053c1.473-2.307 4.03-3.834 6.939-3.834z"
												clipRule="evenodd"></path>
											<path
												fill="#FFD54F"
												fillRule="evenodd"
												d="M14.281 3.71c3.732.033 7.178 3.602 7.178 8.207s-3.131 8.338-6.993 8.338c-2.211-.318-4.379-1.687-5.701-3.786a5.17 5.17 0 1 0 .044-9.064c1.304-2.026 3.391-3.332 5.472-3.695z"
												clipRule="evenodd"></path>
										</svg>
									</li>
								))}
							</ul>

							{/* Contenido del navbar (con z-index para estar por encima de los círculos) */}
							<div className="flex relative z-10 items-center mr-6 w-full">
								<div className="hidden justify-end items-center px-6 space-x-1 w-full md:flex">
									{leftItems.length > 0 && (
										<SecondaryNavbar data={leftItems} activeSegment={activeSegment} className="justify-end" />
									)}
								</div>
							</div>

							{/* Botón de búsqueda central */}
							<button
								onClick={() => {
									if (!searchOpen) {
										// ABRIR
										setSearchOpen(true)
										setTimeout(() => setShowBuscador(true), 50) // le damos un pequeño delay
									} else {
										// CERRAR
										setShowBuscador(false)
										setTimeout(() => setSearchOpen(false), 300) // esperamos la animación para desmontar
									}
								}}
								className="group bg-secondary rounded absolute left-1/2 transform -translate-x-1/2 hover:bg-primary py-1 px-3 shadow-xl shadow-primary transition-all z-20 aspect-square cursor-pointer [box-shadow:#3c40434d_0_1px_2px_0,#3c404326_0_2px_6px_2px,#0000004d_0_30px_60px_-30px,#34343459_0_-2px_6px_0_inset] flex items-center justify-center flex-col"
								aria-label="Buscar">
								<div className="flex flex-col items-center p-1 transition-all duration-300 group-hover:scale-110">
									<TextSearch className="w-14 h-14 text-white" />
									<span className="text-sm text-white">Buscar</span>
								</div>
							</button>

							{/* Navbar derecho */}
							<div className="flex relative z-10 items-center ml-6 w-full">
								<div className="hidden items-center px-6 space-x-1 w-full md:flex">
									{rightItems.length > 0 && (
										<SecondaryNavbar data={rightItems} activeSegment={activeSegment} className="justify-start" />
									)}
								</div>
							</div>
						</div>
					</div>

					{/* Barra de búsqueda que aparece debajo del navbar */}
					{/* <BuscadorWT open={searchOpen} /> */}
					{searchOpen && <BuscadorWT open={showBuscador} />}

					{/* Segmento logo y nombre */}
					<div className="flex justify-end items-center pr-2 space-x-4 w-1/4 h-full bg-gradient-to-r from-background via-background to-secondary dark:bg-gradient-to-r dark:from-background dark:via-background dark:to-secondary">
						<div className="w-1 h-12 rounded bg-gradient-to-b from-primary to-[hsl(var(--primary-dark))]"></div>
						<div className="flex items-center h-full rounded-r-full bg-background">
							<div className="flex items-center">
								<figure className="w-20">
									<img src={imgLogo} alt="logo" />
								</figure>

								<div className="flex relative flex-col justify-center items-center mx-4">
									<h2 className="text-3xl text-center text-primary dark:text-white text-nowrap">Web Training</h2>
									<span className="text-sm text-center text-primary dark:text-white text-nowrap">Terpel</span>
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
