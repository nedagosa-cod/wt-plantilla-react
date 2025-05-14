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
import { Button } from '@/components/ui/button'
import imgLogo from '@images/index/logoSIn.png'
import { SecondaryNavbar } from './components/SecondaryNav'
import LEDLine from './components/LedLine'
import dataNavbar from './dataNavbar.json'
import ConfigMenu from './components/ConfigMenu'
import BuscadorWT from './components/Buscador'
import TopNavbar from './components/TopNavbar'

export default function Navbar() {
	const [activeSegment, setActiveSegment] = useState(() => {
		return localStorage.getItem('activeSegment') || 'Personas'
	})
	const [searchOpen, setSearchOpen] = useState(false)
	const [leftItems, setLeftItems] = useState([])
	const [rightItems, setRightItems] = useState([])
	const secondaryMenuItems = [
		{ icon: <Home className="h-4 w-4" />, label: 'Inicio', href: '#' },
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
		<div className="w-full relative">
			{/* Top navbar */}
			<TopNavbar segmentos={dataNavbar.SEGMENTS} activeSegment={activeSegment} setActiveSegment={setActiveSegment} />

			{/* Secondary navbar */}
			<div className="bg-white border-b shadow-sm relative z-8">
				<div className="flex items-center justify-between h-20 relative">
					<div className="bg-[hsl(var(--primary-dark))] w-full h-full">
						<div className="flex items-center justify-between w-full h-full rounded-l-full relative bg-white ">
							{/* Navbar izquierdo */}
							<div className="flex items-center w-full mr-6">
								<div className="hidden md:flex items-center justify-end space-x-1 px-6  w-full">
									{leftItems.length > 0 && (
										<SecondaryNavbar data={leftItems} activeSegment={activeSegment} className="justify-end" />
									)}
								</div>
							</div>
							{/* Botón de búsqueda central */}
							<button
								onClick={() => setSearchOpen(!searchOpen)}
								className="group bg-gradient-to-r from-[hsl(var(--primarywt))] to-[hsl(var(--primarywt))] rounded absolute left-1/2 transform -translate-x-1/2 hover:bg-[hsl(var(--primary-light))] py-1 px-3 shadow-xl shadow-primary transition-all z-10 aspect-square cursor-pointer [box-shadow:#3c40434d_0_1px_2px_0,#3c404326_0_2px_6px_2px,#0000004d_0_30px_60px_-30px,#34343459_0_-2px_6px_0_inset] flex items-center justify-center flex-col"
								aria-label="Buscar">
								<div className="flex items-center flex-col group-hover:scale-110 transition-all duration-300 p-1">
									<TextSearch className="w-14 h-14 text-white" />
									<span className="text-white text-sm">Buscar</span>
								</div>
							</button>
							{/* Navbar derecho */}
							<div className="flex items-center w-full ml-6">
								<div className="hidden md:flex items-center space-x-1 px-6  w-full">
									{console.log(rightItems)}
									{rightItems.length > 0 && (
										<SecondaryNavbar data={rightItems} activeSegment={activeSegment} className="justify-start" />
									)}
								</div>
							</div>
						</div>
					</div>

					{/* Barra de búsqueda que aparece debajo del navbar */}
					<BuscadorWT open={searchOpen} />

					<div className="flex items-center justify-center space-x-4 w-1/4 rounded h-full">
						<div className="w-1 h-12 rounded bg-gradient-to-b from-primary to-[hsl(var(--primary-dark))]"></div>
						<div className="flex items-center">
							<div className="flex items-center">
								<figure className="w-20">
									<img src={imgLogo} alt="logo" />
								</figure>

								<div className="ml-4 relative">
									<h2 className="text-primary text-4xl text-nowrap text-center">Web Training</h2>
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
