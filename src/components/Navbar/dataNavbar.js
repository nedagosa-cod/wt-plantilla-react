const projectNavbar = [
	{
		title: 'Inicio',
		route: '/',
		icon: 'home',
	},
	{
		title: 'Accesos Rapidos',
		route: '/checklist',
		icon: 'next',
		dropDown: [
			{
				title: 'Aplicativos Web',
				route: '/checklist',
			},
			{
				title: 'Checklist 2',
				route: '/checklist',
			},
			{
				title: 'Checklist 2',
				route: '/checklist',
			},
		],
	},
	{
		title: 'CheckList',
		route: '/checklist',
		icon: 'checklist',
		dropDown: [
			{
				title: 'Checklist 1',
				route: '/checklist',
			},
			{
				title: 'Checklist 2',
				route: '/checklist',
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
