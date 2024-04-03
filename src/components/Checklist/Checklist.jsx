import React, { useContext, useEffect, useState } from 'react'
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
import ChangeSteep from './RightSide/componentes/ChangeSteep'

export default function Checklist({ dataCheckList }) {
	const { theme, resetCheckList, activeInside } = useContext(CheckListContext)
	const [showPopImage, setPopShowImage] = useState(false)
	const [showPopNota, setShowPopNota] = useState(false)

	const renderElement = (element, index) => {
		if (!element) {
			return null
		} else if (element.P) {
			let textoFormateado = element.P.replace(/&bold(.*?)(&bold|$)/g, '<strong>$1</strong>')
			return (
				<ParagraphDesc key={'def_' + index}>
					<span dangerouslySetInnerHTML={{ __html: textoFormateado }} />
				</ParagraphDesc>
			)
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
			return (
				<ValTextDesc position={element.POS} key={'data_' + index}>
					{element.DATA_TEXT}
				</ValTextDesc>
			)
		} else if (element.DATA_DATE) {
			return (
				<ValDateDesc position={element.POS} key={'data_' + index}>
					{element.DATA_DATE}
				</ValDateDesc>
			)
		} else if (element.DATA_BOOL) {
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
		} else if (element.BTN_JUMP) {
			return (
				<ChangeSteep key={'change_' + index} to={element.TO}>
					{element.BTN_JUMP}
				</ChangeSteep>
			)
		}
	}

	const [descripciones, setDescripciones] = useState([])
	const activatePopImage = () => {
		setPopShowImage(true)
	}
	const activePopNota = () => {
		setShowPopNota(!showPopNota)
	}

	const fixDescriptions = () => {
		let result = dataCheckList.DESCRIPCIONES.map((element, i) => {
			let data = {
				check: element.check,
				html: () => {
					return (
						<>
							{element.html.map((list, l) => {
								if (list.TITULO) {
									return <TitleDesc key={l}>{list.TITULO}</TitleDesc>
								}
							})}
							<article className="description__container">
								{element.html.map((list, j) => {
									return renderElement(list, j)
								})}
							</article>
						</>
					)
				},
			}
			return data
		})
		setDescripciones(result)
	}

	useEffect(() => {
		resetCheckList()
		fixDescriptions()
	}, [dataCheckList])
	return (
		<form className={'Checklist ' + theme}>
			<section className="data">
				<LeftSide title={dataCheckList.TITLE} data={dataCheckList.DESCRIPCIONES} />
				<RightSide descripciones={descripciones} key="keyRightSide" />
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
						if (activeInside.length > 0) {
							setShowPopNota(true)
						}
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
