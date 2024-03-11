import { useState } from 'react'
import LeftSide from './LeftSide/LeftSide'
import RightSide from './RightSide/RightSide'
import './styles.scss'
import TitleDesc from './RightSide/componentes/TitleDesc'
import ParagraphDesc from './RightSide/componentes/ParagraphDesc'
import ListDesc from './RightSide/componentes/ListDesc'
import { LinkDesc } from './RightSide/componentes/LinkDesc'
import ImageDesc from './RightSide/componentes/ImageDesc'
import { createPortal } from 'react-dom'
import PopImageDesc from './RightSide/componentes/PopImageDesc'

export default function Checklist() {
	const [descripciones, setDescripciones] = useState([
		{
			check: 'A',
			html: () => {
				return (
					<>
						<TitleDesc>Titulo del Paso A</TitleDesc>
						<ParagraphDesc>
							1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
							porro, quisquam consectetur provident suscipit atque! Commodi.
						</ParagraphDesc>
						<ListDesc>
							<li>Dato 1</li>
							<li>Dato 2</li>
							<li>Dato 3</li>
						</ListDesc>
						<ParagraphDesc>
							2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
							porro, quisquam consectetur provident suscipit atque! Commodi.
						</ParagraphDesc>
						<LinkDesc
							url="https://reactrouter.com/en/main/components/link"
							buttonName="Link Page"
						/>
						<ImageDesc activatePopImage={activatePopImage} />
					</>
				)
			},
		},
		{
			check: 'B',
			html: () => {
				return (
					<>
						<h1>Descripción B</h1>
						<p>1. Punto Uno del cheklist</p>
						<p>2. Punto Uno del cheklist</p>
						<p>2. Punto Uno del cheklist</p>
					</>
				)
			},
		},
		{
			check: 'C',
			html: () => {
				return (
					<>
						<h1>Descripción C</h1>
						<p>1. Punto Uno del cheklist</p>
						<p>2. Punto Uno del cheklist</p>
						<p>2. Punto Uno del cheklist</p>
					</>
				)
			},
		},
	])

	const [showPopImage, setPopShowImage] = useState(false)

	const activatePopImage = () => {
		console.log('yes')
		setPopShowImage(true)
	}

	return (
		<section className="checklist-container">
			<div className="Checklist">
				<LeftSide />
				<RightSide descripciones={descripciones} />
			</div>

			{showPopImage &&
				createPortal(
					<PopImageDesc setPopShowImage={setPopShowImage} />,
					document.body
				)}
		</section>
	)
}
