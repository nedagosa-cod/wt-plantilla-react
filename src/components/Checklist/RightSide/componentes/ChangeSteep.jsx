import React, { useContext } from 'react'
import CheckListContext from '../../../../context/ChecklistContext'
import { BtnZum } from '../../../MyComponents/Buttons/Buttons'

const ChangeSteep = ({ children, to }) => {
	const { changeDescription, refListCheck, configHover } = useContext(CheckListContext)

	const jumpToListCheck = e => {
		let ListCheck = refListCheck.current.querySelectorAll('input[type="checkbox"]')
		let end = false
		ListCheck.forEach(element => {
			if (element.id == to) {
				element.checked = false
				end = true
			} else if (element.id != to && !end) {
				element.parentNode.parentNode.parentNode.classList.add('checked')
				element.checked = true
			}
		})
		changeDescription(to)
	}

	return (
		<BtnZum
			className="changeSteep"
			onClick={jumpToListCheck}
			onMouseEnter={() => configHover('hover', to)}
			onMouseLeave={() => configHover('', '')}>
			{children}
		</BtnZum>
	)
}

export default ChangeSteep
