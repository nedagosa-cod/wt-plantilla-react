import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './styles.scss'
import Swal from 'sweetalert2'

export default function Corrector() {
	const [dataCorrector, setDataCorrector] = useState('')
	const [activeRecording, setActiveRecording] = useState(false)
	const [speechRecognition, setSpeechRecognition] = useState(null)
	const module = {
		toolbar: [
			['bold', 'italic', 'underline', 'strike'], // toggled buttons
			['blockquote', 'code-block'],
			['link', 'image', 'formula'],

			[{ header: 1 }, { header: 2 }], // custom button values
			[{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
			[{ script: 'sub' }, { script: 'super' }], // superscript/subscript
			[{ indent: '-1' }, { indent: '+1' }], // outdent/indent
			[{ direction: 'rtl' }], // text direction

			[{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
			[{ header: [1, 2, 3, 4, 5, 6, false] }],

			[{ color: [] }, { background: [] }], // dropdown with defaults from theme
			[{ font: [] }],
			[{ align: [] }],

			['clean'], // remove formattin
		],
	}

	const startRecording = () => {
		const recognition = new window.webkitSpeechRecognition() // For Chrome
		recognition.continuous = true
		recognition.lang = 'es-ES'

		recognition.onstart = function () {
			setActiveRecording(true)
		}

		recognition.onend = function () {
			setActiveRecording(false)
		}

		recognition.onresult = function (event) {
			const transcript = event.results[event.results.length - 1][0].transcript
			setDataCorrector(dataCorrector + ' ' + transcript)
		}

		recognition.start()
		setSpeechRecognition(recognition)
		const Toast = Swal.mixin({
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
			didOpen: toast => {
				toast.onmouseenter = Swal.stopTimer
				toast.onmouseleave = Swal.resumeTimer
			},
		})
		Toast.fire({
			title: 'Grabando...',
		})
	}

	const stopRecording = () => {
		if (speechRecognition) {
			speechRecognition.stop()
		}
	}

	const toggleRecording = e => {
		if (activeRecording) {
			stopRecording()
		} else {
			startRecording()
		}
	}

	const guardarValor = valor => {
		setDataCorrector(valor)
	}
	const copiarTexto = () => {
		const corrector = document.querySelector('.corrector-ortografico__quill .ql-editor')
		const contenido = corrector.innerText
		navigator.clipboard
			.writeText(contenido)
			.then(() => console.log('Texto copiado al portapapeles'))
			.catch(error => console.error('Error al copiar texto: ', error))
		//ALERTA
		const Toast = Swal.mixin({
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
			didOpen: toast => {
				toast.onmouseenter = Swal.stopTimer
				toast.onmouseleave = Swal.resumeTimer
			},
		})
		Toast.fire({
			icon: 'success',
			title: 'Texto copiado correctamente',
		})
	}
	return (
		<section className="corrector-ortografico">
			<h1 className="corrector-ortografico__title">CORRECTOR ORTOGRAFICO</h1>

			<section className="corrector-ortografico__box">
				<ReactQuill
					theme="snow"
					value={dataCorrector}
					modules={module}
					className="corrector-ortografico__quill"
					onChange={valor => guardarValor(valor)}
				/>

				<div className="corrector-ortografico__buttons">
					<div className={`button ${activeRecording ? 'active' : ''}`} onClick={toggleRecording}>
						<div className="inner"></div>
					</div>
					<button className="Btn" onClick={copiarTexto}>
						<svg viewBox="0 0 512 512" className="svgIcon" height="1em">
							<path d="M288 448H64V224h64V160H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H288c35.3 0 64-28.7 64-64V384H288v64zm-64-96H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H224c-35.3 0-64 28.7-64 64V288c0 35.3 28.7 64 64 64z"></path>
						</svg>
						<p className="text">COPIAR TEXTO</p>
						<span className="effect"></span>
					</button>
				</div>
			</section>
		</section>
	)
}
