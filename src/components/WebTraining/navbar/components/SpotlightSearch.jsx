import { useEffect, useRef, useState } from 'react'
import 'animate.css'
import '../../../../styles/search.scss'
import {
	Menu,
	Calculator,
	Library,
	Diamond,
	TextCursorInput,
	MessageCircle,
	FileText,
	Clock,
	Globe,
	LayoutPanelTop,
	X,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSearch } from '@/context/SearchProvider'

const SpotlightSearch = () => {
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
	const { searchGlobal } = useSearch()
	const [query, setQuery] = useState('')
	const [results, setResults] = useState([])
	const [typeSearch, setTypeSearch] = useState(() => {
		const activeSearch = localStorage.getItem('activeSearch')
		return activeSearch || 'vista'
	})

	const [searchFocus, setSearchFocus] = useState(false)

	const handleSearch = value => {
		setQuery(value)
		if (typeSearch == 'global') {
			const searchResults = searchGlobal(value)
			setResults(searchResults)
		} else {
			const lowerCase = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
			const allCards = document.querySelectorAll('.dato-buscado')
			const mobileCards = Array.from(allCards).filter(card =>
				card.textContent
					.toLowerCase()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.includes(lowerCase.toLowerCase())
			)
			Array.from(allCards).forEach(card => {
				card.classList.add('hide')
			})
			mobileCards.forEach(card => {
				card.classList.remove('hide')
			})
		}
	}

	useEffect(() => {
		document.addEventListener('click', e => {
			if (
				e.target.classList.contains('spotlight-radio-inputs') ||
				e.target.classList.contains('spotlight-hornav') ||
				e.target.classList.contains('spotlight-radio-input') ||
				e.target.classList.contains('spotlight-search-input')
			) {
				setSearchFocus(true)
			} else {
				setSearchFocus(false)
			}
		})
		document.querySelector('.radioInput--check').checked = true
	}, [])
	return (
		<section className="absolute top-full bg-blue-500 left-1/2 transform -translate-x-1/2 w-96 h-16 z-10 spotlight-hornav">
			<div className="relative bg-gradient-to-br from-primary-500 to-primary-700 rounded-full p-2 grid place-content-center z-10 min-w-[200px]">
				<div className="relative w-full rounded-full bg-gradient-to-br from-primary-300 to-primary-500 p-1.5 h-14 flex items-center">
					<button className="cursor-pointer mr-2" onClick={() => handleSearch('')}>
						<X className="h-6 w-6" />
					</button>
					<input
						className="w-full bg-gradient-to-br from-primary-300 to-primary-500 border-none text-white text-lg rounded-full pl-4 focus:outline-none spotlight-search-input"
						type="text"
						onChange={e => handleSearch(e.target.value)}
						value={query}
						onFocus={() => setSearchFocus(true)}
						onBlur={() => setSearchFocus(false)}
					/>
					<svg
						viewBox="0 0 24 24"
						className="w-12 aspect-square border-l-2 border-white rounded-full pl-3 ml-2 hover:border-l-4 transition-all"
						onClick={handleSearch}>
						<g>
							<path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
						</g>
					</svg>
				</div>
			</div>
			{/* selectores de busqueda */}
			<div
				className={`spotlight-radio-inputs absolute z-50 left-1/2 w-4/5 flex gap-8 justify-center bg-primary-300 text-base py-2 px-4 rounded-tl-lg rounded-tr-lg animate__animated ${
					searchFocus ? 'animate__fadeInUp bottom-full' : 'bottom-[10%]'
				} ${searchFocus ? 'block' : 'hidden'}`}
				style={{ transform: 'translateX(-50%)' }}>
				<label
					className="flex items-center gap-4 cursor-pointer"
					onClick={() => {
						setQuery('')
						setTypeSearch('vista')
					}}>
					<input type="radio" name="radio" className="hidden spotlight-radio-input radioInput--check" />
					<span className="flex items-center gap-4 rounded-tl-lg rounded-tr-lg border-none py-2 px-3 text-white transition-all relative">
						<LayoutPanelTop className="h-5 w-5" />
						Vista
					</span>
				</label>
				<label
					className="flex items-center gap-4 cursor-pointer"
					onClick={() => {
						setQuery('')
						setTypeSearch('global')
					}}>
					<input type="radio" name="radio" className="hidden spotlight-radio-input" />
					<span className="flex items-center gap-4 rounded-tl-lg rounded-tr-lg border-none py-2 px-3 text-white transition-all relative">
						<Globe className="h-5 w-5" />
						Global
					</span>
				</label>
			</div>
			{/* elementos buscados globalmente */}
			{results.length > 0 && (
				<div
					className="opacity-100 w-full min-h-[40px] absolute left-1/2 top-0 z-50 bg-primary-500 text-white rounded-[4rem] shadow-lg text-base p-7 pt-8 animate__fadeInDown"
					style={{ transform: 'translateX(-50%)' }}>
					<div className="text-lg flex flex-col">
						{results.reduce((acc, curr, i) => {
							if (i > 0 && results[i - 1].type === curr.type && results[i - 1].title === curr.title) {
								return [
									...acc,
									<div
										className="flex flex-col ml-16 text-white cursor-pointer p-2 rounded-lg hover:bg-gray-200"
										key={i}
										onClick={() => {
											handleSearch(curr.name)
										}}>
										<Link to={curr.path}>
											<div className="flex items-center gap-4 text-base">
												{icons.develops[curr.icon]}
												<p className="w-11/12">{curr.name}</p>
											</div>
										</Link>
									</div>,
								]
							}

							return [
								...acc,
								<div className="flex items-center justify-between gap-4 text-white" key={i}>
									<div className="flex items-center gap-4 text-xl font-semibold">
										{icons.segments[curr.icon]}
										<span>{curr.title}</span>
									</div>
									<span className="text-sm text-gray-300 text-right">{curr.segment}</span>
								</div>,
								<div
									className="flex flex-col ml-16 text-white cursor-pointer p-2 rounded-lg hover:bg-gray-200"
									key={i + 'dev'}
									onClick={() => {
										handleSearch(curr.name)
									}}>
									<Link to={curr.path}>
										<div className="flex items-center gap-4 text-base">
											{icons.develops[curr.icon]}
											<p className="w-11/12">{curr.name}</p>
										</div>
									</Link>
								</div>,
							]
						}, [])}
					</div>
				</div>
			)}
		</section>
	)
}

export default SpotlightSearch
