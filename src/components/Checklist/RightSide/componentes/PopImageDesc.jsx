const PopImageDesc = ({ setPopShowImage, imagePop, widthImg }) => {
	return (
		<div
			className="PopImageDesc"
			onClick={() => {
				setPopShowImage(false)
			}}>
			<figure style={{ width: `${widthImg}` }}>
				<img src={'./noTocar/imagenes/checklist/' + imagePop} alt="imagen de ayuda" />
			</figure>
		</div>
	)
}

export default PopImageDesc
