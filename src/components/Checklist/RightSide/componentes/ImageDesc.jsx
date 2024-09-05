import { useContext, useState } from 'react'
import CheckListContext from '../../../../context/ChecklistContext'

const ImageDesc = ({ activatePopImage, img, width, check, location, updateUserCheck }) => {
	const { editChElement, locationEl, areObjectsEqual, HandlerContent } = useContext(CheckListContext)

	const [nameImg, setNameImg] = useState(img)
	const [editedValue, setEditedValue] = useState(img)
	const [secondValues, setSecondValues] = useState({
		imgWidth: width,
	})

	const getValueTipTap = (event, value, closeEdit) => {
		HandlerContent({
			type: 'IMG',
			value: value,
			editValue: setEditedValue,
			editSecondValues: setSecondValues,
			updateUserCheck,
			check,
			location,
			closeEdit,
			secondValues: {
				imgWidht: event ? event.target.value : secondValues.imgWidth,
			},
		})
	}

	const handleFileChange = event => {
		const file = event.target.files[0]
		if (file) {
			setNameImg(file.name)
			const reader = new FileReader()
			reader.onloadend = () => {
				// Convert the result to base64 and set it in the state
				setEditedValue(reader.result)
				getValueTipTap(false, reader.result, false)
			}
			// Read the file as a data URL (base64)
			reader.readAsDataURL(file)
		}
	}

	const renderEditor = () => (
		<div className="description__pop-image-container">
			<i
				className="description__pop-image"
				onClick={() => {
					activatePopImage(editedValue, secondValues.imgWidth)
				}}></i>
			<span className="description__pop-image-name">{nameImg}</span>
			<div className="description__pop-image-container--input">
				<hr />
				<input
					type="file"
					onChange={e => {
						handleFileChange(e)
					}}
				/>
				<hr />
				<label htmlFor="selectImgSize">
					Tamaño de imagen
					<select
						id="selectImgSize"
						value={secondValues.imgWidth}
						onChange={e => {
							getValueTipTap(e, editedValue, false)
						}}>
						{[30, 40, 50, 60, 70, 80, 90].map(size => (
							<option key={size} value={`${size}%`}>
								{size}%
							</option>
						))}
					</select>
				</label>
			</div>
			<div className="description__pop-image-container--buttons">
				<button type="button" onClick={() => getValueTipTap(false, editedValue, true)}>
					Aceptar
				</button>
			</div>
		</div>
	)

	const isEditable = editChElement && areObjectsEqual(locationEl, { check, location })
	return (
		<>
			{isEditable ? (
				renderEditor()
			) : (
				<i
					className="description__pop-image"
					onClick={() => {
						activatePopImage(editedValue, secondValues.imgWidth)
					}}></i>
			)}
		</>
	)
}

export default ImageDesc
