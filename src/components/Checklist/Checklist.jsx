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
	const { theme, resetCheckList, resetList, activeInside } = useContext(CheckListContext)
	const [showPopImage, setPopShowImage] = useState(false)
	const [showPopNota, setShowPopNota] = useState(false)
	// const [position, setPosition] = useState(0)
	const aleatory = () => {
		return Math.random() * 999
	}
	const renderElement = (element, index) => {
		if (!element) {
			return null
		}
		if (element.P) {
			return <ParagraphDesc key={aleatory()}>{element.P}</ParagraphDesc>
		} else if (element.LINK) {
			return <LinkDesc url={element.LINK} buttonName={element.NAME} key={aleatory()} />
		} else if (element.IMG) {
			return <ImageDesc activatePopImage={activatePopImage} key={aleatory()} />
		} else if (element.SUBTITLE) {
			return <SubtitleDesc key={aleatory()}>{element.SUBTITLE}</SubtitleDesc>
		} else if (element.LIST) {
			return (
				<ListDesc key={aleatory()}>
					{element.LIST.map((list, j) => {
						return <li key={j}>{list}</li>
					})}
				</ListDesc>
			)
		} else if (element.IMPORTANT) {
			return (
				<ImportantDesc title={element.TITLE} key={aleatory()}>
					{element.IMPORTANT}
				</ImportantDesc>
			)
		} else if (element.SCRIPT) {
			return <ScriptDesc key={aleatory()}>{element.SCRIPT}</ScriptDesc>
		} else if (element.DATA_TEXT) {
			return (
				<ValTextDesc position={numToWord(index)} key={aleatory()}>
					{element.DATA_TEXT}
				</ValTextDesc>
			)
		} else if (element.DATA_DATE) {
			return (
				<ValDateDesc position={numToWord(index)} key={aleatory()}>
					{element.DATA_DATE}
				</ValDateDesc>
			)
		} else if (element.DATA_BOOL) {
			return (
				<ValBoolDesc position={numToWord(index)} title={element.DATA_BOOL} key={aleatory()}>
					<InsideAnswer answer="SI" position={numToWord(index)}>
						{element.SI.map((subElement, j) => {
							return <React.Fragment key={j}>{renderElement(subElement, index)}</React.Fragment>
						})}
					</InsideAnswer>
					<InsideAnswer answer="NO" position={numToWord(index)}>
						{element.NO.map((subElement, j) => {
							return <React.Fragment key={j}>{renderElement(subElement, index)}</React.Fragment>
						})}
					</InsideAnswer>
				</ValBoolDesc>
			)
		} else if (element.DATA_LIST) {
			return (
				<ValListDesc
					title={element.DATA_LIST}
					position={numToWord(index)}
					list={element.OPTIONS}
					key={aleatory()}>
					{element.OPTIONS.map((pos, l) => {
						return (
							<InsideAnswer answer={'Dato ' + (l + 1)} position={'x'} key={l}>
								{element[pos].map((subElement, j) => {
									return <React.Fragment key={j}>{renderElement(subElement, index)}</React.Fragment>
								})}
							</InsideAnswer>
						)
					})}
				</ValListDesc>
			)
		}
	}
	// necesito que el index solo incremente cuando entre a DATAS

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
									let contador = 0
									return list.html.map((element, i) => {
										const { DATA_BOOL, DATA_DATE, DATA_LIST, DATA_TEXT } = element
										if (DATA_BOOL || DATA_DATE || DATA_LIST || DATA_TEXT) {
											contador = contador + 1
											return renderElement(element, contador)
										} else {
											return renderElement(element, contador)
										}
									})
								}
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
