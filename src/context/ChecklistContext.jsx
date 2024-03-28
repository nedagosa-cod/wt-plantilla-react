import { createContext, useState } from 'react'

const CheckListContext = createContext()

const CheckListProvider = ({ children }) => {
	const [activeInside, setActiveInside] = useState([])
	const [checkSelected, setCheckSelected] = useState('A')
	const [resetList, setResetList] = useState(true)

	const [theme, setTheme] = useState('dark')
	const [listChecked, setListChecked] = useState('')
	const [zoom, setZoom] = useState(false)

	const relativePosition = {
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
	}

	const updateActiveInside = (id, active, title) => {
		let resExist = activeInside.some(dataActive => dataActive.id == id)
		if (!resExist) {
			setActiveInside([...activeInside, { id, active, title }])
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
	const changeTheme = () => {
		theme == 'dark' ? setTheme('light') : setTheme('dark')
	}
	const resetCheckList = () => {
		setActiveInside([])
		setCheckSelected('A')
		setResetList(!resetList)
	}
	const zoomChecklist = () => {
		setZoom(true)
	}
	const data = {
		activeInside,
		updateActiveInside,
		checkSelected,
		changeDescription,
		relativePosition,
		changeTheme,
		theme,
		resetCheckList,
		listChecked,
		setListChecked,
		zoomChecklist,
		setResetList,
		resetList,
		zoom,
	}

	return <CheckListContext.Provider value={data}>{children}</CheckListContext.Provider>
}

export { CheckListProvider }
export default CheckListContext
