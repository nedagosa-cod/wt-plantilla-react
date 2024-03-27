import { useContext } from 'react'
import CheckListContext from '../../../../context/ChecklistContext'

const ValDateDesc = ({ children, position }) => {
	const { updateActiveInside } = useContext(CheckListContext)

	const getData = e => {
		if (e.target.nodeName == 'INPUT') {
			updateActiveInside(position, e.target.value, children)
		}
	}

	return (
		<div className="description__valdate">
			<span className="description__valdate--ask">
				<strong>{position}. </strong>
				{children}
			</span>
			<div className="description__valdate--date">
				<input type="date" onChange={getData} />
			</div>
		</div>
	)
}

export default ValDateDesc
