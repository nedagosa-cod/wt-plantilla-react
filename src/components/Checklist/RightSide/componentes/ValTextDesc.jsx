import { useContext } from 'react'
import CheckListContext from '../../../../context/ChecklistContext'

const ValTextDesc = ({ children, position }) => {
	const { updateActiveInside } = useContext(CheckListContext)

	const getData = e => {
		if (e.target.nodeName == 'INPUT') {
			updateActiveInside(position, e.target.value, children)
		}
	}

	return (
		<div className="description__valbool">
			<label className="label">
				<span>
					<strong>{position}. </strong>
					{children}
				</span>
				<input type="text" name={'valtext_' + position} onChange={getData} />
			</label>
		</div>
	)
}

export default ValTextDesc
