import { useContext, useState } from 'react'
import { DataInside, InsideBool } from './DataInside'
import CheckListContext from '../../../../context/ChecklistContext'

const ValBoolDesc = ({ children, title, position }) => {
	const { activeInside, updateActiveInside } = useContext(CheckListContext)

	const getData = e => {
		if (e.target.nodeName == 'INPUT') {
			updateActiveInside(position, e.target.value)
		}
	}

	return (
		<>
			<div className="description__valtext">
				<span className="description__valtext--ask">
					<strong>{position}.</strong> {title}
				</span>
				<button
					onClick={() => {
						console.log(activeInside)
					}}>
					test
				</button>
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
				<DataInside activeInside={activeInside} position={position}>
					{children}
				</DataInside>
			)}
		</>
	)
}

export default ValBoolDesc
