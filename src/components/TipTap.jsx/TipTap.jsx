import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react'
import { Editor } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'

import './tiptap.scss'
import IconBoldOt from '../../icons/IconBoldOt'
import IconItalicOt from '../../icons/IconItalicOt'
import IconCorrectOt from '../../icons/IconCorrectOt'
import IconError from '../../icons/IconError'
import IconTooltipOt from '../../icons/IconTooltipOt'

// define your extension array

const TipTap = ({ content, onchange }) => {
	const editor = new Editor({
		extensions: [StarterKit],
		content: content,
		autofocus: 'end',
		injectCSS: false,
		onUpdate: () => {
			console.log(editor.getHTML())
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
					<button
						type="button"
						onClick={() => editor.chain().focus().toggleItalic().run()}
						disabled={!editor.can().chain().focus().toggleItalic().run()}
						className={editor.isActive('italic') ? 'is-active' : ''}>
						<IconItalicOt />
					</button>
					<button
						type="button"
						onClick={() => editor.chain().focus().toggleStrike().run()}
						disabled={!editor.can().chain().focus().toggleStrike().run()}
						className={editor.isActive('strike') ? 'is-active' : ''}>
						<IconItalicOt />
					</button>
					<span></span>
					<button type="button" className={editor.isActive('italic') ? 'is-active' : ''}>
						<IconTooltipOt />
					</button>
					<button
						type="button"
						onClick={() => editor.chain().focus().toggleBulletList().run()}
						className={editor.isActive('bulletList') ? 'is-active' : ''}>
						<IconTooltipOt />
					</button>
					<span></span>
					<button
						type="button"
						onClick={() => {
							onchange(editor.getHTML())
						}}
						className={editor.isActive('paragraph') ? 'is-active' : ''}>
						<IconCorrectOt />
					</button>

					<button
						type="button"
						onClick={() => editor.chain().focus().undo().run()}
						disabled={!editor.can().chain().focus().undo().run()}>
						<IconError />
					</button>
				</div>
			</div>

			<EditorContent editor={editor} />
		</div>
	)
}

export default TipTap
