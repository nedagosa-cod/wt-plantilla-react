import { useState } from 'react'
import Estructure from '../Checklist/BigIcons/Estructure'
// import img from '../../assets/images/index/favicon.jpg'

export default function Bienvenida() {
	const [contador, setContador] = useState(0)
	return (
		<div className="welcome">
			<span>We build exceptional</span>
			<span>software and service</span>
			<span>companies</span>
			<p>Development of web applications to improve company daily management.</p>
			<button>Iniciar tutorial</button>
		</div>
	)
}
