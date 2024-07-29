import imgBack from '../../assets/images/index/backWelcome.jpg'

export default function Bienvenida() {
	return (
		<div className="welcome" style={{ backgroundImage: `url(${imgBack})` }}>
			<section className="welcome__content">
				<span>Bienvenido a </span>
				<span>
					Web Training <strong>Formacion</strong>
				</span>
				<p>
					Desarrollo de aplicativos web para la mejora de las gestiones diarias de la producción.
				</p>
			</section>
		</div>
	)
}
