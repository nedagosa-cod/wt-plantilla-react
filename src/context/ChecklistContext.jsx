import { createContext, useState } from 'react'

const CheckListContext = createContext()

const CheckListProvider = ({ children }) => {
	const [activeInside, setActiveInside] = useState([])
	const [checkSelected, setCheckSelected] = useState('A')
	const [relativePosition, setRelativePosition] = useState({
		A: ['B', 'A'],
		B: ['C', 'B'],
		C: ['D', 'C'],
		D: ['E', 'D'],
		E: ['F', 'E'],
		F: ['G', 'F'],
		G: ['H', 'G'],
		H: ['I', 'H'],
		I: ['J', 'I'],
		J: ['K', 'J'],
		K: ['L', 'K'],
		L: ['M', 'L'],
		M: ['N', 'M'],
		N: ['Ñ', 'N'],
		Ñ: ['O', 'Ñ'],
		O: ['P', 'O'],
		P: ['Q', 'P'],
		Q: ['R', 'Q'],
		R: ['S', 'R'],
		S: ['T', 'S'],
		T: ['U', 'T'],
		U: ['V', 'U'],
		V: ['W', 'V'],
		W: ['X', 'W'],
		X: ['Y', 'X'],
		Y: ['Z', 'Y'],
		Z: ['A', 'Z'],
	})

	const updateActiveInside = (id, active) => {
		let resExist = activeInside.some(dataActive => dataActive.id == id)

		if (!resExist) {
			setActiveInside([...activeInside, { id, active }])
		} else {
			setActiveInside(prevInside => {
				return prevInside.map(item => {
					if (item.id === id) {
						return { ...item, active }
					}
					return item
				})
			})
		}
	}

	const changeDescription = position => {
		setCheckSelected(position)
	}
	const data = {
		activeInside,
		updateActiveInside,
		checkSelected,
		changeDescription,
		relativePosition,
	}

	return (
		<CheckListContext.Provider value={data}>
			{children}
		</CheckListContext.Provider>
	)
}

export { CheckListProvider }
export default CheckListContext
