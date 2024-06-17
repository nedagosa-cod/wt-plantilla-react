import { useContext, useEffect, useRef, useState } from 'react'
import './Tipificador.scss'
import ButtonPlantillas from './ButtonPlantillas'
import Swal from 'sweetalert2'
import GlobalContext from '../../context/GlobalContext'

const Tipificador = () => {
	const { WTLocalbase, readExcelFile } = useContext(GlobalContext)
	const inputFIle = useRef()
	const [dataRows, setDataRows] = useState([])
	const [dataRows_2, setDataRows_2] = useState([])
	const [datosParaLaGestion, setDatosDeGestion] = useState([])
	const [todosLosDatos, setTodosLosDatos] = useState([])

	const [codigosDeGestion, setCodigosDeGestion] = useState([])

	const [showPopup, setShowPopup] = useState(false)

	const getCodigosGestion = async () => {
		let codigos = await WTLocalbase.collection('arbol')
			.get()
			.then(excel => {
				return excel.map(row => {
					return row.CODIGO
				})
			})

		let codigosSinRepetir = [...new Set(codigos)]

		setCodigosDeGestion(codigosSinRepetir)
	}
	const getPlantillas = async () => {
		let plantilla = await WTLocalbase.collection('plantillas')
			.get()
			.then(excel => {
				return excel
			})

		setDataRows_2(plantilla)
	}
	const getDatosGestion = async value => {
		let datos = await WTLocalbase.collection('arbol')
			.get()
			.then(excel => {
				return excel.map(row => {
					if (value == row.CODIGO) {
						return row.DATOS
					}
				})
			})

		let datosSinRepetir = [...new Set(datos)]
		setDatosDeGestion(datosSinRepetir)
	}

	const getTodosLosDatos = value => {
		WTLocalbase.collection('arbol')
			.get()
			.then(excel => {
				let filtro = excel.filter(row => row.DATOS === value)
				setTodosLosDatos(filtro)
			})
	}

	//COPIAR TEXTO
	const copySelectedText = () => {
		const selectedOption = document.querySelector('.selectcopi').value
		navigator.clipboard.writeText(selectedOption)
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

	const closePopup = () => {
		setShowPopup(false)
	}

	useEffect(() => {
		getCodigosGestion()
		getPlantillas()
	}, [dataRows])
	return (
		<div className="tipificador-container">
			{showPopup && (
				<div className="popup">
					<div className="popup-content">
						<p>¡Bien hecho!</p>
						<p>
							Presiona la tecla <span>F5</span> <br /> para actualizar la base cargada.
						</p>
						<button className="close-btn" onClick={closePopup}>
							Cerrar
						</button>
					</div>
				</div>
			)}
			{/* Fin de la ventana emergente */}
			<h1 className="tipificador-container__title">Tipificador</h1>
			<section className="tipificador">
				<article className="tipificador__left">
					<label className="tipificador__column">
						<span className="tipificador__column--title">Códigos gestión</span>
						<select
							onChange={e => {
								getDatosGestion(e.target.value)
							}}>
							<option value="">Seleccione Codigo De Gestión...</option>
							{codigosDeGestion.map((codigo, i) => {
								return (
									<option key={i} value={codigo}>
										{codigo}
									</option>
								)
							})}
						</select>
					</label>
					<label className="tipificador__column">
						<span className="tipificador__column--title">Datos para la gestión</span>
						<select
							className="selectcopi"
							onChange={e => {
								getTodosLosDatos(e.target.value)
							}}>
							<option value="">Seleccione Dato De Gestión...</option>
							{datosParaLaGestion &&
								datosParaLaGestion.map((dato, i) => {
									return dato ? (
										<option key={i} value={dato}>
											{dato}
										</option>
									) : (
										''
									)
								})}
						</select>

						<button className="button-coppy" onClick={copySelectedText}>
							<div className="svg-wrapper-1">
								<div className="svg-wrapper">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
										<path d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z" />
									</svg>
								</div>
							</div>
							<span>Copiar Dato</span>
						</button>
					</label>

					<div className="tipificador__direccionamiento">
						<span className="tipificador__column--title">Direccionamiento</span>

						{todosLosDatos &&
							todosLosDatos.map((dato, i) => {
								return (
									dato && (
										<div className="direccionamiento" key={i}>
											<p>
												{dato.ESCALAMIENTO} al area de {dato.AREA}
											</p>
											<p></p>
										</div>
									)
								)
							})}
					</div>
				</article>
				<article className="tipificador__mid">
					<div className="tipificador__column">
						<span className="tipificador__column--title mid">DEFINICIÓN</span>
						<div className="tipificador__column--parrafo">
							{todosLosDatos &&
								todosLosDatos.map((dato, i) => {
									return dato ? <p key={i}>{dato.DEFINICION}</p> : ''
								})}
						</div>
					</div>
					<div className="tipificador__column">
						<span className="tipificador__column--title mid">EXCEPCIÓN ESCENARIOS</span>
						<div className="tipificador__column--parrafo">
							{todosLosDatos &&
								todosLosDatos.map((dato, i) => {
									return dato ? <p key={i}>{dato.EXCEPCION}</p> : ''
								})}
						</div>
					</div>
					<div className="tipificador__column">
						<span className="tipificador__column--title mid">NOTAS</span>
						<div className="tipificador__column--parrafo">
							{todosLosDatos &&
								todosLosDatos.map((dato, i) => {
									return dato ? <p key={i}>{dato.NOTAS}</p> : ''
								})}
						</div>
					</div>
				</article>
				<article className="tipificador__right">
					<div className="tipificador__column">
						<span className="tipificador__column--title">TIEMPO ACTUAL</span>
						<div className="tipificador__column--parrafo time">
							{todosLosDatos &&
								todosLosDatos.map((dato, i) => {
									return dato ? <p key={i}>{dato.T_ACTUAL}</p> : ' '
								})}
						</div>
					</div>

					<span className="spanPlan">PLANTILLAS</span>
					<div className="example-1">
						{todosLosDatos &&
							todosLosDatos.map(dato => {
								let arrPlantillas = [
									dato.PLANTILLA,
									dato.ESCENARIO_2,
									dato.ESCENARIO_3,
									dato.ESCENARIO_4,
									dato.ESCENARIO_5,
								]
								return arrPlantillas.map((plantilla, i) => {
									return <ButtonPlantillas dataRows_2={dataRows_2} name={plantilla} key={i} />
								})
							})}
					</div>
				</article>
			</section>

			{/* <button
				className="open-file"
				onClick={() => {
					inputFIle.current.click()
				}}>
				<input
					type="file"
					style={{ display: 'none' }}
					ref={inputFIle}
					onChange={e => {
						readExcelFile(e)
					}}
				/>
				<span className="file-wrapper">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 71 67">
						<path
							strokeWidth="5"
							stroke="black"
							d="M41.7322 11.7678L42.4645 12.5H43.5H68.5V64.5H2.5V2.5H32.4645L41.7322 11.7678Z"></path>
					</svg>
					<span className="file-front"></span>
				</span>
				Cargar Base
			</button> */}
		</div>
	)
}

export default Tipificador
