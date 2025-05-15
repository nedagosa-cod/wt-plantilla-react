import { createContext, useContext } from 'react'
import searchSpotlight from '../data/spotlight.json'
import Fuse from 'fuse.js'

// Crear el contexto
const SearchContext = createContext()

// Función de proveedor del contexto
export const SearchProvider = ({ children }) => {
	// Datos de ejemplo para el índice

	// Crear instancia de Fuse.js
	const fuse = new Fuse(searchSpotlight, {
		keys: ['title', 'content', 'keywords', 'name'],
		threshold: 0.2,
	})

	// Función de búsqueda que puede ser llamada desde cualquier parte de la app
	const handleSearchGlobal = term => {
		return fuse.search(term).map(result => result.item)
	}
	// Buscador por vista
	const handleSearchVista = value => {
		const lowerCase = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
		const elementos = document.querySelectorAll('.dato-buscado')
		const depurados = Array.from(elementos).filter(card =>
			card.textContent
				.toLowerCase()
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.includes(lowerCase.toLowerCase())
		)
		Array.from(elementos).forEach(card => {
			card.style.display = 'none'
		})
		depurados.forEach(card => {
			card.style.display = ''
		})
	}

	return <SearchContext.Provider value={{ handleSearchVista, handleSearchGlobal }}>{children}</SearchContext.Provider>
}

// Hook para usar el contexto
export const useSearch = () => {
	return useContext(SearchContext)
}
