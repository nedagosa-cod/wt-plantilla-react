import { useEffect, useState } from 'react'
import { CheckListProvider } from '../../context/ChecklistContext'
import Checklist from './Checklist'
import { Settings } from './Settings'
import ejemploA from './BASES/ejemploA.json'
import ejemploB from './BASES/ejemploB.json'
import ejemploC from './BASES/ejemploB.json'

const CheckListBase = ({ checklist }) => {
	const [zoom, setZoom] = useState(false)
	const [cheklists, setCheckList] = useState({
		ejemploA,
		ejemploB,
		ejemploC,
	})
	const zoomChecklist = () => {
		setZoom(!zoom)
	}

	return (
		<>
			<CheckListProvider>
				<section className={'checklist-container ' + zoom}>
					<Settings zoomChecklist={zoomChecklist} />
					<Checklist dataCheckList={cheklists[checklist]} />
				</section>
			</CheckListProvider>
		</>
	)
}

export default CheckListBase
