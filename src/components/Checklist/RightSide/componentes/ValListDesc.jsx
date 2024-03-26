import { useContext, useState } from 'react'
import IconArrowDown from '../../../../icons/IconArrowDown'
import CheckListContext from '../../../../context/ChecklistContext'

const ValListDesc = ({ children, position, list, title }) => {
	const [showList, setShowList] = useState(true)
	const [valueList, setValueList] = useState('')
	const { activeInside, updateActiveInside } = useContext(CheckListContext)

	const changeValueList = e => {
		setValueList(e.target.textContent)
		setShowList(false)
		updateActiveInside(position, e.target.textContent)
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
			<div className="description__vallist">
				<span>
					<strong>{position}.</strong> {title}
				</span>
				<div className="description__vallist--list">
					<label className="label">
						<input
							readOnly
							value={valueList}
							placeholder="Seleccion opción..."
							type="text"
							className="description__vallist--input"
							onFocus={() => {
								setShowList(true)
							}}
							onBlur={() => {
								setTimeout(() => {
									setShowList(false)
								}, 100)
							}}
							onChange={() => {
								console.log('cambio list')
							}}
						/>
						<IconArrowDown />
					</label>

					{showList && (
						<ul className="list">
							<li>Seleccion opción...</li>
							{list.map((liData, i) => {
								return (
									<li key={i} onClick={changeValueList} className="li">
										{liData}
									</li>
								)
							})}
						</ul>
					)}
				</div>
			</div>
			{activeInside && (
				<section className={'insidebool animate__animated ' + startAnimated()}>
					{children}
				</section>
			)}
		</>
	)
}

export default ValListDesc
