import { Link } from 'react-router-dom'

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
				<Link className="enlaceCard" to={aplicativo.enlace}>
					Enlace
				</Link>
			</div>
		</div>
	)
}

export default AppIndi
