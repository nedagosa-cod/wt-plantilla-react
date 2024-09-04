import React, { useContext, useEffect, useState } from 'react'
import LeftSide from './LeftSide/LeftSide'
import RightSide from './RightSide/RightSide'
import './styles.scss'
import './admin.scss'
import TitleDesc from './RightSide/componentes/TitleDesc'
import ParagraphDesc from './RightSide/componentes/ParagraphDesc'
import ListDesc from './RightSide/componentes/ListDesc'
import { LinkDesc } from './RightSide/componentes/LinkDesc'
import ImageDesc from './RightSide/componentes/ImageDesc'
import SubtitleDesc from './RightSide/componentes/SubtitleDesc'
import ImportantDesc from './RightSide/componentes/ImportantDesc'
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
import Estructure from './BigIcons/Estructure'
import Note from './RightSide/componentes/Note'
import Split from 'react-split'
import MenuEdit from './RightSide/MenuEdit'
import GlobalContext from '../../context/GlobalContext'
import { IconPlus } from '../../icons/IconPlus'
import IconParagraphOt from '../../icons/IconParagraphOt'
import IconTitleOt from '../../icons/IconTitleOt'
import IconListOt from '../../icons/IconListOt'
import IconImageOt from '../../icons/IconImageOt'
import IconScriptOt from '../../icons/IconScriptOt'
import IconChatOt from '../../icons/IconChatOt'
import IconHrOt from '../../icons/IconHrOt'
import IconOtherOt from '../../icons/IconOtherOt'
import IconBoxTextOt from '../../icons/IconBoxTextOt'
import IconVlistOt from '../../icons/IconVlistOt'
import IconVtextOt from '../../icons/IconVtextOt'
import IconVboolOt from '../../icons/IconVboolOt'
import IconDateOt from '../../icons/IconDateOt'
import IconChangeStepOt from '../../icons/IconChangeStepOt'

export default function Checklist({ dataCheckList }) {
	const { theme, resetCheckList, activeInside, setEditChElement } = useContext(CheckListContext)
	const { admin } = useContext(GlobalContext)

	const itemsElemets = [
		{
			name: 'Titulo',
			icon: <IconTitleOt />,
		},
		{
			name: 'Párrafo',
			icon: <IconParagraphOt />,
		},
		{
			name: 'Lista',
			icon: <IconListOt />,
		},
		{
			name: 'Imagen',
			icon: <IconImageOt />,
		},
		{
			name: 'Script/Guión',
			icon: <IconScriptOt />,
		},

		{
			name: 'Nota resaltada',
			icon: <IconChatOt />,
		},
		{
			name: 'Espacio',
			icon: <IconHrOt />,
		},
		{
			name: 'Botón URL',
			icon: <IconOtherOt />,
		},
		{
			name: 'Información resaltada',
			icon: <IconBoxTextOt />,
		},
		{
			name: 'Validación de texto',
			icon: <IconVtextOt />,
		},
		{
			name: 'Validación de fecha',
			icon: <IconDateOt />,
		},
		{
			name: 'Validación Si/No',
			icon: <IconVboolOt />,
		},
		{
			name: 'Validación de lista',
			icon: <IconVlistOt />,
		},
		{
			name: 'Boton salto de paso',
			icon: <IconChangeStepOt />,
		},
	]

	const [showPopImage, setPopShowImage] = useState(false)
	const [imagePop, setimagePop] = useState('#')
	const [widthImg, setWidthImg] = useState('50%')
	const [showPopNota, setShowPopNota] = useState(false)

	const [checkListSelected, setCheckListSelected] = useState(dataCheckList)

	const renderElement = (element, index, desc) => {
		const setTextProperties = text => {
			let boldRegex = /&bold(.*?)&bold/g
			let cursRegex = /&curs(.*?)&curs/g
			let tipRegex = /&tip\[(.*?)\](.*?)&tip/g
			let textBold = text.replace(boldRegex, (match, content) => {
				return '<strong>' + content + '</strong>'
			})
			let textCurs = textBold.replace(cursRegex, (match, content) => {
				return '<i>' + content + '</i>'
			})
			let textTip = textCurs.replace(tipRegex, (match, content1, content2) => {
				return (
					'<span className="check-tip" id="parentTool">' +
					content2 +
					'<div className="check-tip__tip" id="toolTip">' +
					content1 +
					'</div></span>'
				)
			})
			return textTip
		}
		const renderParagraph = (element, key) => (
			<ParagraphDesc key={key} check={desc.check} location={index} updateUserCheck={setCheckListSelected}>
				<span dangerouslySetInnerHTML={{ __html: setTextProperties(element.P) }} />
			</ParagraphDesc>
		)

		const renderLink = (element, key) => <LinkDesc url={element.LINK} buttonName={element.NAME} key={key} />

		const renderImage = (element, key) => (
			<ImageDesc activatePopImage={activatePopImage} key={key} img={element.IMG} width={element.SPACE} />
		)

		const renderSubtitle = (element, key) => (
			<SubtitleDesc key={key} check={desc.check} location={index} updateUserCheck={setCheckListSelected}>
				{element.SUBTITLE}
			</SubtitleDesc>
		)

		const renderList = (element, key) => {
			return (
				<ListDesc key={key} check={desc.check} location={index} updateUserCheck={setCheckListSelected}>
					{element.LIST.map((list, j) => (
						<li key={j} dangerouslySetInnerHTML={{ __html: setTextProperties(list) }} />
					))}
				</ListDesc>
			)
		}

		const renderImportant = (element, key) => (
			<ImportantDesc title={element.TITLE} key={key}>
				<span dangerouslySetInnerHTML={{ __html: setTextProperties(element.IMPORTANT) }} />
			</ImportantDesc>
		)

		const renderScript = (element, key) => {
			return (
				<>
					{Array.isArray(element.SCRIPTS) ? (
						<ScriptDesc key={key} check={desc.check} location={index} updateUserCheck={setCheckListSelected}>
							{element.SCRIPTS.map((script, j) => (
								<span key={j} dangerouslySetInnerHTML={{ __html: setTextProperties(script) }} />
							))}
						</ScriptDesc>
					) : (
						<ScriptDesc key={key} check={desc.check} location={index} updateUserCheck={setCheckListSelected}>
							{element.SCRIPTS}
						</ScriptDesc>
					)}
				</>
			)
		}

		const renderValText = (element, key) => (
			<ValTextDesc position={element.POS} key={key}>
				{element.DATA_TEXT}
			</ValTextDesc>
		)

		const renderValDate = (element, key) => (
			<ValDateDesc position={element.POS} key={key}>
				{element.DATA_DATE}
			</ValDateDesc>
		)

		const renderValBool = (element, key) => (
			<ValBoolDesc
				position={element.POS}
				title={element.DATA_BOOL}
				key={key}
				finish={element.FINISH}
				to={checkListSelected.DESCRIPCIONES.length}>
				<InsideAnswer answer="SI" position={element.POS}>
					{element.SI.map((subElement, j) => renderElement(subElement, j, desc))}
				</InsideAnswer>
				<InsideAnswer answer="NO" position={element.POS}>
					{element.NO.map((subElement, j) => renderElement(subElement, j, desc))}
				</InsideAnswer>
			</ValBoolDesc>
		)

		const renderValList = (element, key) => (
			<ValListDesc
				title={element.DATA_LIST}
				position={element.POS}
				list={element.OPTIONS.map(option => option.NAME)}
				key={key}>
				{element.OPTIONS.map((option, l) => (
					<InsideAnswer answer={option.NAME} position={element.POS} key={l}>
						{option.HTML.map((subElement, j) => renderElement(subElement, j, desc))}
					</InsideAnswer>
				))}
			</ValListDesc>
		)

		const renderChangeSteep = (element, key) => (
			<ChangeSteep key={key} to={element.TO}>
				{element.BTN_JUMP}
			</ChangeSteep>
		)

		const renderNote = (element, key) => (
			<Note
				key={key}
				type={element.TYPE ? element.TYPE : 'info'}
				title={element.TITLE ? element.TITLE : '[Sin Titulo]'}>
				<span dangerouslySetInnerHTML={{ __html: setTextProperties(element.NOTA) }} />
			</Note>
		)

		const renderMarco = (element, key) => (
			<div style={{ width: '26rem' }} key={key}>
				<Estructure />
			</div>
		)

		const renderBR = (element, key) => {
			const size = {
				1: '1rem',
				2: '2rem',
				3: '4rem',
				4: '6rem',
			}
			return <div style={{ height: size[element.BR], padding: size[element.HR] }} key={key} />
		}

		const creatingElement = () => {
			const key = `${desc.check}_${index}`
			switch (true) {
				case !!element.P:
					return renderParagraph(element, key)
				case !!element.LINK:
					return renderLink(element, key)
				case !!element.IMG:
					return renderImage(element, key)
				case !!element.SUBTITLE:
					return renderSubtitle(element, key)
				case !!element.LIST:
					return renderList(element, key)
				case !!element.IMPORTANT:
					return renderImportant(element, key)
				case !!element.SCRIPTS:
					return renderScript(element, key)
				case !!element.DATA_TEXT:
					return renderValText(element, key)
				case !!element.DATA_DATE:
					return renderValDate(element, key)
				case !!element.DATA_BOOL:
					return renderValBool(element, key)
				case !!element.DATA_LIST:
					return renderValList(element, key)
				case !!element.BTN_JUMP:
					return renderChangeSteep(element, key)
				case !!element.NOTA:
					return renderNote(element, key)
				case !!element.MARCO:
					return renderMarco(element, key)
				case !!element.BR:
					return renderBR(element, key)
				default:
					return null
			}
		}

		return !element.BR ? (
			<MenuEdit key={index} check={desc.check} location={index}>
				{creatingElement()}
			</MenuEdit>
		) : (
			creatingElement()
		)
	}

	const [descripciones, setDescripciones] = useState([])
	const activatePopImage = (nameImagen, width) => {
		if (nameImagen) {
			setimagePop(nameImagen)
		}
		if (widthImg) {
			setWidthImg(width)
		} else {
			setWidthImg('50%')
		}
		setPopShowImage(!showPopImage)
	}
	const activePopNota = () => {
		setShowPopNota(!showPopNota)
	}

	const createUserElement = (elName, check) => {
		const objetElecment = () => {
			switch (elName) {
				case 'Titulo':
					return { SUBTITLE: 'XXXXX' }
				case 'Párrafo':
					return { P: '- XXXXX' }
				case 'Lista':
					return { LIST: ['XXX', 'XXX', 'XXX'] }
				case 'Imagen':
					return { IMG: '#', SPACE: '50%' }
				case 'Script/Guión':
					return { SCRIPT: 'XXXXX', SCRIPTS: [] }
				case 'Nota resaltada':
					return { IMPORTANT: 'XXXXX', TITLE: 'XXXXX' }
				case 'Espacio':
					return { BR: '1' }
				case 'Botón URL':
					return { LINK: '#', NAME: 'XXXXX' }
				case 'Información resaltada':
					return {
						NOTA: 'XXXXX',
						TITLE: 'XXXXX',
						TYPE: 'info',
					}
				case 'Validación de texto':
					return { DATA_TEXT: 'XXXXX', POS: 'Z' }
				case 'Validación de fecha':
					return { DATA_DATE: 'XXXXX', POS: 'X' }
				case 'Validación Si/No':
					return {
						DATA_BOOL: 'XXXXX',
						POS: 'Y',
						FINISH: '',
						SI: [],
						NO: [],
					}
				case 'Validación de lista':
					return {
						DATA_LIST: 'XXXXX',
						POS: 'W',
						OPTIONS: [
							{
								NAME: 'XXXXX',
								HTML: [
									{
										P: 'XXXXX',
									},
								],
							},
						],
					}
				case 'Boton salto de paso':
					return {
						BTN_JUMP: 'XXXXX',
						TO: 'A',
					}
			}
		}

		setCheckListSelected(prevState => ({
			...prevState,
			DESCRIPCIONES: prevState.DESCRIPCIONES.map(description => {
				if (description.check === check) {
					return {
						...description,
						html: [...description.html, objetElecment(elName)],
					}
				} else {
					return description
				}
			}),
		}))
	}

	const fixDescriptions = () => {
		let result = checkListSelected.DESCRIPCIONES.map((element, i) => {
			let data = {
				check: element.check,
				html: () => {
					return (
						<>
							{element.html.map((list, l) => {
								if (list.TITULO) {
									return <TitleDesc key={element.check + '_' + l}>{list.TITULO}</TitleDesc>
								}
								return null
							})}
							<article className="description__container">
								{element.html.map((list, j) => {
									return renderElement(list, j, element)
								})}
								{admin && (
									<>
										<div className="box-buttons-elemets">
											{itemsElemets.map((item, i) => {
												return (
													<button
														key={i}
														type="button"
														className="box-buttons-elemets__button"
														onClick={e => createUserElement(item.name, element.check)}>
														<div>{item.icon}</div> {item.name}
													</button>
												)
											})}
										</div>
										<div
											key={'admin_add_check' + i}
											className={'admin ' + 'on' + ' add-check'}
											onClick={() => console.log('hola')}>
											<IconPlus />
										</div>
									</>
								)}
							</article>
						</>
					)
				},
			}
			return data
		})
		setDescripciones(result)
	}

	let pressed = false
	document.addEventListener('keyup', e => {
		if (!pressed && e.key == 'Escape') {
			pressed = true
			setPopShowImage(false)
		}
	})
	const saveFormat = () => {
		const JSONtext = JSON.stringify(checkListSelected)
		const blob = new Blob([JSONtext], { type: 'text/plain' })
		const enlace = document.createElement('a')
		enlace.href = URL.createObjectURL(blob)
		enlace.download = 'formatoChecklist-' + checkListSelected.TITLE + '.txt'

		// Simular un clic en el enlace
		enlace.click()

		// Liberar el objeto URL
		URL.revokeObjectURL(enlace.href)
	}
	useEffect(() => {
		if (activeInside) {
			setCheckListSelected(dataCheckList)
		}
	}, [dataCheckList])

	useEffect(() => {
		resetCheckList()
		fixDescriptions()
	}, [checkListSelected])

	return (
		<form className={'Checklist ' + theme}>
			<section className="data">
				<Split className="split" minSize={400} dragInterval={10}>
					<LeftSide
						title={checkListSelected.TITLE}
						data={checkListSelected.DESCRIPCIONES}
						updateCheck={setCheckListSelected}
					/>
					<RightSide descripciones={descripciones} updateCheck={setCheckListSelected} />
				</Split>
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
				<button onClick={() => saveFormat()} type="button">
					GENERAR FORMATO
				</button>
				<button
					onClick={() => {
						saveFormat(true)
					}}
					type="button">
					TEST
				</button>
			</div>
			{showPopImage &&
				createPortal(
					<PopImageDesc setPopShowImage={setPopShowImage} imagePop={imagePop} widthImg={widthImg} />,
					document.body
				)}
			{showPopNota && createPortal(<PopNota activePopNota={activePopNota} />, document.body)}
		</form>
	)
}
