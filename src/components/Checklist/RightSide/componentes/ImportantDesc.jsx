const ImportantDesc = ({ children, title }) => {
	return (
		<div className="description__important">
			<span>{title}</span>
			<p>{children}</p>
		</div>
	)
}
export default ImportantDesc
