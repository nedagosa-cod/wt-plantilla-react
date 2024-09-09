const PopImageDesc = ({ setPopShowImage, imagePop, widthImg }) => {
	console.log(imagePop.length)
	return (
		<div
			className="PopImageDesc"
			onClick={() => {
				setPopShowImage(false)
			}}>
			<figure style={{ width: `${widthImg}` }}>
				{imagePop.length > 100 ? (
					<img src={'data:image/png;base64,' + imagePop} alt="imagen de ayuda" />
				) : (
					<img src={'./noTocar/imagenes/checklist/' + imagePop} alt="imagen de ayuda" />
				)}
			</figure>
		</div>
	)
}

export default PopImageDesc
