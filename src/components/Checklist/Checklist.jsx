import { useContext, useRef, useState } from 'react'
import LeftSide from './LeftSide/LeftSide'
import RightSide from './RightSide/RightSide'
import './styles.scss'
import TitleDesc from './RightSide/componentes/TitleDesc'
import ParagraphDesc from './RightSide/componentes/ParagraphDesc'
import ListDesc from './RightSide/componentes/ListDesc'
import { LinkDesc } from './RightSide/componentes/LinkDesc'
import ImageDesc from './RightSide/componentes/ImageDesc'
import SubtitleDesc from './RightSide/componentes/SubtitleDesc'
import ImportantDesc from './RightSide/componentes/importantDesc'
import ScriptDesc from './RightSide/componentes/ScriptDesc'
import ValBoolDesc from './RightSide/componentes/ValBoolDesc'
import ValTextDesc from './RightSide/componentes/ValTextDesc'
import ValDateDesc from './RightSide/componentes/ValDateDesc'
import ValListDesc from './RightSide/componentes/ValListDesc'
import InsideAnswer from './RightSide/componentes/InsideAnswer'
import CheckListContext from '../../context/ChecklistContext'
import PopImageDesc from './RightSide/componentes/PopImageDesc'
import { createPortal } from 'react-dom'
import PopNota from './PopNota'

export default function Checklist() {
	const { theme, resetCheckList, resetList } = useContext(CheckListContext)
	const [showPopImage, setPopShowImage] = useState(false)
	const [showPopNota, setShowPopNota] = useState(false)
	const formElement = useRef()
	const [descripciones, setDescripciones] = useState([
		{
			check: 'A',
			html: () => {
				return (
					<>
						<TitleDesc>Protocolo Bienvenida</TitleDesc>
						<article className="description__container" ref={formElement}>
							<ParagraphDesc>
								1. Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Ipsam porro, quisquam consectetur provident suscipit atque!
								Commodi.
							</ParagraphDesc>
							<ListDesc>
								<li>Dato 1</li>
								<li>Dato 2</li>
								<li>Dato 3</li>
							</ListDesc>
							<ParagraphDesc>
								2. Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Ipsam porro, quisquam consectetur provident suscipit atque!
								Commodi.
							</ParagraphDesc>
							<LinkDesc
								url="https://reactrouter.com/en/main/components/link"
								buttonName="Link Page"
							/>
							<ImageDesc activatePopImage={activatePopImage} />
							<SubtitleDesc>Subtitlo del proceso del checklist</SubtitleDesc>
							<ParagraphDesc>
								3. Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Ipsam porro, quisquam consectetur provident suscipit atque!
								Commodi.
							</ParagraphDesc>
							<ParagraphDesc>
								3. Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Ipsam porro, quisquam consectetur provident suscipit atque!
								Commodi.
							</ParagraphDesc>
							<ParagraphDesc>
								3. Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Ipsam porro, quisquam consectetur provident suscipit atque!
								Commodi.
							</ParagraphDesc>
							<ImportantDesc title="IMPORTANTE">
								Mensaje importante del dia a tener en cuenta en esta lista de
								checkeo
							</ImportantDesc>
							<ParagraphDesc>
								3. Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Ipsam porro, quisquam consectetur provident suscipit atque!
								Commodi.
							</ParagraphDesc>
							<ScriptDesc>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero
								tempora quod deleniti placeat, aperiam ad ab reprehenderit
								dolores modi ex distinctio odit dolorum porro explicabo
								cupiditate! Repudiandae doloremque dicta quos!
							</ScriptDesc>

							<ValBoolDesc
								position="A"
								title="Lorem ipsum dolor sit amet, consectetur adipisicing elit.">
								<InsideAnswer answer="SI" position="A">
									<ParagraphDesc>
										1. Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Ipsam porro, quisquam consectetur provident suscipit atque!
										Commodi.
									</ParagraphDesc>
									<ListDesc>
										<li>Dato 1</li>
										<li>Dato 2</li>
										<li>Dato 3</li>
									</ListDesc>
									<ParagraphDesc>
										2. Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Ipsam porro, quisquam consectetur provident suscipit atque!
										Commodi.
									</ParagraphDesc>
									<LinkDesc
										url="https://reactrouter.com/en/main/components/link"
										buttonName="Link Page"
									/>
									<ImageDesc activatePopImage={activatePopImage} />
									<ValBoolDesc
										position="X"
										title="Lorem ipsum dolor sit amet, consectetur adipisicing elit.">
										<InsideAnswer answer="SI" position="X">
											<ParagraphDesc>RESPUESTA DE SI</ParagraphDesc>
										</InsideAnswer>
										<InsideAnswer answer="NO" position="X">
											<ParagraphDesc>RESPUESTA DE NO</ParagraphDesc>
										</InsideAnswer>
									</ValBoolDesc>
								</InsideAnswer>
								<InsideAnswer answer="NO" position="A">
									<ParagraphDesc>RESPUESTA DE NO</ParagraphDesc>
								</InsideAnswer>
							</ValBoolDesc>

							<ValBoolDesc
								position="Z"
								title="Lorem ipsum dolor sit amet, consectetur adipisicing elit.">
								<InsideAnswer answer="SI" position="Z">
									<ParagraphDesc>RESPUESTA DE SI</ParagraphDesc>
								</InsideAnswer>
								<InsideAnswer answer="NO" position="Z">
									<ParagraphDesc>RESPUESTA DE NO</ParagraphDesc>
								</InsideAnswer>
							</ValBoolDesc>
							<ValBoolDesc
								position="G"
								title="Lorem ipsum dolor sit amet, consectetur adipisicing elit.">
								<InsideAnswer answer="SI" position="G">
									<ParagraphDesc>RESPUESTA DE SI</ParagraphDesc>
								</InsideAnswer>
								<InsideAnswer answer="NO" position="G">
									<ParagraphDesc>RESPUESTA DE NO</ParagraphDesc>
								</InsideAnswer>
							</ValBoolDesc>
							<ValTextDesc position="B">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
								porro, quisquam consectetur provident suscipit atque! Commodi.
							</ValTextDesc>
							<ValDateDesc position="C">Fecha ge gestión</ValDateDesc>
							<ValListDesc
								title="Titulo de la lista"
								position="D"
								list={['Dato 1', 'Dato 2', 'Dato 3', 'Dato 4']}>
								<InsideAnswer answer="Dato 1" position="D">
									<ParagraphDesc>RESPUESTA DE DATO 1</ParagraphDesc>
								</InsideAnswer>
								<InsideAnswer answer="Dato 2" position="D">
									<ParagraphDesc>RESPUESTA DE DATO 2</ParagraphDesc>
								</InsideAnswer>
							</ValListDesc>
							<ParagraphDesc>
								3. Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Ipsam porro, quisquam consectetur provident suscipit atque!
								Commodi.
							</ParagraphDesc>
							<ParagraphDesc>
								3. Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Ipsam porro, quisquam consectetur provident suscipit atque!
								Commodi.
							</ParagraphDesc>
						</article>
					</>
				)
			},
		},
		{
			check: 'B',
			html: () => {
				return (
					<>
						<TitleDesc>Verifica</TitleDesc>
						<article className="description__container">
							<ParagraphDesc>
								1. Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Ipsam porro, quisquam consectetur provident suscipit atque!
								Commodi.
							</ParagraphDesc>
							<ParagraphDesc>
								2. Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Ipsam porro, quisquam consectetur provident suscipit atque!
								Commodi.
							</ParagraphDesc>
							<LinkDesc
								url="https://reactrouter.com/en/main/components/link"
								buttonName="Link Page"
							/>
							<ImageDesc activatePopImage={activatePopImage} />
							<SubtitleDesc>Subtitlo del proceso del checklist</SubtitleDesc>
						</article>
					</>
				)
			},
		},
		{
			check: 'C',
			html: () => {
				return (
					<>
						<TitleDesc>Gestiona</TitleDesc>
						<article className="description__container">
							<ParagraphDesc>
								1. Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Ipsam porro, quisquam consectetur provident suscipit atque!
								Commodi.
							</ParagraphDesc>
							<ParagraphDesc>
								2. Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Ipsam porro, quisquam consectetur provident suscipit atque!
								Commodi.
							</ParagraphDesc>
							<LinkDesc
								url="https://reactrouter.com/en/main/components/link"
								buttonName="Link Page"
							/>
							<ImageDesc activatePopImage={activatePopImage} />
							<SubtitleDesc>Subtitlo del proceso del checklist</SubtitleDesc>
						</article>
					</>
				)
			},
		},
		{
			check: 'D',
			html: () => {
				return (
					<>
						<TitleDesc>Tipifica</TitleDesc>
						<article className="description__container">
							<ParagraphDesc>
								1. Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Ipsam porro, quisquam consectetur provident suscipit atque!
								Commodi.
							</ParagraphDesc>
							<ParagraphDesc>
								2. Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Ipsam porro, quisquam consectetur provident suscipit atque!
								Commodi.
							</ParagraphDesc>
							<LinkDesc
								url="https://reactrouter.com/en/main/components/link"
								buttonName="Link Page"
							/>
							<ImageDesc activatePopImage={activatePopImage} />
							<SubtitleDesc>Subtitlo del proceso del checklist</SubtitleDesc>
						</article>
					</>
				)
			},
		},
		{
			check: 'E',
			html: () => {
				return (
					<>
						<TitleDesc>Despedida de la gestión</TitleDesc>
						<article className="description__container">
							<ParagraphDesc>
								1. Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Ipsam porro, quisquam consectetur provident suscipit atque!
								Commodi.
							</ParagraphDesc>
							<ParagraphDesc>
								2. Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Ipsam porro, quisquam consectetur provident suscipit atque!
								Commodi.
							</ParagraphDesc>
							<LinkDesc
								url="https://reactrouter.com/en/main/components/link"
								buttonName="Link Page"
							/>
							<ImageDesc activatePopImage={activatePopImage} />
							<SubtitleDesc>Subtitlo del proceso del checklist</SubtitleDesc>
						</article>
					</>
				)
			},
		},
	])

	const activatePopImage = () => {
		setPopShowImage(true)
	}
	const activePopNota = () => {
		setShowPopNota(!showPopNota)
	}

	return (
		<form className={'Checklist ' + theme}>
			<section className="data">
				<LeftSide resetList={resetList} />
				<RightSide descripciones={descripciones} key={resetList} />
			</section>
			<div className="Checklist__buttons">
				<button
					type="reset"
					onClick={() => {
						resetCheckList()
					}}>
					Reiniciar
				</button>
				<button
					type="button"
					onClick={() => {
						setShowPopNota(true)
					}}>
					Obtener datos
				</button>
			</div>
			{showPopImage &&
				createPortal(
					<PopImageDesc setPopShowImage={setPopShowImage} />,
					document.body
				)}
			{showPopNota &&
				createPortal(<PopNota activePopNota={activePopNota} />, document.body)}
		</form>
	)
}
