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
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import imgLogo from '@images/index/logoSIn.png'
import { SecondaryNavbar } from './components/SecondaryNav'
import LEDLine from './components/LedLine'

export default function Navbar() {
	const [activeDropdown, setActiveDropdown] = useState(null)

	const toggleDropdown = name => {
		if (activeDropdown === name) {
			setActiveDropdown(null)
		} else {
			setActiveDropdown(name)
		}
	}
	const [query, setQuery] = useState('')
	const [isFocused, setIsFocused] = useState(false)
	const topMenuItems = [
		{ icon: <User className="h-4 w-4" />, label: 'Segmento 1', href: '#' },
		{ icon: <Target className="h-4 w-4" />, label: 'Segmento 2', href: '#' },
		{ icon: <Building2 className="h-4 w-4" />, label: 'Segmento 3', href: '#' },
		{ icon: <User className="h-4 w-4" />, label: 'Segmento 4', href: '#' },
		{ icon: <Target className="h-4 w-4" />, label: 'Segmento 5', href: '#' },
		{ icon: <Building2 className="h-4 w-4" />, label: 'Segmento 6', href: '#' },
	]

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

	return (
		<div className="w-full relative">
			{/* Top navbar */}
			<div className="bg-primary relative z-10">
				<div className="mx-auto">
					<div className="flex items-center justify-between ">
						<div className="hidden md:flex justify-around space-x-6 w-full ">
							{topMenuItems.map((item, index) => (
								<Button
									key={index}
									variant="ghost"
									asChild
									className="text-background hover:bg-secondary hover:text-foreground h-8 px-2 w-full">
									<a href={item.href} className="flex items-center text-sm font-medium">
										<span className="mr-1">{item.icon}</span> {item.label}
									</a>
								</Button>
							))}
						</div>
						<div className="flex items-center space-x-4 bg-[hsl(var(--primary-dark))]">
							<Button variant="ghost" asChild className="text-white hover:bg-secondary hover:text-white h-8 px-2">
								<a href="#" className="flex items-center text-sm font-medium">
									<User className="h-4 w-4 mr-1" /> ADMIN
								</a>
							</Button>
							<div className="flex items-center space-x-2">
								<Button variant="ghost" size="icon" className="text-white hover:bg-secondary h-8 w-8">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
									</svg>
								</Button>
								<Button variant="ghost" size="icon" className="text-white hover:bg-secondary h-8 w-8">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
										/>
									</svg>
								</Button>
								<Button variant="ghost" size="icon" className="text-white hover:bg-secondary h-8 w-8">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
										/>
									</svg>
								</Button>
								<Button variant="ghost" size="icon" className="text-white hover:bg-secondary h-8 w-8">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Secondary navbar */}
			<div className="bg-white border-b shadow-sm relative z-8">
				<div className="mx-auto">
					<div className="flex items-center justify-between h-16">
						<div className="flex items-center w-full ">
							<div className="hidden md:flex items-center space-x-1 px-6  w-full m-8">
								<SecondaryNavbar />
							</div>
						</div>
						<div className="flex items-center justify-center space-x-4 w-1/4 ">
							<div className="flex items-center">
								<div className="flex items-center">
									<figure className="w-20 ">
										<img src={imgLogo} alt="logo" />
									</figure>

									<div className="ml-4 relative">
										<h2 className="text-primary text-4xl font-bold">Web Training</h2>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="w-1/2 h-16 absolute top-full left-1/2 -translate-x-1/2  block m-auto border-b-4 bg-[hsl(var(--primary-dark))]">
				<div
					className={`relative flex items-center h-16 overflow-hidden transition-all duration-300 ${
						isFocused
							? 'shadow-lg ring-2 ring-primary bg-[hsl(var(--primary-dark))]'
							: 'shadow-md bg-[hsl(var(--primary-light))] hover:shadow-lg'
					}`}>
					<input
						type="text"
						value={query}
						onChange={e => setQuery(e.target.value)}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
						placeholder="¿Qué estás buscando?"
						className="w-full h-full pl-6 pr-12 text-lg bg-transparent outline-none text-white placeholder-accent"
					/>

					<button className="absolute right-0 flex items-center justify-center w-16 h-16 transition-all duration-300 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
						<Search className="w-6 h-6 text-white" />
						<span className="sr-only">Buscar</span>
					</button>

					<div
						className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-300 to-red-500 transition-all duration-300 ${
							isFocused ? 'w-full' : 'w-0'
						}`}></div>
				</div>
			</div>
			<LEDLine />
		</div>
	)
}
