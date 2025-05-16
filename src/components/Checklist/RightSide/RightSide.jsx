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
		<div
			style={{
				display: !admin ? 'flex' : 'none',
			}}
			className={'rightSide relative w-1/2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100'}
			id="rightSide"
			ref={refRightSide}>
			{data.map((descripcion, i) => {
				return (
					<div
						style={{
							display: checkSelected == descripcion.check || admin ? 'flex' : 'none',
						}}
						key={descripcion.check}
						className={'rightSide__description description relative flex flex-col items-center h-full gap-2'}>
						{descripcion.html()}
					</div>
				)
			})}
		</div>
	)
}

export default RightSide
