import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import flujogram1 from '@/data/flujogram/flowSteps.json'
import flowSteps2 from '@/data/flujogram/flujogram_2.json'
import flowSteps3 from '@/data/flujogram/flujogram_3.json'
import flowSteps4 from '@/data/flujogram/flujogram_4.json'
import flowSteps5 from '@/data/flujogram/flujogram_5.json'
import flowSteps6 from '@/data/flujogram/flujogram_6.json'
import flowSteps7 from '@/data/flujogram/flujogram_7.json'
import flowSteps8 from '@/data/flujogram/flujogram_8.json'
import flowSteps9 from '@/data/flujogram/flujogram_9.json'
import {
	ArrowRight,
	ArrowLeft,
	ExternalLink,
	ImageIcon,
	CheckCircle,
	XCircle,
	AlertCircle,
	Play,
	FileText,
	RotateCcw,
	Info,
	AlertTriangle,
	Lightbulb,
} from 'lucide-react'
import ProgressPanel from './ProgressPanel'
import MiniMap from './MiniMap'
import DialogNote from './DialogNote'
import { cn } from '@/lib/utils'

const flujogramas = {
	1: flujogram1,
	2: flowSteps2,
	3: flowSteps3,
	4: flowSteps4,
	5: flowSteps5,
	6: flowSteps6,
	7: flowSteps7,
	8: flowSteps8,
	9: flowSteps9,
}

export default function FlowchartDiagram({ id }) {
	const [flowSteps, setFlowSteps] = useState(flujogramas[id])
	const [currentStep, setCurrentStep] = useState(1)
	const [selectedOption, setSelectedOption] = useState('')
	const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0 })
	const [isTransitioning, setIsTransitioning] = useState(false)
	const [selectedDropdown, setSelectedDropdown] = useState('')
	const [userResponses, setUserResponses] = useState({})
	const [showSummary, setShowSummary] = useState(false)

	useEffect(() => {
		const step = flowSteps[currentStep]
		if (step) {
			setCameraPosition({
				x: -step.position.x,
				y: -step.position.y,
			})
		}
	}, [currentStep])

	useEffect(() => {
		setFlowSteps(flujogramas[id])
		setCurrentStep(1)
		setSelectedOption('')
		setSelectedDropdown('')
		setUserResponses({})
		setShowSummary(false)
		setIsTransitioning(false)
		setCameraPosition({ x: 0, y: 0 })
	}, [id])

	const handleNext = nextStep => {
		setIsTransitioning(true)
		setTimeout(() => {
			setCurrentStep(nextStep)
			setSelectedOption('')
			setSelectedDropdown('')
			setIsTransitioning(false)
		}, 800)
	}

	const handleValidation = () => {
		const step = flowSteps[currentStep]
		const validationAction = step.actions.find(action => action.type === 'validation')
		const selectedChoice = validationAction.options.find(option => option.value === selectedOption)

		if (selectedChoice) {
			// Guardar la respuesta antes de avanzar
			const selectedLabel = selectedChoice.label
			setUserResponses(prev => ({
				...prev,
				[step.id]: {
					question: step.question,
					answer: selectedLabel,
					stepTitle: step.title,
				},
			}))

			handleNext(selectedChoice.nextStep)
		}
	}

	const handleDropdown = () => {
		const step = flowSteps[currentStep]
		const dropdownAction = step.actions.find(action => action.type === 'dropdown')
		const selectedChoice = dropdownAction.options.find(option => option.value === selectedDropdown)

		if (selectedChoice) {
			// Guardar la respuesta antes de avanzar
			const selectedLabel = selectedChoice.label
			setUserResponses(prev => ({
				...prev,
				[step.id]: {
					question: step.question,
					answer: selectedLabel,
					stepTitle: step.title,
				},
			}))

			handleNext(selectedChoice.nextStep)
		}
	}

	const handleRestart = () => {
		setCurrentStep(1)
		setSelectedOption('')
		setSelectedDropdown('')
		setUserResponses({})
	}

	const handleRedirect = url => {
		window.open(url, '_blank')
	}

	const handleShowSummary = () => {
		setShowSummary(true)
	}

	const handleCopySummary = () => {
		const summaryText = Object.values(userResponses)
			.map(response => `${response.question}: ${response.answer}`)
			.join('\n')

		navigator.clipboard
			.writeText(summaryText)
			.then(() => {
				alert('Resumen copiado al portapapeles')
			})
			.catch(err => {
				console.error('Error al copiar: ', err)
			})
	}

	const handleDownloadSummary = () => {
		const summaryText = Object.values(userResponses)
			.map(response => `${response.question}: ${response.answer}`)
			.join('\n')

		const blob = new Blob([summaryText], { type: 'text/plain' })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = 'resumen-proceso.txt'
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
		URL.revokeObjectURL(url)
	}

	const getStepIcon = type => {
		switch (type) {
			case 'start':
				return <Play className="w-6 h-6 text-blue-500" />
			case 'success':
				return <CheckCircle className="w-6 h-6 text-green-500" />
			case 'error':
				return <XCircle className="w-6 h-6 text-red-500" />
			case 'validation':
				return <AlertCircle className="w-6 h-6 text-yellow-500" />
			case 'dropdown':
				return <AlertCircle className="w-6 h-6 text-purple-500" />
			default:
				return <ArrowRight className="w-6 h-6 text-blue-500" />
		}
	}

	const getStepColor = (type, isActive) => {
		const baseClasses = isActive ? 'ring-4 ring-primary ring-opacity-50 shadow-xl' : 'shadow-lg '

		switch (type) {
			case 'start':
				return `bg-green-500 text-black ${baseClasses}`
			case 'success':
				return `bg-blue-500 text-white ${baseClasses}`
			case 'error':
				return `bg-red-500 text-white ${baseClasses}`
			case 'validation':
				return `bg-yellow-400 text-gray-800 ${baseClasses}`
			case 'dropdown':
				return `bg-purple-400 text-white ${baseClasses}`
			default:
				return `inset-0 -z-10 bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#e9eaf9_100%)] border-2 border-gray-300 ${baseClasses}`
		}
	}

	const renderConnections = () => {
		return Object.values(flowSteps).map(step => {
			return step.connections.map(targetId => {
				const target = flowSteps[targetId]
				if (!target) return null

				// Puntos de conexión desde el centro de cada paso
				const startX = step.position.x + 160 // Centro horizontal de la card (320px/2)
				const startY = step.position.y + 100 // Centro vertical aproximado
				const endX = target.position.x + 160
				const endY = target.position.y + 100

				// Calcular puntos de control para curvas suaves
				const deltaX = endX - startX
				const deltaY = endY - startY
				const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

				// Crear una curva suave
				const controlOffset = Math.min(distance * 0.3, 100)
				const midX1 = startX + (deltaX > 0 ? controlOffset : -controlOffset)
				const midY1 = startY + controlOffset
				const midX2 = endX - (deltaX > 0 ? controlOffset : -controlOffset)
				const midY2 = endY - controlOffset

				// Determinar puntos de inicio y fin en los bordes de las cards
				let actualStartX = startX
				let actualStartY = startY
				let actualEndX = endX
				let actualEndY = endY

				// Ajustar punto de inicio
				if (Math.abs(deltaX) > Math.abs(deltaY)) {
					// Conexión más horizontal
					actualStartX = deltaX > 0 ? step.position.x + 320 : step.position.x
					actualStartY = step.position.y + 100
				} else {
					// Conexión más vertical
					actualStartX = step.position.x + 160
					actualStartY = deltaY > 0 ? step.position.y + 200 : step.position.y
				}

				// Ajustar punto final
				if (Math.abs(deltaX) > Math.abs(deltaY)) {
					// Conexión más horizontal
					actualEndX = deltaX > 0 ? target.position.x : target.position.x + 320
					actualEndY = target.position.y + 100
				} else {
					// Conexión más vertical
					actualEndX = target.position.x + 160
					actualEndY = deltaY > 0 ? target.position.y : target.position.y + 200
				}

				const isActive = currentStep === step.id
				const strokeColor = isActive ? '#3b82f6' : '#94a3b8'
				const strokeWidth = isActive ? '4' : '2'

				return (
					<g key={`${step.id}-${targetId}`}>
						{/* Línea principal con curva suave */}
						<path
							d={`M ${actualStartX} ${actualStartY} 
                C ${midX1} ${midY1}, ${midX2} ${midY2}, ${actualEndX} ${actualEndY}`}
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							fill="none"
							strokeDasharray={isActive ? '8,4' : 'none'}
							style={{
								filter: isActive ? 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.5))' : 'none',
							}}
						/>

						{/* Flecha al final */}
						<g transform={`translate(${actualEndX}, ${actualEndY})`}>
							<polygon
								points="-8,-6 8,0 -8,6 -4,0"
								fill={strokeColor}
								transform={`rotate(${(Math.atan2(actualEndY - midY2, actualEndX - midX2) * 180) / Math.PI})`}
								style={{
									filter: isActive ? 'drop-shadow(0 0 2px rgba(59, 130, 246, 0.5))' : 'none',
								}}
							/>
						</g>

						{/* Punto de inicio (opcional, para debug) */}
						{isActive && <circle cx={actualStartX} cy={actualStartY} r="4" fill="#10b981" className="animate-ping" />}
					</g>
				)
			})
		})
	}

	const noteVariants = {
		info: {
			container: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-100',
			icon: 'text-blue-600 dark:text-blue-400',
			title: 'text-blue-900 dark:text-blue-100',
			iconComponent: Info,
		},
		warning: {
			container:
				'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-100',
			icon: 'text-amber-600 dark:text-amber-400',
			title: 'text-amber-900 dark:text-amber-100',
			iconComponent: AlertTriangle,
		},
		success: {
			container:
				'bg-green-50 border-green-200 text-green-900 dark:bg-green-950 dark:border-green-800 dark:text-green-100',
			icon: 'text-green-600 dark:text-green-400',
			title: 'text-green-900 dark:text-green-100',
			iconComponent: CheckCircle,
		},
		error: {
			container: 'bg-red-50 border-red-200 text-red-900 dark:bg-red-950 dark:border-red-800 dark:text-red-100',
			icon: 'text-red-600 dark:text-red-400',
			title: 'text-red-900 dark:text-red-100',
			iconComponent: XCircle,
		},
		danger: {
			container: 'bg-red-50 border-red-200 text-red-900 dark:bg-red-950 dark:border-red-800 dark:text-red-100',
			icon: 'text-red-600 dark:text-red-400',
			title: 'text-red-900 dark:text-red-100',
			iconComponent: AlertCircle,
		},
		tip: {
			container:
				'bg-purple-50 border-purple-200 text-purple-900 dark:bg-purple-950 dark:border-purple-800 dark:text-purple-100',
			icon: 'text-purple-600 dark:text-purple-400',
			title: 'text-purple-900 dark:text-purple-100',
			iconComponent: Lightbulb,
		},
	}
	const variantStyles = noteVariants['error']
	const IconComponent = variantStyles.iconComponent
	const currentStepData = flowSteps[currentStep]

	return (
		<div className="overflow-hidden relative w-full h-full">
			{/* Controls Panel */}
			<ProgressPanel currentStep={currentStep} currentStepData={currentStepData} flowSteps={flowSteps} />

			{/* Flowchart Canvas */}
			<div className="overflow-hidden absolute inset-0">
				<div
					className="transition-transform duration-1000 ease-in-out"
					style={{
						transform: `translate(${cameraPosition.x + window.innerWidth / 2 - 380}px, ${
							cameraPosition.y + window.innerHeight / 2 - 300
						}px)`,
						width: '100%',
						height: '100%',
					}}>
					{/* SVG for connections */}
					<svg
						className="absolute inset-0 pointer-events-none"
						style={{
							zIndex: 1,
							width: '4000px',
							height: '4000px',
							overflow: 'visible',
						}}
						viewBox="0 0 4000 4000"
						preserveAspectRatio="xMidYMid meet">
						{renderConnections()}
					</svg>

					{/* Flow Steps */}
					{Object.values(flowSteps).map(step => (
						<div
							key={step.id}
							className="absolute"
							style={{
								left: step.position.x,
								top: step.position.y,
								zIndex: currentStep === step.id ? 10 : 2,
							}}>
							<Card
								className={cn(
									`w-[600px] min-h-[300px] flex flex-col justify-center transition-all relative duration-500 pb-6 ${getStepColor(
										step.type,
										currentStep === step.id
									)} ${currentStep === step.id ? 'scale-110' : 'scale-100 opacity-20'}`
								)}>
								<CardContent className="p-6">
									<div className="flex justify-center items-center mb-4">{getStepIcon(step.type)}</div>

									<h3 className="mb-3 text-2xl font-bold text-center">{step.title}</h3>

									<p
										className="mb-4 text-lg leading-relaxed text-center"
										dangerouslySetInnerHTML={{ __html: step.content }}
									/>

									{/* Only show interactive elements for current step */}
									{currentStep === step.id && (
										<>
											{/* Validation Question */}
											{step.type === 'validation' && (
												<div className="p-4 mb-4 rounded-lg bg-white/20">
													<h4 className="mb-3 text-sm font-semibold text-center">{step.question}</h4>
													<RadioGroup
														value={selectedOption}
														onValueChange={setSelectedOption}
														className="flex justify-center space-x-6">
														{step.actions
															.find(action => action.type === 'validation')
															?.options.map(option => (
																<div key={option.value} className="flex items-center space-x-2">
																	<RadioGroupItem value={option.value} id={option.value} />
																	<Label htmlFor={option.value} className="text-sm cursor-pointer">
																		{option.label}
																	</Label>
																</div>
															))}
													</RadioGroup>
												</div>
											)}

											{/* Dropdown Question */}
											{step.type === 'dropdown' && (
												<div className="p-4 mb-4 rounded-lg bg-white/20">
													<h4 className="mb-3 text-sm font-semibold text-center">{step.question}</h4>
													<div className="flex justify-center">
														<select
															value={selectedDropdown}
															onChange={e => setSelectedDropdown(e.target.value)}
															className="px-3 py-2 w-full max-w-xs text-sm text-gray-800 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
															<option value="">
																{step.actions.find(action => action.type === 'dropdown')?.placeholder ||
																	'Selecciona una opción...'}
															</option>
															{step.actions
																.find(action => action.type === 'dropdown')
																?.options.map(option => (
																	<option key={option.value} value={option.value}>
																		{option.label}
																	</option>
																))}
														</select>
													</div>
												</div>
											)}

											{/* Note */}
											{step.type === 'note' && (
												<div
													className={cn(
														'relative rounded-lg border p-4 shadow-sm transition-all duration-200 hover:shadow-md',
														'border-l-4 bg-gradient-to-r from-transparent to-transparent',
														variantStyles.container
													)}>
													<div className="flex items-start space-x-3">
														<div className={cn('flex-shrink-0 mt-0.5', variantStyles.icon)}>
															<IconComponent size={20} />
														</div>
														<div className="flex-1 items-center min-w-0">
															<h4 className={cn('font-semibold text-md mb-2 leading-tight', variantStyles.title)}>
																Nota
															</h4>
															<div className="text-sm leading-relaxed">{step.note}</div>
														</div>
													</div>
												</div>
											)}

											{/* Action Buttons */}
											<div className="flex flex-wrap gap-4 justify-center items-center">
												{step.actions.map((action, index) => {
													if (action.type === 'validation') {
														return (
															<Button
																key={index}
																onClick={handleValidation}
																disabled={!selectedOption || isTransitioning}
																size="sm"
																className="bg-green-600 hover:bg-green-700">
																Continuar
																<ArrowRight className="ml-1 w-3 h-3" />
															</Button>
														)
													}

													if (action.type === 'dropdown') {
														return (
															<Button
																key={index}
																onClick={handleDropdown}
																disabled={!selectedDropdown || isTransitioning}
																size="sm"
																className="bg-purple-600 hover:bg-purple-700">
																Continuar
																<ArrowRight className="ml-1 w-3 h-3" />
															</Button>
														)
													}

													if (action.type === 'redirect') {
														return (
															<Button
																key={index}
																onClick={() => handleRedirect(action.url)}
																variant="outline"
																size="sm"
																className="text-blue-700 border-blue-300 ring-2 ring-blue-300 shadow-lg hover:bg-blue-50">
																{action.label}
																<ExternalLink className="ml-1 w-3 h-3" />
															</Button>
														)
													}

													if (action.type === 'image') {
														return (
															<Dialog key={index}>
																<DialogTrigger asChild>
																	<Button className="pop-image w-10 h-10 p-5 relative bg-white rounded-md overflow-hidden shadow-md cursor-pointer my-2 border border-primary hover:scale-110 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-7 before:h-7 before:bg-red-500 before:transform before:rotate-45 before:translate-x-1/2 before:translate-y-1/2 before:box-shadow before:shadow-red-700 after:content-[''] after:absolute after:left-2 after:top-2 after:w-3 after:h-3 after:bg-red-500 after:rounded-full after:transform after:rotate-0 after:origin-[35px_145px] hover:bg-white"></Button>
																</DialogTrigger>
																<DialogContent className="max-w-3xl">
																	<DialogHeader>
																		<DialogTitle>Guía Visual</DialogTitle>
																	</DialogHeader>
																	<div className="flex justify-center">
																		<img
																			src={'./noTocar/imagenes/flujogram/' + action.image || '/placeholder.svg'}
																			alt="Guía visual"
																			className="max-w-full h-auto rounded-lg border"
																		/>
																	</div>
																</DialogContent>
															</Dialog>
														)
													}

													if (action.type === 'summary') {
														return (
															<Button
																key={index}
																onClick={handleShowSummary}
																size="sm"
																className="bg-teal-600 hover:bg-teal-700">
																<FileText className="mr-1 w-3 h-3" />
																Ver Resumen
															</Button>
														)
													}
													return null
												})}
												<div className="flex absolute bottom-0 gap-2 justify-around w-full">
													{step.actions.map((action, index) => {
														if (action.type === 'next') {
															return (
																<Button
																	key={index}
																	onClick={() => handleNext(action.nextStep)}
																	size="sm"
																	className="bg-green-600 rounded-t-xl rounded-b-none shadow-lg hover:bg-green-700"
																	disabled={isTransitioning}>
																	Siguiente
																	<ArrowRight className="ml-1 w-3 h-3" />
																</Button>
															)
														}
														if (action.type === 'back') {
															return (
																<Button
																	key={index}
																	onClick={() => handleNext(action.nextStep)}
																	variant="outline"
																	size="sm"
																	disabled={isTransitioning}
																	className="text-gray-700 rounded-t-xl rounded-b-none border-gray-300 shadow-lg hover:bg-gray-50">
																	<ArrowLeft className="mr-1 w-3 h-3" />
																	Regresar
																</Button>
															)
														}
														if (action.type === 'restart') {
															return (
																<Button
																	key={index}
																	onClick={handleRestart}
																	variant="outline"
																	size="sm"
																	className="text-white bg-red-500 rounded-t-xl rounded-b-none border-gray-300 shadow-lg hover:bg-red-50">
																	<RotateCcw className="mr-1 w-3 h-3" />
																	Reiniciar
																</Button>
															)
														}
													})}
												</div>
											</div>
										</>
									)}
								</CardContent>
							</Card>
						</div>
					))}
				</div>
			</div>

			<MiniMap currentStep={currentStep} flowSteps={flowSteps} />
			<DialogNote
				showSummary={showSummary}
				setShowSummary={setShowSummary}
				userResponses={userResponses}
				handleCopySummary={handleCopySummary}
				handleDownloadSummary={handleDownloadSummary}
			/>

			{/* Summary Dialog */}
		</div>
	)
}
