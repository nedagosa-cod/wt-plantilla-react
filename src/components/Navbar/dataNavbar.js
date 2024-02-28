const projectNavbar = [
      {
            title: 'Inicio',
            route: '#/',
            icon: 'home'
      },
      {
            title: 'Preguntas frecuentes',
            route: '#/preguntas_frecuentes',
            icon: 'question'
      },
      {
            title: 'CheckList',
            route: '#/',
            icon: 'checklist',
            dropDown: [
                  {
                        title: 'Checklist 1',
                        route: '#/'
                  },
                  {
                        title: 'Checklist 2',
                        route: '#/'
                  }
            ]
      },
      {
            title: 'Otros',
            route: '#/',
            icon: 'question',
            dropDown: [
                  {
                        title: 'Checklist 1',
                        route: '#/'
                  },
                  {
                        title: 'Checklist 2',
                        route: '#/'
                  }
            ]
      }
]

export default projectNavbar