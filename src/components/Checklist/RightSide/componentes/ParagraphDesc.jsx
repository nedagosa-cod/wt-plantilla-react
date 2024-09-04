import { useContext, useState } from 'react'
import TipTap from '../../../TipTap.jsx/TipTap'
import CheckListContext from '../../../../context/ChecklistContext'

const ParagraphDesc = ({ children, check, location, updateUserCheck }) => {
	const { editChElement, locationEl, areObjectsEqual, HandlerContent } = useContext(CheckListContext)
	const [editedValue, setEditedValue] = useState(children.props.dangerouslySetInnerHTML.__html)
	const getValueTipTap = (value, closeEdit) => {
		HandlerContent({
			type: 'P',
			value: value,
			editValue: setEditedValue,
			updateUserCheck,
			check,
			location,
			closeEdit,
		})
	}

	return (
		<>
			{editChElement &&
			areObjectsEqual(locationEl, {
				check,
				location,
			}) ? (
				<>
					<TipTap content={editedValue} getValueTipTap={getValueTipTap} onParagraph />
				</>
			) : (
				<p className="description__paragraph">{children}</p>
			)}
		</>
	)
}

export default ParagraphDesc
