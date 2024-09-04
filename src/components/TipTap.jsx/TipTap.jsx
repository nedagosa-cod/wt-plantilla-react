import { EditorContent } from '@tiptap/react'
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'

import 'prosemirror-view/style/prosemirror.css'

import './tiptap.scss'
import IconBoldOt from '../../icons/IconBoldOt'
import IconItalicOt from '../../icons/IconItalicOt'
import IconCorrectOt from '../../icons/IconCorrectOt'
import IconError from '../../icons/IconError'
import IconTextSublineOt from '../../icons/IconTextSublineOt'
import IconListOt from '../../icons/IconListOt'
import IconTooltipOt from '../../icons/IconTooltipOt'
import Swal from 'sweetalert2'

// define your extension array

const TipTap = ({ content, getValueTipTap, onScript, onList, onParagraph }) => {
	console.log(content)
	const editor = new Editor({
		extensions: [
			StarterKit.configure({
				bulletList: true,
				orderedList: true,
			}),
		],
		content: content,
		autofocus: 'end',
		injectCSS: false,
		onUpdate: () => {
			const textEditor = editor.getText()
			// si borran la lista del tiptap este se ajusta nuevamente a lista
			if (onList && textEditor == '') {
				editor.chain().focus().toggleBulletList().run()
			}
			// no permite escribir mas de 600 caracteres en parrafos
			if ((onParagraph || onScript) && textEditor.length > 600) {
				editor.commands.setContent(textEditor.substring(0, 600))
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Maximo de caracteres alcanzado solo se permiten maximo 600 caracteres por párrafo',
				})
			}
		},
	})

	if (!editor) {
		return null
	}
	return (
		<div className="tiptap-container">
			<div className="tiptap-container__toolbar">
				<div className="tiptap-container__toolbar--buttons">
					<button
						type="button"
						onClick={() => editor.chain().focus().toggleBold().run()}
						disabled={!editor.can().chain().focus().toggleBold().run()}
						className={editor.isActive('bold') ? 'is-active' : ''}>
						<IconBoldOt />
					</button>
					{!onScript && (
						<button
							type="button"
							onClick={() => editor.chain().focus().toggleItalic().run()}
							disabled={!editor.can().chain().focus().toggleItalic().run()}
							className={editor.isActive('italic') ? 'is-active' : ''}>
							<IconItalicOt />
						</button>
					)}
					<button
						type="button"
						onClick={() => editor.chain().focus().toggleStrike().run()}
						disabled={!editor.can().chain().focus().toggleStrike().run()}
						className={editor.isActive('strike') ? 'is-active' : ''}>
						<IconTextSublineOt />
					</button>
					<span></span>
					{!onScript && !onList && (
						<button
							type="button"
							onClick={() => editor.chain().focus().toggleBulletList().run()}
							className={editor.isActive('bulletList') ? 'is-active' : ''}>
							<IconListOt />
						</button>
					)}
					<button type="button">
						<IconTooltipOt />
					</button>
					<span></span>
					<button
						type="button"
						onClick={() => {
							console.log(editor.getHTML())
							getValueTipTap(editor.getHTML(), false)
						}}
						className={editor.isActive('paragraph') ? 'is-active' : ''}>
						<IconCorrectOt />
					</button>

					<button
						type="button"
						onClick={() => {
							getValueTipTap(null, true)
						}}>
						<IconError />
					</button>
				</div>
			</div>

			<EditorContent editor={editor} />
		</div>
	)
}

export default TipTap
