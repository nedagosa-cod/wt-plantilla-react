import { useState } from 'react'
import './styles.scss'
import Swal from 'sweetalert2'
import imgBackground from '../../assets/images/index/sessionBackground.jpg'
import ImgLogo from '../../assets/images/index/logoSIn.png'
import 'animate.css'

export const SessionAccess = ({ campana, segmento }) => {
	const [dataSession, setDataSession] = useState({
		usuario: '',
		campana: '',
		segmento: '',
		observaciones: '',
	})
	const [active, setActive] = useState(true)
	const updateData = (newData, key) => {
		setDataSession(personaActual => ({
			...personaActual,
			[key]: newData,
		}))
	}
	const sendData = event => {
		event.preventDefault()

		// if (dataSession.usuario.length < 5) {
		// 	return Swal.fire({
		// 		icon: 'error',
		// 		title: 'El usuario debe tener al menos 5 caracteres',
		// 		heightAuto: false,
		// 		allowOutsideClick: true,
		// 	})
		// }

		const validarCedula = cedula => {
			if (cedula.length < 6) {
				Swal.fire({
					icon: 'error',
					title: 'Por favor, ingresa al menos 5 caracteres',
					heightAuto: false,
					allowOutsideClick: true,
					allowEscapeKey: true,
				})
				return
			} else if (cedula.length > 12) {
				Swal.fire({
					icon: 'error',
					title: 'Por favor, ingresa menos de 12 caracteres',
					heightAuto: false,
					allowOutsideClick: true,
					allowEscapeKey: true,
				})
				return
			}
			let nums = {}
			for (let i = 0; i < cedula.length; i++) {
				var num = cedula.charAt(i)
				if (nums[num]) {
					nums[num]++
				} else {
					nums[num] = 1
				}
			}
			let count = 0
			for (let num in nums) {
				if (nums[num] > 0) count++
			}
			if (count < 4) return
			let regex =
				/^(?!.*(.)\1{4,})(?!12121|212121|100000|313131|123123)(?!0{4}|1{4}|2{4}|3{4}|4{4}|5{4}|6{4}|7{4}|8{4}|9{4})/
			let result = regex.test(cedula)
			return result
		}

		if (!validarCedula(dataSession.usuario)) {
			Swal.fire({
				icon: 'error',
				title: 'Por favor, ingresa una cédula válida',
				heightAuto: false,
				allowEscapeKey: true,
			})
			return
		}

		setActive(false)
		Swal.fire({
			icon: 'info',
			title: 'Enviando',
			heightAuto: false,
			didOpen: () => {
				Swal.showLoading()
			},
			allowOutsideClick: false,
			allowEscapeKey: false,
		})

		fetch('http://colbogweb20:8081/Webservices_Simulador/api/main/insUpdTransaccion', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(dataSession),
		})
			.then(response => response.json())
			.then(result => {
				sessionStorage.setItem('session', true)
				Swal.fire({
					heightAuto: false,
					icon: 'success',
					title: 'Datos Enviados correctamente.',
					allowOutsideClick: true,
				})
			})
			.catch(error => {
				sessionStorage.setItem('session', false)
				Swal.fire({
					icon: 'error',
					title: 'Ocurrió un error durante el consumo del API',
					heightAuto: false,
					text: error,
					allowOutsideClick: true,
				})
			})
	}
	const style = {
		backgroundImage: `url(${imgBackground})`,
		backgroundSize: '100% 100%',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
	}
	if (active) {
		return (
			<div className="sessionRec" style={style}>
				<div className="sessionRec__data">
					<span className="sessionRec__data--title">Web Training</span>
					<figure className="animate__animated animate__bounceIn">
						<img src={ImgLogo} alt="Logo" />
					</figure>

					<div className="sessionRec__data--footer">
						<span>
							<strong>Automatizaciones</strong> Formación
						</span>
						<p>v1.0.0</p>
					</div>
				</div>

				<div className="sessionRec__form">
					<form className="form animate__animated animate__fadeInUp">
						<p className="title">Registro de acceso</p>
						<p className="message">Agrega tus datos, para llevar el registro obligatorio</p>
						<label>
							<input
								className="input"
								type="number"
								name="usuario"
								placeholder=""
								required=""
								onChange={e => {
									updateData(e.target.value, e.target.name)
								}}
							/>
							<span>Cédula</span>
						</label>

						<label>
							<input
								className="input"
								type="text"
								placeholder=""
								required=""
								name="campana"
								readOnly
								defaultValue={campana}
							/>
							<span>Camapaña</span>
						</label>
						<label>
							<input
								className="input"
								type="text"
								placeholder=""
								readOnly
								required=""
								name="segmento"
								defaultValue={segmento}
							/>
							<span>Segmento</span>
						</label>
						<label>
							<input
								className="input"
								type="text"
								placeholder=""
								required=""
								name="observaciones"
								onChange={e => {
									updateData(e.target.value, e.target.name)
								}}
							/>
							<span>Observaciones</span>
						</label>
						<button
							className="submit"
							onClick={e => {
								sendData(e)
							}}>
							Enviar
						</button>
					</form>
				</div>
			</div>
		)
	}
}
