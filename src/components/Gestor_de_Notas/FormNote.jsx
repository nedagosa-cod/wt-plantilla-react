import InputWt from '../WebTraining/WtField'
import './styles.notes.scss'
const FormNote = ({ jsonNote }) => {
	const module = {
		props: {
			id: '',
			type: 'just-text',
			placeholder: 'Escribe una nota...',
			className: 'holis',
			tooltip: 'Tooltip ejemplo',
			name: '',
		},
		conditions: {
			minLength: 5,
			maxLength: 10,
			currency: 'CRC',
			required: true,
			startWith: '89',
			endWith: '00',
			contains: 'a',
			active: 'nombre de campo B',
		},
		tools: {
			icon: {
				name: 'user',
				color: 'blue',
			},
		},
	}
	const setAtributtes = module => {
		const validProps = Object.entries(module.props).reduce((acc, [key, val]) => {
			if (val !== undefined && val !== null && val !== '') {
				acc[key] = val
			}
			return acc
		}, {})
		return validProps
	}
	return (
		<div>
			<InputWt {...module.props} {...module.conditions} />

			{/* {jsonNote.FIELDS.map((field, i) => (
			))} */}
		</div>
	)
}

export default FormNote
