const ImportantDesc = ({ children, title }) => {
	return (
		<div className="description__important">
			<span className="description__important--title">{title}</span>
			{children}
		</div>
	)
}
export default ImportantDesc
