const PopImageDesc = ({ setPopShowImage, imagePop }) => {
	return (
		<div
			className="PopImageDesc"
			onClick={() => {
				setPopShowImage(false)
			}}>
			<figure>
				<img src={'./noTocar/imagenes/checklist/' + imagePop} alt="imagen de ayuda" />
			</figure>
		</div>
	)
}

export default PopImageDesc
