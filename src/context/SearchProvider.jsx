import { createContext, useContext, useState } from 'react'
import searchSpotlight from '../data/spotlight.json'
import Fuse from 'fuse.js'

// Crear el contexto
const SearchContext = createContext()

// Función de proveedor del contexto
export const SearchProvider = ({ children }) => {
	// Datos de ejemplo para el índice
	const [searchTerm, setSearchTerm] = useState('')

	// Crear instancia de Fuse.js
	const fuse = new Fuse(searchSpotlight, {
		keys: ['title', 'content', 'keywords', 'name'],
		threshold: 0.2,
	})

	const filteredData = cards => {
		return cards.filter(
			card =>
				card.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
				card.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
		)
	}

	// Función de búsqueda que puede ser llamada desde cualquier parte de la app
	const handleSearchGlobal = term => {
		return fuse.search(term).map(result => result.item)
	}
	// Buscador por vista
	const handleSearchVista = value => {
		setSearchTerm(value)
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

	const paginationValues = ({ data, pagina, CARDS_PER_PAGE }) => {
		const totalPaginas = Math.ceil(filteredData(data).length / CARDS_PER_PAGE)
		const cardsActuales = filteredData(data).slice((pagina - 1) * CARDS_PER_PAGE, pagina * CARDS_PER_PAGE)
		return { totalPaginas, cardsActuales }
	}
	return (
		<SearchContext.Provider
			value={{
				handleSearchVista,
				handleSearchGlobal,
				filteredData,
				paginationValues,
			}}>
			{children}
		</SearchContext.Provider>
	)
}

// Hook para usar el contexto
export const useSearch = () => {
	return useContext(SearchContext)
}
