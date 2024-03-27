import { useContext, useEffect, useState } from 'react'
import 'animate.css'
import CheckListContext from '../../../../context/ChecklistContext'

const ValBoolDesc = ({ children, title, position }) => {
	const { activeInside, updateActiveInside } = useContext(CheckListContext)

	const getData = e => {
		if (e.target.nodeName == 'INPUT') {
			updateActiveInside(position, e.target.value, title)
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
				<article className="description__valtext--radios">
					<label className="label">
						SI
						<input
							type="radio"
							name={'valtext_' + position}
							defaultValue="SI"
							onChange={getData}
						/>
					</label>
					<label className="label">
						NO
						<input
							type="radio"
							name={'valtext_' + position}
							defaultValue="NO"
							onChange={getData}
						/>
					</label>
				</article>
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
