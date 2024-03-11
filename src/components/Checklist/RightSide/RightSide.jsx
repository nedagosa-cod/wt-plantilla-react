import { useState } from 'react'
import './styles.scss'

const RightSide = ({ descripciones }) => {
	const [checkSelected, setCheckSelected] = useState('A')
	return (
		<div className="rightSide">
			{descripciones.map(descripcion => {
				return (
					<div
						key={descripcion.check}
						className={
							'rightSide__description description ' +
							(checkSelected == descripcion.check ? checkSelected : '')
						}>
						{descripcion.html()}
					</div>
				)
			})}
		</div>
	)
}

export default RightSide
