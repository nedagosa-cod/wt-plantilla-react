import { useContext, useEffect, useState } from 'react'
import './styles.scss'
import CheckListContext from '../../../context/ChecklistContext'

const RightSide = ({ descripciones }) => {
	const { checkSelected, refRightSide } = useContext(CheckListContext)
	const [data, setData] = useState([])
	useEffect(() => {
		setData(descripciones)
	}, [descripciones])
	return (
		<div className="rightSide" id="rightSide" ref={refRightSide}>
			{data.map(descripcion => {
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
