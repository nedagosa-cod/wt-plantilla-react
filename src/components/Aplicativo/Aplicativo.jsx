import { useState } from 'react'
import './apStyle.scss'
import datosApli from './dataAplicativos'
import IconAvion from '../../icons/IconAvion'
import IconApps from '../../icons/IconApps'
import AppIndi from './AppIndi'

const Aplicativos = () => {
	// selectedOption para almacenar la opción seleccionada y setSelectedOption para actualizar el estado de la opción seleccionada.
	const [selectedOption, setSelectedOption] = useState('jet')
	const [selectedButton, setSelectedButton] = useState('jet')
	// con esta funcion controlo tanto el cambio como el color
	const dosPorUno = option => {
		setSelectedOption(option)
		setSelectedButton(option)
	}
	return (
		<section className="aplicativos">
			<h1 className="aplicativos__title">APLICATIVOS WEB</h1>
			<div className="aplicativos__cont">
				{/* formateamos la cadena de class para poner selected dependiendo lo que se haya seleccionado */}
				{/* Segun entendi poner la funcion flecha al llamar el onclick es para verificar que solo se va a ejecutar al momento de dar click y no cuando se vaya a renderizar*/}
				<button
					className={`buttOpc btn-12 ${
						selectedButton === 'jet' ? 'selected' : ''
					}`}
					onClick={() => dosPorUno('jet')}>
					{<IconAvion />} JetSmart {<IconAvion />}
				</button>
				<button
					className={`buttOpc btn-12 ${
						selectedButton === 'atento' ? 'selected' : ''
					}`}
					onClick={() => dosPorUno('atento')}>
					{<IconApps />} Aplicativos Atento {<IconApps />}
				</button>
				{/* si hay equivalencia se renderiza el contenido de onlyFans */}
				<div className="capa">
					{datosApli.map((aplicativo, index) => {
						if (selectedOption === 'jet' && aplicativo.modulo === 'jet') {
							return <AppIndi key={index} aplicativo={aplicativo} />
						}
						if (selectedOption === 'atento' && aplicativo.modulo === 'atento') {
							return <AppIndi key={index} aplicativo={aplicativo} />
						}
					})}
				</div>
			</div>
		</section>
	)
}

export default Aplicativos
