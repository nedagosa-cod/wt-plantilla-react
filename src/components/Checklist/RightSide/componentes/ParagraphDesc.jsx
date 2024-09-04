import { useContext, useState } from 'react'
import TipTap from '../../../TipTap.jsx/TipTap'
import CheckListContext from '../../../../context/ChecklistContext'
import parse from 'html-react-parser'
const ParagraphDesc = ({ children, check, location, updateUserCheck }) => {
	const { editChElement, locationEl, areObjectsEqual, HandlerContent } = useContext(CheckListContext)
	const [editedValue, setEditedValue] = useState(children)
	console.log(children)
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
				<p className="description__paragraph">
					{parse(
						children
							.replace(/^<p>/, '') // el tiptap me retorna el html con una <p> de contentedory daña estilos
							.replace(/<\/p>$/, '') // se cambia la <p></p> por ''
							.replace(/<p><\/p>/g, '<br/>') // se cambia el <p></p> por <br/> para crear salto de linea
					)}
				</p>
			)}
		</>
	)
}

export default ParagraphDesc
