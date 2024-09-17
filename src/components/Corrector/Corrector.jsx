import './styles.scss'
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { TextAlign } from '@tiptap/extension-text-align'
import { Highlight } from '@tiptap/extension-highlight'
import { useEffect, useRef, useState } from 'react'
import ExFontSize from './ExFontSize'
import ExFontFamily from './ExFontFamily'
import TextColor from './ExTextColor'
import MenuBar from './MenuBar'
import 'remixicon/fonts/remixicon.css'
import Swal from 'sweetalert2'

export default function Corrector() {
	const editor = useEditor({
		extensions: [
			StarterKit,
			TextStyle, // Agregamos la extensión TextStyle,
			ExFontSize,
			ExFontFamily,
			TextColor,
			Highlight.configure({ multicolor: true }),
			TextAlign.configure({
				types: ['heading', 'paragraph'], // Aplica la alineación a estos tipos de nodos
			}),
			Underline.configure({
				HTMLAttributes: {
					class: 'titap-underline',
				},
			}),
		],
		autofocus: 'end',
		content:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		onUpdate: () => {
			if (editor.getText().includes('Escriba Texto Aquí...')) {
				editor.commands.setContent(editor.getText().slice(0, -22) + editor.getText().slice(-1))
			}
		},
	})
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

	const handleOpenColorPicker = () => {
		colorInputRef.current.click()
	}
	const handleColorChange = event => {
		const color = event.target.value
		setSelectedColor(color)
		editor.chain().focus().setColor(color).run() // Aplica el color seleccionado
	}
	const handleOpenHighlightPicker = () => {
		highlightInputRef.current.click()
	}
	const handleHighlightChange = event => {
		const color = event.target.value
		setSelectedHighlightColor(color)
		editor.chain().focus().setHighlight({ color }).run() // Aplica el color de highlight seleccionado
	}
	if (!editor) {
		return null
	}
	// useEffect(() => {
	// 	console.log('useEffect')
	// 	document.addEventListener('mousedown', handleClickOutside)
	// 	document.querySelector('.tiptap').parentNode.className = 'tiptap-parent'
	// 	return () => document.removeEventListener('mousedown', handleClickOutside)
	// }, [])
	return (
		<div className="corrector-container">
			<h1 className="corrector-container__title">EDITOR DE TEXTOS</h1>
			{/* MenuBar*/}
			<MenuBar editor={editor} />

			<BubbleMenu editor={editor} className="bubble-menu">
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
				<div className={editor.isActive('highlight') ? 'highlight-color toolbar-active' : 'highlight-color'}>
					{/* Icono para el highlight */}
					<div
						onClick={handleOpenHighlightPicker} // Al hacer clic, abre el selector de color
						style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
						title="Seleccionar color de resaltado">
						<i className="ri-mark-pen-line" style={{ fontSize: '16px' }}></i>{' '}
						{/* Puedes cambiar el icono si prefieres otro */}
					</div>

					{/* Input de tipo color, está oculto */}
					<input
						type="color"
						ref={highlightInputRef}
						value={selectedHighlightColor}
						onChange={handleHighlightChange}
						style={{ width: '20px', height: '20px' }}
					/>
				</div>
			</BubbleMenu>

			<EditorContent editor={editor} />
		</div>
	)
}
