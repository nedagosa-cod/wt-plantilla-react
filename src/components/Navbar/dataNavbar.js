const projectNavbar = [
	{
		title: 'Home',
		route: '/',
		icon: 'home',
	},
	{
		title: 'Check List',
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
		title: 'Speell Speech',
		route: '/corrector',
		icon: 'textSlash',
	},
	{
		title: 'FAQ',
		route: '/faq',
		icon: 'question',
	},
	{
		title: 'Calculadora',
		route: 'portal',
		icon: 'textSlash',
	},
]

export default projectNavbar
