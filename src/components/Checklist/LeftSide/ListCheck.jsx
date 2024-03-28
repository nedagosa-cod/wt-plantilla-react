import { useContext, useEffect, useReducer, useRef, useState } from 'react'
import CheckListContext from '../../../context/ChecklistContext'

const ListCheck = ({ check, title, resetList }) => {
	const { checkSelected, changeDescription, relativePosition } =
		useContext(CheckListContext)
	const [listChecked, setListChecked] = useState('')
	const inputCheck = useRef()

	const showRelativeDescription = e => {
		const relativeDescription = () => {
			if (e.target.checked) {
				setListChecked('checked')
				return relativePosition[check][0]
			} else {
				setListChecked('')
				return relativePosition[check][1]
			}
		}

		if (relativePosition[e.target.id].includes(checkSelected)) {
			changeDescription(relativeDescription(), check)
		} else {
			e.target.checked = !e.target.checked
		}
	}

	useEffect(() => {
		setListChecked('')
		inputCheck.current.checked = false
	}, [resetList])

	return (
		<li>
			<label className={'ListCheck ' + listChecked}>
				<span>{check}</span>
				<h2>{title}</h2>
				<div className="checkbox-wrapper-44">
					<label className="toggleButton">
						<input
							ref={inputCheck}
							id={check}
							type="checkbox"
							onChange={showRelativeDescription}
						/>
						<div className="svg">
							<svg viewBox="0 0 44 44">
								<path
									transform="translate(-2.000000, -2.000000)"
									d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758"></path>
							</svg>
						</div>
					</label>
				</div>
			</label>
		</li>
	)
}

export default ListCheck