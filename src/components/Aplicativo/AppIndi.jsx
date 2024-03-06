const AppIndi = ({ aplicativo }) => {
	return (
		<div className="card">
			<img
				src={`${aplicativo.imagen}.png`}
				alt={aplicativo.nombre}
			/>
			<h2>{aplicativo.nombre}</h2>
			<h2>{aplicativo.imagen}</h2>
			<h2>{aplicativo.modulo}</h2>
			<a href={aplicativo.enlace}>Enlace</a>
		</div>
	)
}

export default AppIndi
