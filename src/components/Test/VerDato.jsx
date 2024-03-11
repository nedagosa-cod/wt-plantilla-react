import { useContext } from 'react'
import ContadorContext from '../../context/ContadorContext'

export const VerDato = () => {
	const { sumar } = useContext(ContadorContext)
	return (
		<button
			onClick={() => {
				sumar()
			}}>
			Ver contador
		</button>
	)
}
