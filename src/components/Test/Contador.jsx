import { useContext } from 'react'
import { VerDato } from './VerDato'
import ContadorContext from '../../context/ContadorContext'

const Contador = () => {
	const { contador } = useContext(ContadorContext)
	return (
		<>
			<p>{contador}</p>
			<VerDato />
		</>
	)
}

export default Contador
