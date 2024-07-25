import { useState } from 'react'

export default function Bienvenida() {
	const [contador, setContador] = useState(0)

	const leerJson = () => {
		fetch('./prueba.json', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				TITULO: 'NUEVO TITULO',
			}),
		})
			.then(response => response.json())
			.then(data => {
				console.log('Success:', data)
			})
			.catch(error => {
				console.error('Error:', error)
			})
	}

	return (
		<div className="welcome">
			<span>Bienvenido a </span>
			<span>Automatizaciones Formación</span>
			<p>Desarrollo de aplicativos web para la mejora de las gestiones diarias de la producción.</p>
			<div className="contador">
				<button
					onClick={() => {
						// setContador(contador + 1)
						leerJson()
					}}>
					contador
				</button>
				<p>{contador}</p>
			</div>
		</div>
	)
}
