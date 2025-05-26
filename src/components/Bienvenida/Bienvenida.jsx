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
		<div className="flex items-center h-full w-full text-foreground bg-cover bg-center" style={style}>
			<section className="flex flex-col gap-1 ml-6 w-[40.333%] bg-red p-1 rounded-lg">
				<div className="text-sm text-muted-foreground w-full shadow-[2px_2px_4px_rgba(0,0,0,0.6)]">
					<p className="flex items-center justify-center p-2 shadow-[2px_2px_4px_rgba(0,0,0,0.6)] bg-background">
						<div className="relative w-16 h-12 bg-white dark:bg-neutral-900 rounded-md shadow-lg overflow-hidden border border-gray-300 dark:border-neutral-700">
							{/* Cubierta izquierda (simula contenido del libro) */}
							<div className="absolute inset-0 px-1 py-1 flex flex-col justify-between z-0">
								{[...Array(4)].map((_, i) => (
									<div key={i} className="h-[2px] bg-gray-300 dark:bg-neutral-600 w-full rounded" />
								))}
							</div>

							{/* Página animada */}
							<div className="absolute top-0 left-0 w-1/2 h-full bg-white dark:bg-neutral-800 origin-left rounded-sm animate-page-flip shadow-md z-10 border-r border-gray-300 dark:border-neutral-700" />

							{/* Cubierta derecha (simula otra página) */}
							<div className="absolute right-0 top-0 w-1/2 h-full bg-white dark:bg-neutral-900 px-1 py-1 z-0">
								{[...Array(4)].map((_, i) => (
									<div key={i} className="h-[2px] bg-gray-300 dark:bg-neutral-600 w-full rounded mb-1" />
								))}
							</div>
						</div>


						<span className="font-black text-2xl md:text-3xl px-2 py-1 rounded tracking-widest text-soft">
							Noticias
						</span>

					</p>
				</div>
				<ImageSlider slides={imageSlides} autoPlayInterval={4000} className="shadow-xl" />
			</section>
		</div>
	)
}
