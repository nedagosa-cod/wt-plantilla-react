const ValDateDesc = ({ children, position }) => {
	return (
		<div className="description__valdate">
			<span className="description__valdate--ask">
				<strong>{position}. </strong>
				{children}
			</span>
			<div className="description__valdate--date">
				<input type="date" />
			</div>
		</div>
	)
}

export default ValDateDesc
