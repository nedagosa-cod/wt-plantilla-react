import dbEjemplo from './BASES/base.json'
import './styles.scss'
const Note = () => {
	const styles = {
		input: {
			fontSize: '4rem',
			background: '#0f0f0f',
			margin: '1rem',
			color: 'white',
		},
	}
	const handleChange = e => {}
	const handleBlur = e => {
		const result = dbEjemplo.nota_ejemplo.DATA.filter(el => el.id == e.target.id)
		// minleght
		if (e.target.value.length > 1 && e.target.value.length < result[0].conditions.minLength) {
			alert('Minimo ' + result[0].conditions.minLength + ' caracteres')
		}
	}
	const handleSubmit = e => {
		e.preventDefault()
		console.log(e.target)
	}
	return (
		<div>
			<form onSubmit={handleSubmit}>
				{dbEjemplo.nota_ejemplo.DATA.map(data => {
					return (
						<input
							key={data.id}
							id={data.id}
							type={data.type}
							placeholder={data.placeholder}
							style={styles.input}
							required={data.conditions.required}
							onChange={handleChange}
							onBlur={handleBlur}
							className={'dkjfhvskdj ' + data.unable}
						/>
					)
				})}
				<button>Enviar</button>
			</form>
		</div>
	)
}
export default Note
