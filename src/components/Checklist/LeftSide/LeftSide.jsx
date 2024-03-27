import ListCheck from './ListCheck'

const LeftSide = ({ resetList }) => {
	return (
		<div className="LeftSide">
			<h1 className="LeftSide__title">Titulo del Check List</h1>
			<ul className="LeftSide__ul">
				<ListCheck
					check="A"
					title="Protocolo Bienvenida"
					resetList={resetList}
				/>
				<ListCheck check="B" title="Verifica" resetList={resetList} />
				<ListCheck check="C" title="Gestiona" resetList={resetList} />
				<ListCheck check="D" title="Tipifica" resetList={resetList} />
				<ListCheck
					check="E"
					title="Despedida de la gestión"
					resetList={resetList}
				/>
			</ul>
		</div>
	)
}

export default LeftSide
