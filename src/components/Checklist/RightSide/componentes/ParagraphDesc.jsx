import { useContext } from 'react'
import GlobalContext from '../../../../context/GlobalContext'
import { Dropdown } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import IconMenu from '../../../../icons/IconMenu'

const ParagraphDesc = ({ children }) => {
	const { admin } = useContext(GlobalContext)

	const items = [
		{
			key: '1',
			icon: <EditOutlined />,
			danger: true,
			label: <button>Editar elemento</button>,
		},
		{
			key: '2',
			icon: <DeleteOutlined />,
			danger: true,
			label: <button>Eliminar elemento</button>,
		},
		// {
		// 	type: 'divider',
		// },
		// {
		// 	key: '3',
		// 	icon: <EditOutlined />,
		// 	label: (
		// 		<button className="button-color" style={{ color: '#212529' }}>
		// 			Editar
		// 		</button>
		// 	),
		// 	disabled: false,
		// },
		// {
		// 	key: '4',
		// 	icon: <FullscreenOutlined />,
		// 	label: (
		// 		<button className="button-color" style={{ color: '#212529' }}>
		// 			Abrir en una ventana
		// 		</button>
		// 	),
		// 	disabled: false,
		// },
	]
	const handleMenuItemClick = ({ key }) => {
		switch (key) {
			case '1':
				console.log(task.id)
				break
			case '2':
				console.log(task.id)
				break
			case '3':
				console.log(task.id)
				break
			case '4':
				console.log(task.id)
				break
		}
	}
	return <p className="description__paragraph">{children}</p>
}

export default ParagraphDesc
