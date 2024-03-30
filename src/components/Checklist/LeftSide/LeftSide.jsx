import ListCheck from './ListCheck'

const LeftSide = ({ title, data }) => {
	return (
		<div className="LeftSide">
			<h1 className="LeftSide__title">{title}</h1>
			<ul className="LeftSide__ul">
				{data.map((paso, i) => {
					return <ListCheck check={paso.check} title={paso.html[0].TITULO} key={i} />
				})}
			</ul>
		</div>
	)
}

export default LeftSide
