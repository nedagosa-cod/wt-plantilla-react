import './hornav.scss'
import 'animate.css'
import DATANAV from './dataNavbar.json'
import IconHome from '../../icons/IconHome'
import IconCircleQuestion from '../../icons/IconCircleQuestion'
import IconCheckList from '../../icons/IconCheckList'
import IconTextSlash from '../../icons/IconTextSlash'
import IconNote from '../../icons/IconNote'
import IconTipify from '../../icons/IconTipify'
import IconCalculator from '../../icons/IconCalculator'
import IconTimeLine from '../../icons/IconTimeLine'
import IconCatalog from '../../icons/IconCatalog'
import IconInfo from '../../icons/IconInfo'
import IconLibrary from '../../icons/IconLibrary'
import IconCommets from '../../icons/IconCommets'
import IconWeb from '../../icons/IconWeb'
import imgLogo from '../../assets/images/index/logoSIn.png'
import IconArrowDown from '../../icons/IconArrowDown'
import { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import realIconCheck from '../../assets/images/index/realIconCheck.png'
import IconNotes from '../../icons/IconNotes'
import IconTheme from '../../icons/IconTheme'
import GlobalContext from '../../context/GlobalContext'
import IconUpload from '../../icons/IconUpload'
import InconSpell from '../../icons/InconSpell'
import IconGuide from '../../icons/IconGuide'
import { createPortal } from 'react-dom'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import IconUserTea from '../../icons/IconUserTea'
import dropImg from '../../assets/images/index/DropDownBoard.png'

const HorNav = () => {
	const navigate = useNavigate()
	const scrollContainerRef = useRef(null)
	const dropDownRef = useRef(null)
	const [dropDown, setDropDown] = useState(false)
	const [windowDB, setWindowDB] = useState(false)
	const [hidden, setHidden] = useState(true)
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
		admin: <IconUserTea />,
	})
	const { readExcelFile, templatesDDBB, setScheme, showApp, admin, setAdmin } =
		useContext(GlobalContext)
	const search = valueSearch => {
		const lowerCase = valueSearch.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
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

	const handleScroll = event => {
		if (scrollContainerRef.current) {
			event.preventDefault()
			scrollContainerRef.current.scrollLeft += event.deltaY
		}
	}

	const activeDropDown = (drop, button) => {
		const $dropDown = button.nextElementSibling
		const $liItems = [...button.parentNode.parentNode.children]

		if ($dropDown && $dropDown.classList.contains('active')) {
			$dropDown.classList.remove('animate__fadeInDown')
			$dropDown.classList.add('animate__fadeOutUp')
			setTimeout(() => {
				button.parentNode.classList.remove('active')
				$dropDown.classList.remove('active')
			}, 600)
		} else {
			$liItems.forEach(el => {
				el.lastElementChild.classList.remove('animate__fadeInDown')
				el.lastElementChild.classList.add('animate__fadeOutUp')
				el.lastElementChild.classList.remove('active')
				el.classList.remove('active')
			})

			button.parentNode.classList.add('active')

			$liItems.forEach(el => {
				if (el.classList.contains('active')) {
					el.lastElementChild.classList.add('active')
					el.lastElementChild.classList.add('animate__fadeInDown')
					el.lastElementChild.classList.remove('animate__fadeOutUp')
				}
			})
		}
		setHidden(!hidden)
		setDropDown(!dropDown)
	}
	const setsClick = e => {
		console.log('holis')
		switch (e.target.name) {
			case 'theme':
				setScheme(prev => (prev === 'light' ? 'dark' : 'light'))
				break
			case 'upload':
				setWindowDB(true)
				break
			default:
		}
	}
	const handleDragOver = event => {
		event.preventDefault() // Necesario para permitir el evento de soltar
	}

	const handleDrop = event => {
		event.preventDefault()
		const files = event.dataTransfer.files // Accede a los archivos arrastrados
		if (files && files.length) {
			const fileEvent = { target: { files } } // Simula el evento onChange del input
			readExcelFile(fileEvent)
		}
	}
	const startDrive = () => {
		const driverObj = driver({
			showProgress: true,
			showButtons: ['next', 'previous', 'close'],
			popoverClass: 'driverjs-theme',
			steps: [
				{
					element: '.hornav',
					popover: {
						title: 'Barra de navegación',
						description:
							'En la barra de navegación encontrarás todos los tipos de procesos que gestionan en la operación, adicional del buscador, cambio de tema, corrector, entre otros.',
					},
				},
				{
					element: '.hornav__links--search',
					popover: {
						title: 'Buscador',
						description:
							'Al dar click se abrirá el buscador de la web training para traer o filtrar el dato que necesites por medio de una palabra clave.',
					},
				},
				{
					element: '.hornav__links',
					popover: {
						title: 'Procesos',
						description:
							'En este apartado encontrarás todos los desarrollos de procesos identificados hasta la fecha, en ellos pueden haber: checklist, gestores de notas, tipificadores, versus, matrices, consultas de documentación entre otras.',
					},
				},
				{
					element: '.settings',
					popover: {
						title: 'Configuraciones',
						description:
							'En este segundo menú podráz encontrar diferentes configuraciones de la web training y otros apartados como, corrector ortográfico, cambio de tema, carga de bases de datos y la guia de uso de la web y desarrollos.',
					},
				},
				{
					element: '.hornav__logos',
					popover: {
						title: 'Versionado',
						description:
							'En el ultimo apartado de la barra de navegacion encontrarás la versión actual en la que se encuentra la web training, debes confirmar con tu formador en que versión se encuentra actualmente la web training para evitar procesos desactualizados.',
					},
				},
			],
		})
		driverObj.drive()
		// driverObj.highlight({
		// 	element: '#sideVersion',
		// 	popover: {
		// 		title: 'Title',
		// 		description: 'Description',
		// 	},
		// })
	}
	useEffect(() => {
		document.body.addEventListener('keydown', e => {
			if (e.key == 'Escape') {
				setWindowDB(false)
			}
		})
	})
	return (
		<header className="hornav">
			{DATANAV.SEGMENTS && (
				<nav className="hornav__segments">
					<ul>
						{DATANAV.SEGMENTS.map((segment, i) => {
							if (segment.segment === 'ADMIN') {
								return (
									<li
										onClick={() => {
											SetNavSegment(segment.segment)
											navigate('/' + segment.segment.toLowerCase())
											setAdmin(!admin)
										}}
										key={i}
										className={
											'hornav__segments--li admin__segment' +
											(segment.segment === navSegment ? ' active' : '')
										}>
										{selectIcon[segment.icon]}
										{admin ? 'Cerrar Admin' : segment.segment}
									</li>
								)
							} else {
								return (
									<li
										onClick={() => {
											SetNavSegment(segment.segment)
											navigate('/' + segment.segment.toLowerCase())
										}}
										key={i}
										className={
											'hornav__segments--li' + (segment.segment === navSegment ? ' active' : '')
										}>
										{selectIcon[segment.icon]} {segment.segment}
									</li>
								)
							}
						})}
						<li className="settings">
							<button className="settings__btn" name="upload" onClick={setsClick}>
								<IconUpload />
							</button>
							<button
								className="settings__btn"
								name="spellcheck"
								onClick={() => {
									navigate('/corrector')
								}}>
								<InconSpell />
							</button>
							<button className="settings__btn" name="theme" onClick={setsClick}>
								<IconTheme />
							</button>
							<button
								className="settings__btn"
								name="note"
								onClick={() => {
									showApp()
								}}>
								<IconNotes />
							</button>
							<button className="settings__btn" name="theme" onClick={() => startDrive()}>
								<IconGuide />
							</button>
						</li>
					</ul>
				</nav>
			)}
			<nav className="hornav__links">
				<div className="hornav__links--container">
					<div className="hornav__links--boxul">
						<ul ref={scrollContainerRef} onWheel={handleScroll}>
							{DATANAV.NAVBAR.map((link, i) => {
								const isAdmin = navSegment === 'ADMIN'
								const hasSegment = link.segments && link.segments.includes(navSegment)
								const shouldRenderLink = isAdmin ? hasSegment : !link.segments || hasSegment

								if (!shouldRenderLink) return null

								const renderDropDown = () => (
									<ul
										ref={dropDownRef}
										className="hornav-dropdown animate__animated"
										name={link.title}
										style={{backgroundImage: `url(${dropImg})`}}
										>
										<li className="hornav-dropdown__li li-menu">
											<div className="title-container">
												<a href="#" className="buttonul type--C">
													<span className="buttonul__text">{link.title}</span>
													<div className="buttonul__drow1"></div>
													<div className="buttonul__drow2"></div>
												</a>
											</div>
										</li>
										<li className="hornav-dropdown__li li-submenu">
											{link.dropDown.map((linkk, l) => (
												<Link to={linkk.route} key={l} onClick={() => setDropDown(false)}>
													{selectIcon[linkk.icon]} {linkk.title}
												</Link>
											))}
										</li>
									</ul>
								)

								const renderLink = () => (
									<li key={i} className="hornav__links--li">
										{link.dropDown ? (
											<>
												<button onClick={e => activeDropDown(link.title, e.target)}>
													{selectIcon[link.icon]} {link.title} <IconArrowDown />
												</button>
												{renderDropDown()}
											</>
										) : (
											<Link to={link.route}>
												{selectIcon[link.icon]} {link.title}
											</Link>
										)}
									</li>
								)

								return renderLink()
							})}
						</ul>
					</div>
					<div className="hornav__links--search">
						<div className="search__container">
							<input
								className="search__container--input"
								type="text"
								onChange={e => search(e.target.value)}
							/>
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
			{windowDB &&
				createPortal(
					<section className="templates-xls">
						<div className="templates-xls--left">
							<form className="file-upload-form">
								<label htmlFor="file" className="file-upload-label">
									<div
										className="file-upload-design"
										onDragOver={handleDragOver}
										onDrop={handleDrop}>
										<svg viewBox="0 0 640 512" height="1em">
											<path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
										</svg>
										<p>Arrastra y Suelta la base</p>
										<p>o</p>
										<span className="browse-button">Carga la base</span>
									</div>
									<input type="file" id="file" onChange={readExcelFile} multiple />
								</label>
							</form>
						</div>
						<div className="templates-xls--right">
							<span>Plantillas</span>
							{templatesDDBB.length > 0 ? (
								templatesDDBB.map((template, i) => {
									return (
										<a
											className="container-btn-file"
											href={`noTocar/plantillas/${template}.xlsx`}
											key={i}>
											<svg
												fill="#fff"
												xmlns="http://www.w3.org/2000/svg"
												width="20"
												height="20"
												viewBox="0 0 50 50">
												<path
													d="M28.8125 .03125L.8125 5.34375C.339844 
    5.433594 0 5.863281 0 6.34375L0 43.65625C0 
    44.136719 .339844 44.566406 .8125 44.65625L28.8125 
    49.96875C28.875 49.980469 28.9375 50 29 50C29.230469 
    50 29.445313 49.929688 29.625 49.78125C29.855469 49.589844 
    30 49.296875 30 49L30 1C30 .703125 29.855469 .410156 29.625 
    .21875C29.394531 .0273438 29.105469 -.0234375 28.8125 .03125ZM32 
    6L32 13L34 13L34 15L32 15L32 20L34 20L34 22L32 22L32 27L34 27L34 
    29L32 29L32 35L34 35L34 37L32 37L32 44L47 44C48.101563 44 49 
    43.101563 49 42L49 8C49 6.898438 48.101563 6 47 6ZM36 13L44 
    13L44 15L36 15ZM6.6875 15.6875L11.8125 15.6875L14.5 21.28125C14.710938 
    21.722656 14.898438 22.265625 15.0625 22.875L15.09375 22.875C15.199219 
    22.511719 15.402344 21.941406 15.6875 21.21875L18.65625 15.6875L23.34375 
    15.6875L17.75 24.9375L23.5 34.375L18.53125 34.375L15.28125 
    28.28125C15.160156 28.054688 15.035156 27.636719 14.90625 
    27.03125L14.875 27.03125C14.8125 27.316406 14.664063 27.761719 
    14.4375 28.34375L11.1875 34.375L6.1875 34.375L12.15625 25.03125ZM36 
    20L44 20L44 22L36 22ZM36 27L44 27L44 29L36 29ZM36 35L44 35L44 37L36 37Z"></path>
											</svg>
											Descargar plantilla: <strong> &nbsp;{template}</strong>
										</a>
									)
								})
							) : (
								<article className="templates">
									No hay plantilas disponibles para la web training
								</article>
							)}
						</div>
					</section>,
					document.getElementById('portal')
				)}
		</header>
	)
}

export default HorNav
