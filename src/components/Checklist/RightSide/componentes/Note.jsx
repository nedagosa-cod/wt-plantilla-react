import IconSucces from '../../../../icons/IconSucces'
import IconError from '../../../../icons/IconError'
import IconWarning from '../../../../icons/IconWarning'
import IconQuestion from '../../../../icons/IconQuestion'
import IconInfo from '../../../../icons/IconInfo'

const Note = ({ children, title, type }) => {
	const icons = {
		success: <IconSucces />,
		error: <IconError />,
		warning: <IconWarning />,
		info: <IconInfo />,
		question: <IconQuestion />,
	}
	return (
		<section className={'description__note ' + type}>
			<div className="description__note--icon">{icons[type]}</div>
			<div className="description__note--text">
				<span className="description__note--title">{title}</span>
				{children}
			</div>
		</section>
	)
}
export default Note
