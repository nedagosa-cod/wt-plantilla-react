import { useEffect, useState } from 'react'

const WtField = props => {
	const {
		module,
		value,
		type,
		onChange,
		id,
		placeholder,
		name,
		conditions,
		minLength,
		maxLength,
		onBlur,
		required,
		currency,
		width,
	} = props
	const localCurrency = {
		COL: '$ ',
		EUR: '€ ',
		USD: '$ ',
		CAD: '$ ',
		MXN: '$ ',
		NZD: '$ ',
		CLP: '$ ',
		COP: '$ ',
		PEN: '$ ',
		ARS: '$ ',
		BBD: '$ ',
		BMD: '$ ',
		BZD: '$ ',
		FJD: '$ ',
		GYD: '$ ',
		JMD: '$ ',
		SRD: '$ ',
		TTD: '$ ',
		TWD: '$ ',
		CRC: '₡ ',
	}
	const styles = {
		width: width,
	}
	const [data, setData] = useState(value || '')
	const [errorMessge, setErrorMessage] = useState('')
	const [styleError, setStyleError] = useState(false)
	const [errors, setErros] = useState([])

	const validateLength = fieldValue => {
		if (minLength || maxLength) {
			if (fieldValue.length < minLength && fieldValue.length > 1) {
				setStyleError(true)
			} else if (fieldValue.length > maxLength) {
				setStyleError(true)
			} else {
				setStyleError(false)
			}
		}
		setErros([
			...errors,
			{
				type: 'length',
				value: fieldValue,
				message: `El campo debe tener minimo ${minLength} caracteres y maximo ${maxLength} caracteres.`,
			},
		])
	}
	const validateStartWith = fieldValue => {
		// if (conditions.startWith && !fieldValue.startsWith(conditions.startWith)) {
		// 	setStyleError(true)
		// } else {
		// 	setStyleError(false)
		// }
		setErros([
			...errors,
			{
				type: 'startWith',
				value: fieldValue,
				message: `El campo debe comenzar por ${conditions.startWith}.`,
			},
		])
	}

	return (
		<label className="WtField" style={{ ...(width && { width: width }) }}>
			<div className="WtField__error">
				<span>{errorMessge}</span>
			</div>
			<input
				{...(id && { id })}
				{...(placeholder && { placeholder })}
				{...(name && { name })}
				{...(required && { required })}
				value={data}
				type={!type ? 'text' : type == 'number' || 'just-text' ? 'text' : type}
				minLength={minLength}
				className={
					'WtField__input' +
					(module?.props.className ? ' ' + module.props.className : '') +
					(styleError ? ' styleError' : '')
				}
				onChange={e => {
					let fieldValue = e.target.value
					if (fieldValue.length == 1) {
						setStyleError(false)
					}
					if (type == 'number') {
						if (/\d/.test(fieldValue) && !/[a-zA-Z]/.test(fieldValue)) {
							validateLength(fieldValue)
							setData(fieldValue)
						}
					}
					if (type == 'text') {
						validateLength(fieldValue)
						setData(fieldValue)
						console.log('viy')
					}
					if (type == 'just-text') {
						if (/[a-zA-Z]/.test(fieldValue) && !/\d/.test(fieldValue)) {
							// validateStartWith(fieldValue)
							validateLength(fieldValue)
							setData(fieldValue)
						}
					}
					return onChange(e)
				}}
				onKeyDown={e => {
					// ELEIMINA TODA LA SELECCION SI SE PRESIONA BACKSPACE
					if (e.key == 'Backspace') {
						window.getSelection().toString().length == data.length ? setData('') : null
						data.length == 1 ? setData('') : null
						setStyleError(false)
					}
				}}
				onBlur={e => {
					// SI EL INPUT ES FORMATO NUMERO Y TIENE CURRENCY SE FORMATEA $0.00
					if (type == 'number' && currency) {
						const formatter = new Intl.NumberFormat('es-CO')
						let soloNumeros = data.replace(/\D/g, '')
						setData(localCurrency[currency] + formatter.format(Number(soloNumeros)))
					}
					// VALIDAR LONGITUD MINIMA Y MAXIMA DE TEXTO
					if (data.length < minLength && data.length > 0) {
						setErrorMessage('Minimo ' + minLength + ' caracteres')
						setTimeout(() => {
							setErrorMessage('')
							setStyleError(false)
						}, 2000)
						e.target.focus()
						setData('')
					}
					// VALIDAR LONGITUD MAXIMA DE TEXTO
					if (data.length > maxLength) {
						setErrorMessage('Maximo ' + maxLength + ' caracteres')
						setTimeout(() => {
							setErrorMessage('')
							setStyleError(false)
						}, 2000)
						e.target.focus()
						setData('')
					}

					if (onBlur) return onBlur(e)
				}}
			/>
		</label>
	)
}

export default WtField
