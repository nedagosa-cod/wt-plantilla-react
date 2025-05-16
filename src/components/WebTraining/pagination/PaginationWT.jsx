import { Button } from '@/components/ui/button'
import React from 'react'

export default function PaginationWT({ pagina, totalPaginas, setPagina }) {
	return (
		<div className="mt-4 flex gap-2 items-center mx-auto">
			<Button onClick={() => setPagina(p => Math.max(p - 1, 1))} disabled={pagina === 1}>
				Anterior
			</Button>
			<span>
				Página {pagina} de {totalPaginas}
			</span>
			<Button onClick={() => setPagina(p => Math.min(p + 1, totalPaginas))} disabled={pagina === totalPaginas}>
				Siguiente
			</Button>
		</div>
	)
}
