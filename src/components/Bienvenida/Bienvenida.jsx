import { useState } from 'react'
import imgBack from '../../assets/images/index/backWelcome.jpg'

export default function Bienvenida() {
	const style = {
		backgroundImage: `url(${imgBack})`,
		backgroundSize: '100% auto',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
	}

	return (
		<div className="welcome" style={style}>
			<section className="welcome__content">
				<span>Bienvenido a </span>
				<span>Automatizaciones Formación</span>
				<p>
					Desarrollo de aplicativos web para la mejora de las gestiones diarias de la producción.
				</p>
			</section>
		</div>
	)
}
