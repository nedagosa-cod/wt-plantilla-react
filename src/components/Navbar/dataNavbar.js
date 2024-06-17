const projectNavbar = [
	{
		title: 'Inicio',
		route: '/',
		icon: 'home',
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
		title: 'Gestor de notas',
		route: '/checklist',
		icon: 'note',
	},
	{
		title: 'Tipificador',
		route: '/tipificador',
		icon: 'tipify',
	},
	{
		title: 'Calculadoras',
		route: '/checklist',
		icon: 'calc',
		dropDown: [
			{
				title: 'Estandar',
				route: '/calculadoras/estandar',
			},
		],
	},
	{
		title: 'Aplicativos web',
		route: '/checklist',
		icon: 'web',
	},
	{
		title: 'Corrector ortográfico',
		route: '/checklist',
		icon: 'textSlash',
	},
	{
		title: 'Scripts',
		route: '/checklist',
		icon: 'comments',
	},
	{
		title: 'Consulta de documentación',
		route: '/checklist',
		icon: 'library',
	},
	{
		title: 'Consulta de información',
		route: '/checklist',
		icon: 'info',
	},
	{
		title: 'Catálogo',
		route: '/checklist',
		icon: 'catalogue',
	},
	{
		title: 'Linea de tiempo',
		route: '/timeline',
		icon: 'timeLine',
	},
	{
		title: 'Preguntas Frecuentes',
		route: '/checklist',
		icon: 'question',
	},
]

export default projectNavbar
