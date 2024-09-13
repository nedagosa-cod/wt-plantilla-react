import { useContext, useState } from 'react'
import CheckListContext from '../../../../context/ChecklistContext'

const SubtitleDesc = ({ children, check, location, updateUserCheck }) => {
	const { editChElement, locationEl, areObjectsEqual, HandlerContent, deleteChElement, dialogDeleteElement } =
		useContext(CheckListContext)
	const [editedValue, setEditedValue] = useState(children)
	const isEditable = editChElement && areObjectsEqual(locationEl, { check, location })
	const showDialogDelete = () => {
		if (deleteChElement && areObjectsEqual(locationEl, { check, location })) {
			return (
				<dialog className="dialog-delete" open>
					<h2>¿Estas seguro que quieres eliminar este elemento?</h2>
					<button type="button" onClick={e => dialogDeleteElement(check, location, updateUserCheck, e)}>
						Aceptar
					</button>
					<button type="button" onClick={e => dialogDeleteElement(check, location, updateUserCheck, e)}>
						Cancelar
					</button>
				</dialog>
			)
		}
		return null
	}
	return (
		<>
			{isEditable ? (
				<input
					className="description__subtitle edit"
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
			{showDialogDelete()}
		</>
	)
}

export default SubtitleDesc
