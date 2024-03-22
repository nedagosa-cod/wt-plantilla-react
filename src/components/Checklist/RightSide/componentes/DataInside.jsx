import { useEffect, useState } from 'react'

export const DataInside = ({ children, activeInside }) => {
	const [showChildren, setShowChildren] = useState(false)

	useEffect(() => {
		setShowChildren(true)
	}, [activeInside])

	if (showChildren) {
		return <section className="insidebool">{children}</section>
	}

	return <section className="insidebool">no tengo nada</section>
}
