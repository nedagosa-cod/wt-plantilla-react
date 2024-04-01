import { useContext, useEffect, useState } from 'react'
import IconArrowDown from '../../../../icons/IconArrowDown'
import CheckListContext from '../../../../context/ChecklistContext'

const ValListDesc = ({ children, position, list, title }) => {
	const { activeInside, updateActiveInside, resetList } = useContext(CheckListContext)
	const [showList, setShowList] = useState(false)
	const [valueList, setValueList] = useState('')

	const changeValueList = e => {
		setValueList(e.target.textContent)
		setShowList(false)
		updateActiveInside(position, e.target.textContent, title)
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
		setShowList(false)
		setValueList('')
	}, [resetList])

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
							onChange={e => {
								setValueList(e.target.value)
							}}
						/>
						<IconArrowDown />
					</label>

					{showList && (
						<ul
							className="list"
							onClick={() => {
								console.log('hola')
							}}>
							<li>Seleccion opción...</li>
							{list.map((liData, i) => {
								return (
									<li key={i} onMouseDown={changeValueList} className="li">
										<p>{liData}</p>
									</li>
								)
							})}
						</ul>
					)}
				</div>
			</div>
			{valueList && (
				<section className={'insidebool animate__animated ' + startAnimated()}>{children}</section>
			)}
		</>
	)
}

export default ValListDesc
