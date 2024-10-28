import React, { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './slider.scss'
import IconColorNews from '../../icons/IconColorNews'

function SliderNews() {
	const [images, setImages] = useState([])
	const [zoom, setZoom] = useState('')
	let sliderRef = useRef(null)

	const settings = {
		dots: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		speed: 600,
		autoplaySpeed: 6000,
		pauseOnHover: true,
		dotsClass: 'slick-dots',
		cssEase: 'linear',
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					initialSlide: 1,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	}
	const handleZoom = element => {
		element.target.classList.contains('slider-container') && setZoom('')
		element.target.classList.contains('slick-list') && setZoom('zoom')
	}
	useEffect(() => {
		const urls = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => `BASES/NOTICIAS/Diapositiva${i}.JPG`)
		const validImages = []

		urls.forEach((url, index) => {
			const img = new Image()
			img.onload = () => {
				validImages.push(url)
				if (index === urls.length - 1) {
					setImages(validImages) // Actualiza el estado con las imágenes válidas
				}
			}
			img.onerror = () => {
				if (index === urls.length - 1) {
					setImages(validImages) // Asegura la actualización al final
				}
			}
			img.src = url
		})

		const handleEscape = event => {
			if (event.key === 'Escape') {
				setZoom('')
			}
		}

		document.addEventListener('keydown', handleEscape)

		return () => {
			document.removeEventListener('keydown', handleEscape)
		}
	}, [])

	return (
		<div className={'slider-container ' + zoom} onClick={e => handleZoom(e)}>
			<div className={'slider-container__title ' + zoom}>
				<IconColorNews /> <h1>Noticias</h1> <IconColorNews />
			</div>
			<Slider
				ref={slider => {
					sliderRef = slider
				}}
				{...settings}>
				{images.length > 0 ? (
					images.map((url, index) => (
						<figure key={index}>
							<img src={url} alt={`noticia ${index + 1}`} />
						</figure>
					))
				) : (
					<div>No news</div>
				)}
			</Slider>
		</div>
	)
}

export default SliderNews
