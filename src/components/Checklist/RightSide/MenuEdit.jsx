import { useContext, useState } from 'react'
import GlobalContext from '../../../context/GlobalContext'
import IconEdit from '../../../icons/IconEdit'
import DropMenu from '../../DropMenu/DropMenu'

const MenuEdit = ({ children }) => {
	const { admin } = useContext(GlobalContext)
	const [open, setOpen] = useState(false)
	const openDropMenu = () => {
		setOpen(true)
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
		<div className={'container-element-ch ' + (admin ? 'admin' : '')}>
			{admin && children && (
				<button className="task__btn" type="button" onClick={openDropMenu}>
					<IconEdit />
				</button>
			)}
			{children}
			{open && <DropMenu items={items} />}
		</div>
	)
}

export default MenuEdit
