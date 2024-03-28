import { useContext, useState } from 'react'
import './styles.scss'
import CheckListContext from '../../../context/ChecklistContext'

const RightSide = ({ descripciones }) => {
	const { checkSelected } = useContext(CheckListContext)

	return (
		<div className="rightSide">
			{descripciones &&
				descripciones.map(descripcion => {
					return (
						<div
							key={descripcion.check}
							className={
								'rightSide__description description ' +
								(checkSelected == descripcion.check ? 'active' : '')
							}>
							{descripcion.html()}
						</div>
					)
				})}
		</div>
	)
}

export default RightSide
