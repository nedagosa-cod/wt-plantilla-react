import { useContext, useState } from 'react'
import TipTap from '../../../TipTap.jsx/TipTap'
import CheckListContext from '../../../../context/ChecklistContext'

const ParagraphDesc = ({ children, check, location, updateUserCheck }) => {
	const { editChElement, setEditChElement, locationEl } = useContext(CheckListContext)
	const ref = {
		check,
		location,
	}
	const [contetTiptap, setContentTiptap] = useState(children.props.dangerouslySetInnerHTML.__html)

	const createUserElement = userEl => {
		updateUserCheck(prevState => ({
			...prevState,
			DESCRIPCIONES: prevState.DESCRIPCIONES.map(description => {
				if (description.check === check) {
					return {
						...description,
						html: description.html.map((htmlEl, ind) => (ind === location ? userEl : htmlEl)),
					}
				} else {
					return description
				}
			}),
		}))
	}
	const handlerTipTap = content => {
		const userElement = { P: content }
		setContentTiptap(content)
		createUserElement(userElement)
		setEditChElement(false)
	}
	function areObjectsEqual(obj1, obj2) {
		return obj1.check === obj2.check && obj1.location === obj2.location
	}

	return (
		<>
			{editChElement && areObjectsEqual(locationEl, ref) ? (
				<>
					<TipTap content={contetTiptap} onchange={handlerTipTap} />
				</>
			) : (
				<p
					className="description__paragraph"
					onClick={() => {
						console.log(check)
						console.log(location)
						// setEdit(true)
					}}>
					{children}
				</p>
			)}
		</>
	)
}

export default ParagraphDesc
