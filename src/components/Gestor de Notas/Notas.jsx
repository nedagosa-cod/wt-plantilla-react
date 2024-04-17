import { useState } from 'react'
import nota_ejemplo from './BASES/nota_ejemplo.json'
import FormNote from './FormNote'
const Notas = ({ nameNote }) => {
	const [notas, setNotas] = useState({
		nota_ejemplo,
	})

	return (
		<div>
			<FormNote jsonNote={notas[nameNote]}></FormNote>
		</div>
	)
}

export default Notas
