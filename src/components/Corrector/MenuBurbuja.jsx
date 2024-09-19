import { BubbleMenu } from '@tiptap/react'
import { useRef, useState } from 'react'

const MenuBurbuja = ({ editor }) => {
	const [selectedColor, setSelectedColor] = useState('#000000')
	const [selectedHighlightColor, setSelectedHighlightColor] = useState('#FFFFFF')

	const highlightInputRef = useRef(null)
	const colorInputRef = useRef(null)

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

	return (
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
	)
}

export default MenuBurbuja
