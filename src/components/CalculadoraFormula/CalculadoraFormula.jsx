import { useEffect, useRef, useState } from "react"
import './CalculadoraFormula.scss'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select"
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
	TooltipProvider
} from '@/components/ui/tooltip'
import { BsInfoSquareFill } from "react-icons/bs";
import { FaPlusSquare } from "react-icons/fa";
import { IoReloadCircle } from "react-icons/io5";
import img1 from "../../assets/images/calculadora/estacion.png"
import img2 from "../../assets/images/calculadora/franquicias.png"
import img3 from "../../assets/images/calculadora/industrias.png"
import img4 from "../../assets/images/calculadora/aviacion.png"
import img5 from "../../assets/images/calculadora/marino.png"
import img6 from "../../assets/images/calculadora/lubri.png"
import img7 from "../../assets/images/calculadora/inicial.png"
import Checklist from "./Checklist";
import Informacion from "./Informacion";
const Usuarios = {
	1: {
		name: 'ESTACIONES AFILIADAS CREDITO',
		mensaje: "Deben estar al día en cartera, se deben revisar las 2 bases bitácora y gestión diaria,  pueden tener Max 500.000   y un día de mora, para poder liberar sin autorización de jefatura de cartera, se les puede liberar Max con el 5% de sobre cupo siempre y cuando no superen los 10 millones.",
        imagen: img1
	},
	2: {
		name: 'ESTACIONES AFILIADAS ANTICIPO',
		mensaje: "Deben pagar el 100% del valor del pedido, no tienen ninguna condición especial, no se le acepta soporte de pago que el medio de pago haya sido cheque.",
        imagen: img1
	},
	3: {
		name: 'FRANQUICIAS',
		mensaje: "Solo se debe validar la base de gestión diaria y bitácora, si esta en la base de gestión diaria se le cobra lo que diga la base y si no esta se libera sin tener en cuenta los saldos en SAP.",
        imagen: img2
	},
    4: {
		name: 'INDUSTRIA FIJA CREDITO',
		mensaje: "Se les puede liberar con Max 8 días de mora, siempre y cuando no tengan sobre cupo.",
        imagen: img3
	},
	5: {
		name: 'INDUSTRIA FIJA ANTICIPO',
		mensaje: "Deben pagar el 100% del valor del pedido, no tienen ninguna condición especial, no se le acepta soporte de pago que el medio de pago haya sido cheque.",
        imagen: img3
	},
	6: {
		name: 'AVIACIÓN',
		mensaje: "Se les puede liberar con Max 8 días de mora, siempre y cuando no tengan sobre cupo.",
        imagen: img4
	},
    7: {
		name: 'MARINOS',
		mensaje: "Se les puede liberar con Max 8 días de mora, siempre y cuando no tengan sobre cupo.",
        imagen: img5
	},
	8: {
		name: 'LUBRICANTES',
		mensaje: "Se les puede liberar con Max 8 días de mora, siempre y cuando no tengan sobre cupo.",
        imagen: img6
	},
}

export default function CalculadorasForm () {
	// DATOS INICIALES DEL POPUT Y EL CLIENTE - INFORMACION
    const [showPopup, setShowPopup] = useState(true)
    const [showPopupInfo, setShowPopupInfo] = useState(false)
	const [selectedUser, setSelectedUser] = useState(null)
	const popupRef = useRef(null)

	// DATOS DE LIBERACIONES
	const [limite, setLimite] = useState('')
	const [saldo, setSaldo] = useState('')

	// DATOS DE SALDOS A FAVOR
	const [inputs, setInputs] = useState([
		{ id: 1, value: 0 },
		{ id: 2, value: 0 },
	])
	const [total, setTotal] = useState(0)

	// DATOS DE MORA
	const [mora, setMora] = useState('')

	// DATOS PEDIDO
	const [pedidos, setPedidos] = useState([
		{ id: 1, value: 0 },
		{ id: 2, value: 0 },
	])
	const [libre, setLibre] = useState(0)
	const [sobreCupo, setSobreCupo] = useState(0)
	// DATOS DE CHECKLIST
	const [estadoChecklist, setEstadoChecklist] = useState({
		A: '',
		B: '',
		C: '',
		D: '',
		E: '',
		F: '',
		G: '',
		H: '',
		I: '',
		J: '',
		K: '',
		L: '',
		M: '',
		N: '',
	})
	const formato = (value) => {
		const numeric = value.replace(/\D/g, '') // solo números
		const number = parseInt(numeric || '0', 10)
		return number.toLocaleString('es-CO', {
			style: 'currency',
			currency: 'COP',
			maximumFractionDigits: 0,
		})
	}

	const cambios = (setter) => (e) => {
		const raw = e.target.value.replace(/\D/g, '')
		const numero = parseInt(raw || '0', 10)
		setter(numero) // guarda el valor numérico
		e.target.value = formato(raw) // muestra el valor formateado en el input
	}
	function renderFlowDots(direction = "left", color = "bg-yellow-400", size = "w-2 h-2", count = 6) {
		const containerClass = direction === "left"
			? "left-0 right-1/2 flex items-center justify-end pr-4"
			: "right-0 left-1/2 flex items-center justify-start pl-4"

		const animationName = direction === "left" ? "flowLeft" : "flowRight"

		return (
			<div className={containerClass}>
				{Array.from({ length: count }).map((_, i) => (
					<div
						key={`${direction}-${i}`}
						className={`${size} ${color} rounded-full absolute`}
						style={{
							animation: `${animationName} 3s infinite linear`,
							animationDelay: `${i * 0.5}s`,
						}}
					/>
				))}
			</div>
		)
	}
	
	// Función para agregar un nuevo input
	const addItem = (items, setItems) => {
		const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
		setItems([...items, { id: newId, value: 0 }])
	}

	// Función para actualizar el valor de un input específico
	const updateItemValue = (id, value, items, setItems) => {
		const numeric = value.replace(/\D/g, '')
		const number = parseInt(numeric || '0', 10)
		const formatted = number.toLocaleString('es-CO', {
			style: 'currency',
			currency: 'COP',
			maximumFractionDigits: 0,
		})

		setItems(items.map(item =>
			item.id === id ? { ...item, value: formatted } : item
		))
	}
	const reload = () => {
		setShowPopup(true)
		setSelectedUser(null)
		setLimite("")
		setSaldo("")
		setTotal(0)
		setMora("")
		setLibre(0)
		setSobreCupo(0)
		setPedidos([
			{ id: 1, value: 0 },
			{ id: 2, value: 0 },
		])
		setInputs([
			{ id: 1, value: 0 },
			{ id: 2, value: 0 },
		])
		setEstadoChecklist({
			A: '',
			B: '',
			C: '',
			D: '',
			E: '',
			F: '',
			G: '',
			H: '',
			I: '',
			J: '',
			K: '',
			L: '',
			M: '',
			N: '',
		})
	}
	// useEffect para calcular la suma total
	useEffect(() => {
		const sum = inputs.reduce((acc, input) => {
			const numeric = parseInt((input.value || '0').replace(/\D/g, ''), 10)
			return acc + numeric
		}, 0)
		setTotal(sum)
	}, [inputs])

	// useEffect para calcular el saldo libre
	useEffect(() => {
		const totalPedidos = pedidos.reduce((acc, pedido) => {
			const valorNumerico = parseInt(
				pedido.value.toString().replace(/\D/g, '') || '0',
				10
			);
			return acc + valorNumerico;
		}, 0);

		const libreCalculado = (limite - saldo) + total - totalPedidos;
		setLibre(libreCalculado);
	}, [limite, saldo, total, pedidos]);
	
	// useEffect para calcular el sobrecupo
	useEffect(() => {
		const resultado = saldo - limite;
		setSobreCupo(resultado < 0 ? 0 : resultado);
	}, [saldo, limite]);

    // Cierra popup con ESC
	useEffect(() => {
		const handleEsc = e => {
			if (e.key === 'Escape' && selectedUser) setShowPopup(false)
			if (e.key === 'Escape') setShowPopupInfo(false)
		}
		window.addEventListener('keydown', handleEsc)
		return () => window.removeEventListener('keydown', handleEsc)
	}, [selectedUser])

    return(
        <section className="flex items-center justify-center flex-wrap 2xl:flex-nowrap p-4">
			{showPopup && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
					<div
						ref={popupRef}
						className="bg-background p-6 rounded-2xl shadow-xl w-full max-w-2xl"
					>
						<h2 className="text-3xl font-semibold mb-4 text-center">
							Bienvenido, por favor escoge el cliente
						</h2>
						<Select className="bg-primary" onValueChange={(value) => setSelectedUser(Usuarios[value])}>
                            <SelectTrigger className="w-full mb-4 bg-primary/20">
                                <SelectValue className="text-5xl" placeholder="Selecciona un tipo de cliente" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {Object.entries(Usuarios).map(([id, user]) => (
                                        <SelectItem key={id} value={id}>
                                        {user.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>


						{selectedUser && (
							<div className="bg-foreground/10 p-4 rounded-md text-lg text-bg-foreground mb-4 max-h-48 overflow-auto">
                                <h2 className="w-full text-center p-2 text-xl font-bold">--- Condiciones ---</h2>
								{selectedUser.mensaje}
							</div>
						)}

						<button
							onClick={() => setShowPopup(false)}
							className="bg-primary hover:bg-secondary text-white w-full py-2 rounded-lg"
                            disabled={!selectedUser}
						>
							Aceptar
						</button>
					</div>
				</div>
			)}

			<div className="derecha w-full 2xl:w-1/2 flex items-center justify-center gap-10 flex-wrap py-4">
                <div className=" text-center bg-primary w-[30%] md:w-[60%] lg:w-[30%] p-8 pb-4 rounded-xl">
                    <figure className="w-full h-auto mx-auto mb-2 bg-background/80 rounded-xl p-4">
						<img
							src={selectedUser ? selectedUser.imagen : img7}
							className="w-full h-full object-contain"
							style={{ filter: 'drop-shadow(0 0 4px #000000)' }}
						/>
                    </figure>
                    {selectedUser ? (
                        <div className="mt-4 w-full flex flex-wrap justify-evenly items-center">
							<p className="w-[80%] text-background text-base">
								Cliente seleccionado: <br />
								<span className="text-xl border-t-2 font-bold">{selectedUser.name}</span>
							</p>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger className="rounded-sm shadow-aura shadow-background/30">
										<BsInfoSquareFill className="text-background text-3xl hover:text-secondaryLight" />
									</TooltipTrigger>
									<TooltipContent className="max-w-sm">
										<p className="font-xl font-bold p-4">{selectedUser.mensaje}</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
                    ) : (
						<p className="w-full mt-4 text-background text-xl font-bold">
                            #1 - Escoge el cliente pára inicial
                        </p>
					)}
                </div>
                <div className="relative bg-background w-[60%] md:w-[100%] lg:w-[60%] rounded-xl p-4 flex items-center justify-center flex-wrap overflow-hidden">
					<div className="relative flex items-center justify-center w-full max-w-lg pb-4">
						{renderFlowDots("left", "bg-primaryDark", "w-4 h-4", 6)}
						<h2 className="font-bold text-2xl relative z-10">(#1) - Liberaciones</h2>
						{renderFlowDots("right", "bg-primaryDark", "w-4 h-4", 6)}
					</div>
					<ul className="w-full flex items-center justify-center flex-wrap gap-4 px-2">
						<div className="w-[90%] h-1 bg-primary/40"></div>
						<li className="w-full flex items-center justify-between flex-wrap">
							<p className="text-base font-bold w-[24%]">LIMITE DE CREDITO</p>
							<input
								type="text"
								value={formato(limite.toString())}
								onChange={cambios(setLimite)}
								className="px-4 py-2 rounded-md bg-secondaryLight/40 tracking-widest text-right font-mono w-[66%] outline-none focus:shadow-[0_0_0_3px_rgba(253,186,18,1)]"
								placeholder="$ 0"
							/>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger className="rounded-sm shadow-aura">
										<BsInfoSquareFill className="text-secondary text-3xl hover:text-primary " />
									</TooltipTrigger>
									<TooltipContent>
										<p className="font-xl font-bold p-4">El limite de credito lo optienes desde SAP</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</li>
						<li className="w-full flex items-center justify-between flex-wrap">
							<p className="text-base font-bold w-[24%]">SALDO OCUPADO</p>
							<input
								type="text"
								value={formato(saldo.toString())}
								onChange={cambios(setSaldo)}
								className="px-4 py-2 rounded-md bg-secondaryLight/40 tracking-widest text-right font-mono w-[66%] outline-none focus:shadow-[0_0_0_3px_rgba(253,186,18,1)]"
								placeholder="$ 0"
							/>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger className="rounded-sm shadow-aura">
										<BsInfoSquareFill className="text-secondary text-3xl hover:text-primary" />
									</TooltipTrigger>
									<TooltipContent>
										<p className="font-xl font-bold p-4">El saldo ocupado lo optienes desde SAP.</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</li>
						<div className="w-[90%] h-1 bg-foreground/10"></div>
						<li className="w-full flex items-center justify-between flex-wrap bg-secondary/20 p-4 rounded-lg">
							<p className="text-base text-secondary font-bold w-[24%]">TOTAL DE PAGOS</p>
							<input
								type="text"
								value={formato(total.toString())}
								disabled
								className="px-4 py-2 border-solid border-secondary rounded-md bg-background text-gray-500 tracking-widest text-right font-mono w-[66%]"
							/>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger className="rounded-sm shadow-aura">
										<BsInfoSquareFill className="text-secondary text-3xl hover:text-primary" />
									</TooltipTrigger>
									<TooltipContent>
										<p className="font-xl p-4">Este valor será calculado automáticamente.</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</li>
					</ul>
                </div>
				<div className="md:w-full lg:w-[94%] flex justify-evenly items-center flex-wrap p-4 bg-background rounded-lg">
					<div className="relative flex items-center justify-center w-full max-w-lg">
						{renderFlowDots("left", "bg-primaryDark", "w-4 h-4", 6)}
						<h2 className="text-xl md:text-2xl font-semibold text-foreground text-center z-10 whitespace-nowrap">
							(#2) - SALDOS A FAVOR / SOPORTES
						</h2>
						{renderFlowDots("right", "bg-primaryDark", "w-4 h-4", 6)}
					</div>
					<div className="w-full p-4 flex justify-evenly items-center flex-wrap">
						<ul className="scrooll w-[96%] flex justify-between items-center flex-wrap gap-4 border-t-4 border-b-4 py-4 px-4 border-t-primary/40 max-h-[16vh] overflow-y-auto">
							{inputs.map((input, index) => (
								<li key={input.id} className="w-[48%] flex items-center space-x-3">
									<span className="text-2xl font-medium text-secondary w-8">#{input.id}</span>
									<input
										type="text"
										placeholder="Ingresa un valor"
										className="flex-1 px-3 py-2 rounded-md outline-none text-right font-mono bg-secondaryLight/40 focus:shadow-[0_0_0_3px_rgba(253,186,18,1)]"
										onChange={(e) => updateItemValue(input.id, e.target.value, inputs, setInputs)} 
										value={input.value}
									/>
								</li>
							))}
						</ul>

						<div className="w-[96%] border-b-4 border-primary/40 flex justify-between items-center pt-4 pb-4">
							<div className="flex items-center space-x-6">
								<span className="text-xl font-medium text-foreground">Total:</span>
								<div className="p-2 text-xl bg-foreground/10 rounded-md font-semibold text-foreground min-w-[20%] text-center">
									{formato(total.toString())}
								</div>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger className="rounded-sm shadow-aura">
											<BsInfoSquareFill className="text-secondary text-3xl hover:text-primary " />
										</TooltipTrigger>
										<TooltipContent>
											<p className="font-xl font-bold p-4">El total de los soportes de pago, que aún no han ingresado a la cartera.</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>

							<button
								onClick={() => addItem(inputs, setInputs)}
								className="text-xl min-w-[20%] flex items-center justify-evenly space-x-2 px-4 py-2 bg-primaryDark hover:bg-primaryLight text-background rounded-md transition-colors duration-200 focus:outline-none focus:bg-primary"
							>
								<FaPlusSquare size={22} />
								<span>Agregar</span>
							</button>
						</div>
					</div>
					<div className="relative flex items-center justify-center w-full max-w-lg">
						{renderFlowDots("left", "bg-primaryDark", "w-4 h-4", 6)}
						<h2 className="text-xl md:text-2xl font-semibold text-foreground text-center z-10 whitespace-nowrap">
							MORA
						</h2>
						{renderFlowDots("right", "bg-primaryDark", "w-4 h-4", 6)}
					</div>
					<ul className="w-full flex items-center justify-evenly flex-wrap gap-4 px-2 bg-secondary/20">
						<li className="md:w-full lg:w-[48%] flex items-center justify-between flex-wrap p-4 rounded-lg">
							<p className="text-base text-secondary font-bold w-[24%]">VALOR MORA</p>
							<input
								type="text"
								value={formato(mora.toString())}
								onChange={cambios(setMora)}
								className="px-4 py-2 border-solid border-secondary rounded-md bg-background tracking-widest text-right font-mono w-[66%] outline-none focus:border-secondaryDark"
							/>
						</li>
						<li className="md:w-full lg:w-[48%] flex items-center justify-between flex-wrap p-4 rounded-lg">
							<p className={`text-base font-bold w-[24%] ${
								mora >= total ? 'text-destructive' : 'text-green-600'
							}`}>{mora >= total ? 'DEBE LA MORA' : 'PAGÓ LA MORA'}</p>
							<input
								type="text"
								value={formato((mora - total).toString())}
								disabled
								className={`px-4 py-2 border-solid rounded-md bg-background tracking-widest text-right font-mono w-[66%] ${
									mora >= total
										? 'text-destructive border-destructive'
										: 'text-green-600 border-green-600'
								}`}

							/>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger className="rounded-sm shadow-aura">
										<BsInfoSquareFill className="text-secondary text-3xl hover:text-primary" />
									</TooltipTrigger>
									<TooltipContent>
										<p className="font-xl font-bold p-4">Recuerda, revisar la cartera, y no liberar si el cliente esta en mora.</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</li>
					</ul>
				</div>
            </div>
			<div className="izquierda w-full 2xl:w-1/2 flex justify-center items-center gap-10 flex-wrap">
				<div className="w-[90%] bg-primary text-background/80 text-center py-4 rounded-lg mt-8 flex justify-evenly items-center flex-wrap lg:flex-nowrap">
				    <h1 className="text-4xl font-bold w-full lg:w-auto">FORMULA LIBERACIONES</h1>
					<button className="flex justify-evenly items-center gap-2 text-xl bg-background text-primary w-1/3 mt-2 lg:my-0 lg:w-1/6 py-2 rounded-lg" onClick={reload}>Reiniciar <IoReloadCircle size={30}/></button>
					<button className="flex justify-evenly items-center gap-2 text-xl bg-background text-primary w-1/3 mt-2 lg:my-0 lg:w-1/6 py-2 rounded-lg" onClick={() => {setShowPopupInfo(true)}}>Info <BsInfoSquareFill /></button>
				</div>
				<div className="md:w-full lg:w-[94%] flex justify-evenly items-center flex-wrap p-4 bg-background rounded-lg">
					<div className="relative flex items-center justify-center w-full max-w-lg">
						{renderFlowDots("left", "bg-primaryDark", "w-4 h-4", 6)}
						<h2 className="text-xl md:text-2xl font-semibold text-foreground text-center z-10 whitespace-nowrap">
							(#3) - VALOR DEL PEDIDO
						</h2>
						{renderFlowDots("right", "bg-primaryDark", "w-4 h-4", 6)}
					</div>
					<div className="w-full p-4 flex justify-evenly items-center flex-wrap">
						<ul className="scrooll w-[96%] flex justify-between items-center flex-wrap gap-4 border-t-4 border-b-4 py-4 px-4 border-t-primary/40 max-h-[16vh] overflow-y-auto">
							{pedidos.map((pedido, index) => (
								<li key={pedido.id} className="w-[48%] flex items-center justify-between space-x-3">
									<span className="md:text-base lg:text-2xl font-medium text-secondary w-auto text-center">{pedido.id} Pedido</span>
									<input
										type="text"
										placeholder="Ingresa un valor"
										className="w-[76%] px-3 py-2 rounded-md outline-none text-right font-mono bg-secondaryLight/40 focus:shadow-[0_0_0_3px_rgba(253,186,18,1)]"
										onChange={(e) => updateItemValue(pedido.id, e.target.value, pedidos, setPedidos)} 
										value={pedido.value}
									/>
								</li>
							))}
						</ul>

						<div className="w-[96%] flex justify-between items-center md:flex-wrap lg:flex-nowrap pt-4">
							<div className="flex items-center space-x-4">
								<span className="text-sm xl:text-lg font-medium text-foreground">LIBRE:</span>
								<div
									className={`p-2 text-sm xl:text-lg rounded-md font-semibold min-w-[20%] text-center
										${libre < 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
								>
									{formato(libre.toString())}
								</div>
							</div>
							<div className="flex items-center space-x-4">
								<span className="text-sm xl:text-lg font-medium text-foreground">SOBRECUPO:</span>
								<div
									className="p-2 text-sm xl:text-lg rounded-md font-semibold min-w-[20%] text-center bg-red-100 text-red-700"
								>
									{formato(sobreCupo.toString())}
								</div>
							</div>
							<div className="flex items-center space-x-4">
								<span className="text-sm xl:text-lg font-medium text-foreground">PORCENTAJE:</span>
								<div className="p-2 text-sm xl:text-lg rounded-md font-semibold min-w-[20%] text-center bg-red-100 text-red-700">
									{typeof sobreCupo === "number" && typeof limite === "number" && limite > 0
										? `${Math.round(Math.abs(sobreCupo) / limite * 100)}%`
										: "0%"}
								</div>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger className="rounded-sm shadow-aura">
											<BsInfoSquareFill className="text-secondary text-3xl hover:text-primary" />
										</TooltipTrigger>
										<TooltipContent>
											<p className="font-xl font-bold p-4">Gerente regional solo tiene autorizado el 30% de sobrecupo.</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
							<button
								onClick={() => addItem(pedidos, setPedidos)}
								className="text-xl md:min-w-[100%] md:mt-4 lg:mt-0 lg:min-w-[20%] flex items-center justify-evenly space-x-2 px-4 py-2 bg-primaryDark hover:bg-primaryLight text-background rounded-md transition-colors duration-200 focus:outline-none focus:bg-primary"
							>
								<FaPlusSquare size={22} />
								<span>Agregar</span>
							</button>
						</div>
					</div>
				</div>
				<div className="md:w-full lg:w-[94%] flex justify-evenly items-center flex-wrap p-4 bg-background rounded-lg">
					<div className="relative flex items-center justify-center w-full max-w-lg pb-4">
						{renderFlowDots("left", "bg-primaryDark", "w-4 h-4", 6)}
						<h2 className="text-xl md:text-2xl font-semibold text-foreground text-center z-10 whitespace-nowrap">
							(#4) - CHECKLIST PROCESO DE LIBERACIÓN
						</h2>
						{renderFlowDots("right", "bg-primaryDark", "w-4 h-4", 6)}
					</div>
					<div className="w-[96%] flex justify-evenly items-center flex-wrap max-h-[40vh] overflow-y-auto scrooll border-t-4 border-b-4 border-t-primary/40">
						<Checklist estadoChecklist={estadoChecklist} setEstadoChecklist={setEstadoChecklist}/>
					</div>
				</div>
			</div>
			{showPopupInfo && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2">
					<div
						ref={popupRef}
						className="bg-background p-6 rounded-2xl shadow-xl w-[80%]"
					>
						<Informacion showPopupInfo={showPopupInfo} setShowPopupInfo={setShowPopupInfo}/>
					</div>
				</div>
			)}
		</section>
    )
} 