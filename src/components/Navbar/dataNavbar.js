const projectNavbar = [
	{
		title: 'Inicio',
		route: '/',
		icon: 'home',
	},
	{
		title: 'Preguntas frecuentes',
		route: '/checklist',
		icon: 'question',
	},
	{
		title: 'CheckList',
		route: '/checklist',
		icon: 'checklist',
		dropDown: [
			{
				title: 'Ejemplo A',
				route: '/checklist/ejemploA',
			},
			{
				title: 'Ejemplo B',
				route: '/checklist/ejemploB',
			},
		],
	},
	{
		title: 'Corrector Ortográfico',
		route: '/corrector',
		icon: 'textSlash',
	},
]

export default projectNavbar
