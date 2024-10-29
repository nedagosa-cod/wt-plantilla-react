import { useEffect, useRef, useState } from 'react'
import { useSearch } from '../../../context/SearchProvider'
import './search.scss'
import 'animate.css'
import IconChecklistC from '../../../icons/Color/IconChecklistC'
import IconCalculator from '../../../icons/IconCalculator'
import IconCheckList from '../../../icons/IconCheckList'
import IconCalculatorC from '../../../icons/Color/IconCalculatorC'
import IconLibraryC from '../../../icons/Color/IconLibraryC'
import IconLibrary from '../../../icons/IconLibrary'
import IconTypifierC from '../../../icons/Color/IconTypifierC'
import IconTipify from '../../../icons/IconTipify'
import IconTextSlash from '../../../icons/IconTextSlash'
import IconTextBubleC from '../../../icons/Color/IconTextBubleC'
import { Link } from 'react-router-dom'

const SpotlightSearch = () => {
	const icons = {
		segments: {
			checklist: <IconChecklistC />,
			calc: <IconCalculatorC />,
			library: <IconLibraryC />,
			tipify: <IconTypifierC />,
			textSlash: <IconTextBubleC />,
		},
		develops: {
			// home: <IconHome />,
			// question: <IconCircleQuestion />,
			checklist: <IconCheckList />,
			textSlash: <IconTextSlash />,
			// note: <IconNote />,
			tipify: <IconTipify />,
			calc: <IconCalculator />,
			// web: <IconWeb />,
			// comments: <IconCommets />,
			library: <IconLibrary />,
			// info: <IconInfo />,
			// catalogue: <IconCatalog />,
			// timeLine: <IconTimeLine />,
		},
	}
	const { search } = useSearch()
	const [query, setQuery] = useState('')
	const [results, setResults] = useState([])
	const [typeSearch, setTypeSearch] = useState('vista')

	const [searchFocus, setSearchFocus] = useState(false)

	const handleSearch = value => {
		setQuery(value)
		if (typeSearch == 'global') {
			const searchResults = search(value)
			setResults(searchResults)
			console.log(searchResults)
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
				e.target.classList.contains('radio-inputs') ||
				e.target.classList.contains('hornav') ||
				e.target.classList.contains('radioInput') ||
				e.target.classList.contains('search__container--input')
			) {
				setSearchFocus(true)
			} else {
				setSearchFocus(false)
			}
		})
		document.querySelector('.radioInput--check').checked = true
	}, [])
	return (
		<section className="inputs-search">
			<div className="hornav__links--search">
				<div className="search__container">
					<input
						className="search__container--input"
						type="text"
						onChange={e => handleSearch(e.target.value)}
						value={query}
						onFocus={() => setSearchFocus(true)}
					/>
					<svg viewBox="0 0 24 24" className="search__container--icon" onClick={handleSearch}>
						<g>
							<path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
						</g>
					</svg>
				</div>
			</div>
			{/* selectores de busqueda */}
			<div className={'radio-inputs animate__animated' + (searchFocus ? 'animate__fadeInUp display' : '')}>
				<label className="radio" onClick={() => setTypeSearch('vista')}>
					<input type="radio" name="radio" className="radioInput radioInput--check" />
					<span className="name">Vista</span>
				</label>
				<label className="radio" onClick={() => setTypeSearch('global')}>
					<input type="radio" name="radio" className="radioInput" />
					<span className="name">Global</span>
				</label>
			</div>
			{/* elementos buscados globalmente */}
			{results.length > 0 && (
				<div className="search-results animate__fadeInDown">
					<div className="search-results__object">
						{results.reduce((acc, curr, i) => {
							if (i > 0 && results[i - 1].type === curr.type && results[i - 1].title === curr.title) {
								return [
									...acc,
									<div className="search-results__develops" key={i}>
										{console.log(curr.path)}
										<Link to={curr.path}>
											<div className="search-results__develops--dev">
												{icons.develops[curr.icon]}
												<p>{curr.name}</p>
											</div>
										</Link>
									</div>,
								]
							}

							return [
								...acc,
								<div className="search-results__segment" key={i}>
									<div className="search-results__segment--dev">
										{icons.segments[curr.icon]}
										<span>{curr.title}</span>
									</div>
									<span className="search-results__segment--text">{curr.segment}</span>
								</div>,
								<div className="search-results__develops" key={i + 'dev'}>
									<div className="search-results__develops--dev">
										{icons.develops[curr.icon]}
										<p>{curr.name}</p>
									</div>
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
