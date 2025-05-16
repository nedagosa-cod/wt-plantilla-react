import { GlobeIcon, Search } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { useSearch } from '@/context/SearchProvider'
import { Link } from 'react-router-dom'
import { Menu, Calculator, Library, Diamond, TextCursorInput, MessageCircle, FileText, Clock, X } from 'lucide-react'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'

const icons = {
	segments: {
		checklist: <Menu className="h-6 w-6" />, // Lista/Menu
		calc: <Calculator className="h-6 w-6" />, // Calculadora
		library: <Library className="h-6 w-6" />, // Biblioteca
		tipify: <Diamond className="h-6 w-6" />, // Diamante
		textSlash: <MessageCircle className="h-6 w-6" />, // Burbuja de mensaje
		note: <FileText className="h-6 w-6" />, // Nota/Archivo
		timeLine: <Clock className="h-6 w-6" />, // Reloj/Línea de tiempo
	},
	develops: {
		checklist: <Menu className="h-5 w-5" />, // Lista/Menu
		textSlash: <TextCursorInput className="h-5 w-5" />, // Input de texto
		note: <FileText className="h-5 w-5" />, // Nota/Archivo
		tipify: <Diamond className="h-5 w-5" />, // Diamante
		calc: <Calculator className="h-5 w-5" />, // Calculadora
		library: <Library className="h-5 w-5" />, // Biblioteca
		timeLine: <Clock className="h-5 w-5" />, // Reloj/Línea de tiempo
	},
}

export default function BuscadorWT({ open }) {
	const { handleSearchVista, handleSearchGlobal } = useSearch()
	const [results, setResults] = useState([])
	const [query, setQuery] = useState('')

	const inputRef = useRef(null)

	const handleSearch = e => {
		setQuery(e.target.value)
		handleSearchVista(e.target.value)
		if (open) {
			const searchResults = handleSearchGlobal(e.target.value)
			setResults(searchResults)
		}
	}
	const resetSearch = () => {
		setQuery('')
		setResults([])
		handleSearchVista('')
	}

	useEffect(() => {
		if (open && inputRef.current) {
			inputRef.current.focus()
		} else {
			resetSearch()
		}
	}, [open])

	return (
		<div
			className={`absolute top-full mt-4 left-1/2 transform -translate-x-1/2 w-1/2 bg-white shadow-md rounded-b-3xl transition-all duration-300  border-b-2 border-primary  ${
				open ? 'max-h-20 opacity-100 mt-1' : 'max-h-0 opacity-0 ring-2 ring-primary z-1000'
			}`}>
			<div className={`relative flex items-center h-16 transition-all duration-300 `}>
				<input
					ref={inputRef}
					type="text"
					value={query}
					onChange={handleSearch}
					placeholder="¿Qué estás buscando?"
					className="w-full h-full pl-6 pr-12 text-xl bg-transparent outline-none text-primary placeholder-accent"
				/>

				<button onClick={resetSearch}>
					<X className="w-8 h-8 text-accent hover:text-primary cursor-pointer mr-4" />
				</button>
				{/* Switcher busqueda */}

				<Dialog>
					<DialogTrigger>
						<div className="cursor-pointer relative after:content-['Busqueda_global'] after:text-white after:absolute after:text-nowrap after:scale-0 hover:after:scale-100 after:duration-200 w-14 h-12 rounded-full  border-4 border-sky-200 bg-primary pointer flex items-center justify-center duration-300 hover:rounded-[50px] hover:w-48 group/button overflow-hidden active:scale-90 mx-2">
							<GlobeIcon className="w-4 h-4 text-white delay-50 duration-200 group-hover/button:-translate-y-12" />
						</div>
					</DialogTrigger>
					<DialogContent className="flex flex-col min-w-[700px] translate-y-0 top-[5%] min-h-52 max-h-[90%]">
						<DialogHeader className="text-black  flex flex-col" side="left">
							<DialogTitle className="text-2xl font-bold mb-4">Buscador Global</DialogTitle>
							<DialogDescription className="text-sm text-gray-500">
								Busca por palabra clave el contenido que deseas buscar en toda la web training.
							</DialogDescription>
							<div className="flex flex-col gap-2 w-full">
								<label className="flex gap-2 w-full" htmlFor="name">
									<input
										className="rounded-full bg-primary/10 text-xl border-2 border-primary p-4 placeholder-primary focus:text-[hsl(var(--primary-dark))] focus:border-[hsl(var(--primary-light))] focus:outline-none focus:ring-2 focus:ring-primary w-full"
										placeholder="Buscar..."
										value={query}
										onChange={handleSearch}
									/>
								</label>
							</div>
						</DialogHeader>
						{results.length > 0 && (
							<div className="text-black flex flex-col overflow-y-auto h-full p-4">
								{results.reduce((acc, curr, i) => {
									if (i > 0 && results[i - 1].type === curr.type && results[i - 1].title === curr.title) {
										return [
											...acc,
											<div
												className="flex cursor-pointer ml-8 p-2 rounded-lg hover:bg-gray-200"
												key={`item-${i}`}
												onClick={() => {
													handleSearch(curr.name)
												}}>
												<Link to={curr.path}>
													<div className="flex items-center gap-4 text-base">
														<span className="text-accent">{icons.develops[curr.icon]}</span>
														<span className="w-11/12">{curr.name}</span>
													</div>
												</Link>
											</div>,
										]
									}
									return [
										...acc,
										<Separator key={`separator-${i}`} />,
										<div className="flex items-center justify-between gap-4 " key={`header-${i}`}>
											<div className="flex items-center gap-4 text-xl font-semibold">
												<span className="text-primary">{icons.segments[curr.icon]}</span>
												<span className="text-[hsl(var(--primary-dark))]">{curr.title}</span>
											</div>
											<span className="text-sm  text-right">{curr.segment}</span>
										</div>,
										<div
											className="flex cursor-pointer ml-8 p-2 rounded-lg hover:bg-gray-200"
											key={`item-dev-${i}`}
											onClick={() => {
												handleSearch(curr.name)
											}}>
											<Link to={curr.path} className="soy-link">
												<div className="flex items-center justify-start gap-4 text-base">
													<span className="text-accent">{icons.develops[curr.icon]}</span>
													<span className="w-11/12">{curr.name}</span>
												</div>
											</Link>
										</div>,
									]
								}, [])}
							</div>
						)}
					</DialogContent>
				</Dialog>
			</div>
		</div>
	)
}
