import React, { useState, useEffect, useRef } from 'react'
import './styles.scss'
import { IconNoteStycky } from '../../icons/IconNoteStycky.jsx'
import { IconMinus } from '../../icons/IconMinus.jsx'
import { IconPlus } from '../../icons/IconPlus.jsx'
import { IconFaceSmile } from '../../icons/IconFaceSmile.jsx'
import { IconFaceCrying } from '../../icons/IconFaceCrying.jsx'

function NoteApp() {
	// variable que guarda las notas
	const [notes, setNotes] = useState([])
	//variables para cargar mensaje de confirmacion de eliminacion y no guardar la ide guardada en noteToDelete
	const [isDeleting, setIsDeleting] = useState(false)
	const [noteToDelete, setNoteToDelete] = useState(null)
	//redimensionar text area
	const refs = useRef({})

	// funcion del text area para redimencionar custom
	const handleResizeMouseDown = noteId => e => {
		const startY = e.clientY
		const startHeight = refs.current[noteId].offsetHeight // Accede a la referencia específica

		const handleMouseMove = e => {
			const newHeight = startHeight + (e.clientY - startY)
			refs.current[noteId].style.height = `${newHeight}px` // Ajusta la altura del textarea correspondiente
		}

		const handleMouseUp = () => {
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)
		}

		document.addEventListener('mousemove', handleMouseMove)
		document.addEventListener('mouseup', handleMouseUp)
	}

	//funcion para cambiar colores de las notas y guardarlos
	const handleChangeColor = (color, id) => {
		const updatedNotes = notes.map(note => {
			if (note.id === id) {
				return { ...note, color: color }
			}
			return note
		})
		setNotes(updatedNotes)
		localStorage.setItem('notes', JSON.stringify(updatedNotes))
	}

	//funcion para agregar el titulo a la nota
	const handleTitleChange = (title, id) => {
		const updatedNotes = notes.map(note => {
			if (note.id === id) {
				return { ...note, title: title }
			}
			return note
		})
		setNotes(updatedNotes)
		localStorage.setItem('notes', JSON.stringify(updatedNotes))
	}

	//en el text area cada vez que escriba algo  en este caso hace un map de notes y compara si el id iterado es igual
	//si lo es edita la nota osea (content) y esto pasa porque la sintaxis es {} y si no simplemente retorna el elemento
	//tal cual e igual que lo demas actualizamos nuestra variable y el localStorage
	const handleNoteChange = (content, id) => {
		const updatedNotes = notes.map(note => {
			if (note.id === id) {
				return { ...note, content }
			}
			return note
		})
		setNotes(updatedNotes)
		localStorage.setItem('notes', JSON.stringify(updatedNotes))
	}

	//funcion para agregar nota al final y mantener las anteriores, despues actualiza la variable y el localStorage
	const addNote = () => {
		const newNote = { id: Date.now(), title: '', color: '#e6e6e6', content: '' }
		//la funcion updatedNotes editar por si algun futuro añado cambuar de pocision
		const updatedNotes = [...notes, newNote]
		setNotes(updatedNotes)
		localStorage.setItem('notes', updatedNotes)
	}

	//borrar la nota filtrando las que no tengan este id y actualizando  tanto las notas como el localStorage
	const deleteNote = () => {
		const updatedNotes = notes.filter(note => note.id !== noteToDelete)
		setNotes(updatedNotes)
		localStorage.setItem('notes', JSON.stringify(updatedNotes))
		cancelDelete()
	}

	//funcion para confirmar la eliminacion del mensaje
	const promptDeleteNote = noteId => {
		setIsDeleting(true)
		setNoteToDelete(noteId)
	}
	//funcion para cambiar isDeleting a false y no me cargue en el codigo
	const cancelDelete = () => {
		setIsDeleting(false)
		setNoteToDelete(null)
	}

	//busca el el local storage  la base notas y las guarda en la variable y si no simpremente guarda un array vacio en esa variable
	// este useEffect es solo cuando se de f5  y acceder al local ya que carga una sola vez despues de renderizar todo
	// tambien sirve para validar si se deja abierto o cerrado el componente
	useEffect(() => {
		const savedNotes = JSON.parse(localStorage.getItem('notes')) || []
		setNotes(savedNotes)

		const showNotes = JSON.parse(localStorage.getItem('showNote')) || false
		// setIsVisible(showNotes)
		localStorage.setItem('showNote', JSON.stringify(showNotes))
	}, [])

	return (
		<div className="noteApp-container show animate__animated animate__fadeInRight">
			<button onClick={addNote} className="noteApp-container__addNote">
				<IconPlus />
				Añadir Nota
			</button>
			{notes.length === 0 && (
				<p className="noteApp-container__tip">
					Click en <strong>"Añadir nota"</strong> para crear o agregar nota
				</p>
			)}
			<div className="noteApp-container__noteContainer">
				{notes.map(note => (
					<div key={note.id} className="noteApp-container__noteContainer-note">
						<textarea
							ref={el => (refs.current[note.id] = el)}
							placeholder="Escribe la nota....."
							value={note.content}
							onChange={e => handleNoteChange(e.target.value, note.id)}
							style={{ backgroundColor: note.color }}
						/>
						<div
							style={{ display: 'flex', alignItems: 'center', margin: '10px' }}
							className="noteApp-container__noteContainer-color">
							<label htmlFor={`color-picker-${note.id}`} style={{ marginRight: '5px' }}>
								Color:
							</label>
							<input
								id={`color-picker-${note.id}`}
								type="color"
								value={note.color}
								onChange={e => handleChangeColor(e.target.value, note.id)}
							/>
							<input
								type="text"
								value={note.title}
								onChange={e => handleTitleChange(e.target.value, note.id)}
								placeholder="Título de la nota"
								maxLength={25}
							/>
						</div>
						<div
							className="noteApp-container__noteContainer-esquina"
							style={{ backgroundColor: note.color }}
						/>
						<div
							className="noteApp-container__noteContainer-resize"
							onMouseDown={handleResizeMouseDown(note.id)}
						/>
						<button onClick={() => promptDeleteNote(note.id)}>Borrar Nota</button>
						{isDeleting && note.id === noteToDelete && (
							<div className="noteApp-container__noteContainer-mesagge">
								<p>¿Estás seguro que deseas borrar esta nota?</p>
								<button onClick={deleteNote}>
									Borrar
									<IconFaceCrying />
								</button>
								<button onClick={cancelDelete}>
									Cancelar
									<IconFaceSmile />
								</button>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export { NoteApp }
