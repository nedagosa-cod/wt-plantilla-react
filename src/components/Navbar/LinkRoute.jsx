import IconHome from '../../icons/IconHome'
import IconCircleQuestion from '../../icons/IconCircleQuestion'
import IconCheckList from '../../icons/IconCheckList'
import IconTextSlash from '../../icons/IconTextSlash'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { createPortal } from 'react-dom'
import Calculadora from '../Calculadora/Calculadora'

export default function LinkRoute({ link }) {
	const [activePortal, setActivePortal] = useState(false)
	const [selectIcon, setSelectIcon] = useState({
		home: <IconHome />,
		question: <IconCircleQuestion />,
		checklist: <IconCheckList />,
		textSlash: <IconTextSlash />,
	})

	return (
		<li className="sidebar__li">
			{link.route === 'portal' ? (
				<button type="button" onClick={() => setActivePortal(!activePortal)}>
					{selectIcon[link.icon]}
					<span className="sidebar__li--name">{link.title}</span>
				</button>
			) : (
				<Link to={link.route}>
					{selectIcon[link.icon]}
					<span className="sidebar__li--name">{link.title}</span>
				</Link>
			)}
			<ul className="sidebar__submenu blank">
				<li>
					<Link className="sidebar__submenu--name sidebar__submenu--link" to={link.route}>
						{link.title}
					</Link>
				</li>
			</ul>
			{activePortal && createPortal(<Calculadora />, document.getElementById('portal'))}
		</li>
	)
}
