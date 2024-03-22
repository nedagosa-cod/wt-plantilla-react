import { useContext, useEffect } from 'react'
import CheckListContext from '../../../../context/ChecklistContext'

const InsideAnswer = ({ children, answer, position }) => {
	const { activeInside } = useContext(CheckListContext)

	useEffect(() => {
		if (activeInside.lenght > 0) {
			console.log(activeInside[0].active)
			return <>{children}</>
		}
		console.log(position)
	})

	return <></>
}
export default InsideAnswer
