import map from 'read-excel-file/map'
import './dropmenu.scss'
const DropMenu = ({ items, handler }) => {
	return (
		<div className="dropmenu">
			{items.map(item => (
				<div
					key={item.key}
					onClick={handler}
					className={'dropmenu__handler' + (item.danger ? ' danger' : '')}>
					{item.label}
				</div>
			))}
		</div>
	)
}

export default DropMenu
