import { createContext } from 'react'
import Localbase from 'localbase'
import Swal from 'sweetalert2'
import readXlsxFile from 'read-excel-file'

const GlobalContext = createContext()
const WTLocalbase = new Localbase('db_nombre_campana')

const GlobalProvider = ({ children }) => {
	const templatesDDBB = ['arbol']
	const readExcelFile = async e => {
		const maps = {
			arbol: {
				CODIGO: 'CODIGO',
				DATOS: 'DATOS',
				ESCALAMIENTO: 'ESCALAMIENTO',
				AREA: 'AREA',
			},
		}

		const map = {
			'START DATE': 'CODIGO',
			'NUMBER OF STUDENTS': 'DATOS',
			COURSE: {
				course: {
					'IS FREE': 'ESCALAMIENTO',
					'COURSE TITLE': 'AREA',
				},
			},
		}

		// // recorre los archivos cargados y valida si son bases correctas de la web training
		console.log(filesList)
		for (let i = 0; i < filesList.length; i++) {
			const file = filesList[i]
			const fileName = file.name.split('.')[0]
			if (templatesDDBB.includes(fileName)) {
				console.log(file)
				readXlsxFile(file, { map }).then(({ rows }) => {
					console.log(rows)
					// rows.forEach(db => {
					// 	console.log('holiss')
					// 	WTLocalbase.collection(fileName).delete()
					// 	WTLocalbase.collection(fileName).add(db)
					// })
				})
				// .then(() => {
				// 	Swal.fire({
				// 		icon: 'success',
				// 		title: 'Base de datos actualizada',
				// 		text: 'Por favor presiona F5 o actualiza la pagina para cargar la base.',
				// 	})
				// })
				// .catch(error => {
				// 	Swal.fire({
				// 		icon: 'error',
				// 		title: 'Estas cargando una base de datos incorrecta',
				// 		text: 'Verifica que los datos en el excel esten correctamente insertados y las columnas tengan los nombres correspondientes.',
				// 		footer: 'Error: ' + error,
				// 	})
				// })
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Estas cargando una base de datos incorrecta',
					text: 'La base de datos que estas cargando no es la correcta, verifica el nombre del archivo excel que estas cargando. valida si tiene el nombre corrector de la base o si las columnas estan completas.',
				})
			}
		}
	}

	const data = { WTLocalbase, readExcelFile }
	return <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
}

export { GlobalProvider }
export default GlobalContext
