import { useContext } from 'react'
import ListCheck from './ListCheck'
import CheckListContext from '../../../context/ChecklistContext'

const LeftSide = ({ title, data }) => {
	const { refListCheck } = useContext(CheckListContext)
	return (
		<div className="LeftSide">
			<h1 className="LeftSide__title">{title}</h1>
			<ul className="LeftSide__ul" ref={refListCheck}>
				{data.map((paso, i) => {
					return <ListCheck check={paso.check} title={paso.html[0].TITULO} key={i} />
				})}
			</ul>
		</div>
	)
}

export default LeftSide
