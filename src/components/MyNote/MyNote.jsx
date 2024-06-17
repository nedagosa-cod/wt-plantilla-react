import { useState } from 'react'
import './MyNote.scss'

const MyNote = () => {
	const [newNote, setNewNote] = useState(false)
	return (
		<section className="myNote">
			<div className="myNote__notes"></div>
			<div className="myNote__button">
				{newNote && <div>crear nota</div>}
				<button onClick={() => setNewNote(true)}>Crear Nota</button>
			</div>
		</section>
	)
}

export default MyNote
