import { useState } from 'react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select'

const checklist = {
	A: {
		TEXTO: 'Validar que en correo tenga la información Requerida (También validar el asunto)',
		ESTADO: 'NO REALIZADO',
	},
	B: {
		TEXTO: 'Motivo de la liberación',
		ESTADO: 'NO REALIZADO',
	},
	C: {
		TEXTO: 'Base de reporte de gestión diaria (todas las hojas)',
		ESTADO: 'NO REALIZADO',
	},
	D: {
		TEXTO: 'bitácora fuera de horario - 24 horas',
		ESTADO: 'NO REALIZADO',
	},
	E: {
		TEXTO: 'Validar si el pedido o la orden de cargue esta bloqueada',
		ESTADO: 'NO REALIZADO',
	},
	F: {
		TEXTO: 'Validar tipo de EDS segmento y cliente',
		ESTADO: 'NO REALIZADO',
	},
	G: {
		TEXTO: 'Validar textos de las facturas (Si aplica)',
		ESTADO: 'NO REALIZADO',
	},
	H: {
		TEXTO: 'Subtotalizar la cartera',
		ESTADO: 'NO REALIZADO',
	},
	I: {
		TEXTO: 'Validar soportes de pago y estados de los mismos. (Abonado, aprobado, exitoso)',
		ESTADO: 'NO REALIZADO',
	},
	J: {
		TEXTO: 'Validar fecha siguiente del pedido ',
		ESTADO: 'NO REALIZADO',
	},
	K: {
		TEXTO: 'Diligenciar la plantilla correctamente',
		ESTADO: 'NO REALIZADO',
	},
	L: {
		TEXTO: 'Adjuntar la evidencia de la cartera ',
		ESTADO: 'NO REALIZADO',
	},
	M: {
		TEXTO: 'Copiar a la planta y a liberación',
		ESTADO: 'NO REALIZADO',
	},
	N: {
		TEXTO: 'Tipificar',
		ESTADO: 'NO REALIZADO',
	},
}

const estados = ['REALIZADO', 'NO APLICA', 'NO REALIZADO']

const colores = {
	REALIZADO: 'bg-green-100',
	'NO APLICA': 'bg-secondary/10',
	'NO REALIZADO': 'bg-primary/10',
}
const colores2 = {
	REALIZADO: 'bg-green-800',
	'NO APLICA': 'bg-secondary',
	'NO REALIZADO': 'bg-primaryDark',
	'': 'bg-primaryDark',
}
const colores3 = {
	REALIZADO: 'border-green-800',
	'NO APLICA': 'border-secondary',
	'NO REALIZADO': 'border-primaryDark',
	'': 'border-foreground/10',
}
const colores4 = {
	REALIZADO: 'bg-green-700 text-background',
	'NO APLICA': 'bg-secondary/50 text-background',
	'NO REALIZADO': 'bg-primaryDark/50 text-background',
	'': 'bg-secondary/20 text-foreground',
}
export default function ChecklistComponent({estadoChecklist, setEstadoChecklist}) {
	const puedeEditar = letra => {
		if (letra === 'A') return true
		const anterior = String.fromCharCode(letra.charCodeAt(0) - 1)
		return estadoChecklist[anterior] !== ''
	}

	const handleEstadoChange = (letra, value) => {
		setEstadoChecklist(prev => ({
			...prev,
			[letra]: value,
		}))
	}

	return (
		<div className="w-full flex justify-evenly items-center flex-wrap bg-background rounded-lg">
			<div className="w-full py-4 flex flex-col gap-2">
				{Object.entries(checklist).map(([letra, { TEXTO }]) => (
					<div
						key={letra}
						className={`p-2 px-6 flex flex-wrap justify-between rounded-lg items-center ${
							colores[estadoChecklist[letra] || '']
						}`}>
						<div className="flex items-center gap-2 text-foreground font-semibold max-w-[66%]">
							<span
								className={`text-2xl font-bold flex justify-center items-center w-14 h-14 text-background rounded-lg shadow-[-4px_4px_0px_#000] drop-shadow-[-1px_1px_1px_rgba(0,0,0,0.8)] ${
									colores2[estadoChecklist[letra] || '']
								}`}>
								{letra}
							</span>

							<p className={`text-base p-2 ml-4 border-solid border-b-4 ${colores3[estadoChecklist[letra] || '']}`}>{TEXTO}</p>
						</div>
						<Select
							disabled={!puedeEditar(letra)}
							onValueChange={value => handleEstadoChange(letra, value)}
							value={estadoChecklist[letra]}>
							<SelectTrigger className={`w-[30%] ${colores4[estadoChecklist[letra] || '']}`}>
								<SelectValue placeholder="Selecciona estado" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{estados.map(estado => (
										<SelectItem key={estado} value={estado}>
											{estado}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				))}
			</div>
		</div>
	)
}
