import { Badge } from '@/components/ui/badge'
import React from 'react'

export default function ProgressPanel({ currentStep, currentStepData, flowSteps }) {
	return (
		<div className="absolute z-10 max-w-sm p-4 bg-white rounded-lg shadow-lg top-4 left-4">
			<div className="flex items-center justify-between mb-2">
				<span className="text-sm font-medium text-gray-600">Progreso</span>
				<Badge variant="outline">Paso {currentStep}</Badge>
			</div>
			<div className="w-full h-2 mb-3 bg-gray-200 rounded-full">
				<div
					className="h-2 transition-all duration-500 bg-blue-600 rounded-full"
					style={{ width: `${(currentStep / Object.keys(flowSteps).length) * 100}%` }}
				/>
			</div>
			<h3 className="text-sm font-semibold text-gray-800">{currentStepData.title}</h3>
		</div>
	)
}
