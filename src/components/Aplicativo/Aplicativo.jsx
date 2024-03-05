import { useState } from 'react'
import './apStyle.scss'
import datosApli from './dataAplicativos'

const Aplicativos = () => {
	// selectedOption para almacenar la opción seleccionada y setSelectedOption para actualizar el estado de la opción seleccionada.
	const [selectedOption, setSelectedOption] = useState('jet')

	return (
		<section className="aplicativos">
			<h1 className="aplicativos__title">APLICATIVOS WEB</h1>
			<div>
				{/* le damos el valor por medio del onclick */}
				<button onClick={() => setSelectedOption('jet')}>JetSmart</button>
				<button onClick={() => setSelectedOption('mar')}>
					Aplicativos Atento
				</button>
				{/* si hay equivalencia se renderiza el contenido de onlyFans */}
				{selectedOption === 'jet' && (
					<div>
						<div>maria la del abrrio soy</div>
					</div>
				)}
				{selectedOption === 'mar' && (
					<div>
						<div>pedro es gat</div>
					</div>
				)}
			</div>
		</section>
	)
}

export default Aplicativos
