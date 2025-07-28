import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Clipboard, Download, FileText } from 'lucide-react'
import React from 'react'

export default function DialogNote({
	showSummary,
	setShowSummary,
	userResponses,
	handleCopySummary,
	handleDownloadSummary,
}) {
	return (
		<Dialog open={showSummary} onOpenChange={setShowSummary}>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2 text-xl font-bold">
						<FileText className="w-5 h-5" />
						Resumen del Proceso
					</DialogTitle>
				</DialogHeader>

				<div className="max-h-[60vh] overflow-y-auto">
					<div className="p-4 mb-4 border border-gray-200 rounded-lg bg-gray-50">
						<h3 className="mb-2 font-medium text-gray-700">Respuestas Registradas</h3>

						{Object.keys(userResponses).length > 0 ? (
							<div className="space-y-4">
								{Object.entries(userResponses).map(([stepId, response]) => (
									<div key={stepId} className="p-3 bg-white border border-gray-100 rounded-md shadow-sm">
										<div className="text-sm font-medium text-gray-500">{response.stepTitle}</div>
										<div className="mt-1">
											<span className="font-medium">Pregunta:</span> {response.question}
										</div>
										<div className="mt-1">
											<span className="font-medium">Respuesta:</span>{' '}
											<span className="font-medium text-green-600">{response.answer}</span>
										</div>
									</div>
								))}
							</div>
						) : (
							<p className="italic text-gray-500">No se registraron respuestas durante el proceso.</p>
						)}
					</div>
				</div>

				<DialogFooter className="flex items-center justify-between">
					<div className="text-sm text-gray-500">Total de respuestas: {Object.keys(userResponses).length}</div>
					<div className="flex gap-2">
						<Button variant="outline" size="sm" onClick={handleCopySummary}>
							<Clipboard className="w-4 h-4 mr-1" />
							Copiar
						</Button>
						<Button variant="outline" size="sm" onClick={handleDownloadSummary}>
							<Download className="w-4 h-4 mr-1" />
							Descargar
						</Button>
						<Button size="sm" onClick={() => setShowSummary(false)}>
							Cerrar
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
