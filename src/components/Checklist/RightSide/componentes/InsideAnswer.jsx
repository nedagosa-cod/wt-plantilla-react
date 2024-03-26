import { useContext, useEffect, useState } from 'react'
import CheckListContext from '../../../../context/ChecklistContext'

const InsideAnswer = ({ children, position, answer }) => {
	const { activeInside } = useContext(CheckListContext)
	const [active, setActive] = useState(false)

	useEffect(() => {
		activeInside.forEach(valData => {
			if (valData.id == position) {
				if (valData.active == answer) {
					setActive(true)
				} else {
					setActive(false)
				}
			}
		})
	}, [activeInside])

	if (active) {
		return <>{children} </>
	}

	return
}
export default InsideAnswer
