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
								type="text"
								name="usuario"
								placeholder=""
								required=""
								onChange={e => {
									updateData(e.target.value, e.target.name)
								}}
							/>
							<span>Usuario</span>
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
