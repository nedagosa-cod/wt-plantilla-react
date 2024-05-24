import IconHome from '../../icons/IconHome'
import IconCircleQuestion from '../../icons/IconCircleQuestion'
import IconCheckList from '../../icons/IconCheckList'
import IconTextSlash from '../../icons/IconTextSlash'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function LinkRoute({ link, pos, scroll }) {
	const [top, setTop] = useState(136)
	const [selectIcon, setSelectIcon] = useState({
		home: <IconHome />,
		question: <IconCircleQuestion />,
		checklist: <IconCheckList />,
		textSlash: <IconTextSlash />,
	})
	const handleMaouseEnter = () => {
		if (scroll > 0) {
			setTop(136 + pos * 60 - scroll)
		} else {
			setTop(136 + pos * 60)
		}
	}
	return (
		<li className="sidebar__li" onMouseEnter={handleMaouseEnter}>
			<Link to={link.route}>
				{selectIcon[link.icon]}
				<span className="sidebar__li--name">{link.title}</span>
			</Link>
			<ul className="sidebar__submenu blank" style={{ top: top + 'px' }}>
				<li>
					<Link className="sidebar__submenu--name sidebar__submenu--link" to={link.route}>
						{link.title}
					</Link>
				</li>
			</ul>
		</li>
	)
}
