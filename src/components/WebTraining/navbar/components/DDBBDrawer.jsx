import { useState } from 'react'
import { FileUp, Download, X, Database } from 'lucide-react'
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'

export default function ExcelDrawer() {
	const [file, setFile] = useState(null)
	const [isDragging, setIsDragging] = useState(false)

	const plantillas = [
		{ id: 1, nombre: 'Plantilla de Inventario' },
		{ id: 2, nombre: 'Plantilla de Ventas' },
		{ id: 3, nombre: 'Plantilla de Clientes' },
		{ id: 4, nombre: 'Plantilla de Productos' },
		{ id: 5, nombre: 'Plantilla de Empleados' },
		{ id: 6, nombre: 'Plantilla de Gastos' },
		{ id: 7, nombre: 'Plantilla de Proveedores' },
		{ id: 8, nombre: 'Plantilla de Presupuesto' },
	]

	const handleDragOver = e => {
		e.preventDefault()
		setIsDragging(true)
	}

	const handleDragLeave = () => {
		setIsDragging(false)
	}

	const handleDrop = e => {
		e.preventDefault()
		setIsDragging(false)

		const droppedFile = e.dataTransfer.files[0]
		if (droppedFile && droppedFile.name.endsWith('.xlsx')) {
			setFile(droppedFile)
		} else {
			alert('Por favor, sube solo archivos Excel (.xlsx)')
		}
	}

	const handleFileChange = e => {
		const selectedFile = e.target.files[0]
		if (selectedFile && selectedFile.name.endsWith('.xlsx')) {
			setFile(selectedFile)
		} else {
			alert('Por favor, sube solo archivos Excel (.xlsx)')
		}
	}

	const handleDownload = nombre => {
		// Aquí iría la lógica para descargar la plantilla específica
		console.log(`Descargando: ${nombre}`)
	}

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button variant="ghost" className="flex w-full justify-between">
					Cargar bases <Database className="h-4 w-4 text-primary" />
				</Button>
			</DrawerTrigger>
			<DrawerContent className="p-0 max-h-[90vh]">
				<div className="p-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Zona de carga de archivos */}
						<div className="flex flex-col items-center">
							<h3 className="text-xl font-bold mb-4 text-primary">Cargar Archivo Excel</h3>
							<div
								className={`relative w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center min-h-[250px] transition-all
                  ${isDragging ? 'border-primary bg-red-50' : 'border-blue-400 hover:border-primary hover:bg-red-50'}`}
								onDragOver={handleDragOver}
								onDragLeave={handleDragLeave}
								onDrop={handleDrop}>
								<div className="bg-gray-100 p-4 rounded-full mb-4">
									<FileUp className="h-10 w-10 text-primary" />
								</div>

								<p className="text-lg font-medium text-blue-600 mb-2">
									{file ? file.name : 'Suelta tu archivo aquí o buscalo'}
								</p>

								{!file && <p className="text-sm text-gray-500 mb-4">Solo archivos Excel (.xlsx)</p>}

								<input type="file" id="fileInput" className="hidden" accept=".xlsx" onChange={handleFileChange} />

								<label
									htmlFor="fileInput"
									className="cursor-pointer bg-primary hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors">
									Seleccionar archivo
								</label>
							</div>

							{file && (
								<div className="mt-4 w-full">
									<Button
										className="w-full bg-green-600 hover:bg-green-700"
										onClick={() => console.log('Procesando archivo:', file)}>
										Procesar Archivo
									</Button>
								</div>
							)}
						</div>

						{/* Zona de descarga de plantillas */}
						<div className="flex flex-col">
							<h3 className="text-xl font-bold mb-4 text-primary">Descargar Plantillas</h3>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								{plantillas.map(plantilla => (
									<Button
										key={plantilla.id}
										variant="outline"
										className="flex justify-between items-center border-2 border-green-200 bg-green-50 hover:bg-green-100 text-green-800 py-6 px-4 rounded-lg shadow-sm transition-all hover:shadow-md"
										onClick={() => handleDownload(plantilla.nombre)}>
										<span className="font-medium">{plantilla.nombre}</span>
										<Download className="h-5 w-5 ml-2" />
									</Button>
								))}
							</div>
						</div>
					</div>

					{/* Botón de cerrar */}
					<DrawerClose asChild>
						<Button
							className="w-full mt-6 bg-red-100 hover:bg-red-200 text-primary border-2 border-red-300 py-3 font-bold text-lg relative overflow-hidden group"
							variant="outline">
							<div
								className="absolute inset-0 bg-red-200 opacity-50 group-hover:opacity-70 transition-opacity"
								style={{
									backgroundImage:
										'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,0,0,0.1) 10px, rgba(255,0,0,0.1) 20px)',
								}}></div>
							<span className="relative flex items-center justify-center">
								CERRAR <X className="ml-2 h-5 w-5" />
							</span>
						</Button>
					</DrawerClose>
				</div>
			</DrawerContent>
		</Drawer>
	)
}
