import { useState } from 'react'

export default function Bienvenida() {
	const [contador, setContador] = useState(0)

	return (
		<div className="welcome">
			<span>Bienvenido a </span>
			<span>Automatizaciones Formación</span>
			<p>Desarrollo de aplicativos web para la mejora de las gestiones diarias de la producción.</p>
			<div className="contador">
				<button
					onClick={() => {
						setContador(contador + 1)
					}}>
					contador
				</button>
				<p>{contador}</p>
			</div>
		</div>
	)
}
