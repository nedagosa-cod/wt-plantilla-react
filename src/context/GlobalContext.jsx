import { createContext, useState } from 'react'
import Localbase from 'localbase'
import Swal from 'sweetalert2'
import readXlsxFile from 'read-excel-file'

const GlobalContext = createContext()
const WTLocalbase = new Localbase('db_nombre_campana')

const GlobalProvider = ({ children }) => {
	const [scheme, setScheme] = useState('light')
	const templatesDDBB = ['arbol', 'ejemplo']
	const maps = {
		ejemplo: {
			CODIGO: 'codigo',
			DATOS: 'DATOS',
			ESCALAMIENTO: 'ESCALAMIENTO',
			AREA: 'AREA',
			div: {
				WEB_TRAINING: {
					T_ACTUAL: 'T_ACTUAL',
					PLANTILLA: 'PLANTILLA',
					DEFINICION: 'DEFINICION',
				},
			},
		},
		arbol: {
			CODIGO: 'CODIGO',
			DATOS: 'DATOS',
			ESCALAMIENTO: 'ESCALAMIENTO',
			AREA: 'AREA',
			DEFINICION: 'DEFINICION',
			EXCEPCION: 'EXCEPCION',
			NOTAS: 'NOTAS',
			T_ACTUAL: 'T_ACTUAL',
			PLANTILLA: 'PLANTILLA',
			ESCENARIO_2: 'ESCENARIO_2',
			ESCENARIO_3: 'ESCENARIO_3',
			ESCENARIO_4: 'ESCENARIO_4',
			ESCENARIO_5: 'ESCENARIO_5',
		},
	}
	const readExcelFile = async e => {
		// recorre los archivos cargados y valida si son bases correctas de la web training
		const filesList = e.target.files
		for (let i = 0; i < filesList.length; i++) {
			const file = filesList[i]
			const fileName = file.name.split('.')[0]
			if (templatesDDBB.includes(fileName)) {
				readXlsxFile(file, { map: maps[fileName] })
					.then(({ rows }) => {
						rows.forEach((row, id) => {
							WTLocalbase.collection(fileName).delete()
							WTLocalbase.collection(fileName).add({
								id,
								...row,
							})
						})
					})
					.then(() => {
						Swal.fire({
							icon: 'success',
							title: 'Base de datos actualizada',
							text: 'Por favor presiona F5 o actualiza la pagina para cargar la base.',
						})
					})
					.catch(error => {
						Swal.fire({
							icon: 'error',
							title: 'Estas cargando una base de datos incorrecta',
							text: 'Verifica que los datos en el excel esten correctamente insertados y las columnas tengan los nombres correspondientes.',
							footer: 'Error: ' + error,
						})
					})
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Estas cargando una base de datos incorrecta',
					text: 'La base de datos que estas cargando no es la correcta, verifica el nombre del archivo excel que estas cargando. valida si tiene el nombre correcto de la base o si las columnas estan completas.',
				})
			}
		}
	}

	const data = { templatesDDBB, WTLocalbase, readExcelFile, scheme, setScheme }
	return <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
}

export { GlobalProvider }
export default GlobalContext
