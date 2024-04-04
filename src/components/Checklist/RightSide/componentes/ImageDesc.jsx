const ImageDesc = ({ activatePopImage, img }) => {
	return (
		<i
			className="description__pop-image"
			onClick={() => {
				activatePopImage(img)
			}}></i>
	)
}

export default ImageDesc
