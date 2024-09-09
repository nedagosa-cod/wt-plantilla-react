import { useContext, useState } from 'react'
import TipTap from '../../../TipTap.jsx/TipTap'
import CheckListContext from '../../../../context/ChecklistContext'
import parse from 'html-react-parser'
import Swal from 'sweetalert2'
const ParagraphDesc = ({ children, check, location, updateUserCheck }) => {
	const { editChElement, locationEl, areObjectsEqual, HandlerContent, deleteChElement, deleteCheckElement } =
		useContext(CheckListContext)
	const [editedValue, setEditedValue] = useState(children)
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

	const isEditable = editChElement && areObjectsEqual(locationEl, { check, location })
	return (
		<>
			{isEditable ? (
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
			{deleteChElement && areObjectsEqual(locationEl, { check, location }) && (
				<dialog open>
					<h2>¿Deseas eliminar este elemento?</h2>
					<button
						type="button"
						onClick={e => {
							e.target.parentNode.close()
							deleteCheckElement(check, location, updateUserCheck)
						}}>
						Aceptar
					</button>
				</dialog>
			)}
		</>
	)
}

export default ParagraphDesc
