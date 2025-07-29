import './buttons.styles.scss'
export const BtnBasic = ({ className, onClick, children }) => {
	return (
		<button className={'BtnBasic ' + className} onClick={onClick}>
			<span>{children}</span>
		</button>
	)
}
export const BtnBorder = ({ className, onClick, children }) => {
	return (
		<button className={'BtnBorder ' + className} onClick={onClick}>
			<span className="BtnBorder_lg">
				<span className="BtnBorder_sl"></span>
				<span className="BtnBorder_text">{children}</span>
			</span>
		</button>
	)
}
export const BtnZum = ({ onClick, children, onMouseEnter, onMouseLeave }) => {
	return (
		<button
			className="relative p-0 mt-4 font-mono text-base font-light uppercase bg-transparent border-none cursor-pointer outline-none group"
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}>
			<span className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 rounded-lg transform translate-y-0.5 transition duration-500 ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:translate-y-1 group-hover:duration-200 group-active:translate-y-px"></span>

			<span className="absolute top-0 left-0 w-full h-full rounded-lg bg-gradient-to-l from-[hsl(217,33%,16%)] via-[hsl(217,33%,32%)] to-[hsl(217,33%,16%)]"></span>

			<div className="relative flex items-center justify-between py-3 px-6 text-lg text-white rounded-lg transform -translate-y-1 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--primary-soft))] to-[hsl(var(--primary-dark))] gap-3 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:-translate-y-1.5 group-hover:duration-200 group-active:-translate-y-0.5 brightness-100 group-hover:brightness-110">
				<span className="select-none">{children}</span>

				<svg
					viewBox="0 0 20 20"
					fill="currentColor"
					className="-mr-1 ml-2 w-5 h-5 transition duration-250 group-hover:translate-x-1">
					<path
						clipRule="evenodd"
						d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
						fillRule="evenodd"></path>
				</svg>
			</div>
		</button>
	)
}
export const BtnActive = ({ className, onClick, children }) => {
	return (
		<button alt={children} className={'BtnActive ' + className} onClick={onClick}>
			{children.split('').map(word => {
				if (word == ' ') {
					return <i>&nbsp;</i>
				} else {
					return <i>{word}</i>
				}
			})}
		</button>
	)
}
