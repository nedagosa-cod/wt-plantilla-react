import { createContext, useState } from 'react'

const ContadorContext = createContext()

const ContadorProvider = ({ children }) => {
	const [contador, setContador] = useState(0)
	const sumar = () => {
		setContador(contador + 1)
	}

	const data = { sumar, contador }
	return (
		<ContadorContext.Provider value={data}>{children}</ContadorContext.Provider>
	)
}

export { ContadorProvider }
export default ContadorContext
