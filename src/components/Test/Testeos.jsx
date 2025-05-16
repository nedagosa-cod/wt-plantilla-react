import { useSearch } from '@/context/SearchProvider'
import { useState } from 'react'
import PaginationWT from '../WebTraining/pagination/PaginationWT'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const data = [
	{ id: 1, titulo: 'Cancelacion de tarjeta', descripcion: 'Descripción de la card 1' },
	{ id: 2, titulo: 'Cancelacion de Cuenta', descripcion: 'Descripción de la card 2' },
	{ id: 3, titulo: 'Cancelación de Suscripción', descripcion: 'Descripción de la card 3' },
	{ id: 4, titulo: 'Card 4', descripcion: 'Descripción de la card 4' },
	{ id: 5, titulo: 'Card 5', descripcion: 'Descripción de la card 5' },
	{ id: 6, titulo: 'Card 6', descripcion: 'Xiomara' },
	{ id: 7, titulo: 'Card 7', descripcion: 'Descripción de la card 7' },
	{ id: 8, titulo: 'Card 8', descripcion: 'Descripción de la card 8' },
	{ id: 9, titulo: 'Card 9', descripcion: 'Cancelacion de la card 9' },
	{ id: 10, titulo: 'Card 10', descripcion: 'Cancelación de la card 10' },
]

const CARDS_PER_PAGE = 4

const Testeos = () => {
	const { paginationValues } = useSearch()
	const [pagina, setPagina] = useState(1)
	const { totalPaginas, cardsActuales } = paginationValues({ data, pagina, CARDS_PER_PAGE })

	return (
		<div className="flex flex-col gap-4 justify-center items-center h-full">
			<div className="flex flex-wrap gap-4">
				{cardsActuales.map(card => (
					<Card key={card.id} className="border border-gray-300 rounded-md p-4 w-64">
						<CardTitle>{card.titulo}</CardTitle>
						<CardDescription>{card.descripcion}</CardDescription>
					</Card>
				))}
			</div>
			<PaginationWT pagina={pagina} totalPaginas={totalPaginas} setPagina={setPagina} />
		</div>
	)
}

export default Testeos
