import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
	return twMerge(clsx(inputs))
}

export function formatDate(dateString) {
	const date = new Date(dateString)
	return date.toLocaleDateString('es-ES', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	})
}
