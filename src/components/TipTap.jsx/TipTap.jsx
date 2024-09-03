import { EditorContent } from '@tiptap/react'
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import 'prosemirror-view/style/prosemirror.css'

import './tiptap.scss'
import IconBoldOt from '../../icons/IconBoldOt'
import IconItalicOt from '../../icons/IconItalicOt'
import IconCorrectOt from '../../icons/IconCorrectOt'
import IconError from '../../icons/IconError'
import IconTooltipOt from '../../icons/IconTooltipOt'
import IconTextSublineOt from '../../icons/IconTextSublineOt'
import IconListOt from '../../icons/IconListOt'

// define your extension array

const TipTap = ({ content, getValueTipTap, script, index }) => {
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
					{!script && (
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
					{!script && (
						<button
							type="button"
							onClick={() => editor.chain().focus().toggleBulletList().run()}
							className={editor.isActive('bulletList') ? 'is-active' : ''}>
							<IconListOt />
						</button>
					)}
					<span></span>
					<button
						type="button"
						onClick={() => {
							getValueTipTap(editor.getHTML(), index)
						}}
						className={editor.isActive('paragraph') ? 'is-active' : ''}>
						<IconCorrectOt />
					</button>

					<button type="button">
						<IconError />
					</button>
				</div>
			</div>

			<EditorContent editor={editor} />
		</div>
	)
}

export default TipTap
