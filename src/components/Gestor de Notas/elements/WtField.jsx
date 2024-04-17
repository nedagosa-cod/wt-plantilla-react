import { useState } from 'react'
import { ids } from 'webpack'

const WtField = ({ module }) => {
	const [value, setValue] = useState(module.props.value || '')
	const [delta, setDelta] = useState({})
	const validProps = Object.entries(module.props).reduce((acc, [key, value]) => {
		if (value !== undefined && value !== null && value !== '') {
			acc[key] = value
		}
		return acc
	}, {})

	const onChange = e => {
		setValue(e.target.value)
	}

	return (
		<div className="WtField">
			{module.tools?.icon && (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
					<path d="M288 64c0 17.7-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32H256c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H256c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
				</svg>
			)}
			<input
				{...validProps}
				className={
					'WtField__input' +
					(!module.tools?.icon ? ' iconFalse' : '') +
					(module.props.className ? ' ' + module.props.className : '')
				}
				value={value}
				onChange={onChange}
			/>
		</div>
	)
}

export default WtField
