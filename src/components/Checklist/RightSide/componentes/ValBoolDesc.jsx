import { useContext, useEffect, useState } from 'react'
import 'animate.css'
import CheckListContext from '../../../../context/ChecklistContext'

const ValBoolDesc = ({ children, title, position }) => {
	const { activeInside, updateActiveInside } = useContext(CheckListContext)

	const [optSelected, setOptSelected] = useState('custom')
	const [si, setSi] = useState(activeInside.filter(el => el.id == position))

	const getData = e => {
		if (e.target.nodeName == 'INPUT') {
			updateActiveInside(position, e.target.value, title)
		}
	}

	const startAnimated = () => {
		let result = ''
		activeInside.forEach(valData => {
			if (valData.id == position) {
				result = 'animate__slideInDown animate__faster'
			}
		})
		return result
	}

	useEffect(() => {
		console.log(activeInside.length)
		if (activeInside.length > 0) {
			activeInside.map(res => {
				console.log(res.id)
				console.log(position)
				console.log(res.active)
				if (res.id == position && res.active == 'SI') {
					setOptSelected('SI')
				} else if (res.id == position && res.active == 'NO') {
					setOptSelected('NO')
				} else {
					setOptSelected('custom')
				}
			})
		} else {
			setSi(false)
		}
	}, [activeInside])

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
							value="SI"
							onChange={getData}
							checked={optSelected === 'SI'}
						/>
					</label>
					<label className="label">
						NO
						<input
							type="radio"
							name={'valtext_' + position}
							value="NO"
							onChange={getData}
							checked={optSelected === 'NO'}
						/>
					</label>
					<label>
						<input
							type="radio"
							name={'valtext_' + position}
							value="custom"
							onChange={getData}
							// style={{ display: 'none' }}
							checked={optSelected === 'custom'}
						/>
					</label>
				</article>
			</div>

			{si && (
				<section className={'insidebool animate__animated ' + startAnimated()}> {children}</section>
			)}
		</>
	)
}

export default ValBoolDesc
