import { useState } from 'react'
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
const icons = {
	home: <Home className="h-4 w-4" />,
	checklist: <Menu className="h-4 w-4" />,
	note: <Info className="h-4 w-4" />,
	tipify: <Diamond className="h-4 w-4" />,
	admin: <User2 className="h-4 w-4" />,
}

export default function Navbar() {
	const [activeSegment, setActiveSegment] = useState('Personas')
	const [searchOpen, setSearchOpen] = useState(false)
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

	// Distribuir elementos alternando izquierda y derecha
	const leftItems = []
	const rightItems = []

	dataNavbar.NAVBAR.forEach((item, index) => {
		if (index % 2 === 0) {
			leftItems.push(item)
		} else {
			rightItems.push(item)
		}
	})

	return (
		<div className="w-full relative">
			{/* Top navbar */}
			<div className="bg-primary relative z-10 [box-shadow:#3c40434d_0_1px_2px_0,#3c404326_0_2px_6px_2px,#0000004d_0_30px_60px_-30px,#34343459_0_-2px_6px_0_inset]">
				<div className="mx-auto">
					<div className="flex items-center justify-between ">
						<div className="hidden md:flex justify-around space-x-6 w-full ">
							{dataNavbar.SEGMENTS.map((item, index) => (
								<Button
									key={index}
									variant="ghost"
									asChild
									className={
										activeSegment == item.segment
											? `cursor-pointer  bg-secondary text-foreground h-8 px-2 w-full`
											: `cursor-pointer text-background hover:bg-secondary hover:text-foreground h-8 px-2 w-full`
									}>
									<a
										onClick={() => setActiveSegment(item.segment)}
										href={`#${item.segment.toLowerCase().replace(' ', '_')}`}
										className="flex items-center text-sm font-medium">
										<span className="mr-1">{icons[item.icon]}</span> {item.segment}
									</a>
								</Button>
							))}
						</div>
						<div className="flex items-center space-x-4 bg-[hsl(var(--primary-dark))] px-4">
							<Button variant="ghost" asChild className="text-white hover:bg-secondary hover:text-black h-8 px-2">
								<a href="#" className="flex items-center text-sm font-medium">
									<User className="h-4 w-4 mr-1" /> Administrador
								</a>
							</Button>
							<ConfigMenu />
						</div>
					</div>
				</div>
			</div>

			{/* Secondary navbar */}
			<div className="bg-white border-b shadow-sm relative z-8">
				<div className="mx-auto">
					<div className="flex items-center justify-between h-16 relative">
						<div className="flex items-center w-full ">
							<div className="hidden md:flex items-center justify-end space-x-1 px-6  w-full m-8 ">
								<SecondaryNavbar data={leftItems} activeSegment={activeSegment} />
							</div>
						</div>
						{/* Botón de búsqueda central */}
						<button
							onClick={() => setSearchOpen(!searchOpen)}
							className="group bg-gradient-to-r from-[hsl(var(--primary-dark))] to-[hsl(var(--primary))] rounded absolute left-1/2 transform -translate-x-1/2 hover:bg-[hsl(var(--primary-light))] py-4 px-6 shadow-lg shadow-primary transition-all z-10 aspect-square cursor-pointer [box-shadow:#3c40434d_0_1px_2px_0,#3c404326_0_2px_6px_2px,#0000004d_0_30px_60px_-30px,#34343459_0_-2px_6px_0_inset] flex items-center justify-center flex-col"
							aria-label="Buscar">
							<div className="flex items-center flex-col group-hover:scale-110 transition-all duration-300">
								<TextSearch className="w-8 h-8 text-white" />
								<span className="text-white text-xs">Buscar</span>
							</div>
						</button>
						<div className="flex items-center w-full ">
							<div className="hidden md:flex items-center space-x-1 px-6  w-full m-8 ">
								<SecondaryNavbar data={rightItems} activeSegment={activeSegment} />
							</div>
						</div>

						{/* Barra de búsqueda que aparece debajo del navbar */}
						<BuscadorWT open={searchOpen} />
						{/* 
						<div className="flex items-center justify-center space-x-4 w-1/4 ">
							<div className="flex items-center">
								<div className="flex items-center">
									<figure className="w-20 ">
										<img src={imgLogo} alt="logo" />
									</figure>

									<div className="ml-4 relative">
										<h2 className="text-primary text-2xl font-bold text-center">Web Training</h2>
									</div>
								</div>
							</div>
						</div> */}
					</div>
				</div>
			</div>

			<LEDLine />
		</div>
	)
}
