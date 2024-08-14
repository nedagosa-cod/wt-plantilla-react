import { useContext } from 'react'
import GlobalContext from '../../../../context/GlobalContext'
import IconMenu from '../../../../icons/IconMenu'

const ListDesc = ({ children, type }) => {
	const { admin } = useContext(GlobalContext)
	if (type == 'ol') {
		return (
			<div>
				<ol className="description__list">{children}</ol>
			</div>
		)
	}
	return (
		<div>
			<ul className="description__list">{children}</ul>
		</div>
	)
}

export default ListDesc
