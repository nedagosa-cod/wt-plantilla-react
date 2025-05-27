import { useMemo, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
	Menu,
	Calculator,
	Library,
	Diamond,
	TextCursorInput,
	MessageCircle,
	FileText,
	Clock,
	Download,
} from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Link } from 'react-router-dom'
const icons = {
	segments: {
		checklist: <Menu className="h-6 w-6" />, // Lista/Menu
		calc: <Calculator className="h-6 w-6" />, // Calculadora
		library: <Library className="h-6 w-6" />, // Biblioteca
		tipify: <Diamond className="h-6 w-6" />, // Diamante
		textSlash: <MessageCircle className="h-6 w-6" />, // Burbuja de mensaje
		note: <FileText className="h-6 w-6" />, // Nota/Archivo
		timeLine: <Clock className="h-6 w-6" />, // Reloj/Línea de tiempo
		download: <Download className="h-6 w-6" />, // Descargar
	},
	develops: {
		checklist: <Menu className="h-5 w-5" />, // Lista/Menu
		textSlash: <TextCursorInput className="h-5 w-5" />, // Input de texto
		note: <FileText className="h-5 w-5" />, // Nota/Archivo
		tipify: <Diamond className="h-5 w-5" />, // Diamante
		calc: <Calculator className="h-5 w-5" />, // Calculadora
		library: <Library className="h-5 w-5" />, // Biblioteca
		timeLine: <Clock className="h-5 w-5" />, // Reloj/Línea de tiempo
		download: <Download className="h-5 w-5" />, // Descargar
	},
}

// Función para agrupar resultados por título+segmento
function groupResultsByTitleAndSegment(results) {
	return results.reduce((acc, item) => {
		const key = `${item.title}|||${item.segment}`
		if (!acc[key]) acc[key] = []
		acc[key].push(item)
		return acc
	}, {})
}

export const SearchResults = ({ results, handleSearch }) => {
	const groupedResults = useMemo(() => groupResultsByTitleAndSegment(results), [results])
	const [dialogItem, setDialogItem] = useState(null)

	if (results.length === 0) return null

	const handleItemClick = item => {
		if (item.action === 'download') {
			// Descargar archivo
			const link = document.createElement('a')
			link.href = item.path
			link.setAttribute('download', '')
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)
		} else if (item.action === 'redirect') {
			window.open(item.path, '_blank')
			window.close()
		} else if (item.action === 'dialog') {
			setDialogItem(item)
		} else {
			handleSearch(item.name)
		}
	}

	return (
		<>
			<div className="text-black flex flex-col overflow-y-auto h-full p-4">
				{Object.entries(groupedResults).map(([key, items]) => {
					const [title, segment] = key.split('|||')
					return (
						<div key={key}>
							<Separator />
							<div className="flex items-center justify-between gap-4">
								<div className="flex items-center gap-4 text-xl font-semibold">
									<span className="text-primary">{icons.segments[items[0].icon]}</span>
									<span className="text-[hsl(var(--primary-dark))]">{title}</span>
								</div>
								<span className="text-sm text-right text-gray-500">{segment}</span>
							</div>
							{items.map((item, idx) => {
								if (item.action === 'download') {
									return (
										<a
											href={item.path}
											download
											className="flex cursor-pointer ml-8 p-2 rounded-lg hover:bg-gray-200"
											key={item.id || `${item.name}-${idx}`}
											onClick={e => e.stopPropagation()}>
											<div className="flex items-center justify-start gap-4 text-base">
												<span className="text-accent">{icons.develops[item.icon]}</span>
												<span className="w-11/12">{item.name}</span>
											</div>
										</a>
									)
								} else if (item.action === 'redirect') {
									return (
										<a
											href={item.path}
											target="_blank"
											className="flex cursor-pointer ml-8 p-2 rounded-lg hover:bg-gray-200"
											key={`${item.name}-${idx}`}>
											<div className="flex items-center justify-start gap-4 text-base">
												<span className="text-accent">{icons.develops[item.icon]}</span>
												<span className="w-11/12">{item.name}</span>
											</div>
										</a>
									)
								} else if (item.action === 'dialog') {
									return (
										<div
											className="flex cursor-pointer ml-8 p-2 rounded-lg hover:bg-gray-200"
											key={item.id || `${item.name}-${idx}`}
											onClick={() => handleItemClick(item)}>
											<div className="flex items-center justify-start gap-4 text-base">
												<span className="text-accent">{icons.develops[item.icon]}</span>
												<span className="w-11/12">{item.name}</span>
											</div>
										</div>
									)
								} else {
									return (
										<Link
											to={item.path}
											className="flex cursor-pointer ml-8 p-2 rounded-lg hover:bg-gray-200"
											key={item.id || `${item.name}-${idx}`}>
											<div className="flex items-center justify-start gap-4 text-base">
												<span className="text-accent">{icons.develops[item.icon]}</span>
												<span className="w-11/12">{item.name}</span>
											</div>
										</Link>
									)
								}
							})}
						</div>
					)
				})}
			</div>
			{/* Dialog para mostrar contenido personalizado */}
			<Dialog open={!!dialogItem} onOpenChange={open => !open && setDialogItem(null)}>
				<DialogContent>
					{dialogItem && (
						<>
							<DialogHeader>
								<DialogTitle>{dialogItem.title}</DialogTitle>
								<DialogDescription>{dialogItem.content}</DialogDescription>
							</DialogHeader>
							<div className="mt-4">
								<p className="text-lg font-semibold">{dialogItem.name}</p>
								<p className="text-base mt-2">{dialogItem.content}</p>
							</div>
						</>
					)}
				</DialogContent>
			</Dialog>
		</>
	)
}
