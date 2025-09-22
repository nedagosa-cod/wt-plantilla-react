import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import appsData from './appsDDBB.json'

// Función para copiar al portapapeles
const copyToClipboard = link => {
	navigator.clipboard
		.writeText(link)
		.then(() => {
			// Crear una notificación visual temporal
			const notification = document.createElement('div')
			notification.textContent = '¡Link copiado al portapapeles!'
			notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4ade80;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      z-index: 1000;
      font-weight: 500;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    `
			document.body.appendChild(notification)

			// Remover después de 3 segundos
			setTimeout(() => {
				if (notification.parentNode) {
					notification.parentNode.removeChild(notification)
				}
			}, 3000)
		})
		.catch(err => {
			console.error('Error al copiar: ', err)
			// Notificación de error
			const errorNotification = document.createElement('div')
			errorNotification.textContent = 'Error al copiar el link'
			errorNotification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ef4444;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      z-index: 1000;
      font-weight: 500;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    `
			document.body.appendChild(errorNotification)

			setTimeout(() => {
				if (errorNotification.parentNode) {
					errorNotification.parentNode.removeChild(errorNotification)
				}
			}, 3000)
		})
}

// Función para obtener colores según el área
const getColorByArea = area => {
	const colors = {
		HOGAR: 'bg-gradient-to-br from-blue-500 to-blue-600',
		MOVIL: 'bg-gradient-to-br from-green-500 to-green-600',
		VENTAS: 'bg-gradient-to-br from-purple-500 to-purple-600',
		OTROS: 'bg-gradient-to-br from-orange-500 to-orange-600',
		ADICIONALES: 'bg-gradient-to-br from-pink-500 to-pink-600',
	}
	return colors[area] || 'bg-gradient-to-br from-gray-500 to-gray-600'
}

// Función para obtener la imagen correcta basándose en el nombre
const getImageByName = imageName => {
	// Verificar si el nombre ya incluye la extensión
	if (imageName.includes('.')) {
		return `noTocar/imagenes/applinks/${imageName}`
	}
	// Si no incluye extensión, intentar primero con .PNG
	return `noTocar/imagenes/applinks/${imageName}.PNG`
}

// Mapear datos de la nueva estructura a la estructura del componente
const apps = appsData.map((app, index) => ({
	id: index + 1,
	title: app.TITULO,
	description: app.AREA,
	color: getColorByArea(app.AREA),
	textColor: 'text-white',
	link: app.LINK,
	icon: getImageByName(app.IMAGEN),
	area: app.AREA,
	hasClipboard: app.CLIPBOARD || false,
}))

export default function AppsWeb() {
	const [selectedApp, setSelectedApp] = useState(apps[0])
	const [hoveredApp, setHoveredApp] = useState(null)
	const [isHovering, setIsHovering] = useState(false)
	const timeoutRef = useRef(null)

	// Efecto para manejar el cambio de aplicación con retraso
	useEffect(() => {
		if (hoveredApp && isHovering) {
			timeoutRef.current = setTimeout(() => {
				setSelectedApp(hoveredApp)
			}, 200) // Pequeño retraso para evitar cambios rápidos
		}

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
		}
	}, [hoveredApp, isHovering])

	// Manejador de hover
	const handleHover = app => {
		setHoveredApp(app)
		setIsHovering(true)
	}

	// Manejador para cuando el mouse sale
	const handleHoverEnd = () => {
		setIsHovering(false)
	}

	return (
		<div className="overflow-hidden mx-auto h-full rounded-xl shadow-lg">
			{/* Título principal */}
			<div className="px-4 py-1 m-auto mb-4 bg-white rounded-b-3xl border-b-2 border-primary w-fit">
				<h1 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-primaryDark via-primary to-primaryDark">
					Aplicativos Web
				</h1>
			</div>

			<div className="flex flex-col gap-6 p-4 lg:flex-row relative lg:h-[400px] 2xl:h-[500px] justify-center">
				{/* Tarjeta grande a la izquierda */}
				<div className="flex overflow-hidden justify-center items-center w-full max-w-xl">
					<AnimatePresence mode="wait">
						<motion.div
							key={selectedApp.id}
							initial={{ x: -20, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							exit={{ x: 20, opacity: 0 }}
							transition={{ duration: 0.3 }}
							className="w-full max-w-full h-full">
							<div
								className={`flex flex-col items-center justify-between p-6 w-full h-full max-h-[550px] rounded-lg ${selectedApp.color} ${selectedApp.textColor} overflow-hidden`}>
								<div className="flex flex-col justify-center items-center rounded-lg">
									<figure className="flex justify-center items-center mb-4 w-full max-h-60 bg-gradient-to-br rounded-lg from-slate-100 to-slate-300">
										<img
											src={selectedApp.icon}
											alt={selectedApp.title}
											className="object-contain w-3/4 h-full max-h-48"
										/>
									</figure>
									<h2 className="mb-2 text-2xl font-bold text-center">{selectedApp.title}</h2>
									<p className="mb-4 text-base text-center opacity-90">{selectedApp.description}</p>
								</div>

								{selectedApp.hasClipboard ? (
									<Button
										className="justify-between mt-4 w-full text-white bg-gray-800 hover:bg-gray-700"
										size="lg"
										onClick={() => copyToClipboard(selectedApp.link)}>
										<span>Copiar link</span>
										<Copy className="ml-2 w-5 h-5" />
									</Button>
								) : (
									<Button
										className="justify-between mt-4 w-full text-white bg-gray-800 hover:bg-gray-700"
										size="lg"
										onClick={() => window.open(selectedApp.link, '_blank')}>
										<span>Ir a la aplicación</span>
										<ArrowRight className="ml-2 w-5 h-5" />
									</Button>
								)}
							</div>
						</motion.div>
					</AnimatePresence>
				</div>

				{/* Cuadrícula de tarjetas a la derecha */}
				<div className="overflow-y-auto p-2 w-full h-auto lg:w-1/2">
					<div className="flex flex-wrap gap-3 justify-center">
						{apps.map(app => (
							<motion.div
								key={app.id}
								whileHover={{ scale: 1.05 }}
								onHoverStart={() => handleHover(app)}
								onHoverEnd={handleHoverEnd}
								onClick={() => {
									setSelectedApp(app)
									// Redirección al hacer click
									if (app.hasClipboard) {
										copyToClipboard(app.link)
									} else {
										window.open(app.link, '_blank')
									}
								}}
								className={`cursor-pointer rounded-lg p-3 transition-all duration-200 dato-buscado ${
									selectedApp.id === app.id ? app.color : 'bg-gray-100 hover:shadow-md'
								}`}>
								<div className="flex flex-col justify-center items-center w-36 h-36">
									<figure className="flex justify-center items-center mb-2 w-20 h-20">
										<img src={app.icon} alt={app.title} className="object-contain w-full h-full" />
									</figure>
									<p
										className={`text-center text-xs font-medium leading-tight ${
											selectedApp.id === app.id ? 'text-white' : 'text-gray-700'
										}`}>
										{app.title}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
