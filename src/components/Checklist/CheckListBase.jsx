import { useState } from 'react'
import { CheckListProvider } from '../../context/ChecklistContext'
import Checklist from './Checklist'
import PopImageDesc from './RightSide/componentes/PopImageDesc'
import { Settings } from './Settings'
import { createPortal } from 'react-dom'

const CheckListBase = () => {
	const [zoom, setZoom] = useState(false)
	const zoomChecklist = () => {
		setZoom(!zoom)
	}
	return (
		<>
			<CheckListProvider>
				<section className={'checklist-container ' + zoom}>
					<Settings zoomChecklist={zoomChecklist} />
					<Checklist />
				</section>
			</CheckListProvider>
		</>
	)
}

export default CheckListBase
