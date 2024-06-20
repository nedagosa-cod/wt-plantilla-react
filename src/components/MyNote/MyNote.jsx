import { useState } from 'react'
import './MyNote.scss'

const MyNote = () => {
	const [newNote, setNewNote] = useState(false)
	return (
		<section className="wtNote">
			<div className="wtNote__notes"></div>
			<div className="wtNote__button">
				{newNote && <div>crear nota</div>}
				<button onClick={() => setNewNote(true)}>Crear Nota</button>
			</div>
		</section>
	)
}

export default MyNote
