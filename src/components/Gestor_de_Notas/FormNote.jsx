import WtField from '../WebTraining/WtField'
import './styles.notes.scss'
import { useForm } from 'react-hook-form'
const FormNote = ({ jsonNote }) => {
	const fields = jsonNote.FIELDS

	const setAtributtes = module => {
		const validProps = Object.entries(module.props).reduce((acc, [key, val]) => {
			if (val !== undefined && val !== null && val !== '') {
				acc[key] = val
			}
			return acc
		}, {})
		return validProps
	}
	// #endregion
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm()

	const formSubmit = data => {
		console.log(data)
		reset()
	}

	const handleChange = event => {
		console.log(event.target.value)
	}
	return (
		<div>
			<form onSubmit={handleSubmit(formSubmit)}>
				{fields.map((jsonInput, i) => {
					return (
						<label className="WtField" key={i}>
							{/* <div className="WtField__error">
								<span>mensaje de error</span>
							</div> */}
							<input
								className="WtField__input"
								{...register(jsonInput.name, {
									value: jsonInput.value,
									minLength: {
										value: jsonInput.conditions.minLength,
										message: 'Minimo 5 caracteres',
									},
									required: {
										value: jsonInput.conditions.required,
										message: 'Este campo es requerido',
									},
									maxLength: {
										value: jsonInput.conditions.maxLength,
										message: 'Maximo 10 caracteres',
									},
								})}
							/>
						</label>
					)
				})}
				<button style={{ background: '#fff' }}>Enviar</button>
			</form>
		</div>
	)
}

export default FormNote
