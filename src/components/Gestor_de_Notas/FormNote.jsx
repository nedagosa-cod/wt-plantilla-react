import { useEffect } from 'react'
import WtField from '../WebTraining/WtField'
import './styles.notes.scss'
import { useForm } from 'react-hook-form'
const FormNote = ({ jsonNote }) => {
	// #region functions
	const module = {
		props: {
			id: 'prueba',
			type: 'just-text',
			placeholder: 'Escribe una nota...',
			className: 'holis',
			tooltip: 'Tooltip ejemplo',

			name: 'otra prueba',
		},
		conditions: {
			minLength: 5,
			// maxLength: 10,
			currency: 'EUR',
			required: true,
			startWith: 'hola',
			endWith: '00',
			contains: '324',
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

	const example = [
		{
			nota: 'retencion',
			elements: [
				{ name: 'nombre', value: 'soy el nombre', minLength: 5 },
				{ name: 'apellido', type: 'text', placeholder: 'Escribe una nota...', active: 'cuenta' },
				{ name: 'apellido', type: 'text', placeholder: 'Escribe una nota...' },
				{ name: 'apellido', type: 'text', placeholder: 'Escribe una nota...' },
				{ name: 'cuenta', type: 'text', placeholder: 'Escribe una nota...' },
				{ name: 'apellido', type: 'text', placeholder: 'Escribe una nota...' },
				{ name: 'apellido', type: 'text', placeholder: 'Escribe una nota...' },
				{ name: 'apellido', type: 'text', placeholder: 'Escribe una nota...', asdasdf },
			],
		},
	]

	useEffect(() => {
		console.log(errors)
		// console.log(errors.apellido?.message)
	})

	return (
		<div>
			<form onSubmit={handleSubmit(formSubmit)}>
				{example[0].elements.map((element, i) => {
					return (
						<input
							{...register(element.name, {
								value: value,
								minLength: {
									value: element.minLength,
									message: 'Minimo 5 caracteres',
								},
								required: {
									value: true,
									message: 'Este campo es requerido',
								},
								maxLength: {
									value: 10,
									message: 'Maximo 10 caracteres',
								},
								activate: active,
							})}
						/>
					)
				})}
				<label style={{ color: '#fff' }}>
					Nombre
					<input
						type="text"
						style={{ background: '#fff', fontSize: '1.8rem', color: 'black' }}
						{...register('nombre', {
							value: 'dsfsdf',
							minLength: {
								value: 5,
								message: 'Minimo 5 caracteres',
							},
							required: {
								value: true,
								message: 'Este campo es requerido',
							},
							maxLength: {
								value: 10,
								message: 'Maximo 10 caracteres',
							},
						})}
					/>
					{errors.nombre?.message && (
						<p style={{ color: 'red', fontSize: '1.8rem' }}>{errors.nombre?.message}</p>
					)}
				</label>

				<label style={{ color: '#fff' }}>
					Apellido
					<input
						type="text"
						style={{ background: '#fff', fontSize: '1.8rem', color: 'black' }}
						{...register('apellido', {
							required: {
								value: true,
								message: 'Este campo es requerido para apellido',
							},
						})}
					/>
				</label>
				<button style={{ background: '#fff' }}>Enviar</button>
			</form>
		</div>
	)
}

export default FormNote
