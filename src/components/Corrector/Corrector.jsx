import { useEffect, useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { TextAlign } from '@tiptap/extension-text-align'
import { Highlight } from '@tiptap/extension-highlight'
import ExFontSize from './ExFontSize'
import ExFontFamily from './ExFontFamily'
import TextColor from './ExTextColor'
import MenuBar from './MenuBar'
import MenuBurbuja from './MenuBurbuja'
import 'remixicon/fonts/remixicon.css'

export default function Corrector() {
	const [isTyping, setIsTyping] = useState(false)

	const editor = useEditor({
		extensions: [
			StarterKit,
			TextStyle,
			ExFontSize,
			ExFontFamily,
			TextColor,
			Highlight.configure({ multicolor: true }),
			TextAlign.configure({ types: ['heading', 'paragraph'] }),
			Underline.configure({ HTMLAttributes: { class: 'titap-underline' } }),
		],
		autofocus: 'end',
		content: 'Escriba Texto Aquí...',
		onUpdate: ({ editor }) => {
			setIsTyping(true)
			clearTimeout(editor?.typingTimeout)
			editor.typingTimeout = setTimeout(() => setIsTyping(false), 2000)

			if (editor.getText().includes('Escriba Texto Aquí...')) {
				editor.commands.setContent(editor.getText().slice(0, -22) + editor.getText().slice(-1))
			}
		},
	})

	useEffect(() => {
		return () => {
			if (editor?.typingTimeout) {
				clearTimeout(editor.typingTimeout)
			}
		}
	}, [editor])

	if (!editor) return null

	return (
		<div className="flex flex-col justify-center h-full bg-gradient-to-br from-blue-200/50 to-purple-200/50 p-4">
			<div className="flex flex-col w-full max-w-6xl mx-auto rounded-2xl shadow-xl backdrop-blur-lg bg-white/30 border border-white/20 p-2 md:p-3 h-[75%] max-h-[800px]">
				<h1 className="text-3xl font-bold mb-2 text-center text-secondary drop-shadow flex items-center justify-center gap-3">
					<svg
						className="w-8 h-8 text-white animate-bounce-soft"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={1.5}
							d="M8 16h8M8 12h8m-6 4h6m2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h8l6 6v10a2 2 0 01-2 2z"
						/>
					</svg>
					EDITOR DE TEXTOS
				</h1>

				<div className="mb-2">
					<MenuBar editor={editor} />
				</div>

				<MenuBurbuja editor={editor} />

				<div className="flex-grow mt-4 border border-white/30 rounded-xl p-4 backdrop-blur-sm text-bg overflow-auto h-full bg-background relative">

					{!isTyping && (
						<div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
							<div className="flex items-center gap-3 bg-black/50 px-6 py-3 rounded-xl shadow-lg backdrop-blur-md text-white text-base">
								<div className="flex space-x-1">
									<div className="w-3 h-3 rounded-full bg-red-500 animate-bounce"></div>
									<div className="w-3 h-3 rounded-full bg-red-500 animate-bounce [animation-delay:-.3s]"></div>
									<div className="w-3 h-3 rounded-full bg-red-500 animate-bounce [animation-delay:-.5s]"></div>
								</div>
								<span>Esperando a que escribas...</span>
							</div>
						</div>
					)}


					<EditorContent editor={editor} />
				</div>
			</div>
		</div>
	)
}
