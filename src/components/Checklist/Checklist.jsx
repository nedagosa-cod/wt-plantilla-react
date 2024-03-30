import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
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
import plantilla from './BASES/plantilla.json'

export default function Checklist() {
	const { theme, resetCheckList, resetList, activeInside, post } = useContext(CheckListContext)
	const [showPopImage, setPopShowImage] = useState(false)
	const [showPopNota, setShowPopNota] = useState(false)

	let position = []
	const renderElement = (element, index) => {
		if (!element) {
			return null
		}
		if (element.P) {
			return <ParagraphDesc key={'def_' + index}>{element.P}</ParagraphDesc>
		} else if (element.LINK) {
			return <LinkDesc url={element.LINK} buttonName={element.NAME} key={'def_' + index} />
		} else if (element.IMG) {
			return <ImageDesc activatePopImage={activatePopImage} key={'def_' + index} />
		} else if (element.SUBTITLE) {
			return <SubtitleDesc key={'def_' + index}>{element.SUBTITLE}</SubtitleDesc>
		} else if (element.LIST) {
			return (
				<ListDesc key={'def_' + index}>
					{element.LIST.map((list, j) => {
						return <li key={j}>{list}</li>
					})}
				</ListDesc>
			)
		} else if (element.IMPORTANT) {
			return (
				<ImportantDesc title={element.TITLE} key={'def_' + index}>
					{element.IMPORTANT}
				</ImportantDesc>
			)
		} else if (element.SCRIPT) {
			return <ScriptDesc key={'def_' + index}>{element.SCRIPT}</ScriptDesc>
		} else if (element.DATA_TEXT) {
			position.push('dato')
			return (
				<ValTextDesc position={element.POS} key={'data_' + index}>
					{element.DATA_TEXT}
				</ValTextDesc>
			)
		} else if (element.DATA_DATE) {
			position.push('dato')
			return (
				<ValDateDesc position={element.POS} key={'data_' + index}>
					{element.DATA_DATE}
				</ValDateDesc>
			)
		} else if (element.DATA_BOOL) {
			position.push('dato')
			return (
				<ValBoolDesc position={element.POS} title={element.DATA_BOOL} key={'data_' + index}>
					<InsideAnswer answer="SI" position={element.POS}>
						{element.SI.map((subElement, j) => {
							return renderElement(subElement, j)
						})}
					</InsideAnswer>
					<InsideAnswer answer="NO" position={element.POS}>
						{element.NO.map((subElement, j) => {
							return renderElement(subElement, j)
						})}
					</InsideAnswer>
				</ValBoolDesc>
			)
		} else if (element.DATA_LIST) {
			position.push('dato')
			return (
				<ValListDesc
					title={element.DATA_LIST}
					position={element.POS}
					list={element.OPTIONS.map(option => option.NAME)}
					key={'data_' + index}>
					{element.OPTIONS.map((option, l) => {
						return (
							<InsideAnswer answer={option.NAME} position={element.POS} key={l}>
								{option.HTML.map((subElement, j) => {
									return renderElement(subElement, j)
								})}
							</InsideAnswer>
						)
					})}
				</ValListDesc>
			)
		}
	}

	const [descripciones, setDescripciones] = useState([
		{
			check: 'A',
			html: () => {
				return (
					<>
						{plantilla.plantilla.map(list => {
							if (list.check == 'A') {
								return list.html.map((element, i) => {
									if (element.TITULO) {
										return <TitleDesc key={i}>{element.TITULO}</TitleDesc>
									}
								})
							}
						})}
						<article className="description__container">
							{plantilla.plantilla.map(list => {
								if (list.check == 'A') {
									return list.html.map((element, i) => {
										return renderElement(element, i)
									})
								}
								position = []
							})}
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
								1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam porro, quisquam
								consectetur provident suscipit atque! Commodi.
							</ParagraphDesc>
							<ParagraphDesc>
								2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam porro, quisquam
								consectetur provident suscipit atque! Commodi.
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
								1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam porro, quisquam
								consectetur provident suscipit atque! Commodi.
							</ParagraphDesc>
							<ParagraphDesc>
								2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam porro, quisquam
								consectetur provident suscipit atque! Commodi.
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
								1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam porro, quisquam
								consectetur provident suscipit atque! Commodi.
							</ParagraphDesc>
							<ParagraphDesc>
								2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam porro, quisquam
								consectetur provident suscipit atque! Commodi.
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
								1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam porro, quisquam
								consectetur provident suscipit atque! Commodi.
							</ParagraphDesc>
							<ListDesc>
								<li>Dato 1</li>
								<li>Dato 2</li>
								<li>Dato 3</li>
							</ListDesc>
							<ParagraphDesc>
								2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam porro, quisquam
								consectetur provident suscipit atque! Commodi.
							</ParagraphDesc>
							<LinkDesc
								url="https://reactrouter.com/en/main/components/link"
								buttonName="Link Page"
							/>
							<ImageDesc activatePopImage={activatePopImage} />
							<SubtitleDesc>Subtitlo del proceso del checklist</SubtitleDesc>
							<ParagraphDesc>
								3. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam porro, quisquam
								consectetur provident suscipit atque! Commodi.
							</ParagraphDesc>
							<ParagraphDesc>
								3. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam porro, quisquam
								consectetur provident suscipit atque! Commodi.
							</ParagraphDesc>
							<ParagraphDesc>
								3. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam porro, quisquam
								consectetur provident suscipit atque! Commodi.
							</ParagraphDesc>
							<ImportantDesc title="IMPORTANTE">
								Mensaje importante del dia a tener en cuenta en esta lista de checkeo
							</ImportantDesc>
							<ParagraphDesc>
								3. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam porro, quisquam
								consectetur provident suscipit atque! Commodi.
							</ParagraphDesc>
							<ScriptDesc>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero tempora quod deleniti
								placeat, aperiam ad ab reprehenderit dolores modi ex distinctio odit dolorum porro
								explicabo cupiditate! Repudiandae doloremque dicta quos!
							</ScriptDesc>

							<ValBoolDesc
								position="A"
								title="Lorem ipsum dolor sit amet, consectetur adipisicing elit.">
								<InsideAnswer answer="SI" position="A">
									<ParagraphDesc>
										1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam porro,
										quisquam consectetur provident suscipit atque! Commodi.
									</ParagraphDesc>
									<ListDesc>
										<li>Dato 1</li>
										<li>Dato 2</li>
										<li>Dato 3</li>
									</ListDesc>
									<ParagraphDesc>
										2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam porro,
										quisquam consectetur provident suscipit atque! Commodi.
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
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam porro, quisquam
								consectetur provident suscipit atque! Commodi.
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
								3. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam porro, quisquam
								consectetur provident suscipit atque! Commodi.
							</ParagraphDesc>
							<ParagraphDesc>
								3. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam porro, quisquam
								consectetur provident suscipit atque! Commodi.
							</ParagraphDesc>
						</article>
					</>
				)
			},
		},
	])

	const numToWord = position => {
		return String.fromCharCode(64 + position)
	}
	const activatePopImage = () => {
		setPopShowImage(true)
	}
	const activePopNota = () => {
		setShowPopNota(!showPopNota)
	}

	useEffect(() => {
		position = []
	}, [post])

	return (
		<form
			className={'Checklist ' + theme}
			onChange={e => {
				e.preventDefault()
			}}>
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
						// setShowPopNota(true)
						console.log(activeInside)
					}}>
					Obtener datos
				</button>
			</div>
			{showPopImage &&
				createPortal(<PopImageDesc setPopShowImage={setPopShowImage} />, document.body)}
			{showPopNota && createPortal(<PopNota activePopNota={activePopNota} />, document.body)}
		</form>
	)
}
