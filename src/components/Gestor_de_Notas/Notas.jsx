import { useState } from 'react'
import nota_ejemplo from './BASES/nota_ejemplo.json'
import FormNote from './FormNote'
const Notas = ({ nameNote }) => {
	const [notas, setNotas] = useState({
		nota_ejemplo,
	})
	return (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
			<FormNote jsonNote={notas[nameNote]}></FormNote>
		</div>
	)
}

export default Notas
