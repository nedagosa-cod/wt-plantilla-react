import './styles/biblioteca.scss'
import dbBiblioteca from './bases/biblioteca.json'
import imgPDF from '../../assets/images/index/bibliotecaPDF.jpg'
import imgXLS from '../../assets/images/index/bibliotecaXLS.jpg'
import imgAUDIO from '../../assets/images/index/bibliotecaAUDIO.jpg'
import { useState } from 'react'

const Biblioteca = () => {
	const [book, setBook] = useState(1)
	const typeBook = {
		pdf: imgPDF,
		xls: imgXLS,
		mp3: imgAUDIO,
	}
	return (
		<section className="biblioteca">
			<div className="book-stand">
				<h1 className="biblioteca__title">Biblioteca Amiga</h1>
				<div className="shelf">
					<div className="row">
						<div className="loc">
							{dbBiblioteca &&
								dbBiblioteca.map((book, i) => {
									if (i < 5) {
										return (
											<div className="book dato-buscado" onClick={() => setBook(book.name)} key={i}>
												<figure className="cover">
													<img className="sample" src={typeBook[book.type]} />
													<p>{book.name}</p>
												</figure>
												<div className="shadow"></div>
											</div>
										)
									}
								})}
						</div>
					</div>
					<div className="row">
						<div className="loc">
							{dbBiblioteca &&
								dbBiblioteca.map((book, i) => {
									if (i >= 5 && i < 10) {
										return (
											<div className="book dato-buscado" onClick={() => setBook(book.name)} key={i}>
												<figure className="cover">
													<img className="sample" src={typeBook[book.type]} />
													<p>{book.name}</p>
												</figure>
												<div className="shadow"></div>
											</div>
										)
									}
								})}
						</div>
					</div>
					<div className="row">
						<div className="loc">
							{dbBiblioteca &&
								dbBiblioteca.map((book, i) => {
									if (i >= 10 && i < 16) {
										return (
											<div className="book dato-buscado" onClick={() => setBook(book.name)} key={i}>
												<figure className="cover">
													<img className="sample" src={typeBook[book.type]} />
													<p>{book.name}</p>
												</figure>
												<div className="shadow"></div>
											</div>
										)
									}
								})}
						</div>
					</div>
				</div>
				<div className="pagination">
					<span>{'<'}</span>
					<p>1</p>
					<p>2</p>
					<p>3</p>
					<p>4</p>
					<p>...</p>
					<span>{'>'}</span>
				</div>
			</div>
			<div className="book-preview">
				<embed src={'./BIBLIOTECA/' + book + '.pdf'} type="application/pdf" />
			</div>
		</section>
	)
}

export default Biblioteca
