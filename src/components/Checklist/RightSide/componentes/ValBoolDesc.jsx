import { useContext, useState } from 'react'
import 'animate.css'
import CheckListContext from '../../../../context/ChecklistContext'

const ValBoolDesc = ({ children, title, position }) => {
	const { activeInside, updateActiveInside } = useContext(CheckListContext)

	const getData = e => {
		if (e.target.nodeName == 'INPUT') {
			updateActiveInside(position, e.target.value)
		}
	}

	const startAnimated = () => {
		let result = ''
		activeInside.forEach(valData => {
			console.log(valData.id)
			console.log(position)
			if (valData.id == position) {
				result = 'animate__slideInDown animate__faster'
			}
		})
		return result
	}

	return (
		<>
			<div className="description__valtext ">
				<span className="description__valtext--ask">
					<strong>{position}.</strong> {title}
				</span>
				<form className="description__valtext--radios" onChange={getData}>
					<label className="label">
						SI
						<input
							type="radio"
							name={'valtext_' + position}
							defaultValue="SI"
						/>
					</label>
					<label className="label">
						NO
						<input
							type="radio"
							name={'valtext_' + position}
							defaultValue="NO"
						/>
					</label>
				</form>
			</div>
			{activeInside && (
				<section className={'insidebool animate__animated ' + startAnimated()}>
					{children}
				</section>
			)}
		</>
	)
}

export default ValBoolDesc
