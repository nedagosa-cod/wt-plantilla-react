import { createContext, useState } from 'react'

const CheckListContext = createContext()

const CheckListProvider = ({ children }) => {
	const [activeInside, setActiveInside] = useState([])

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

	const data = { activeInside, updateActiveInside }
	return (
		<CheckListContext.Provider value={data}>
			{children}
		</CheckListContext.Provider>
	)
}

export { CheckListProvider }
export default CheckListContext
