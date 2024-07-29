import './hornav.scss'
import 'animate.css'
import DATANAV from './dataNavbar.json'
import { useEffect, useRef, useState } from 'react'
import IconHome from '../../icons/IconHome'
import IconCircleQuestion from '../../icons/IconCircleQuestion'
import IconCheckList from '../../icons/IconCheckList'
import IconTextSlash from '../../icons/IconTextSlash'
import IconNote from '../../icons/IconNote'
import IconTipify from '../../icons/IconTipify'
import IconCalculator from '../../icons/IconCalculator'
import { Link } from 'react-router-dom'
import IconTimeLine from '../../icons/IconTimeLine'
import IconCatalog from '../../icons/IconCatalog'
import IconInfo from '../../icons/IconInfo'
import IconLibrary from '../../icons/IconLibrary'
import IconCommets from '../../icons/IconCommets'
import IconWeb from '../../icons/IconWeb'
import imgLogo from '../../assets/images/index/logoSIn.png'
import IconArrowDown from '../../icons/IconArrowDown'

import realIconCheck from '../../assets/images/index/realIconCheck.png'

const HorNav = () => {
	const scrollContainerRef = useRef(null)
	const dropDownRef = useRef(null)
	const [dropDown, setDropDown] = useState(false)
	const [dataSearch, setDataSearch] = useState('')
	const [navSegment, SetNavSegment] = useState(DATANAV.SEGMENTS[0].segment)
	const [selectIcon, setSelectIcon] = useState({
		home: <IconHome />,
		question: <IconCircleQuestion />,
		checklist: <IconCheckList />,
		textSlash: <IconTextSlash />,
		note: <IconNote />,
		tipify: <IconTipify />,
		calc: <IconCalculator />,
		web: <IconWeb />,
		comments: <IconCommets />,
		library: <IconLibrary />,
		info: <IconInfo />,
		catalogue: <IconCatalog />,
		timeLine: <IconTimeLine />,
	})
	const iconReal = {
		checklist: realIconCheck,
	}
	const search = valueSearch => {
		const lowerCase = valueSearch.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
		setDataSearch(lowerCase)
		const allCards = document.querySelectorAll('.dato-buscado')
		const mobileCards = Array.from(allCards).filter(card =>
			card.textContent
				.toLowerCase()
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.includes(valueSearch.toLowerCase())
		)
		Array.from(allCards).forEach(card => {
			card.classList.add('hide')
		})
		mobileCards.forEach(card => {
			card.classList.remove('hide')
		})
	}

	const handleScroll = event => {
		if (scrollContainerRef.current) {
			event.preventDefault()
			scrollContainerRef.current.scrollLeft += event.deltaY
		}
	}
	const handleOutsideClick = event => {
		if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
			setDropDown(false)
		}
	}
	document.addEventListener('mousedown', handleOutsideClick)
	return (
		<header className="hornav">
			{DATANAV.SEGMENTS && (
				<nav className="hornav__segments">
					<ul>
						{DATANAV.SEGMENTS.map((segment, i) => (
							<li
								key={i}
								className={
									'hornav__segments--li' + (segment.segment === navSegment ? ' active' : '')
								}>
								{selectIcon[segment.icon]} {segment.segment}
							</li>
						))}
					</ul>
				</nav>
			)}
			<nav className="hornav__links">
				<div className="hornav__links--container">
					<div className="hornav__links--boxul">
						<ul ref={scrollContainerRef} onWheel={handleScroll}>
							{DATANAV.NAVBAR.map((link, i) => {
								if (link.segments == undefined || link.segments.includes(navSegment)) {
									if (link.dropDown) {
										return (
											<li key={i} className={'hornav__links--li' + (dropDown ? ' active ' : '')}>
												<button onClick={() => setDropDown(!dropDown)}>
													{selectIcon[link.icon]}
													{link.title}
													<IconArrowDown />
												</button>
												<ul
													ref={dropDownRef}
													className={
														'hornav-dropdown' +
														(dropDown
															? ' active animate__animated animate__zoomInDown animate__fast'
															: '')
													}>
													<li className="hornav-dropdown__li li-menu">
														<figure>
															<img src={iconReal[link.icon]} alt="checklist" />
														</figure>
														<span>{link.title}</span>
													</li>
													<li className="hornav-dropdown__li li-submenu">
														{link.dropDown.map((linkk, l) => {
															return (
																<Link to={linkk.route} key={l}>
																	{selectIcon[linkk.icon]} {linkk.title}
																</Link>
															)
														})}
													</li>
												</ul>
											</li>
										)
									} else {
										return (
											<li key={i} className="hornav__links--li">
												<Link to={link.route}>
													{selectIcon[link.icon]} {link.title}
												</Link>
											</li>
										)
									}
								}
							})}
						</ul>
					</div>
					<div className="hornav__links--search">
						<div className="search__container">
							<input className="search__container--input" type="text" />
							<svg viewBox="0 0 24 24" className="search__container--icon">
								<g>
									<path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
								</g>
							</svg>
						</div>
					</div>
				</div>
				<div className="hornav__logos">
					<figure>
						<img src={imgLogo} alt="logo" />
					</figure>
					<span className="hornav__logos--title">Web Training</span>
					<span className="hornav__logos--version">V.1.0.0</span>
				</div>
			</nav>
		</header>
	)
}

export default HorNav
