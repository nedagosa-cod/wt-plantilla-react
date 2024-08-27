import { useContext, useState } from 'react'
import './test.scss'
import baseNotis from './testBaseNoti.json'
import GlobalContext from '../../context/GlobalContext'
import IconEdit from '../../icons/IconEdit'

const BasesNoti = () => {
	const { admin } = useContext(GlobalContext)
	const [baseNoticias, setBaseNotis] = useState(baseNotis)
	const [edit, setEdit] = useState(false)

	const editTitle = value => {
		setEdit(!edit)
	}

	const updateBase = (valor, id, clave) => {
		setBaseNotis(prevData => {
			return prevData.map((noticia, i) => {
				if (noticia.ID == id) {
					return { ...noticia, [clave]: valor }
				} else {
					return { ...noticia }
				}
			})
		})
	}

	const downloadBase = () => {
		const jsonString = JSON.stringify(baseNoticias)
		const blob = new Blob([jsonString], { type: 'application/json' })
		const enlace = document.createElement('a')
		enlace.href = URL.createObjectURL(blob)
		enlace.download = 'baseNoticias.json'

		// Simular un clic en el enlace
		enlace.click()

		// Liberar el objeto URL
		URL.revokeObjectURL(enlace.href)
	}

	return (
		<div className="test">
			{baseNoticias.map((noti, i) => {
				return (
					<section key={i} className="test__container">
						<div className="edit">
							{admin && (
								<button onClick={editTitle}>
									<IconEdit />
								</button>
							)}

							{!edit ? (
								<h1>{noti.TITULO}</h1>
							) : (
								<input
									type="text"
									value={noti.TITULO}
									onChange={e => updateBase(e.target.value, noti.ID, 'TITULO')}
									onBlur={e => {
										updateBase(e.target.value, noti.ID, 'TITULO')
										setEdit(false)
									}}
									onKeyUp={e => {
										e.key === 'Enter' && setEdit(false)
									}}
								/>
							)}
						</div>

						<div className="edit">
							{admin && (
								<button>
									<IconEdit />
								</button>
							)}
							{!edit ? (
								<p>{noti.DESCRIPCION}</p>
							) : (
								<textarea
									value={noti.DESCRIPCION}
									onChange={e => updateBase(e.target.value, noti.ID, 'DESCRIPCION')}
									onBlur={e => {
										updateBase(e.target.value, noti.ID, 'DESCRIPCION')
										setEdit(false)
									}}></textarea>
							)}
						</div>
					</section>
				)
			})}
			<button className="test__download" onClick={downloadBase}>
				Descargar base
			</button>
		</div>
	)
}

export default BasesNoti
