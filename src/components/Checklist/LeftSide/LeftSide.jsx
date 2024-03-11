import ListCheck from './ListCheck'

const LeftSide = () => {
	return (
		<div className="LeftSide">
			<h1 className="LeftSide__title">Titulo del Check List</h1>
			<ul className="LeftSide__ul">
				<ListCheck check="A" title="Title" />
				<ListCheck check="B" title="Title" />
				<ListCheck check="C" title="Title" />
				<ListCheck check="D" title="Title" />
				<ListCheck check="E" title="Title" />
			</ul>

			<button className="LeftSide__btn-reiniciar">Reiniciar</button>
		</div>
	)
}

export default LeftSide
