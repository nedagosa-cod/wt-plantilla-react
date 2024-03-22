const ValTextDesc = ({ children, position }) => {
	return (
		<div className="description__valbool">
			<label className="label">
				<span>
					<strong>{position}. </strong>
					{children}
				</span>

				<input type="text" name={'valtext_' + position} />
			</label>
		</div>
	)
}

export default ValTextDesc
