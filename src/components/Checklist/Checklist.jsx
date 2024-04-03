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
			let boldRegex = /&bold(.*?)&bold/
			let tipRegex = /&tip\[(.*?)\](.*?)&tip/

			let textFormated = element.P.replace(boldRegex, '<strong>$1</strong>').replace(
				tipRegex,
				'<span class="check-tip">$2<div class="check-tip__tip" id="tooltip">$1</div></span>'
			)

			return (
				<ParagraphDesc key={'def_' + index}>
					<span dangerouslySetInnerHTML={{ __html: textFormated }} />
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
					<div className="svg-wrapper-1">
						<div className="svg-wrapper">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="icon">
								<path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H352c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V80c0-17.7-14.3-32-32-32s-32 14.3-32 32v35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V432c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H160c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z" />
							</svg>
						</div>
					</div>
					<span>Reiniciar</span>
				</button>
				<button
					type="button"
					onClick={() => {
						if (activeInside.length > 0) {
							setShowPopNota(true)
						}
						console.log(activeInside)
					}}>
					<div className="svg-wrapper-1">
						<div className="svg-wrapper">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="icon">
								<path d="M64 464c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm56 256c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120z" />
							</svg>
						</div>
					</div>
					<span>Obtener datos</span>
				</button>
			</div>
			{showPopImage &&
				createPortal(<PopImageDesc setPopShowImage={setPopShowImage} />, document.body)}
			{showPopNota && createPortal(<PopNota activePopNota={activePopNota} />, document.body)}
		</form>
	)
}
