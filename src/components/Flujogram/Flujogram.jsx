import FlowchartDiagram from './components/Diagrama'
import { useParams } from 'react-router-dom'

export default function Flujogram() {
	const { id } = useParams()
	return (
		<section className="w-full h-full inset-0 -z-10 bg-white bg-[radial-gradient(#737373_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[#000000] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)]">
			<FlowchartDiagram id={id} />
		</section>
	)
}
