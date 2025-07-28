import { useState, useMemo } from 'react'
import { Search, Building2, Users, Settings, Fuel, CreditCard, Shield, FileText, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const glosarioData = [
	{
		term: 'EDS',
		meaning: 'Estación de Servicio',
		description:
			'Es el nombre genérico para las gasolineras de Terpel. Todas las operaciones de consumo, acumulación de puntos, validación de chips y ventas físicas ocurren en las EDS. Tanto los clientes de Vive Terpel, Vive Pits como de Rumbo consumen en las EDS.',
		category: 'infraestructura',
		icon: Fuel,
	},
	{
		term: 'JDZ',
		meaning: 'Jefe de Zona',
		description:
			'Es el supervisor o coordinador encargado de varias estaciones dentro de una región. En la operación, el JDZ supervisa el cumplimiento de los procesos, aprueba algunos movimientos administrativos y es el contacto operativo cuando hay incidentes no solucionables por los asesores.',
		category: 'personal',
		icon: Users,
	},
	{
		term: 'ME: MI EMPRESA',
		meaning: 'Tipo de cliente corporativo',
		description:
			'Tipo de cliente corporativo dentro de Rumbo. No trabaja con parámetros por placa. El consumo es contra un cupo general de la empresa. No tiene parámetros diarios, semanales o mensuales; se valida el saldo global.',
		category: 'clientes',
		icon: Building2,
	},
	{
		term: 'Picafiul: Saturno',
		meaning: 'Plataforma operativa',
		description:
			'Es la plataforma operativa usada por los asesores para gestionar los clientes de Rumbo. Permite ver placas, contratos, parámetros, restricciones y bloqueos. Desde Saturno se hacen desbloqueos, ajustes de parámetros, validación de contratos y recuperación de ventas.',
		category: 'sistemas',
		icon: Settings,
	},
	{
		term: 'RUMBO',
		meaning: 'Programa corporativo',
		description:
			'Programa corporativo de flotas empresariales y entidades oficiales. Utiliza Saturno para gestionar el consumo. Maneja cupos parametrizados por vehículo. Trabaja con chips instalados en los vehículos.',
		category: 'programas',
		icon: Zap,
	},
	{
		term: 'CANAL VIRTUAL',
		meaning: 'Portal de clientes corporativos',
		description:
			'Es el portal donde los clientes corporativos (jefes de transporte) gestionan sus flotas. Desde allí pueden habilitar vehículos, consultar consumos, descargar reportes y gestionar los contratos.',
		category: 'sistemas',
		icon: Settings,
	},
	{
		term: 'VFS: Venta fuera de sistema',
		meaning: 'Venta Fuera de Sistema',
		description:
			'Venta autorizada manualmente cuando el sistema presenta fallos en lectura del chip. Requiere autorización especial. Solo se permite bajo ciertas validaciones técnicas.',
		category: 'operaciones',
		icon: Shield,
	},
	{
		term: 'RESOLUTOR / SOPORTE FUNCIONAL',
		meaning: 'Personal de soporte interno',
		description:
			'Personal interno de soporte (ejemplo: Diego en Vive Pits). Recibe los casos que no puede resolver el asesor en primer contacto. En Rumbo también existen soportes funcionales que revisan temas administrativos de las estaciones.',
		category: 'personal',
		icon: Users,
	},
	{
		term: 'A1clic: caso clic',
		meaning: 'Herramienta de escalamiento',
		description:
			'Herramienta de escalamiento técnico en Salesforce. Se utiliza cuando el asesor necesita escalar casos a tecnología o mantenimiento.',
		category: 'sistemas',
		icon: FileText,
	},
	{
		term: 'ESCUDERÍA',
		meaning: 'Niveles de clasificación',
		description:
			'Niveles de clasificación dentro de Vive Pits. Define el nivel de desempeño de la estación (General, Bronce, Plata, Oro). Afecta los bonos y los beneficios en el catálogo de premios.',
		category: 'programas',
		icon: Shield,
	},
	{
		term: 'NPS',
		meaning: 'Net Promoter Score',
		description:
			'Indicador de satisfacción del cliente. Se calcula con encuestas sobre si recomendarían el servicio. Afecta el puntaje de escudería.',
		category: 'metricas',
		icon: FileText,
	},
	{
		term: 'PARAMETRIZACIÓN',
		meaning: 'Límites de consumo',
		description:
			'Los límites de consumo que tiene cada vehículo: Diario, Semanal, Mensual, Por transacción. El asesor puede modificarlos temporalmente solo cuando es necesario liberar un bloqueo.',
		category: 'operaciones',
		icon: Settings,
	},
	{
		term: 'CHIP',
		meaning: 'Dispositivo de Identificación Vehicular',
		description:
			'Es el hardware instalado en el vehículo para autorizar los tanques de forma automática. Si hay fallas en la lectura del chip, se generan bloqueos de autorización.',
		category: 'tecnologia',
		icon: Zap,
	},
	{
		term: 'GNV',
		meaning: 'Gas Natural Vehicular',
		description:
			'Tipo de combustible. Los vehículos GNV requieren revisiones periódicas aprobadas por el Ministerio de Minas (SICOV). Si no aprueban la revisión, quedan bloqueados automáticamente.',
		category: 'combustibles',
		icon: Fuel,
	},
	{
		term: 'ENTIDAD OFICIAL',
		meaning: 'Cliente gubernamental',
		description:
			'Cliente gubernamental que opera bajo contrato con Terpel. Su gestión es mucho más estricta (contratos, cupos, supervisores de contrato, auditoría interna). Ejemplos: Policía Nacional, Fuerzas Militares, entidades públicas.',
		category: 'clientes',
		icon: Building2,
	},
	{
		term: 'SUPERVISOR DE CONTRATO',
		meaning: 'Supervisor de contratos',
		description:
			'Persona encargada del control de los contratos de Entidades Oficiales. Es quien debe autorizar ajustes de parámetros y migración de placas.',
		category: 'personal',
		icon: Users,
	},
	{
		term: 'CONTRATO',
		meaning: 'Acuerdo comercial',
		description:
			'El acuerdo firmado entre Terpel y la empresa (pública o privada) que determina los cupos y condiciones de consumo. Los contratos tienen cupo, vigencia, fechas de inicio y fin.',
		category: 'documentos',
		icon: FileText,
	},
	{
		term: 'CUPOS (PARAMETRIZACIÓN)',
		meaning: 'Límites de consumo parametrizados',
		description: 'Límites de consumo para cada vehículo: Diario, Semanal, Quincenal, Mensual, Por transacción máxima.',
		category: 'operaciones',
		icon: Settings,
	},
	{
		term: 'AUTORIZACIÓN ABIERTA',
		meaning: 'Estado de un cupo asignado',
		description: 'Estado en el que queda un cupo asignado cuando no se termina la operación de carga de combustible.',
		category: 'operaciones',
		icon: Zap,
	},
	{
		term: 'REVISIÓN GNV - SICOV',
		meaning: 'Control técnico del Estado para vehículos de gas natural.',
		description: 'Si no pasa revisión, el vehículo queda bloqueado.',
		category: 'operaciones',
		icon: Shield,
	},
	{
		term: 'PRÓRROGA DE CONTRATO',
		meaning: 'Solo la realiza el analista de contratos',
		description: 'Modificación de vigencia de un contrato que ya está vencido.',
		category: 'documentos',
		icon: FileText,
	},
	{
		term: 'PARAMETRIZACIÓN CLIENTE VS VEHÍCULO',
		meaning: 'Mi Empresa: parámetros sobre la empresa.',
		description: 'Grandes Flotas: parámetros sobre cada placa.',
		category: 'clientes',
		icon: Building2,
	},
	{
		term: 'TIPOS DE RESTRICCIONES',
		meaning: 'Listado',
		description: 'Por estación - Por producto - Por horario - Por cantidad de visitas - Por volumen.',
		category: 'metricas',
		icon: Building2,
	},
	{
		term: 'AJUSTES COMERCIALES',
		meaning: 'Excepciones o parámetros de contrato',
		description: 'Módulo en Saturno donde se configuran ciertas excepciones o parámetros de contrato.',
		category: 'sistemas',
		icon: Settings,
	},
	{
		term: 'BLOQUEOS',
		meaning: 'Estado que impide tanqueo',
		description:
			'Estado que impide realizar un tanqueo, ya sea por: Exceso de cupo, Fallo de lectura, Visitas agotadas, Incumplimiento de revisión GNV.',
		category: 'operaciones',
		icon: Shield,
	},
	{
		term: 'SISTEMA DE PAGO',
		meaning: 'POS / INGENIERÍA PROPIA / SATÉLITE / INSP / GA SOLUTION',
		description: 'Diferentes sistemas que usan las estaciones para cargar las ventas',
		category: 'sistemas',
		icon: Settings,
	},
	{
		term: 'PCC',
		meaning: 'Códigos de estación en sistemas de pago propietarios',
		description: 'Código único por estación y surtidor que identifica el punto de venta.',
		category: 'sistemas',
		icon: Settings,
	},
	{
		term: 'CARTERA',
		meaning: 'Control de pagos',
		description: 'Control de pagos de los contratos. Si hay deuda, puede bloquearse el contrato.',
		category: 'financiero',
		icon: CreditCard,
	},
]

const categoryColors = {
	infraestructura: 'bg-blue-100 text-blue-800 border-blue-200',
	personal: 'bg-green-100 text-green-800 border-green-200',
	clientes: 'bg-purple-100 text-purple-800 border-purple-200',
	sistemas: 'bg-orange-100 text-orange-800 border-orange-200',
	programas: 'bg-pink-100 text-pink-800 border-pink-200',
	operaciones: 'bg-yellow-100 text-yellow-800 border-yellow-200',
	tecnologia: 'bg-indigo-100 text-indigo-800 border-indigo-200',
	combustibles: 'bg-red-100 text-red-800 border-red-200',
	documentos: 'bg-gray-100 text-gray-800 border-gray-200',
	metricas: 'bg-teal-100 text-teal-800 border-teal-200',
	financiero: 'bg-emerald-100 text-emerald-800 border-emerald-200',
}

const categoryLabels = {
	infraestructura: 'Infraestructura',
	personal: 'Personal',
	clientes: 'Clientes',
	sistemas: 'Sistemas',
	programas: 'Programas',
	operaciones: 'Operaciones',
	tecnologia: 'Tecnología',
	combustibles: 'Combustibles',
	documentos: 'Documentos',
	metricas: 'Métricas',
	financiero: 'Financiero',
}

// Colores de ring para cada categoría
const categoryRingColors = {
	infraestructura: 'ring-blue-200',
	personal: 'ring-green-200',
	clientes: 'ring-purple-200',
	sistemas: 'ring-orange-200',
	programas: 'ring-pink-200',
	operaciones: 'ring-yellow-200',
	tecnologia: 'ring-indigo-200',
	combustibles: 'ring-red-200',
	documentos: 'ring-gray-200',
	metricas: 'ring-teal-200',
	financiero: 'ring-emerald-200',
}

export default function Glosario() {
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('all')

	const filteredTerms = useMemo(() => {
		return glosarioData.filter(item => {
			const matchesSearch =
				item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.description.toLowerCase().includes(searchTerm.toLowerCase())

			const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory

			return matchesSearch && matchesCategory
		})
	}, [searchTerm, selectedCategory])

	const categories = [...new Set(glosarioData.map(item => item.category))]

	return (
		<div className="min-h-screen p-4 bg-white dark:bg-slate-950 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)]  dark:bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
			<div className="mx-auto max-w-7xl">
				{/* Header */}
				<div className="mb-8 text-center">
					<h1 className="mb-2 text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
						Glosario Terpel
					</h1>
					<p className="text-lg text-slate-600">Términos y conceptos operativos</p>
				</div>

				{/* Search and Filters */}
				<div className="mb-8 space-y-4">
					<div className="hidden relative mx-auto max-w-md">
						<Search className="absolute left-3 top-1/2 w-4 h-4 transform -translate-y-1/2 text-slate-400" />
						<Input
							type="text"
							placeholder="Buscar términos..."
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							className="pl-10 bg-white shadow-sm"
						/>
					</div>

					{/* Category Filter */}
					<div className="flex flex-wrap gap-2 justify-center">
						<Badge
							variant={selectedCategory === 'all' ? 'default' : 'outline'}
							className="transition-all cursor-pointer hover:scale-105"
							onClick={() => setSelectedCategory('all')}>
							Todos ({glosarioData.length})
						</Badge>
						{categories.map(category => (
							<Badge
								key={category}
								variant={selectedCategory === category ? 'default' : 'outline'}
								className={`cursor-pointer transition-all hover:scale-105 ${
									selectedCategory === category ? '' : categoryColors[category]
								}`}
								onClick={() => setSelectedCategory(category)}>
								{categoryLabels[category]} ({glosarioData.filter(item => item.category === category).length})
							</Badge>
						))}
					</div>
				</div>

				{/* Results Count */}
				<div className="mb-6 text-center">
					<p className="text-slate-600">
						Mostrando {filteredTerms.length} de {glosarioData.length} términos
					</p>
				</div>

				{/* Terms Grid */}
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{filteredTerms.map((item, index) => {
						const IconComponent = item.icon
						return (
							<Card
								key={item.term}
								className={cn(
									'transition-all duration-300 bg-white border-0 shadow-sm group hover:shadow-lg hover:-translate-y-1 dato-buscado ring-4',
									categoryRingColors[item.category]
								)}
								style={{
									animationDelay: `${index * 50}ms`,
									animation: 'fadeInUp 0.6s ease-out forwards',
								}}>
								<CardHeader className="pb-3">
									<div className="flex justify-between items-start">
										<div className="flex gap-3 items-center">
											<div className={`p-2 rounded-lg ${categoryColors[item.category]} bg-opacity-20`}>
												<IconComponent className="w-5 h-5" />
											</div>
											<div>
												<CardTitle className="text-lg font-bold transition-colors text-slate-800 group-hover:text-blue-600">
													{item.term}
												</CardTitle>
												<p className="text-sm font-medium text-slate-600">{item.meaning}</p>
											</div>
										</div>
									</div>
									<Badge className={`w-fit text-xs ${categoryColors[item.category]}`}>
										{categoryLabels[item.category]}
									</Badge>
								</CardHeader>
								<CardContent>
									<p className="text-sm leading-relaxed text-slate-700">{item.description}</p>
								</CardContent>
							</Card>
						)
					})}
				</div>

				{/* No Results */}
				{filteredTerms.length === 0 && (
					<div className="py-12 text-center">
						<div className="mb-4 text-slate-400">
							<Search className="mx-auto w-12 h-12" />
						</div>
						<h3 className="mb-2 text-lg font-medium text-slate-600">No se encontraron términos</h3>
						<p className="text-slate-500">
							Intenta con otros términos de búsqueda o selecciona una categoría diferente
						</p>
					</div>
				)}
			</div>
		</div>
	)
}
