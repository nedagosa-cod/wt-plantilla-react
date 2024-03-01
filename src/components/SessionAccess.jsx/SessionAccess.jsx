import { useState } from 'react'
import './styles.scss'
import Swal from 'sweetalert2'
import imgPrueba from '/public/test/click.png'

export const SessionAccess = () => {
	const [campana, setCamapana] = useState([
		'BANCO CAJA SOCIAL',
		'BANCO POPULAR',
		'BANCO W',
		'BBVA',
		'CABLETICA/LIBERTY',
		'CLARO',
		'COLCERAMICAS',
		'COLPATRIA',
		'DAVIVIENDA',
		'DIDI',
		'FACEBOOK',
		'FALABELLA',
		'JETSMART',
		'LINDEE',
		'OXIGENOS',
		'PEPSICO',
		'PNC',
		'REMARK',
		'RUNT',
		'SHOPEE',
		'SUFI',
		'TELEFONICA',
		'VEOLIA',
		'VTR',
		'WHIRLPOOL',
	])
	const [segmento, setSegmento] = useState([
		'B2B',
		'B2C',
		'RETENCION',
		'PQR',
		'VENTAS',
		'SOPORTE',
		'CET',
		'INBOUND',
		'OUTBOUND',
		'ANTIFRAUDE',
		'MEDICALIZACION',
		'SEGUROS DE VIDA',
		'PREVENCION',
		'MEDICALIZACION Y MEDIOS',
		'HOGAR',
		'MOVIL',
		'SAC',
		'VTR',
		'CND',
		'SWAT',
	])
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

		fetch(
			'https://colbogweb20:9086/Webservices_Simulador_pre/api/main/insUpdTransaccion',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(dataSession),
			}
		)
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

	if (active) {
		return (
			<div className="sessionRec">
				<img src={imgPrueba} alt="img" />
				<form className="form" id="sendForm">
					<p className="title">Registro de acceso</p>
					<p className="message">
						Agrega tus datos, para llevar el registro obligatorio
					</p>
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
						<datalist id="campana">
							{campana.map((nameCampana, i) => (
								<option value={nameCampana} key={i} />
							))}
						</datalist>
						<input
							className="input"
							type="text"
							placeholder=""
							required=""
							list="campana"
							name="campana"
							onChange={e => {
								updateData(e.target.value, e.target.name)
							}}
						/>
						<span>Camapaña</span>
					</label>

					<label>
						<datalist className="input" id="modulo">
							{segmento.map((nameSegmento, i) => (
								<option value={nameSegmento} key={i} />
							))}
						</datalist>
						<input
							className="input"
							type="text"
							placeholder=""
							required=""
							list="modulo"
							name="segmento"
							onChange={e => {
								updateData(e.target.value, e.target.name)
							}}
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
						onClick={e => {
							sendData(e)
						}}>
						Enviar
					</button>
				</form>
			</div>
		)
	}
}
