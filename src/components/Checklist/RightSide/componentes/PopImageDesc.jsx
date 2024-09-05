const PopImageDesc = ({ setPopShowImage, imagePop, widthImg }) => {
	return (
		<div
			className="PopImageDesc"
			onClick={() => {
				setPopShowImage(false)
			}}>
			<figure style={{ width: `${widthImg}` }}>
				{imagePop.includes('base64') ? (
					<img src={imagePop} alt="imagen de ayuda" />
				) : (
					<img src={'./noTocar/imagenes/checklist/' + imagePop} alt="imagen de ayuda" />
				)}
			</figure>
		</div>
	)
}

export default PopImageDesc
