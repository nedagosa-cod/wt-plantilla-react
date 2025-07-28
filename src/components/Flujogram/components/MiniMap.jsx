import React from 'react'

export default function MiniMap({ currentStep, flowSteps }) {
	return (
		<div className="absolute z-20 w-48 h-32 p-3 bg-white rounded-lg shadow-lg bottom-4 right-4">
			<div className="mb-2 text-xs font-medium text-gray-600">Vista General</div>
			<div className="relative w-full h-full overflow-hidden bg-gray-100 rounded ">
				{Object.values(flowSteps).map(step => (
					<div
						key={step.id}
						className={`absolute w-2 h-2 rounded-full  ${
							currentStep === step.id ? 'bg-primary ring-2 ring-primaryLight' : 'bg-gray-400'
						}`}
						style={{
							left: `${((step.position.x + 2000) / 4000) * 100}%`,
							top: `${((step.position.y + 200) / 4000) * 100}%`,
						}}
					/>
				))}
			</div>
		</div>
	)
}
