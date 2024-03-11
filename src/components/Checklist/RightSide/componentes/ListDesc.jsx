const ListDesc = ({ children, type }) => {
	if (type == 'ol') {
		return <ol className="description__list">{children}</ol>
	}
	return <ul className="description__list">{children}</ul>
}

export default ListDesc
