import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Diamond } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import imgCafeGo from '@/assets/images/appsWeb/CAFEGO.png'
import imgCafeAcademia from '@/assets/images/appsWeb/ACADEMIA.png'
import imgCafeOperaciones from '@/assets/images/appsWeb/CAFEOPERACIONES.png'
import imgGAP from '@/assets/images/appsWeb/GAP.png'
import imgEnDirecto from '@/assets/images/appsWeb/ENDIRECTO.png'
import imgCajeroKactus from '@/assets/images/appsWeb/KACTUS.png'
import imgTerpelSalesforce from '@/assets/images/appsWeb/TERPELSALESFORCE.png'
import imgRumboTerpel from '@/assets/images/appsWeb/RUMBOTERPEL.png'
import imgPicafuel from '@/assets/images/appsWeb/PICAFUEL.png'
import imgCrm from '@/assets/images/appsWeb/TERPELCRM.png'
import imgEdoc from '@/assets/images/appsWeb/edoc.png'
import imgBitacoraColombia from '@/assets/images/appsWeb/BITACORA.png'
import imgTiendaTerpel from '@/assets/images/appsWeb/TIENDATERPEL.png'
import imgTesos from '@/assets/images/appsWeb/TESOS.png'
import imgVoltexT from '@/assets/images/appsWeb/VOLTEX.png'
import imgKushki from '@/assets/images/appsWeb/KUSHKI.png'
import imgAliadosMagneto from '@/assets/images/appsWeb/ALIADOSMAGENTO.png'
import imgExonMobile from '@/assets/images/appsWeb/EXON.png'
import imgFlotas from '@/assets/images/appsWeb/FLOTAS.png'
import imgQualistore from '@/assets/images/appsWeb/QUALISTORE.png'
import imgCorreoAtento from '@/assets/images/appsWeb/ATENTO.png'
import gocontact from '@/assets/images/appsWeb/gocontact.png'

// Datos de ejemplo para las aplicaciones
const apps = [
	{
		id: 1,
		title: 'Cafe Go',
		description: 'Aplicativo Web',
		color: 'bg-gradient-to-br from-primary to-primary/50',
		textColor: 'text-white',
		link: 'https://cafesite7.atento.com.co:11001/cafe_GO/login/index.php',
		icon: imgCafeGo,
	},
	{
		id: 2,
		title: 'Cafe Academia',
		description: 'Aplicativo Web',
		color: 'bg-gradient-to-br from-secondary to-secondary/50',
		textColor: 'text-white',
		link: 'https://academia.atento.com.co/academia/login/index.php',
		icon: imgCafeAcademia,
	},
	{
		id: 3,
		title: 'Cafe Operaciones',
		description: 'Sistema de gestión de inventario',
		color: 'bg-gradient-to-br from-primary to-primary/50',
		textColor: 'text-white',
		link: 'https://cafesite8.atento.com.co/cafe_terpel/login/',
		icon: imgCafeOperaciones,
	},
	{
		id: 4,
		title: 'GAP',
		description: 'Gestion de asistencia personal',
		color: 'bg-gradient-to-br from-secondary to-secondary/50',
		textColor: 'text-white',
		link: 'http://172.17.125.11/ControlAsistencia/login.php',
		icon: imgGAP,
	},
	{
		id: 5,
		title: 'EnDirecto',
		description: 'Gestion de asistencia personal',
		color: 'bg-gradient-to-br from-primary to-primary/50',
		textColor: 'text-white',
		link: 'http://172.17.125.11/endirecto/web/index.php/main/login',
		icon: imgEnDirecto,
	},
	{
		id: 6,
		title: 'Cajero Kactus',
		description: 'Gestion de asistencia personal',
		color: 'bg-gradient-to-br from-secondary to-secondary/50',
		textColor: 'text-white',
		link: 'https://cajerokactus.atento.com.co:8443/WebKactus/frmLogin.aspx',
		icon: imgCajeroKactus,
	},
	{
		id: 7,
		title: 'Terpel Salesforce',
		description: 'Gestion de asistencia personal',
		color: 'bg-gradient-to-br from-primary to-primary/50',
		textColor: 'text-white',
		link: 'https://login.salesforce.com/',
		icon: imgTerpelSalesforce,
	},
	{
		id: 8,
		title: 'Rumbo Terpel',
		description: 'Gestion de asistencia personal',
		color: 'bg-gradient-to-br from-secondary to-secondary/50',
		textColor: 'text-white',
		link: 'https://control.rumboterpel.com/#/login/rumbo',
		icon: imgRumboTerpel,
	},
	{
		id: 9,
		title: 'Picafuel',
		description: 'Gestion de asistencia personal',
		color: 'bg-gradient-to-br from-secondary to-secondary/50',
		textColor: 'text-white',
		link: 'https://portal.fuelpic.com/#/login/vehicles',
		icon: imgPicafuel,
	},
	{
		id: 10,
		title: 'CRM',
		description: 'Gestion de asistencia personal',
		color: 'bg-gradient-to-br from-secondary to-secondary/50',
		textColor: 'text-white',
		link: 'https://movilidad.terpel.com/Terpel.crm/Login.aspx?ReturnUrl=%2fterpel.crm%2f',
		icon: imgCrm,
	},
	{
		id: 11,
		title: 'Edoc',
		description: 'Gestion de asistencia personal',
		color: 'bg-gradient-to-br from-secondary to-secondary/50',
		textColor: 'text-white',
		link: 'https://co.edocnube.com/consulta/wfrmLoginNube.aspx',
		icon: imgEdoc,
	},
	{
		id: 12,
		title: 'Bitacora Colombia',
		description: 'Gestion de asistencia personal',
		color: 'bg-gradient-to-br from-secondary to-secondary/50',
		textColor: 'text-white',
		link: 'https://infoream.terpel.com/web/base/logindisp',
		icon: imgBitacoraColombia,
	},
	{
		id: 13,
		title: 'Tienda Terpel',
		description: 'Gestion de asistencia personal',
		color: 'bg-gradient-to-br from-secondary to-secondary/50',
		textColor: 'text-white',
		link: 'https://www.tiendaterpel.com/',
		icon: imgTiendaTerpel,
	},
	{
		id: 14,
		title: 'Tesos',
		description: 'Gestion de asistencia personal',
		color: 'bg-gradient-to-br from-secondary to-secondary/50',
		textColor: 'text-white',
		link: 'https://www.tesosterpel.com/Authorization/Home/Login?ReturnUrl=%252',
		icon: imgTesos,
	},
	{
		id: 15,
		title: 'Voltex',
		description: 'Gestion de asistencia personal',
		color: 'bg-gradient-to-br from-secondary to-secondary/50',
		textColor: 'text-white',
		link: 'https://ds-terpel.use-move.com/',
		icon: imgVoltexT,
	},
	{
		id: 16,
		title: 'KUSHKI',
		description: 'Gestion de asistencia personal',
		color: 'bg-gradient-to-br from-secondary to-secondary/50',
		textColor: 'text-white',
		link: 'https://console.kushkipagos.com/auth',
		icon: imgKushki,
	},
	{
		id: 17,
		title: 'Aliados / Magneto',
		description: 'Gestion de asistencia personal',
		color: 'bg-gradient-to-br from-secondary to-secondary/50',
		textColor: 'text-white',
		link: 'https://aliados.terpel.com/2Of1Gi4Rwl/admin/',
		icon: imgAliadosMagneto,
	},
	{
		id: 18,
		title: 'ExonMobile',
		description: 'Link para descargar ficha técnica productos Mobil',
		color: 'bg-gradient-to-br from-secondary to-secondary/50',
		textColor: 'text-white',
		link: 'https://www.exxonmobil.com/es-es/sds#f:Location=[Colombia',
		icon: imgExonMobile,
	},
	{
		id: 19,
		title: 'Flotas',
		description: 'Portal de flotas Panama',
		color: 'bg-gradient-to-br from-secondary to-secondary/50',
		textColor: 'text-white',
		link: 'https://portal.terpelpanama.com/NPW/Inicio',
		icon: imgFlotas,
	},
	{
		id: 20,
		title: 'QUALISTORE',
		description: 'Herramienta de inteligencia artificial',
		color: 'bg-gradient-to-br from-primary to-primary/50',
		textColor: 'text-white',
		link: 'https://qualistore-multi.atento.com.br/portal/apps/app_qualistore_new/#',
		icon: imgQualistore,
	},
	{
		id: 21,
		title: 'Correo teleatento',
		description: 'Email',
		color: 'bg-gradient-to-br from-secondary to-secondary/50',
		textColor: 'text-white',
		link: 'https://webmail.teleatento.com/?_task=login',
		icon: imgCorreoAtento,
	},
	{
		id: 22,
		title: 'Go Contact',
		description: 'Portal Go Contact',
		color: 'bg-gradient-to-br from-secondary to-secondary/50',
		textColor: 'text-white',
		link: 'https://atentocol-terpel.gocontact.com/',
		icon: gocontact,
	}
]

export default function AppsWeb() {
	const [selectedApp, setSelectedApp] = useState(apps[0])
	const [hoveredApp, setHoveredApp] = useState(null)
	const [isHovering, setIsHovering] = useState(false)
	const timeoutRef = useRef(null)

	// Efecto para manejar el cambio de aplicación con retraso
	useEffect(() => {
		if (hoveredApp && isHovering) {
			timeoutRef.current = setTimeout(() => {
				setSelectedApp(hoveredApp)
			}, 200) // Pequeño retraso para evitar cambios rápidos
		}

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
		}
	}, [hoveredApp, isHovering])

	// Manejador de hover
	const handleHover = app => {
		setHoveredApp(app)
		setIsHovering(true)
	}

	// Manejador para cuando el mouse sale
	const handleHoverEnd = () => {
		setIsHovering(false)
	}

	return (
		<div className="overflow-hidden p-6 mx-auto h-full rounded-xl shadow-lg">
			<div className="relative -left-10 py-2 w-1/2 bg-gradient-to-br rounded-r-full from-secondary to-secondary">
				<h1 className="ml-14 text-4xl font-bold text-primary">Aplicaciones Web</h1>
			</div>

			<div className="flex flex-col gap-6 p-4 lg:flex-row relative lg:h-[600px]">
				{/* Tarjeta grande a la izquierda */}
				<div className="flex overflow-hidden justify-center items-center w-full h-full lg:w-1/2">
					<AnimatePresence mode="wait">
						<motion.div
							key={selectedApp.id}
							initial={{ x: -20, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							exit={{ x: 20, opacity: 0 }}
							transition={{ duration: 0.3 }}>
							<div
								className={`flex flex-col items-center justify-between p-6 w-full rounded-lg ${selectedApp.color} ${selectedApp.textColor} overflow-hidden`}>
								<div className="flex flex-col justify-center items-center rounded-lg">
									<figure className="flex justify-center items-center mb-4 w-1/2 h-1/2 bg-gradient-to-br rounded-lg from-slate-100 to-slate-300">
										<img src={selectedApp.icon} alt={selectedApp.title} className="object-contain w-3/4 h-full" />
									</figure>
									<h2 className="mb-2 text-3xl font-bold">{selectedApp.title}</h2>
									<p className="mb-6 text-lg opacity-90">{selectedApp.description}</p>
								</div>

								<Button
									className="justify-between mt-4 w-full text-white bg-gray-800 hover:bg-gray-700"
									size="lg"
									onClick={() => window.open(selectedApp.link, '_blank')}>
									<span>Ir a la aplicación</span>
									<ArrowRight className="ml-2 w-5 h-5" />
								</Button>
							</div>
						</motion.div>
					</AnimatePresence>
				</div>

				{/* Cuadrícula de tarjetas a la derecha */}
				<div className="overflow-y-auto p-2 w-full h-auto lg:w-1/2">
					<div className="flex flex-wrap gap-4 justify-center">
						{apps.map(app => (
							<motion.div
								key={app.id}
								whileHover={{ scale: 1.05 }}
								onHoverStart={() => handleHover(app)}
								onHoverEnd={handleHoverEnd}
								onClick={() => setSelectedApp(app)}
								className={`cursor-pointer rounded-lg p-4 transition-all duration-200 dato-buscado ${
									selectedApp.id === app.id ? app.color : 'bg-gray-100 hover:shadow-md'
								}`}>
								<div className="flex flex-col justify-center items-center w-52 aspect-square">
									<figure className="flex justify-center items-center">
										<img src={app.icon} alt={app.title} className="object-contain w-3/4 h-full" />
									</figure>
									<p
										className={`mt-2 text-center text-sm font-medium ${
											selectedApp.id === app.id ? 'text-white' : 'text-gray-700'
										}`}>
										{app.title}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
