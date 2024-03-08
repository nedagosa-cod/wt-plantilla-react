// import img1 from '../../assets/images/app/img1.png'
const AppIndi = ({ aplicativo }) => {
	return (
		<div className="card">
			<div className="card__main">
				<img
					className="imageCard"
					src={`./noTocar/imagenes/app/${aplicativo.imagen}`}
				/>
				<div className="infoCard">
					<div className="infoCard__title">{aplicativo.nombre}</div>
				</div>
				<hr />
				<a className="enlaceCard" href={aplicativo.enlace}>
					Enlace
				</a>
			</div>
		</div>
	)
}

export default AppIndi
