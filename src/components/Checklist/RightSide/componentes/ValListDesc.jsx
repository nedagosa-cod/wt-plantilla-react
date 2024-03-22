import { useState } from 'react'
import IconArrowDown from '../../../../icons/IconArrowDown'

const ValListDesc = ({ children, position, list }) => {
	const [showList, setShowList] = useState(false)
	const [valueList, setValueList] = useState('')

	const changeValueList = e => {
		setValueList(e.target.textContent)
		setShowList(false)
	}

	return (
		<div className="description__vallist">
			<span>
				<strong>{position}.</strong> {children}
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
							console.log('hola')
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
	)
}

export default ValListDesc
