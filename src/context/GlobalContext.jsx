import { createContext, useState } from 'react'
import Localbase from 'localbase'

const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {
	let WTLocalbase = new Localbase('db_nombre_campana')
	const data = { WTLocalbase }
	return <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
}

export { GlobalProvider }
export default GlobalContext
