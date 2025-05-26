import { createContext, useState } from 'react'
import Localbase from 'localbase'
import Swal from 'sweetalert2'
import readXlsxFile from 'read-excel-file'
import { toast } from 'sonner'

const GlobalContext = createContext()
const WTLocalbase = new Localbase('db_nombre_campana')

const GlobalProvider = ({ children }) => {
	const [scheme, setScheme] = useState('light')
	const [admin, setAdmin] = useState(false)
	const [activeAppNote, SetActiveAppNote] = useState(false)

	const templatesDDBB = ['arbol', 'ejemplo', 'notas']
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
						toast.success('Base de datos actualizada', {
							description: 'Por favor presiona F5 o actualiza la pagina para cargar la base.',
						})
					})
					.catch(error => {
						toast.error('Error al cargar la base de datos', {
							description: 'Verifica que el archivo excel que estas cargando es una base de datos correcta.',
						})
					})
			} else {
				toast.error('Error al cargar la base de datos', {
					description: 'Verifica que el archivo excel que estas cargando es una base de datos correcta.',
				})
			}
		}
	}

	const showApp = bool => {
		if (bool == false || bool == true) {
			SetActiveAppNote(bool)
			localStorage.setItem('visible', bool)
		} else {
			SetActiveAppNote(!activeAppNote)
			localStorage.setItem('visible', !activeAppNote)
		}
	}

	const data = {
		templatesDDBB,
		WTLocalbase,
		readExcelFile,
		scheme,
		setScheme,
		showApp,
		activeAppNote,
		admin,
		setAdmin,
		SetActiveAppNote,
	}
	return <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
}

export { GlobalProvider }
export default GlobalContext
