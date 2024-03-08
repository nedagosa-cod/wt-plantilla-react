import { useEffect, useState } from 'react'
import './tipiStyle.scss'
import dataTipificador from './dataTipificador'

const Tipificador = () => {
	//estado para almacenar las areas
	const [areasU, setAreasU] = useState([])
	// Estado para almacenar las categorías asociadas a un área seleccionada
	const [categorias, setCategorias] = useState([])
	// Estado para la selección actual de área
	const [areaSelec, setAreaSelec] = useState('')

	const datosInciales = () => {
		// creo un nuevo array mapenando data y guardando los datos de todas las areas de data
		const guardado = dataTipificador.map(itera => itera.Area)
		// actualizamos el estado con setAreasU con un nuevo array sin valores duplicados de area gracias a Set
		setAreasU([...new Set(guardado)])
	}

	// Función para obtener categorías asociadas a un área seleccionada
	const datosSecundarios = () => {
		// si hay un area seleccionada se cumple si no se muestra vacio
		if (areaSelec) {
			// filtramos los datos de area con el dato seleccionado para despues a base del resultado mapearlo por categoria y guardarlo en el set
			const filtro = dataTipificador
				.filter(itera => itera.Area === areaSelec)
				.map(itera => itera.Categoria)

			setCategorias(filtro)
		} else {
			// Si no hay área seleccionada, reiniciamos las categorías
			setCategorias([])
		}
	}

	// usamos useEffect para llamar la funcion despues de que el componente ya se haya renderizado y solo lo hara una vez ya que el segundo argumento es []
	useEffect(() => {
		datosInciales()
	}, [])

	// Efecto para obtener categorías cuando cambia el área seleccionada
	useEffect(() => {
		datosSecundarios()
	}, [areaSelec])

	return (
		<section className="contTipificador">
			<h1 className="contTipificador__title">Tipificaciones DINSIDE </h1>
			<label htmlFor="areasU">Selecciona la area correspondiente</label>
			<select onChange={e => setAreaSelec(e.target.value)} value={areaSelec}>
				<option value="" disabled>
					Selecciona una área
				</option>
				{/* generamos un mapeo a la useState para imprimir dependiendo la cantidad de datos de la misma */}
				{areasU.map((are, index) => (
					<option key={index} value={are}>
						{are}
					</option>
				))}
			</select>

			<label htmlFor="categorias">
				Selecciona la categoría correspondiente
			</label>
			<select>
				<option value="">Selecciona...</option>
				{categorias.map((cat, index) => (
					<option key={index} value={cat}>
						{cat}
					</option>
				))}
			</select>
		</section>
	)
}

export default Tipificador
