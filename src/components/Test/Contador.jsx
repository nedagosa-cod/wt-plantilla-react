import { useContext } from 'react'
import { VerDato } from './VerDato'
import ContadorContext from '../../context/ContadorContext'

const Contador = () => {
	const { contador } = useContext(ContadorContext)

	const test = () => {
		const renderElement = (element, index, desc) => {
			const setTextProperties = text => {
				const replacements = [
					{ regex: /&bold(.*?)&bold/g, replacer: content => `<strong>${content}</strong>` },
					{ regex: /&curs(.*?)&curs/g, replacer: content => `<i>${content}</i>` },
					{
						regex: /&tip\[(.*?)\](.*?)&tip/g,
						replacer: (content1, content2) =>
							`<span class="check-tip" id="parentTool">${content2}<div class="check-tip__tip" id="toolTip">${content1}</div></span>`,
					},
				]

				return replacements.reduce((acc, { regex, replacer }) => acc.replace(regex, replacer), text)
			}

			const renderParagraph = (element, key) => (
				<ParagraphDesc key={key} edit={editChElement}>
					<span dangerouslySetInnerHTML={{ __html: setTextProperties(element.P) }} />
				</ParagraphDesc>
			)

			const renderLink = (element, key) => (
				<LinkDesc url={element.LINK} buttonName={element.NAME} key={key} />
			)

			const renderImage = (element, key) => (
				<ImageDesc
					activatePopImage={activatePopImage}
					key={key}
					img={element.IMG}
					width={element.SPACE}
				/>
			)

			const renderSubtitle = (element, key) => (
				<SubtitleDesc key={key}>{element.SUBTITLE}</SubtitleDesc>
			)

			const renderList = (element, key) => (
				<ListDesc key={key} type={element.TYPE}>
					{element.LIST.map((list, j) => (
						<li key={j} dangerouslySetInnerHTML={{ __html: setTextProperties(list) }} />
					))}
				</ListDesc>
			)

			const renderImportant = (element, key) => (
				<ImportantDesc title={element.TITLE} key={key}>
					<span dangerouslySetInnerHTML={{ __html: setTextProperties(element.IMPORTANT) }} />
				</ImportantDesc>
			)

			const renderScript = (element, key) => (
				<ScriptDesc key={key} scripts={element.SCRIPTS} setTextProperties={setTextProperties}>
					{element.SCRIPT}
				</ScriptDesc>
			)

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
				if (!element) return null

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
					case !!element.SCRIPT:
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
				<MenuEdit key={index} edit={editChElement}>
					{creatingElement()}
				</MenuEdit>
			) : (
				creatingElement()
			)
		}
	}

	return (
		<>
			<p>{contador}</p>
			<VerDato />
		</>
	)
}

export default Contador
