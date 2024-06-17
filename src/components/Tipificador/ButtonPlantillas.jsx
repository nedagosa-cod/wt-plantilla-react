import { useState } from 'react'
import { createPortal } from 'react-dom'
import Swal from 'sweetalert2'

const ButtonPlantillas = ({ name, dataRows_2 }) => {
	const [activePopPlantillas, setActivatePopPlantillas] = useState(null)

	const showPlantilla = namePlantilla => {
		if (namePlantilla !== 0) {
			let plantilla = dataRows_2.filter(row => row.NOMBRE === namePlantilla)
			setActivatePopPlantillas(plantilla.length > 0 ? plantilla[0] : null)
		}
	}

	const cerrarPlantilla = () => {
		setActivatePopPlantillas(null)
		navigator.clipboard.writeText(
			activePopPlantillas.DESCRIPCION_P +
			'\n' +
			activePopPlantillas.ASUNTO_P +
			'\n' +
			activePopPlantillas.PARRAFO_P
		)
		//ALERTA
		const Toast = Swal.mixin({
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
			didOpen: toast => {
				toast.onmouseenter = Swal.stopTimer
				toast.onmouseleave = Swal.resumeTimer
			},
		})
		Toast.fire({
			icon: 'success',
			title: 'Dato copiado correctamente',
		})
	}

	return (
		<div
			className={'icon-content ' + (name === 0 ? 'idle' : '')}
			name={name}
			onClick={e => {
				showPlantilla(e.target.getAttribute('name'))
			}}>
			<div className="link">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
					<path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384v38.6C310.1 219.5 256 287.4 256 368c0 59.1 29.1 111.3 73.7 143.3c-3.2 .5-6.4 .7-9.7 .7H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zm48 96a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm16 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v48H368c-8.8 0-16 7.2-16 16s7.2 16 16 16h48v48c0 8.8 7.2 16 16 16s16-7.2 16-16V384h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H448V304z" />
				</svg>
			</div>
			<div className="tooltip">{name}</div>
			{activePopPlantillas &&
				createPortal(
					<div className="popPlantilla">
						<div>
							<h1>{activePopPlantillas.NOMBRE}</h1>
							<h2>{activePopPlantillas.DESCRIPCION_P}</h2>
							<p>
								{activePopPlantillas.ASUNTO_P} <br /> <br />{' '}
								{activePopPlantillas.PARRAFO_P}
							</p>
							<button onClick={cerrarPlantilla}>COPIAR PLANTILLA</button>
						</div>
					</div>,
					document.body
				)}
		</div>
	)
}

export default ButtonPlantillas
