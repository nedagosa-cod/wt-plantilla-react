import './styles.scss'
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { TextAlign } from '@tiptap/extension-text-align'
import { Highlight } from '@tiptap/extension-highlight'
import ExFontSize from './ExFontSize'
import ExFontFamily from './ExFontFamily'
import TextColor from './ExTextColor'
import MenuBar from './MenuBar'
import 'remixicon/fonts/remixicon.css'
import MenuBurbuja from './MenuBurbuja'

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
		content: 'Escriba Texto Aquí...',
		onUpdate: () => {
			if (editor.getText().includes('Escriba Texto Aquí...')) {
				editor.commands.setContent(editor.getText().slice(0, -22) + editor.getText().slice(-1))
			}
		},
	})

	if (!editor) {
		return null
	}
	return (
		<div className="corrector-container">
			<h1 className="corrector-container__title">EDITOR DE TEXTOS</h1>
			<MenuBar editor={editor} />
			<MenuBurbuja editor={editor} />
			<EditorContent editor={editor} />
		</div>
	)
}
