import { useContext, useState } from 'react'
import ListCheck from './ListCheck'
import CheckListContext from '../../../context/ChecklistContext'
import { IconPlus } from '../../../icons/IconPlus'
import GlobalContext from '../../../context/GlobalContext'

const LeftSide = ({ title, data, updateCheck }) => {
	const { refListCheck, relativePosition } = useContext(CheckListContext)
	const { admin } = useContext(GlobalContext)

	const createStep = () => {
		updateCheck(prevState => ({
			...prevState,
			DESCRIPCIONES: [
				...data,
				{ check: relativePosition[data[data.length - 1].check][0], html: [{ TITULO: 'XXXXX' }] },
			],
		}))
	}

	return (
		<div className="LeftSide">
			<h1 className="LeftSide__title">{title}</h1>
			<ul className="LeftSide__ul" ref={refListCheck}>
				{data.map((paso, i) => {
					return (
						<ListCheck
							check={paso.check}
							title={paso.html[0].TITULO}
							key={i}
							updateCheck={updateCheck}
							data={data}
						/>
					)
				})}
				{admin && (
					<li className={'admin ' + 'on' + ' add-check'} onClick={() => createStep()}>
						<IconPlus />
					</li>
				)}
			</ul>
		</div>
	)
}

export default LeftSide
