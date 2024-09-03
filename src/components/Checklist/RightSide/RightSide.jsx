import { useContext, useEffect, useState } from 'react'
import './styles.scss'
import CheckListContext from '../../../context/ChecklistContext'
import GlobalContext from '../../../context/GlobalContext'
import { IconPlus } from '../../../icons/IconPlus'

const RightSide = ({ descripciones }) => {
	const { checkSelected, refRightSide } = useContext(CheckListContext)
	const { admin } = useContext(GlobalContext)
	const [data, setData] = useState([])

	useEffect(() => {
		setData(descripciones)
	}, [descripciones])
	return (
		<div className={'rightSide' + (admin ? ' admin' : '')} id="rightSide" ref={refRightSide}>
			{data.map((descripcion, i) => {
				return (
					<div
						key={i}
						className={
							'rightSide__description description ' + (checkSelected == descripcion.check || admin ? 'active' : '')
						}>
						{descripcion.html()}
					</div>
				)
			})}
		</div>
	)
}

export default RightSide
