const ImageDesc = ({ activatePopImage }) => {
	return (
		<i
			className="description__pop-image"
			onClick={() => {
				activatePopImage()
			}}></i>
	)
}

export default ImageDesc
