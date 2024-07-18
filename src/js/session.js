const sendForm = document.getElementById('sendForm')
const modalSession = document.querySelector('.session__modal')
if (sessionStorage.length == 0 || sessionStorage.session == 'false') {
	sendForm.parentNode.parentNode.classList.remove('hide')
} else {
	sendForm.parentNode.parentNode.classList.add('hide')
}

const showModal = data => {
	modalSession.close()
	modalSession.showModal()

	switch (data.icon) {
		case 'success':
			modalSession.children[0].children[1].classList.remove('show')
			modalSession.children[0].children[2].classList.remove('show')
			modalSession.children[0].children[0].classList.add('show')
			break

		case 'error':
			modalSession.children[0].children[0].classList.remove('show')
			modalSession.children[0].children[2].classList.remove('show')
			modalSession.children[0].children[1].classList.add('show')
			break

		default:
			modalSession.children[0].children[2].classList.add('show')
			modalSession.children[0].children[1].classList.remove('show')
			modalSession.children[0].children[0].classList.remove('show')
			break
	}

	modalSession.children[1].innerHTML = data.title
	modalSession.children[2].innerHTML = data.message
	data.loader ? '' : modalSession.children[3].classList.add('hide')
	data.loader
		? modalSession.children[4].classList.add('hide')
		: modalSession.children[4].classList.remove('hide')
	modalSession.children[4].children[0].addEventListener('click', () => {
		modalSession.close()
	})
}

sendForm.addEventListener('submit', e => {
	e.preventDefault()
	const data = {
		usuario: e.target.elements[0].value,
		campana: e.target.elements[1].value,
		modulo: e.target.elements[2].value,
		observaciones: e.target.elements[3].value,
	}
	e.target.parentNode.parentNode.remove()
	showModal({
		title: 'Se estan enviado los datos del inicio de sesion',
		message: 'Enviado datos espere unos segundos...',
		loader: true,
	})
	// https://retoolapi.dev/luBbwU/data
	// http://colbogweb20:8081/Webservices_Simulador/api/main/insUpdTransaccion
	fetch('https://retoolapi.dev/luBbwU/data', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	})
		.then(response => {
			console.log(response)
			return response.json()
		})
		.then(result => {
			sessionStorage.setItem('session', true)
			showModal({
				icon: 'success',
				title: 'Datos enviados correctamente',
				message: 'Los datos han sido registrados correctamente para el inicio de sesión',
			})
		})
		.catch(error => {
			sessionStorage.setItem('session', false)
			showModal({
				icon: 'error',
				title: 'Error',
				message:
					'Los datos no se enviaron por un error a la conexión con la base del control de  accesos.',
			})
			console.log(error)
		})
})
