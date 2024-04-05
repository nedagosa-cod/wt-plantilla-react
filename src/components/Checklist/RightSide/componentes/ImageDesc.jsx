const ImageDesc = ({ activatePopImage, img, width }) => {
	return (
		<i
			className="description__pop-image"
			onClick={() => {
				activatePopImage(img, width)
			}}></i>
	)
}

export default ImageDesc
