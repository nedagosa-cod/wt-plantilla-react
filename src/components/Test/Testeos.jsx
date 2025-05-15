import { useState } from 'react'

const data = [
	{ id: 1, titulo: 'Card 1', descripcion: 'Descripción de la card 1' },
	{ id: 2, titulo: 'Card 2', descripcion: 'Descripción de la card 2' },
	{ id: 3, titulo: 'Card 3', descripcion: 'Descripción de la card 3' },
	{ id: 4, titulo: 'Card 4', descripcion: 'Descripción de la card 4' },
	{ id: 5, titulo: 'Card 5', descripcion: 'Descripción de la card 5' },
	{ id: 6, titulo: 'Card 6', descripcion: 'Descripción de la card 6' },
	{ id: 7, titulo: 'Card 7', descripcion: 'Descripción de la card 7' },
	{ id: 8, titulo: 'Card 8', descripcion: 'Descripción de la card 8' },
	{ id: 9, titulo: 'Card 9', descripcion: 'Descripción de la card 9' },
	{ id: 10, titulo: 'Card 10', descripcion: 'Descripción de la card 10' },
]

const CARDS_PER_PAGE = 4

const Testeos = () => {
	const [pagina, setPagina] = useState(1)
	const totalPaginas = Math.ceil(data.length / CARDS_PER_PAGE)

	const startIndex = (pagina - 1) * CARDS_PER_PAGE
	const endIndex = startIndex + CARDS_PER_PAGE
	const cardsActuales = data.slice(startIndex, endIndex)

	return (
		<div className="test-elements">
			<div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
				{cardsActuales.map(card => (
					<div key={card.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', width: '200px' }}>
						<h3>{card.titulo}</h3>
						<p>{card.descripcion}</p>
					</div>
				))}
			</div>
			<div style={{ marginTop: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
				<button onClick={() => setPagina(p => Math.max(p - 1, 1))} disabled={pagina === 1}>
					Anterior
				</button>
				<span>
					Página {pagina} de {totalPaginas}
				</span>
				<button onClick={() => setPagina(p => Math.min(p + 1, totalPaginas))} disabled={pagina === totalPaginas}>
					Siguiente
				</button>
			</div>
		</div>
	)
}

export default Testeos
