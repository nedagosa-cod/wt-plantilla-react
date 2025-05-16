import { useEffect, useState } from 'react'
import imgBack from '../../assets/images/index/backWelcome.jpg'
import imgBackD from '../../assets/images/index/backWelcome-dark.jpg'
import imgBgLightHalloween from '../../assets/images/index/bg-light-Halloween.jpg'
import imgBgDarkHalloween from '../../assets/images/index/bg-dark-Halloween.jpg'
import imgBgLightNovember from '../../assets/images/index/bg-light-november.jpg'
import imgBgDarkNovember from '../../assets/images/index/bg-dark-november.jpg'
import imgBgLightNavidad from '../../assets/images/index/bg-light-navidad.jpg'
import imgBgDarkNavidad from '../../assets/images/index/bg-dark-navidad.jpg'
import GlobalContext from '../../context/GlobalContext'
import { ImageSlider } from '../WebTraining/noticias'
import { imageSlides } from '../../data/slides'

// Hook para detectar modo oscuro/claro
function useIsDarkMode() {
	const [isDark, setIsDark] = useState(false)

	useEffect(() => {
		const checkDark = () => {
			setIsDark(document.documentElement.classList.contains('dark'))
		}
		checkDark()
		const observer = new MutationObserver(checkDark)
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
		return () => observer.disconnect()
	}, [])

	return isDark
}

export default function Bienvenida() {
	const isDark = useIsDarkMode()

	const setBackground = () => {
		const month = new Date().getMonth() + 1
		switch (month) {
			case 10:
				return `url(${isDark ? imgBgDarkHalloween : imgBgLightHalloween})`
			case 11:
				return `url(${isDark ? imgBgDarkNovember : imgBgLightNovember})`
			case 12:
				return `url(${isDark ? imgBgDarkNavidad : imgBgLightNavidad})`
			default:
				return `url(${isDark ? imgBackD : imgBack})`
		}
	}
	const style = {
		backgroundImage: setBackground(),
	}
	return (
		<div className="flex text-center items-center h-full w-full text-foreground bg-cover bg-center" style={style}>
			<section className="flex flex-col gap-4 ml-6">
				<div className="mt-8 rounded-lg bg-muted p-4 text-sm text-muted-foreground">
					<p>
						<span className="font-medium">Noticias:</span> Presiona click en la imagen para ampliarla. Click en los
						botones laterales para cambiar de noticia!.
					</p>
				</div>
				<ImageSlider slides={imageSlides} autoPlayInterval={4000} className="shadow-xl" />
			</section>
		</div>
	)
}
