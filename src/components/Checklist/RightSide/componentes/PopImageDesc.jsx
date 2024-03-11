const PopImageDesc = ({ setPopShowImage }) => {
	return (
		<div
			className="PopImageDesc"
			onClick={() => {
				setPopShowImage(false)
			}}>
			<figure>
				<img
					src="./noTocar/imagenes/checklist/best taz.png"
					alt="imagen de ayuda"
				/>
			</figure>
		</div>
	)
}

export default PopImageDesc
