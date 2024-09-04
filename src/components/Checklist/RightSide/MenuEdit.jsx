import { useContext, useState } from 'react'
import GlobalContext from '../../../context/GlobalContext'
import IconEdit from '../../../icons/IconEdit'
import CheckListContext from '../../../context/ChecklistContext'

const MenuEdit = ({ children, check, location }) => {
	const { admin } = useContext(GlobalContext)
	const { setEditChElement, setLocationEl } = useContext(CheckListContext)

	const [open, setOpen] = useState(false)

	const openDropMenu = () => {
		setOpen(prev => !prev)
	}
	const handlerDropMenu = key => {
		switch (key) {
			case '1':
				setOpen(false)
				setEditChElement(true)
				setLocationEl({ check, location })
				break
			case '2':
				console.log(key)
				break
			case '3':
				console.log(key)
				break
		}
	}
	const items = [
		{
			key: '1',
			label: <span>Editar elemento</span>,
		},
		{
			key: '2',
			label: <span>Cambiar elemento</span>,
		},
		{
			key: '3',
			label: <span>Eliminar elemento</span>,
			danger: true,
		},
	]
	return (
		<>
			{children && (
				<div className={'container-element-ch ' + (admin ? 'admin' : '')}>
					{admin && children && (
						<button
							className="task__btn"
							type="button"
							onClick={() => {
								openDropMenu()
							}}>
							<IconEdit />
						</button>
					)}
					{children}
					{open && (
						<div className="dropmenu">
							{items.map(item => (
								<div
									key={item.key}
									onClick={() => handlerDropMenu(item.key)}
									className={'dropmenu__handler' + (item.danger ? ' danger' : '')}>
									{item.label}
								</div>
							))}
						</div>
					)}
				</div>
			)}
		</>
	)
}

export default MenuEdit
