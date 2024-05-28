import './styles.scss'
import projectNavbar from './dataNavbar'
import { useContext, useEffect, useRef, useState } from 'react'
import DropDown from './DropDown'
import LinkRoute from './LinkRoute'
import imgLogo from '../../assets/images/index/logoMain.png'
import IconSearch from '../../icons/IconSearch'
import IconUpload from '../../icons/IconUpload'
import IconTheme from '../../icons/IconTheme'
import InconSpell from '../../icons/InconSpell'
import GlobalContext from '../../context/GlobalContext'
import { createPortal } from 'react-dom'

export default function Navbar() {
	const [openNav, setOpenNav] = useState(false)
	const [scrollPx, setScrollPx] = useState(0)
	const [dataSearch, setDataSearch] = useState('')
	const [windowDB, setWindowDB] = useState(false)
	const scrollContainerRef = useRef(null)
	const { readExcelFile } = useContext(GlobalContext)

	const openCloseNavBar = () => {
		if (openNav) return setOpenNav(!openNav)
		return setOpenNav(!openNav)
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
	const setsClick = e => {
		switch (e.target.name) {
			case 'theme':
				console.log('theme')
				break
			case 'upload':
				setWindowDB(true)
				break
			default:
		}
	}

	useEffect(() => {
		const handleScroll = () => {
			setScrollPx(scrollContainerRef.current.scrollTop)
		}
		if (scrollContainerRef.current) {
			scrollContainerRef.current.addEventListener('scroll', handleScroll)
		}
		document.body.addEventListener('keydown', e => {
			if (e.key == 'Escape') {
				setWindowDB(false)
			}
		})
		return () => {
			if (scrollContainerRef.current) {
				scrollContainerRef.current.removeEventListener('scroll', handleScroll)
			}
		}
	}, [])
	return (
		<header className={'sidebar ' + openNav}>
			{/* {cabcera buscador logo} */}
			<div className="sidebar__logobx">
				<figure className="sidebar__logobx--imgbx" id="navBar_btn" onClick={openCloseNavBar}>
					<img src={imgLogo} alt="logo" />
				</figure>
				<span className="sidebar__logobx--name">Automatizaciones Formación</span>
				<div className="input-container">
					<input
						type="text"
						name="text"
						value={dataSearch}
						className="input"
						placeholder="Search something..."
						id="searcher"
						autoComplete="off"
						onChange={e => {
							search(e.target.value)
						}}
					/>
					<IconSearch className="icon" />
				</div>
			</div>

			{/* {contenido} */}
			<ul className="sidebar__links" ref={scrollContainerRef}>
				{projectNavbar &&
					projectNavbar.map((link, i) => {
						if (link.dropDown) {
							return <DropDown key={i} link={link} pos={i} scroll={scrollPx} />
						} else {
							return <LinkRoute key={i} link={link} pos={i} scroll={scrollPx} />
						}
					})}
			</ul>

			{/* {version} */}
			<div className="sidebar__sets">
				<button className="sidebar__sets--btn" name="upload" onClick={setsClick}>
					<IconUpload />
				</button>
				<button className="sidebar__sets--btn" name="spellcheck">
					<InconSpell />
				</button>
				<button className="sidebar__sets--btn" name="theme">
					<IconTheme />
				</button>
			</div>
			<div className="sidebar__versionbx" id="sideVersion">
				v1.0.0
			</div>
			{windowDB &&
				createPortal(
					<section className="templates-xls">
						<div className="templates-xls--left">
							<form className="file-upload-form">
								<label htmlFor="file" className="file-upload-label">
									<div className="file-upload-design">
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
							<article className="templates">
								No hay plantilas disponibles para la web training
							</article>
						</div>
					</section>,
					document.getElementById('portal')
				)}
		</header>
	)
}
