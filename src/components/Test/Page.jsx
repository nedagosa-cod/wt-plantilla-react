import { useContext, useEffect, useState } from 'react'
import Contador from './Contador'
import ContadorContext from '../../context/ContadorContext'

export const Page = () => {
	const { sumar, contador } = useContext(ContadorContext)
	return (
		<div style={{ fontSize: '2rem', color: 'white' }}>
			<button
				onClick={() => {
					sumar()
				}}>
				Sumar
			</button>
			<Contador />
		</div>
	)
}
