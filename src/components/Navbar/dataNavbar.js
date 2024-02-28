const projectNavbar = [
      {
            title: 'Inicio',
            route: '/',
            icon: 'home'
      },
      {
            title: 'Preguntas frecuentes',
            route: '/checklist',
            icon: 'question'
      },
      {
            title: 'CheckList',
            route: '/checklist',
            icon: 'checklist',
            dropDown: [
                  {
                        title: 'Checklist 1',
                        route: '/checklist'
                  },
                  {
                        title: 'Checklist 2',
                        route: '/checklist'
                  }
            ]
      },
      {
            title: 'Otros',
            route: '/',
            icon: 'question',
            dropDown: [
                  {
                        title: 'Checklist 1',
                        route: '/'
                  },
                  {
                        title: 'Checklist 2',
                        route: '/'
                  }
            ]
      }
]

export default projectNavbar