import './styles.scss'
import projectNavbar from './dataNavbar'
import { useState } from 'react'
import DropDown from './DropDown'
import LinkRoute from './LinkRoute'
import imgLogo from '../../assets/images/index/logoMain.png'
import IconSearch from '../../icons/IconSearch'

export default function Navbar() {
	const [openNav, setOpenNav] = useState(false)

	const openCloseNavBar = () => {
		if (openNav) return setOpenNav(!openNav)
		return setOpenNav(!openNav)
	}

	return (
		<header className={'sidebar ' + openNav}>
			{/* {cabcera buscador logo} */}
			<div className="sidebar__logobx">
				<figure
					className="sidebar__logobx--imgbx"
					id="navBar_btn"
					onClick={openCloseNavBar}>
					<img src={imgLogo} alt="logo" />
				</figure>
				<span className="sidebar__logobx--name">
					Automatizaciones Formación
				</span>
				<div className="input-container">
					<input
						type="text"
						name="text"
						className="input"
						placeholder="Search something..."
						id="searcher"
						autoComplete="off"
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

				{/* {projectNavbar &&
          projectNavbar.map((link, i) => {
            if (!link.dropDown) {
              return <LinkRoute key={i} link={link} />;
            } else {
              return <DropDown key={i} link={link} />;
            }
          })} */}
			</ul>

			{/* {version} */}
			<div className="sidebar__versionbx" id="sideVersion"></div>
		</header>
	)
}
