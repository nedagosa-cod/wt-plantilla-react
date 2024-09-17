import { useEffect, useRef, useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import Swal from 'sweetalert2'

export default function MenuBar({ editor }) {
	const alignTranslate = {
		center: 'Centrar',
		left: 'Izquierda',
		right: 'Derecha',
		justify: 'Justificado',
	}
	const [listening, setListening] = useState(false) // Estado para saber si el micrófono está en uso

	const [isHeadingDropdownOpen, setHeadingDropdownOpen] = useState(false)
	const [isListDropdownOpen, setListDropdownOpen] = useState(false)
	const [isJustifyDropdownOpen, setIsJustifyDropdownOpen] = useState(false)
	const [isFontSizeDropdownOpen, setFontSizeDropdownOpen] = useState(false)
	const [isFontFamilyDropdownOpen, setFontFamilyDropdownOpen] = useState(false)
	const [nameFontFamily, setNameFontFamily] = useState('font-Ubuntu')
	const [nameFontSize, setNameFontSize] = useState('14px')
	const [nameTextAlign, setNameTextAlign] = useState('Izquierda')
	const [nameHeading, setNameHeading] = useState('H')
	const [selectedColor, setSelectedColor] = useState('#000000')
	const [selectedHighlightColor, setSelectedHighlightColor] = useState('#FFFFFF')

	const FontFamilyRef = useRef(null)
	const headingDropdownRef = useRef(null)
	const listDropdownRef = useRef(null)
	const fontSizeDropdownRef = useRef(null)
	const highlightInputRef = useRef(null)
	const colorInputRef = useRef(null)
	const justifyDropdownRef = useRef(null)

	const toggleDropdown = setter => e => {
		e.preventDefault()
		console.log('toggleDropdown')
		setter(prev => !prev)
	}

	const closeAllDropdowns = () => {
		console.log('closeAllDropdowns')
		setHeadingDropdownOpen(false)
		setListDropdownOpen(false)
		setFontSizeDropdownOpen(false)
		setIsJustifyDropdownOpen(false)
		setFontFamilyDropdownOpen(false)
	}

	const handleClickOutside = e => {
		if (
			headingDropdownRef.current &&
			!headingDropdownRef.current.contains(e.target) &&
			listDropdownRef.current &&
			!listDropdownRef.current.contains(e.target) &&
			fontSizeDropdownRef.current &&
			!fontSizeDropdownRef.current.contains(e.target) &&
			highlightInputRef.current &&
			!highlightInputRef.current.contains(e.target) &&
			colorInputRef.current &&
			!colorInputRef.current.contains(e.target) &&
			justifyDropdownRef.current &&
			!justifyDropdownRef.current.contains(e.target) &&
			FontFamilyRef.current &&
			!FontFamilyRef.current.contains(e.target)
		) {
			console.log('handleClickOutside')
			closeAllDropdowns()
		}
	}

	// Comando para cambiar el tamaño de la fuente
	const setFontSize = size => {
		editor.chain().focus().setFontSize(`${size}px`).run()
		setNameFontSize(`${size}px`)
	}
	const setFontFamily = family => {
		editor.chain().focus().setFontFamily(family).run()
		setNameFontFamily(family)
	}
	const handleOpenColorPicker = () => {
		colorInputRef.current.click()
	}
	const handleColorChange = event => {
		const color = event.target.value
		setSelectedColor(color)
		editor.chain().focus().setColor(color).run() // Aplica el color seleccionado
	}
	// Función que abre el selector de color cuando se hace clic en el div
	const handleOpenHighlightPicker = () => {
		highlightInputRef.current.click()
	}

	// Función que aplica el color de resaltado
	const handleHighlightChange = event => {
		const color = event.target.value
		setSelectedHighlightColor(color)
		editor.chain().focus().setHighlight({ color }).run() // Aplica el color de highlight seleccionado
	}

	const setAlign = align => {
		setNameTextAlign(alignTranslate[align])
		console.log(align)
		editor.chain().focus().setTextAlign(align).run()
	}
	const startRecognition = () => {
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

		if (!SpeechRecognition) {
			alert('El reconocimiento de voz no es compatible con este navegador.')
			return
		}

		const newRecognition = new SpeechRecognition()
		newRecognition.lang = 'es-ES' // Puedes cambiar el idioma aquí
		newRecognition.interimResults = false
		newRecognition.maxAlternatives = 1

		// Iniciar el reconocimiento
		newRecognition.start()
		setListening(true)

		newRecognition.onresult = event => {
			const speechResult = event.results[0][0].transcript
			editor.chain().focus().insertContent(speechResult).run() // Inserta el texto en el editor
		}

		newRecognition.onend = () => {
			setListening(false)
		}

		newRecognition.onerror = event => {
			console.error('Error en el reconocimiento de voz:', event.error)
			setListening(false)
		}
	}

	const handleCopy = () => {
		navigator.clipboard
			.writeText(editor.getText())
			.then(() =>
				Swal.fire({
					title: 'Contenido copiado',
					icon: 'success',
					toast: true,
					position: 'top-end',
					showConfirmButton: false,
					timer: 2000,
					timerProgressBar: true,
				})
			)
			.catch(err => console.error('Error al copiar:', err))
	}
	if (!editor) {
		return null
	}
	useEffect(() => {
		console.log('useEffect')
		document.addEventListener('mousedown', handleClickOutside)
		document.querySelector('.tiptap').parentNode.className = 'tiptap-parent'
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])
	return (
		<div className="corrector-container__toolbar">
			<div className="corrector-container__toolbar--buttons">
				{/* Botones de formato */}
				<button
					onMouseDown={() => editor.chain().focus().toggleBold().run()}
					className={editor.isActive('bold') ? 'toolbar-active' : ''}>
					<i className="ri-bold"></i>
				</button>
				<button
					onMouseDown={() => editor.chain().focus().toggleItalic().run()}
					className={editor.isActive('italic') ? 'toolbar-active' : ''}>
					<i className="ri-italic"></i>
				</button>
				<button
					onMouseDown={() => editor.chain().focus().toggleStrike().run()}
					className={editor.isActive('strike') ? 'toolbar-active' : ''}>
					<i className="ri-strikethrough"></i>
				</button>
				<button
					onClick={() => editor.chain().focus().toggleUnderline().run()}
					className={editor.isActive('underline') ? 'toolbar-active' : ''}>
					<i className="ri-underline"></i>
				</button>
				<span className="separator-dropdown"></span>
				<div
					className={editor.isActive('textColor') ? 'color-picker toolbar-active' : 'color-picker'}
					style={{ marginRight: '8px' }}>
					{/* Icono de paleta de colores */}
					<div
						onClick={handleOpenColorPicker} // Al hacer clic, abre el selector de color
						style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
						title="Seleccionar color">
						<i className="ri-palette-line" style={{ fontSize: '16px' }}></i>
					</div>

					{/* Input de tipo color, está oculto */}
					<input
						type="color"
						ref={colorInputRef}
						value={selectedColor}
						onChange={handleColorChange}
						style={{ width: '20px', height: '20px' }} // Escondemos el input de color
					/>
				</div>
				{/* texto resaltado */}
				<div className={editor.isActive('highlight') ? 'highlight-color toolbar-active' : 'highlight-color'}>
					<div
						onClick={handleOpenHighlightPicker} // Al hacer clic, abre el selector de color
						style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
						title="Seleccionar color de resaltado">
						<i className="ri-mark-pen-line" style={{ fontSize: '16px' }}></i>{' '}
						{/* Puedes cambiar el icono si prefieres otro */}
					</div>

					<input
						type="color"
						ref={highlightInputRef}
						value={selectedHighlightColor}
						onChange={handleHighlightChange}
						style={{ width: '20px', height: '20px' }}
					/>
				</div>
				<span className="separator-dropdown"></span>
				{/* Dropdown para Tipografía */}
				<div className="dropdown-container" ref={FontFamilyRef}>
					<button className="dropdown-button tipography" onMouseDown={toggleDropdown(setFontFamilyDropdownOpen)}>
						<span>{nameFontFamily.split('-')[1]}</span> <span className="arrow-down">▼</span>
					</button>
					{isFontFamilyDropdownOpen && (
						<div className="dropdown-content">
							{[
								'font-Arial',
								'font-Verdana',
								'font-Helvetica',
								'font-Tahoma',
								'font-Georgia',
								'font-TimesNewRoman',
								'font-CourierNew',
								'font-TrebuchetMS',
								'font-ComicSansMS',
								'font-Impact',
								'font-Ubuntu',
							].map(fontClass => (
								<button
									key={fontClass}
									onMouseDown={() => {
										setFontFamily(fontClass)
										setFontFamilyDropdownOpen(false)
									}}
									className={
										editor.isActive('textStyle', { fontFamily: fontClass }) ? 'toolbar-active' : '' + ' ' + fontClass
									}>
									{fontClass.split('-')[1]}
								</button>
							))}
						</div>
					)}
				</div>
				{/* Dropdown para Tamaño de Fuente */}
				<div className="dropdown-container" ref={fontSizeDropdownRef}>
					<button className="dropdown-button" onMouseDown={toggleDropdown(setFontSizeDropdownOpen)}>
						<span>{nameFontSize}</span> <span className="arrow-down">▼</span>
					</button>
					{isFontSizeDropdownOpen && (
						<div className="dropdown-content">
							{[12, 14, 16, 18, 20, 24, 32].map(size => (
								<button
									key={size}
									onMouseDown={() => {
										setFontSize(size) // Aplicar tamaño de fuente
										closeAllDropdowns()
									}}
									className={editor.isActive('textStyle', { fontSize: `${size}px` }) ? 'toolbar-active' : ''}>
									{size}px
								</button>
							))}
						</div>
					)}
				</div>
				{/* Dropdown para Encabezados */}
				<div className="dropdown-container" ref={headingDropdownRef}>
					<button className="dropdown-button" onMouseDown={toggleDropdown(setHeadingDropdownOpen)}>
						<span>{nameHeading}</span> <span className="arrow-down">▼</span>
					</button>
					{isHeadingDropdownOpen && (
						<div className="dropdown-content">
							{[1, 2, 3, 4, 5, 6].map(level => (
								<button
									key={level}
									onMouseDown={() => {
										editor.chain().focus().toggleHeading({ level }).run()
										setNameHeading(<i className={'ri-h-' + level}></i>)
										closeAllDropdowns()
									}}
									className={editor.isActive('heading', { level }) ? 'toolbar-active' : ''}>
									<i className={'ri-h-' + level}></i>
								</button>
							))}
						</div>
					)}
				</div>

				{/* Dropdown para Listas */}
				<div className="dropdown-container" ref={listDropdownRef}>
					<button className="dropdown-button" onMouseDown={toggleDropdown(setListDropdownOpen)}>
						<span>Listas</span> <span className="arrow-down">▼</span>
					</button>
					{isListDropdownOpen && (
						<div className="dropdown-content">
							<button
								onMouseDown={() => {
									editor.chain().focus().toggleBulletList().run()
									closeAllDropdowns()
								}}
								className={editor.isActive('bulletList') ? 'toolbar-active' : ''}>
								<i className="ri-list-check"></i> Lista desordenada
							</button>
							<button
								onMouseDown={() => {
									editor.chain().focus().toggleOrderedList().run()
									closeAllDropdowns()
								}}
								className={editor.isActive('orderedList') ? 'toolbar-active' : ''}>
								<i className="ri-list-ordered-2"></i> Lista ordenada
							</button>
						</div>
					)}
				</div>
				<span className="separator-dropdown"></span>

				<span className="separator-dropdown"></span>
				{/* Justificacion de textos */}
				<div className="dropdown-container" ref={justifyDropdownRef}>
					<button className="dropdown-button" onMouseDown={toggleDropdown(setIsJustifyDropdownOpen)}>
						<span>Alineción: {nameTextAlign}</span> <span className="arrow-down">▼</span>
					</button>
					{isJustifyDropdownOpen && (
						<div className="dropdown-content">
							{['left', 'center', 'right', 'justify'].map(align => (
								<button
									key={align}
									onMouseDown={() => {
										setAlign(align)
										closeAllDropdowns()
									}}
									style={{ cursor: 'pointer' }}>
									<i className={'ri-align-' + align}></i>&nbsp;
									<span>{alignTranslate[align]} </span>
								</button>
							))}
						</div>
					)}
				</div>
				{/* Botón para activar el reconocimiento de voz */}
				<button
					onClick={startRecognition}
					disabled={listening} // Desactiva el botón mientras se escucha
					title="Reconocimiento de voz"
					style={{ cursor: 'pointer' }}>
					{listening ? <i className="ri-mic-fill"></i> : <i className="ri-mic-line"></i>}
					{listening ? ' Escuchando...' : ' Voz a texto'}
				</button>
				{/* Botón para Copiar contenido */}
				<button onClick={handleCopy}>
					<i className="ri-file-copy-line"></i>
				</button>
			</div>
		</div>
	)
}
