import React from 'react'

const DialogScroll = ({ open, onClose }) => {
	if (!open) return null
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
				<h2 className="text-xl font-semibold mb-2">Debes leer todo el contenido</h2>
				<p className="text-gray-700 mb-4">
					Para continuar al siguiente paso, primero debes leer completamente la información mostrada.
				</p>
				<div className="flex justify-end">
					<button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
						Cerrar
					</button>
				</div>
			</div>
		</div>
	)
}

export default DialogScroll
