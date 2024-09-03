import { createContext, useRef, useState } from 'react'

const CheckListContext = createContext()

const CheckListProvider = ({ children }) => {
	const [activeInside, setActiveInside] = useState([])
	const [checkSelected, setCheckSelected] = useState('A')
	const [resetList, setResetList] = useState(true)

	const [hover, setHover] = useState('')
	const [posHover, setPosHover] = useState('')

	const [theme, setTheme] = useState('dark')
	// const [listChecked, setListChecked] = useState('')

	const [editChElement, setEditChElement] = useState(false)
	const [locationEl, setLocationEl] = useState({})

	const [zoom, setZoom] = useState(false)

	const refListCheck = useRef()
	const refRightSide = useRef()

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
	const configHover = (value, pos) => {
		setHover(value)
		setPosHover(pos)
	}
	const updateActiveInside = (id, active, title) => {
		let resExist = activeInside.some(dataActive => dataActive.id == id)
		if (!id) {
			setActiveInside([])
			return
		}
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
		updateActiveInside()
	}
	const zoomChecklist = () => {
		setZoom(true)
	}

	// CHECKLIST ADMIN

	function areObjectsEqual(obj1, obj2) {
		return obj1.check === obj2.check && obj1.location === obj2.location
	}

	// asigna los valores del contenido html y crea el elemnto correspondiente
	const HandlerContent = properties => {
		const { value, editValue, updateUserCheck, check, location, type, closeEdit } = properties

		// cierra el editor sin hacer cambios
		if (closeEdit) {
			setEditChElement(false)
			return
		}

		const userElement = {
			P: { P: value },
			SUBTITLE: { SUBTITLE: value },
			TITLE: { TITLE: value },
			SCRIPTS: { SCRIPTS: value },
		}
		userElement[type] == 'SCRIPTS' ? editValue(userElement[type]) : editValue(value)
		updateUserCheck(prevState => ({
			...prevState,
			DESCRIPCIONES: prevState.DESCRIPCIONES.map(description => {
				if (description.check === check) {
					return {
						...description,
						html: description.html.map((htmlEl, ind) => (ind === location ? userElement[type] : htmlEl)),
					}
				} else {
					return description
				}
			}),
		}))
		setEditChElement(false)
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
		zoomChecklist,
		setResetList,
		resetList,
		zoom,
		refListCheck,
		hover,
		configHover,
		posHover,
		refRightSide,
		editChElement,
		setEditChElement,
		locationEl,
		setLocationEl,
		areObjectsEqual,
		HandlerContent,
	}

	return <CheckListContext.Provider value={data}>{children}</CheckListContext.Provider>
}

export { CheckListProvider }
export default CheckListContext
