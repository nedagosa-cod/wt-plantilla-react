import { useContext, useEffect, useState } from 'react'
import 'animate.css'
import CheckListContext from '../../../../context/ChecklistContext'

const ValBoolDesc = ({ children, title, position, finish, to }) => {
	const {
		activeInside,
		updateActiveInside,
		resetList,
		refListCheck,
		refRightSide,
		changeDescription,
	} = useContext(CheckListContext)

	const [optSelected, setOptSelected] = useState('custom')
	const [showSubEl, SetshowSubEl] = useState(false)

	const validateFinish = respuesta => {
		if (respuesta == finish) {
			let ListCheck = refListCheck.current.querySelectorAll('input[type="checkbox"]')
			let end = false
			let letter = String.fromCharCode(65 + to)
			ListCheck.forEach(element => {
				if (element.id == letter) {
					element.checked = false
					end = true
				} else if (element.id != letter && !end) {
					element.parentNode.parentNode.parentNode.classList.add('checked')
					element.checked = true
					refRightSide.current.scrollTo({ top: 0, behavior: 'smooth' })
				}
			})
			changeDescription(letter)
		}
	}

	const getData = e => {
		if (e.target.nodeName == 'INPUT') {
			validateFinish(e.target.value)
			setOptSelected(e.target.value)
			SetshowSubEl(true)
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
		SetshowSubEl(false)
		setOptSelected('custom')
	}, [resetList])

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
					<label style={{ display: 'none' }}>
						<input
							type="radio"
							name={'valtext_' + position}
							value="custom"
							onChange={getData}
							checked={optSelected === 'custom'}
						/>
					</label>
				</article>
			</div>
			{showSubEl && (
				<section className={'insidebool animate__animated ' + startAnimated()}> {children}</section>
			)}
		</>
	)
}

export default ValBoolDesc
