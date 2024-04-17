import InputWt from './elements/WtField'
import './styles.notes.scss'
const FormNote = ({ jsonNote }) => {
	return (
		<div>
			{jsonNote.FIELDS.map((field, i) => (
				<InputWt key={i} module={field}></InputWt>
			))}
		</div>
	)
}

export default FormNote
