import './styles.scss'
import projectNavbar from './dataNavbar'
import { useEffect, useState } from 'react'
import DropDown from './DropDown'
import LinkRoute from './LinkRoute'
import imgLogo from '../../assets/images/index/logoMain.png'
import IconSearch from '../../icons/IconSearch'

export default function Navbar() {
	const [openNav, setOpenNav] = useState(false)
	const [dataSearch, setDataSearch] = useState('')

	const openCloseNavBar = () => {
		if (openNav) return setOpenNav(!openNav)
		return setOpenNav(!openNav)
	}

	const search = valueSearch => {
		setDataSearch(valueSearch)
		const allCards = document.querySelectorAll('.dato-buscado')
		const mobileCards = Array.from(allCards).filter(card => card.textContent.includes(valueSearch))
		Array.from(allCards).forEach(card => {
			card.classList.add('hide')
		})
		mobileCards.forEach(card => {
			card.classList.remove('hide')
		})
	}

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
			<ul className="sidebar__links">
				{projectNavbar &&
					projectNavbar.map((link, i) => {
						if (link.dropDown) {
							return <DropDown key={i} link={link} />
						} else {
							return <LinkRoute key={i} link={link} />
						}
					})}
			</ul>

			{/* {version} */}
			<div className="sidebar__versionbx" id="sideVersion"></div>
		</header>
	)
}
