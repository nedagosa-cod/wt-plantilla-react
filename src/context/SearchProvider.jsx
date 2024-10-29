import { createContext, useContext } from 'react'
import searchSpotlight from './spotlight.json'
import Fuse from 'fuse.js'

// Crear el contexto
const SearchContext = createContext()

// Función de proveedor del contexto
export const SearchProvider = ({ children }) => {
	// Datos de ejemplo para el índice

	// Crear instancia de Fuse.js
	const fuse = new Fuse(searchSpotlight, {
		keys: ['title', 'content', 'keywords', 'name'],
		threshold: 0.3,
	})

	// Función de búsqueda que puede ser llamada desde cualquier parte de la app
	const search = term => {
		return fuse.search(term).map(result => result.item)
	}

	return <SearchContext.Provider value={{ search }}>{children}</SearchContext.Provider>
}

// Hook para usar el contexto
export const useSearch = () => {
	return useContext(SearchContext)
}
