import { useContext, useEffect, useState } from 'react'
import 'animate.css'
import CheckListContext from '../../../../context/ChecklistContext'

const ValBoolDesc = ({ children, title, position }) => {
	const { activeInside, updateActiveInside } = useContext(CheckListContext)
	const [si, setSi] = useState(false)
	const [no, setNo] = useState(false)

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
		if (activeInside.length > 0) {
			activeInside.map(res => {
				if (res.id == position && res.active == 'SI') {
					setSi(true)
					setNo(false)
				} else if (res.id == position && res.active == 'NO') {
					setSi(false)
					setNo(true)
				}
			})
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
							checked={si}
						/>
					</label>
					<label className="label">
						NO
						<input
							type="radio"
							name={'valtext_' + position}
							value="NO"
							onChange={getData}
							checked={no}
						/>
					</label>
				</article>
			</div>
			{activeInside.length > 0 && (
				<section className={'insidebool animate__animated ' + startAnimated()}> {children}</section>
			)}
		</>
	)
}

export default ValBoolDesc
