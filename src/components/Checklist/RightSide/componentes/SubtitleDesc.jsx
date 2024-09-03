import { useContext, useState } from 'react'
import CheckListContext from '../../../../context/ChecklistContext'

const SubtitleDesc = ({ children, check, location, updateUserCheck }) => {
	const { editChElement, locationEl, areObjectsEqual, HandlerContent } = useContext(CheckListContext)
	const [editedValue, setEditedValue] = useState(children)

	return (
		<>
			{editChElement &&
			areObjectsEqual(locationEl, {
				check,
				location,
			}) ? (
				<input
					type="text"
					onBlur={e =>
						HandlerContent({
							type: 'SUBTITLE',
							value: e.target.value,
							editValue: setEditedValue,
							updateUserCheck,
							check,
							location,
						})
					}
					value={editedValue}
					onChange={e => setEditedValue(e.target.value)}
				/>
			) : (
				<h2 className="description__subtitle">- {children} -</h2>
			)}
		</>
	)
}

export default SubtitleDesc
