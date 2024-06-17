import { useState } from 'react'
import IconCircleQuestion from '../../icons/IconCircleQuestion'
import IconArrowDown from '../../icons/IconArrowDown'
import IconArrowUp from '../../icons/IconArrowUp'
import IconHome from '../../icons/IconHome'
import IconCheckList from '../../icons/IconCheckList'
import IconNote from '../../icons/IconNote'
import IconCalculator from '../../icons/IconCalculator'
import IconTextSlash from '../../icons/IconTextSlash'
import IconTipify from '../../icons/IconTipify'
import { Link } from 'react-router-dom'

export default function DropDown({ link, pos, scroll }) {
	const [top, setTop] = useState(136)
	const [dropDownActive, setDropDownActive] = useState(false)
	const [selectIcon, setSelectIcon] = useState({
		home: <IconHome />,
		question: <IconCircleQuestion />,
		checklist: <IconCheckList />,
		textSlash: <IconTextSlash />,
		note: <IconNote />,
		tipify: <IconTipify />,
		calc: <IconCalculator />,
	})
	const toggleDropDown = () => {
		if (dropDownActive) return setDropDownActive(!dropDownActive)
		return setDropDownActive(!dropDownActive)
	}
	const handleMaouseEnter = () => {
		if (scroll > 0) {
			setTop(136 + pos * 60 - scroll)
		} else {
			setTop(136 + pos * 60)
		}
	}
	return (
		<li
			className={'sidebar__li ' + dropDownActive.toString()}
			onClick={toggleDropDown}
			onMouseEnter={handleMaouseEnter}>
			<div className="sidebar__drop">
				<p className="none">
					{selectIcon[link.icon]}
					<span className="sidebar__li--name">{link.title}</span>
				</p>
				{!dropDownActive && <IconArrowDown />}
				{dropDownActive && <IconArrowUp />}
			</div>

			<ul className="sidebar__submenu" style={{ top: top + 'px' }}>
				<li>
					<p className="sidebar__submenu--name sidebar__submenu--link">{link.title}</p>
				</li>
				{link.dropDown.map((el, i) => (
					<li key={i} className="dato-buscado">
						<Link className="sidebar__submenu--name dato-buscado" to={el.route}>
							{el.title}
						</Link>
					</li>
				))}
			</ul>
		</li>
	)
}
