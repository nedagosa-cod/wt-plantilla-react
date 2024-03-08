const dataTipi = [
	{
		Area: 'VENTAS',
		Categoria: 'COTIZACIÓN DE GRUPOS',
		Descripcion:
			'Cotizar o comprar reservas de un grupo de 10 o más pasajeros.',
	},
	{
		Area: 'VENTAS',
		Categoria: 'PREGUNTAS VENTAS DE PASAJES (CHILE COMPRAS)',
		Descripcion:
			'Paso a paso para realizar una compra a través de Chile Compras.',
	},
	{
		Area: 'VENTAS DIRECTAS',
		Categoria: 'AGENCIA GDS',
		Descripcion:
			'Pasajero o contacto de la agencia GDS, consulta o desea realizar modificaciones en la misma.',
	},
	{
		Area: 'VENTAS DIRECTAS',
		Categoria: 'AGENCIA',
		Descripcion:
			'Se identifica que la compra fue por Agencia y se comunica el pasajero, solicitando modificaciones o validaciones.',
	},
	{
		Area: 'VENTAS DIRECTAS',
		Categoria: 'CHARTER',
		Descripcion:
			'Solicita información de nuestros convenios con los vuelos privados, se dirigen a realizar la solicitud por medio de nuestro sitio web.',
	},
	{
		Area: 'ANCILLARES',
		Categoria: 'ASIENTOS',
		Descripcion:
			'Solicita o requiere algún tipo de movimiento/asignación y/o información de asientos en su reserva.',
	},
	{
		Area: 'ANCILLARES',
		Categoria: 'CAMBIO DE NOMBRE',
		Descripcion:
			'Pasajero se comunica solicitando información o modificaciones de nombre en su reserva.',
	},
	{
		Area: 'ANCILLARES',
		Categoria: 'CAMBIO VOLUNTARIO',
		Descripcion:
			'Solicita cotizaciones o cambios voluntarios de fecha en su reserva.',
	},
	{
		Area: 'ANCILLARES',
		Categoria: 'DISCOUNT CLUB',
		Descripcion:
			'Brindar  información/modificaciones y/o validaciones con el Club de descuentos (Membresías).',
	},
	{
		Area: 'ANCILLARES',
		Categoria: 'EMBARQUE PRIORITARIO',
		Descripcion:
			'Solicita información sobre el opcional de embarque prioritario.',
	},
	{
		Area: 'ANCILLARES',
		Categoria: 'EQUIPAJE DE BODEGA',
		Descripcion:
			'Información del opcional Equipaje de Bodega, para cotizar/agregar/modificar o consultar sobre el mismo.',
	},
	{
		Area: 'ANCILLARES',
		Categoria: 'EQUIPAJE DE CABINA',
		Descripcion:
			'Información del opcional Equipaje de Cabina, para cotizar/agregar/modificar o consultar sobre el mismo.',
	},
	{
		Area: 'ANCILLARES',
		Categoria: 'EQUIPAJE SOBREDIMENCIONADO',
		Descripcion:
			'Información del opcional Equipaje de Sobredimensionado, para cotizar/agregar/modificar o consultar sobre el mismo.',
	},
	{
		Area: 'ANCILLARES',
		Categoria: 'ESTADO DE SALDO O GIFTCARD',
		Descripcion:
			'Solicitan información del estado/uso y/o funciones del Voucher (Gift Card).',
	},
	{
		Area: 'ANCILLARES',
		Categoria: 'FLEXISMART',
		Descripcion:
			'Solicita información del opcional FlexiSmart: usos, beneficios y/o modificaciones, este opcional (permite cambiar la fecha, hora o tramo del itinerario sin pagar penalización) solo diferencia tarifaria en caso de existir.',
	},
	{
		Area: 'ANCILLARES',
		Categoria: 'INFANTE',
		Descripcion:
			'Solicitan información del opcional infante (0 a 23 meses) con el fin de modificar/agregar y/o consultar usos y beneficios.',
	},
	{
		Area: 'ANCILLARES',
		Categoria: 'MASCOTA A BORDO',
		Descripcion:
			'Solicitan  información del opcional mascota abordo, consultando condiciones/usos/beneficios.',
	},
	{
		Area: 'ANCILLARES',
		Categoria: 'MENORES NO ACOMPAÑADOS',
		Descripcion:
			'solicitan información de menores que viajen solos sin la compañía de un adulto, y requieran asesoría. (NO MANEJAMOS EL SERVICIO).',
	},
	{
		Area: 'ANCILLARES',
		Categoria: 'MASCOTA ASISTENCIA EMOCIONAL',
		Descripcion:
			'solicitan información del servicio de mascota de asistencia emocional.( NO CONTAMOS CON ESTE SERVICIO).',
	},
	{
		Area: 'ANCILLARES',
		Categoria: 'SEGURO DE VIAJE',
		Descripcion:
			'Solicitan información de la póliza de seguros CHUBB, beneficios, condiciones y usos.',
	},
	{
		Area: 'ANCILLARES',
		Categoria: 'SILLA DE RUEDA',
		Descripcion:
			'Solicitan información de condiciones/modificaciones del servicio de silla de ruedas con el fin de agregar o validar requisitos en ATO.',
	},
	{
		Area: 'WEBSITE',
		Categoria: 'CHECK IN',
		Descripcion:
			'Solicita información de Tiempos/modo de realización/o solicitudes referentes al check in.',
	},
	{
		Area: 'WEBSITE',
		Categoria: 'ERROR EN SITIO WEB',
		Descripcion:
			'Cuando se  presentan  fallas e inconvenientes de solicitudes por medio de la página web.',
	},
	{
		Area: 'WEBSITE',
		Categoria: 'HORARIO DE VUELO',
		Descripcion:
			'Solicitan  información de su itinerario (Tiempos/actualizaciones/modificaciones, etc.)',
	},
	{
		Area: 'WEBSITE',
		Categoria: 'PROMOCIONES',
		Descripcion:
			'Solicitan información de promociones vigentes, como códigos promocionales, que se vean reflejados por página web (REVISAR BASES LEGALES)',
	},
	{
		Area: 'WEBSITE',
		Categoria: 'PROMOCIONES DE BANCO ESTADO',
		Descripcion:
			'Pasajeros de banco estado solicitan información de promociones, usos, beneficios y condiciones.',
	},
	{
		Area: 'WEBSITE',
		Categoria: 'VENTA DE PASAJE ( CALL CENTER)',
		Descripcion:
			'Realizar proceso de compra por medio de contact center, donde se le informaran los valores correspondientes al cargo por servicio.',
	},
	{
		Area: 'MARKETING',
		Categoria: 'DESTINOS Y TARIFAS',
		Descripcion:
			'Esta es utilizada cuando el pasajero se comunica solicitando información de rutas/destinos/tarifas  disponibles, se deberá invitar al pasajero a la página.',
	},
	{
		Area: 'MARKETING',
		Categoria: 'PROMOCIONES',
		Descripcion:
			'Solicitan información de promociones vigentes, como códigos promocionales, que se vean reflejados por página web (REVISAR BASES LEGALES).',
	},
	{
		Area: 'MARKETING',
		Categoria: 'SMARTICKET',
		Descripcion:
			'Solicitan alternativas de anulación de su pasaje, cambio de fecha/ruta/hora pagando solo diferencia de tarifa sin el cobro de la penalidad y ceder su pasaje (Cambio de nombre) (Solicitudes solo por página web).',
	},
	{
		Area: 'AEROPUERTO',
		Categoria: 'COBRO DUPLICADO EN AEROPUERTO',
		Descripcion:
			'Pasajero indica que agrego un pago por ATO (Aeropuerto) y el cobro fue Duplicado.',
	},
	{
		Area: 'AEROPUERTO',
		Categoria: 'EQUIPAJE CON DAÑO',
		Descripcion:
			'Informan que el equipaje presenta algún tipo de daño en su equipaje.',
	},
	{
		Area: 'AEROPUERTO',
		Categoria: 'EQUIPAJE CON MERMA',
		Descripcion:
			'Informa que obtuvo alguna perdida de elementos en su equipaje.',
	},
	{
		Area: 'AEROPUERTO',
		Categoria: 'EQUIPAJE DEMORADO',
		Descripcion:
			'Informan que el equipaje presenta alguna demora o perdida del mismo.',
	},
	{
		Area: 'AEROPUERTO',
		Categoria: 'GASTO DE PRIMERA NECESIDAD',
		Descripcion:
			'Solicitan un reclamo con el fin de suplir sus necesidades especiales, por su equipaje extraviado.',
	},
	{
		Area: 'OPERACIONES DE VUELOS',
		Categoria: 'MERCANCIA PELIGROSA',
		Descripcion:
			'Solicitan información de mercancías peligrosas o prohibidas a bordo.',
	},
	{
		Area: 'OPERACIONES DE VUELOS',
		Categoria: 'PASAJERA EMBARAZADA',
		Descripcion:
			'Información o requisitos de viaje para una pasajera en estado de embarazo.',
	},
	{
		Area: 'OPERACIONES DE VUELOS',
		Categoria: 'PASAJERO INSULINODEPENDIENTE',
		Descripcion:
			'Pasajero informando que es Insulinodependiente y desea información de requisitos y condiciones a bordo.',
	},
	{
		Area: 'OPERACIONES DE VUELOS',
		Categoria: 'REQUISITOS DE VIAJES/ DOCUMENTOS',
		Descripcion:
			'Solicitan información de requisitos o documentos para su viaje.',
	},
	{
		Area: 'OPERACIONES DE VUELOS',
		Categoria: 'TRANSPORTE DE OXIGENO',
		Descripcion:
			'Información de oxígeno portátil a bordo, condiciones y requisitos.',
	},
	{
		Area: 'OPERACIONES FINANCIERAS',
		Categoria: 'BOLETA',
		Descripcion: 'Solicitan la confirmación de la compra (Itinerario).',
	},
	{
		Area: 'OPERACIONES FINANCIERAS',
		Categoria: 'COMPRANTE DE DEVOLUCIÓN',
		Descripcion:
			'Esta es utilizada cuando el pasajero se comunica solicitando información de su comprobante por devolución',
	},
	{
		Area: 'OPERACIONES FINANCIERAS',
		Categoria: 'DEVOLUCIONES',
		Descripcion: 'Información sobre devolución de reserva.',
	},
	{
		Area: 'OPERACIONES FINANCIERAS',
		Categoria: 'ESTADO DE DEVOLUCIÓN',
		Descripcion: 'Información sobre el estado de su devolución.',
	},
	{
		Area: 'OPERACIONES FINANCIERAS',
		Categoria: 'FACTURA',
		Descripcion: 'Información de factura.',
	},
	{
		Area: 'OPERACIONES FINANCIERAS',
		Categoria: 'FACTURA NO EMITIDA',
		Descripcion: 'Información de factura, la cual no fue emitida.',
	},
	{
		Area: 'OPERACIONES FINANCIERAS',
		Categoria: 'HOLD CANCELED',
		Descripcion:
			'Informan que no recibieron la confirmación del itinerario y evidenciamos que cuenta con un pago no reconocido.',
	},
	{
		Area: 'SOPORTE ESPECIALIZADO',
		Categoria: 'ASIENTOS MENORES DE EDAD',
		Descripcion:
			'Solicitan asignación de asientos junto a un menor de 14 años.',
	},
	{
		Area: 'SOPORTE ESPECIALIZADO',
		Categoria: 'CAMBIO POR ENFERMEDAD',
		Descripcion:
			'Información de cambio por enfermedad, modo de solicitud, condiciones y usos.',
	},
	{
		Area: 'SOPORTE ESPECIALIZADO',
		Categoria: 'EXPERIENCIA EN AEROPUERTO',
		Descripcion:
			'Pasajero brinda información de la experiencia que tuvo en el aeropuerto.',
	},
	{
		Area: 'SOPORTE ESPECIALIZADO',
		Categoria: 'EXPERIENCIA ABORDO',
		Descripcion:
			'Pasajero brindanda información de la experiencia que tuvo abordo.',
	},
	{
		Area: 'SOPORTE ESPECIALIZADO',
		Categoria: 'EXPERIENCIA SERVICIO AL CLIENTE',
		Descripcion:
			'Pasajero brinda información de la experiencia que tuvo en contac center.',
	},
	{
		Area: 'VUELOS AFECTADOS',
		Categoria: 'ALTERNATIVAS VUELOS AFECTADOS',
		Descripcion:
			'Información de alternativas brindadas por la compañía por vuelos afectados.',
	},
	{
		Area: 'VUELOS AFECTADOS',
		Categoria: 'CAMBIO VUELO AFECTADOS',
		Descripcion:
			'Solicitan alternativa de cambio de fecha/hora/ruta por causa de su vuelo afectado.',
	},
	{
		Area: 'OUTBAND',
		Categoria: 'TIMPD3 (SIN CONTACTO)',
		Descripcion:
			'Realizar llamadas a pasajeros por vuelos con afectación, donde se le brindan alternativas, y no se logra contacto con el pasajero.(AUTORIZADO POR SUPERVISOR).',
	},
	{
		Area: 'OUTBAND',
		Categoria: 'TIMPD3 (CON CONTACTO)',
		Descripcion:
			'Realizar llamadas a pasajeros por vuelos con afectación, donde se le brindan alternativas, y  se logra contacto con el pasajero.(AUTORIZADO POR SUPERVISOR).',
	},
	{
		Area: 'OUTBAND',
		Categoria: 'PASAJERO VOLUNTARIO (SIN CONTACTO)',
		Descripcion:
			'Se genera la devolución de la llamada, informando el costo por el cambio realizado por el sitio web.',
	},
	{
		Area: 'OUTBAND',
		Categoria: 'PASAJERO VOLUNTARIO (CON CONTACTO)',
		Descripcion:
			'Se genera la devolución de la llamada, informando el costo por el cambio realizado por el sitio web.',
	},
]
export default dataTipi;