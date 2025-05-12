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
import SliderNews from '../SliderNews/SliderNews'
import { Button } from '../ui/button'

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
		<div className="welcome" style={style}>
			<section className="welcome__content news">
				{/* <SliderNews /> */}
				<span className="">Bienvenido a </span>
				<span className="">
					Web Training <strong>Formación</strong>
				</span>
				<Button>Holaaaa</Button>
			</section>
		</div>
	)
}
