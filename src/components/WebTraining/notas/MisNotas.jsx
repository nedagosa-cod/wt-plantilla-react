import { useState, useEffect, useContext } from 'react'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetFooter,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { PlusCircle, NotebookPen } from 'lucide-react'
import { NoteCard } from '@/components/WebTraining/notas/components/MisNotasCard'
import { NoteForm } from '@/components/WebTraining/notas/components/MisNotasForm'
// import Localbase from 'localbase'
import GlobalContext from '../../../context/GlobalContext'

// const notesCollection = db.collection('MisNotas')
export function NotesSheet() {
	const { WTLocalbase: notesCollection } = useContext(GlobalContext)
	const [notes, setNotes] = useState([])
	const [isOpen, setIsOpen] = useState(false)
	const [loaded, setLoaded] = useState(false)
	const [editingNote, setEditingNote] = useState(null)
	const [isCreating, setIsCreating] = useState(false)

	// Crear una nueva nota y guardarla en Localbase
	const handleCreateNote = newNote => {
		const noteWithId = {
			...newNote,
			id: Date.now().toString(),
			createdAt: new Date().toISOString(),
		}
		notesCollection.collection('MisNotas').add(noteWithId)
		setNotes(prev => {
			return [...prev, noteWithId]
		})
		setIsCreating(false)
	}

	// Actualizar una nota en Localbase
	const handleUpdateNote = updatedNote => {
		console.log(updatedNote)
		notesCollection.collection('MisNotas').doc({ id: updatedNote.id }).set(updatedNote)
		setEditingNote(null)
	}

	// Eliminar una nota de Localbase
	const handleDeleteNote = id => {
		notesCollection.collection('MisNotas').doc({ id }).delete()
		setNotes(prev => prev.filter(note => note.id !== id))
	}

	const startEditing = note => {
		setEditingNote(note)
		setIsCreating(false)
	}

	// Cargar notas desde Localbase al iniciar
	useEffect(() => {
		notesCollection
			.collection('MisNotas')
			.get()
			.then(notes => {
				setNotes(notes)
			})
	}, [])

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<Button variant="ghost" className="flex w-full justify-between">
					Mis Notas <NotebookPen className="h-4 w-4 text-primary" />
				</Button>
			</SheetTrigger>
			<SheetContent className="w-full sm:max-w-md md:max-w-lg overflow-y-auto" side="right">
				<SheetHeader>
					<SheetTitle className="text-red-600 text-xl">Sistema de Notas</SheetTitle>
					<SheetDescription>Organiza tus ideas, tareas y recordatorios de manera sencilla.</SheetDescription>
				</SheetHeader>

				<div className="mt-6 space-y-4">
					{editingNote ? (
						<div className="border border-gray-200 rounded-lg p-4 shadow-sm">
							<h3 className="text-lg font-medium mb-2">Editar Nota</h3>
							<NoteForm initialNote={editingNote} onSubmit={handleUpdateNote} onCancel={() => setEditingNote(null)} />
						</div>
					) : isCreating ? (
						<div className="border border-gray-200 rounded-lg p-4 shadow-sm">
							<h3 className="text-lg font-medium mb-2">Nueva Nota</h3>
							<NoteForm
								initialNote={{ title: '', content: '', color: '#ffffff' }}
								onSubmit={handleCreateNote}
								onCancel={() => setIsCreating(false)}
							/>
						</div>
					) : (
						<Button onClick={() => setIsCreating(true)} className="w-full bg-red-600 hover:bg-red-700">
							<PlusCircle className="mr-2 h-4 w-4" />
							Crear Nueva Nota
						</Button>
					)}

					{!isCreating && !editingNote && notes.length === 0 && (
						<div className="text-center py-8 text-gray-500">No tienes notas. ¡Crea una nueva!</div>
					)}

					{!isCreating && !editingNote && (
						<div className="grid grid-cols-1 gap-4 mt-4">
							{notes &&
								Array.isArray(notes) &&
								notes.map(note => {
									return <NoteCard key={note.id} note={note} onEdit={startEditing} onDelete={handleDeleteNote} />
								})}
						</div>
					)}
				</div>

				<SheetFooter className="mt-6">
					<p className="text-xs text-gray-500 w-full text-center">
						Tus notas se guardan automáticamente en este dispositivo
					</p>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
