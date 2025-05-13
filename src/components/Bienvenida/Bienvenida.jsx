import { useContext } from 'react'
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

export default function Bienvenida() {
	const { scheme } = useContext(GlobalContext)

	const setBackground = () => {
		const month = new Date().getMonth() + 1
		switch (month) {
			case 10:
				return `url(${scheme === 'light' ? imgBgLightHalloween : imgBgDarkHalloween})`
			case 11:
				return `url(${scheme === 'light' ? imgBgLightNovember : imgBgDarkNovember})`
			case 12:
				return `url(${scheme === 'light' ? imgBgLightNavidad : imgBgDarkNavidad})`
			default:
				return `url(${scheme === 'light' ? imgBack : imgBackD})`
		}
	}
	const style = {
		backgroundImage: setBackground(),
		colorScheme: scheme,
	}
	return (
		<div className="flex text-center items-center h-full w-full text-foreground bg-cover bg-center " style={style}>
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
