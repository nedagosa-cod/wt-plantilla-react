import ListCheck from './ListCheck'

const LeftSide = () => {
	return (
		<div className="LeftSide">
			<h1 className="LeftSide__title">Titulo del Check List</h1>
			<ul className="LeftSide__ul">
				<ListCheck check="A" title="Protocolo Bienvenida" />
				<ListCheck check="B" title="Verifica" />
				<ListCheck check="C" title="Gestiona" />
				<ListCheck check="D" title="Tipifica" />
				<ListCheck check="E" title="Despedida de la gestión" />
			</ul>
		</div>
	)
}

export default LeftSide
