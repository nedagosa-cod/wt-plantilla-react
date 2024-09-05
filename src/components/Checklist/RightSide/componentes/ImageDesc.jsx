import { useContext, useState } from 'react'
import CheckListContext from '../../../../context/ChecklistContext'

const ImageDesc = ({ activatePopImage, img, width, check, location, updateUserCheck }) => {
	const { editChElement, locationEl, areObjectsEqual, HandlerContent } = useContext(CheckListContext)
	const [nameImg, setNameImg] = useState(img)

	const [editedValue, setEditedValue] = useState(img)
	const [secondValues, setSecondValues] = useState({
		imgWidht: width,
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
				imgWidht: event ? event.target.value : secondValues.imgWidht,
			},
		})
	}

	const handleFileChange = event => {
		const file = event.target.files[0]
		setNameImg(file.name)
		if (file) {
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

	return (
		<>
			{editChElement &&
			areObjectsEqual(locationEl, {
				check,
				location,
			}) ? (
				<div className="description__pop-image-container">
					<i
						className="description__pop-image"
						onClick={() => {
							console.log(secondValues)
							activatePopImage(editedValue, secondValues.imgWidht)
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
								value={secondValues.imgWidht}
								onChange={e => {
									getValueTipTap(e, editedValue, false)
								}}>
								<option value="30%">30%</option>
								<option value="40%">40%</option>
								<option value="50%">50%</option>
								<option value="60%">60%</option>
								<option value="70%">70%</option>
								<option value="80%">80%</option>
								<option value="90%">90%</option>
							</select>
						</label>
					</div>
					<div className="description__pop-image-container--buttons">
						<button type="button" onClick={() => getValueTipTap(false, editedValue, true)}>
							Aceptar
						</button>
					</div>
				</div>
			) : (
				<i
					className="description__pop-image"
					onClick={() => {
						activatePopImage(editedValue, secondValues.imgWidht)
					}}></i>
			)}
		</>
	)
}

export default ImageDesc
