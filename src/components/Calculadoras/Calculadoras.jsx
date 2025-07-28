import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import imgLogoTerpel from '@/assets/images/logos/terpel.png'
import imgAlToque from '@/assets/images/logos/altoque.png'
import imgGazel from '@/assets/images/logos/gazel.png'
import imgVoltex from '@/assets/images/logos/voltext.png'
import imgLogoRumbo from '@/assets/images/logos/rumbo.png'
import imgLubricantes from '@/assets/images/logos/lubricantes.png'
import { Separator } from '../ui/separator'
import { useState } from 'react'
import { CircleArrowDown, CircleArrowUp } from 'lucide-react'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const TerpelCalcs = {
	1: {
		name: 'Terpel Corriente',
		multiply_x_galon: 15,
		start_decima: 0.01,
		suma_decima: 0.2,
		multiply_decimas: 3,
	},
	2: {
		name: 'Terpel Diesel',
		multiply_x_galon: 10,
		start_decima: 0.01,
		suma_decima: 0.19,
		multiply_decimas: 2,
	},
	3: {
		name: 'Terpel Extra',
		multiply_x_galon: 20,
		start_decima: 0.01,
		suma_decima: 0.19,
		multiply_decimas: 4,
	},
}

const AlToqueCalcs = {
	1: {
		tdc: 1000,
		pts_x_tdc: 2,
	},
}

const GazelCalcs = {
	1: {
		galon: 1,
		pts_x_mtc: 5,
	},
}

const VoltexCalcs = {
	1: {
		carga: 1000,
		pts_x_carga: 2,
	},
}

const RumboCalcs = {
	1: {
		name: 'Rumbo Corriente GNV Livianos',
		pts: 10,
	},
	2: {
		name: 'Rumbo Diesel GNV Pesados',
		pts: 60,
	},
}

const LubricantesCalcs = {
	1: {
		valor: 1000,
		pts_x_valor: 3,
	},
}

export default function Calculadoras() {
	const [numero, setNumero] = useState(1)
	const [rumboNumero, setRumboNumero] = useState(1)
	const incrementar = () => setNumero(prev => (prev < 3 ? prev + 1 : prev))
	const decrementar = () => setNumero(prev => (prev > 1 ? prev - 1 : prev))
	const incrementarRumbo = () => setRumboNumero(prev => (prev < 2 ? prev + 1 : prev))
	const decrementarRumbo = () => setRumboNumero(prev => (prev > 1 ? prev - 1 : prev))
	const [galones, setGalones] = useState(1)
	const [tdc, setTdc] = useState(1000)
	const [gnv, setGnv] = useState(1)
	const [galonPorDecima, setGalonPorDecima] = useState(0)
	const [carga, setCarga] = useState(1000)
	const [valor, setValor] = useState(1000)
	const offset = numero === 1 ? 0 : 60

	return (
		<div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] ">
			<div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d50000,transparent)] p-12 overflow-y-scroll">
				<h1 className="flex gap-2 justify-center items-center my-6 text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600 drop-shadow-md">
					Calculadoras
				</h1>
				<Separator className="m-auto mb-6 w-1/3 h-1 bg-secondary" />
				<Accordion type="single" collapsible>
					{/* Terpel Calculator */}
					<AccordionItem
						value="corriente"
						className="p-2 w-full h-full bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-2xl border-2 border-red-500 shadow-xl">
						<AccordionTrigger className="hover:no-underline">
							<figure className="flex overflow-hidden gap-2 items-center w-28 h-14">
								<img src={imgLogoTerpel} alt="logo terpel" className="w-full" />
							</figure>
							<ul className="flex gap-4 justify-around items-center w-full">
								<li className="flex flex-col gap-2 justify-center text-sm">
									<span className="text-primary">EDS</span>
									<p>1 por galon</p>
								</li>
								<li className="flex flex-col gap-2 items-center md:flex-row">
									<span className="text-4xl">15</span>
									<p className="font-normal">
										<strong>Puntos</strong> Corriente
									</p>
								</li>
								<li className="flex flex-col gap-2 items-center md:flex-row">
									<span className="text-4xl">10</span>
									<p className="font-normal">
										<strong>Puntos</strong> Diesel
									</p>
								</li>
								<li className="flex flex-col gap-2 items-center md:flex-row">
									<span className="text-4xl">20</span>
									<p className="font-normal">
										<strong>Puntos</strong> Extra
									</p>
								</li>
							</ul>
						</AccordionTrigger>
						<AccordionContent className="p-0">
							<Separator className="bg-primary/20" />
							<div className="flex relative flex-col gap-4 items-center p-8 lg:flex-row">
								{/* Selector de combustibles */}
								<div className="flex relative flex-col gap-2 justify-center items-center w-full lg:w-1/2">
									<div
										className="flex overflow-hidden justify-center items-center"
										style={{ height: '200px', width: '100%' }}>
										<div
											className="flex flex-col w-full h-16 transition-transform duration-500 ease-in-out md:h-28"
											style={{
												transform: `translateY(-${(numero - 1) * 160 - offset}px)`,
											}}>
											{[1, 2, 3].map(idx => {
												const isActive = idx === numero
												return (
													<div
														key={idx}
														className={`flex justify-center items-center px-6 py-8 w-full font-bold bg-white rounded-lg border shadow transition-all duration-500 ${
															isActive ? 'z-10 opacity-100 scale-100' : 'z-0 opacity-20 scale-90'
														}`}
														style={{
															marginTop: idx === 1 ? '20px' : 0,
															marginBottom: idx === 3 ? '20px' : 0,
														}}>
														<h2 className="text-center md:text-4xl text-primary">{TerpelCalcs[idx].name}</h2>
													</div>
												)
											})}
										</div>
									</div>
									<div className="flex absolute bottom-0 left-0 z-20 gap-4 justify-center items-center w-full">
										<button onClick={decrementar} disabled={numero === 1} className="">
											<CircleArrowUp />
										</button>
										<button onClick={incrementar} disabled={numero === 3}>
											<CircleArrowDown />
										</button>
									</div>
								</div>

								<Separator orientation="vertical" />
								<section className="flex flex-col gap-2 justify-center items-center w-full lg:w-1/2">
									<div className="flex gap-2 justify-around items-center m-auto w-full">
										{' '}
										<Label className="flex flex-col gap-2 justify-center items-center w-1/2">
											Galon{' '}
											<Select value={galones} onValueChange={value => setGalones(Number.parseInt(value))}>
												<SelectTrigger className="m-2 w-full h-8 text-sm ring-2 ring-secondary">
													{galones} {galones === 1 ? 'Galon' : 'Galones'}
												</SelectTrigger>
												<SelectContent>
													{Array.from({ length: 100 }, (_, i) => i + 1).map(cantidad => (
														<SelectItem key={cantidad} value={cantidad.toString()}>
															{cantidad}{' '}
															<span className="text-xs text-muted-foreground">
																{cantidad === 1 ? 'galon' : 'galones'}
															</span>
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</Label>
										<Label className="flex flex-col gap-2 justify-center items-center w-1/2">
											Galon por Decima{' '}
											<Select
												value={galonPorDecima.toString()}
												onValueChange={value => setGalonPorDecima(Number.parseFloat(value))}>
												<SelectTrigger className="m-2 w-full h-8 text-sm ring-2 ring-secondary">
													{galonPorDecima === 0
														? '0.00'
														: (0.01 + 0.2 * (galonPorDecima - 1)).toFixed(2) +
														  ' a ' +
														  (0.2 * galonPorDecima).toFixed(2) +
														  ' Galon'}
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="0">0.00</SelectItem>
													{Array.from({ length: 5 }).map((_, i) => {
														const valor = (0.01 + 0.2 * i).toFixed(2)
														const valor2 = (0.2 * (i + 1)).toFixed(2)
														return (
															<SelectItem key={i + 1} value={(i + 1).toString()}>
																{valor} a {valor2}
															</SelectItem>
														)
													})}
												</SelectContent>
											</Select>
										</Label>
									</div>
									<div className="flex gap-2 justify-around items-center w-full">
										<span className="flex flex-col justify-center items-center font-bold">
											<p className="border-b border-secondary">Puntos</p>{' '}
											<p className="text-2xl font-normal">{galones * TerpelCalcs[numero].multiply_x_galon}</p>
										</span>
										<span className="flex flex-col justify-center items-center font-bold">
											<p className="border-b border-secondary">Puntos</p>
											<p className="text-2xl font-normal">
												{galonPorDecima === 0 ? 0 : (TerpelCalcs[numero].multiply_decimas * galonPorDecima).toFixed(0)}
											</p>
										</span>
									</div>
									<span className="flex flex-col justify-center items-center font-bold">
										<p className="text-2xl border-b border-primary">Total</p>
										<p className="text-4xl font-normal">
											{(
												galones * TerpelCalcs[numero].multiply_x_galon +
												(galonPorDecima === 0 ? 0 : TerpelCalcs[numero].multiply_decimas * galonPorDecima)
											).toFixed(0)}
										</p>
									</span>
								</section>
							</div>
						</AccordionContent>
					</AccordionItem>
					<Separator className="my-4 bg-primary/20" />
					{/* Al Toque Calculator */}
					<AccordionItem
						value="altoque"
						className="p-2 w-full h-full bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-2xl border-2 border-red-500 shadow-xl">
						<AccordionTrigger className="hover:no-underline">
							<figure className="flex gap-2 items-center w-28 h-14">
								<img src={imgAlToque} alt="logo gazel" className="object-contain w-5/6" />
							</figure>
							<ul className="flex gap-4 justify-around items-center w-full">
								<li className="flex flex-col gap-2 justify-center text-sm">
									<span className="text-primary">TDC</span>
									<p>Por $ 1.000</p>
								</li>
								<li className="flex flex-col gap-2 items-center md:flex-row">
									<span className="text-4xl">2</span>
									<p className="font-normal">
										<strong>Puntos</strong>
									</p>
								</li>
							</ul>
						</AccordionTrigger>
						<AccordionContent className="p-0">
							<Separator className="bg-primary/20" />
							<div className="flex relative flex-col gap-4 items-center p-8 lg:flex-row">
								{/* Selector de combustibles */}
								<div className="flex relative flex-col gap-2 justify-center items-center w-full lg:w-1/2">
									<div className="flex overflow-hidden justify-center items-center w-full">
										<div className="flex flex-col w-full transition-transform duration-500 ease-in-out">
											<div
												className={`flex justify-center items-center px-6 py-12 w-full font-bold bg-white rounded-lg border shadow transition-all duration-500 ${'z-10 opacity-100 scale-100'}`}>
												<h2 className="text-center md:text-4xl text-primary">Al Toque</h2>
											</div>
										</div>
									</div>
								</div>

								<Separator orientation="vertical" />
								<section className="flex flex-col gap-2 justify-center items-center w-full lg:w-1/2">
									<div className="flex gap-2 justify-around items-center m-auto w-full">
										{' '}
										<Label className="flex flex-col gap-2 justify-center items-center w-1/2">
											TDC{' '}
											<Select value={tdc} onValueChange={value => setTdc(Number.parseInt(value))}>
												<SelectTrigger className="m-2 w-full h-8 text-sm ring-2 ring-secondary">
													$ {Intl.NumberFormat('es-CO').format(tdc)}
												</SelectTrigger>
												<SelectContent>
													{Array.from({ length: 200 }, (_, i) => (i + 1) * 1000).map(cantidad => (
														<SelectItem key={cantidad} value={cantidad.toString()}>
															<span className="text-xs text-muted-foreground">$</span>
															{Intl.NumberFormat('es-CO').format(cantidad)}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</Label>
									</div>
									<div className="flex gap-2 justify-around items-center w-full">
										<span className="flex flex-col justify-center items-center font-bold">
											<p className="border-b border-secondary">Puntos</p>{' '}
											<p className="text-2xl font-normal">{(tdc / 1000) * AlToqueCalcs[1].pts_x_tdc}</p>
										</span>
									</div>
								</section>
							</div>
						</AccordionContent>
					</AccordionItem>
					<Separator className="my-4 bg-primary/20" />
					{/* Gazel Calculator*/}
					<AccordionItem
						value="gazel"
						className="p-2 w-full h-full bg-gradient-to-b from-blue-100 to-green-200 rounded-2xl border-2 border-red-500 shadow-xl">
						<AccordionTrigger className="hover:no-underline">
							<figure className="flex gap-2 items-center w-28 h-14">
								<img src={imgGazel} alt="logo gazel" className="object-contain w-5/6" />
							</figure>
							<ul className="flex gap-4 justify-around items-center w-full">
								<li className="flex flex-col gap-2 justify-center text-sm">
									<span className="text-primary">GNV</span>
									<p>Por 1 Mt. Cubico</p>
								</li>
								<li className="flex flex-col gap-2 items-center md:flex-row">
									<span className="text-4xl">5</span>
									<p className="font-normal">
										<strong>Puntos</strong>
									</p>
								</li>
							</ul>
						</AccordionTrigger>
						<AccordionContent className="p-0">
							<Separator className="bg-primary/20" />
							<div className="flex relative flex-col gap-4 items-center p-8 lg:flex-row">
								{/* Selector de combustibles */}
								<div className="flex relative flex-col gap-2 justify-center items-center w-full lg:w-1/2">
									<div className="flex overflow-hidden justify-center items-center w-full">
										<div className="flex flex-col w-full transition-transform duration-500 ease-in-out">
											<div
												className={`flex justify-center items-center px-6 py-12 w-full font-bold bg-white rounded-lg border shadow transition-all duration-500 ${'z-10 opacity-100 scale-100'}`}>
												<h2 className="text-center md:text-4xl text-primary">Gazel</h2>
											</div>
										</div>
									</div>
								</div>

								<Separator orientation="vertical" />
								<section className="flex flex-col gap-2 justify-center items-center w-full lg:w-1/2">
									<div className="flex gap-2 justify-around items-center m-auto w-full">
										{' '}
										<Label className="flex flex-col gap-2 justify-center items-center w-1/2">
											GNV{' '}
											<Select value={gnv} onValueChange={value => setGnv(Number.parseInt(value))}>
												<SelectTrigger className="m-2 w-full h-8 text-sm ring-2 ring-secondary">{gnv}</SelectTrigger>
												<SelectContent>
													{Array.from({ length: 205 }, (_, i) => i + 1).map(cantidad => (
														<SelectItem key={cantidad} value={cantidad.toString()}>
															<span className="text-sm">
																{cantidad} mt<sup>3</sup>
															</span>
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</Label>
									</div>
									<div className="flex gap-2 justify-around items-center w-full">
										<span className="flex flex-col justify-center items-center font-bold">
											<p className="border-b border-secondary">Puntos</p>{' '}
											<p className="text-2xl font-normal">{gnv * GazelCalcs[1].pts_x_mtc}</p>
										</span>
									</div>
								</section>
							</div>
						</AccordionContent>
					</AccordionItem>
					<Separator className="my-4 bg-primary/20" />
					{/* Al Toque Voltex */}
					<AccordionItem
						value="voltex"
						className="p-2 w-full h-full bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-2xl border-2 border-red-500 shadow-xl">
						<AccordionTrigger className="hover:no-underline">
							<figure className="flex gap-2 items-center w-28 h-14">
								<img src={imgVoltex} alt="logo gazel" className="object-contain w-5/6" />
							</figure>
							<ul className="flex gap-4 justify-around items-center w-full">
								<li className="flex flex-col gap-2 justify-center text-sm">
									<span className="text-primary">Carga</span>
									<p>Por $ 1.000</p>
								</li>
								<li className="flex flex-col gap-2 items-center md:flex-row">
									<span className="text-4xl">2</span>
									<p className="font-normal">
										<strong>Puntos</strong>
									</p>
								</li>
							</ul>
						</AccordionTrigger>
						<AccordionContent className="p-0">
							<Separator className="bg-primary/20" />
							<div className="flex relative flex-col gap-4 items-center p-8 lg:flex-row">
								{/* Selector de combustibles */}
								<div className="flex relative flex-col gap-2 justify-center items-center w-full lg:w-1/2">
									<div className="flex overflow-hidden justify-center items-center w-full">
										<div className="flex flex-col w-full transition-transform duration-500 ease-in-out">
											<div
												className={`flex justify-center items-center px-6 py-12 w-full font-bold bg-white rounded-lg border shadow transition-all duration-500 ${'z-10 opacity-100 scale-100'}`}>
												<h2 className="text-center md:text-4xl text-primary">Voltex</h2>
											</div>
										</div>
									</div>
								</div>

								<Separator orientation="vertical" />
								<section className="flex flex-col gap-2 justify-center items-center w-full lg:w-1/2">
									<div className="flex gap-2 justify-around items-center m-auto w-full">
										{' '}
										<Label className="flex flex-col gap-2 justify-center items-center w-1/2">
											Carga{' '}
											<Select value={carga} onValueChange={value => setCarga(Number.parseInt(value))}>
												<SelectTrigger className="m-2 w-full h-8 text-sm ring-2 ring-secondary">
													$ {Intl.NumberFormat('es-CO').format(carga)}
												</SelectTrigger>
												<SelectContent>
													{Array.from({ length: 200 }, (_, i) => (i + 1) * 1000).map(cantidad => (
														<SelectItem key={cantidad} value={cantidad.toString()}>
															<span className="text-xs text-muted-foreground">$</span>
															{Intl.NumberFormat('es-CO').format(cantidad)}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</Label>
									</div>
									<div className="flex gap-2 justify-around items-center w-full">
										<span className="flex flex-col justify-center items-center font-bold">
											<p className="border-b border-secondary">Puntos</p>{' '}
											<p className="text-2xl font-normal">{(carga / 1000) * VoltexCalcs[1].pts_x_carga}</p>
										</span>
									</div>
								</section>
							</div>
						</AccordionContent>
					</AccordionItem>
					<Separator className="my-4 bg-primary/20" />
					{/* Al Toque Rumbo */}
					<AccordionItem
						value="rumbo"
						className="p-2 w-full h-full bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-2xl border-2 border-red-500 shadow-xl">
						<AccordionTrigger className="hover:no-underline">
							<figure className="flex overflow-hidden gap-2 items-center w-28 h-14">
								<img src={imgLogoRumbo} alt="logo terpel" className="w-full" />
							</figure>
							<ul className="flex gap-4 justify-around items-center w-full">
								<li className="flex flex-col gap-2 justify-center text-sm">
									<span className="text-primary">Rumbo</span>
									<p>Por Transacción</p>
								</li>
								<li className="flex flex-col gap-2 items-center md:flex-row">
									<span className="text-4xl">10</span>
									<p className="font-normal">
										<strong>Puntos</strong> Corriente GNV Livianos
									</p>
								</li>
								<li className="flex flex-col gap-2 items-center md:flex-row">
									<span className="text-4xl">60</span>
									<p className="font-normal">
										<strong>Puntos</strong> Diesel GNV Pesados
									</p>
								</li>
							</ul>
						</AccordionTrigger>
						<AccordionContent className="p-0">
							<Separator className="bg-primary/20" />
							<div className="flex relative flex-col gap-4 items-center p-8 lg:flex-row">
								{/* Selector de combustibles */}
								<div className="flex relative flex-col gap-2 justify-center items-center w-full lg:w-1/2">
									<div
										className="flex overflow-hidden justify-center items-center"
										style={{ height: '200px', width: '100%' }}>
										<div
											className="flex flex-col w-full h-16 transition-transform duration-500 ease-in-out md:h-28"
											style={{
												transform: `translateY(-${(rumboNumero - 1) * 160 - offset}px)`,
											}}>
											{[1, 2].map(idx => {
												const isActive = idx === rumboNumero
												return (
													<div
														key={idx}
														className={`flex justify-center items-center px-6 py-8 w-full font-bold bg-white rounded-lg border shadow transition-all duration-500 ${
															isActive ? 'z-10 opacity-100 scale-100' : 'z-0 opacity-20 scale-90'
														}`}
														style={{
															marginTop: idx === 1 ? '20px' : 0,
															marginBottom: idx === 2 ? '20px' : 0,
														}}>
														<h2 className="text-center md:text-4xl text-primary">{RumboCalcs[idx].name}</h2>
													</div>
												)
											})}
										</div>
									</div>
									<div className="flex absolute bottom-0 left-0 z-20 gap-4 justify-center items-center w-full">
										<button onClick={decrementarRumbo} disabled={rumboNumero === 1} className="">
											<CircleArrowUp />
										</button>
										<button onClick={incrementarRumbo} disabled={rumboNumero === 3}>
											<CircleArrowDown />
										</button>
									</div>
								</div>

								<Separator orientation="vertical" />
								<section className="flex flex-col gap-2 justify-center items-center w-full lg:w-1/2">
									<div className="flex gap-2 justify-around items-center m-auto w-full">
										{' '}
										<Label className="flex flex-col gap-2 justify-center items-center w-1/2">
											Rumbo GNV Pesado{' '}
											<Select value="1 Transaccion">
												<SelectTrigger className="m-2 w-full h-8 text-sm ring-2 ring-secondary">
													1 Transaccion
												</SelectTrigger>
												<SelectContent>
													<SelectItem>1 Transaccion</SelectItem>
												</SelectContent>
											</Select>
										</Label>
									</div>
									<div className="flex gap-2 justify-around items-center w-full">
										<span className="flex flex-col justify-center items-center font-bold">
											<p className="border-b border-secondary">Puntos</p>{' '}
											<p className="text-2xl font-normal">{RumboCalcs[rumboNumero].pts}</p>
										</span>
									</div>
								</section>
							</div>
						</AccordionContent>
					</AccordionItem>
					<Separator className="my-4 bg-primary/20" />

					{/* Al Toque Lubricantes */}
					<AccordionItem
						value="lubricantes"
						className="p-2 w-full h-full bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-2xl border-2 border-red-500 shadow-xl">
						<AccordionTrigger className="hover:no-underline">
							<figure className="flex gap-2 items-center w-2/3 h-14">
								<img src={imgLubricantes} alt="logo gazel" className="object-contain w-5/6" />
							</figure>
							<ul className="flex gap-4 justify-around items-center w-1/3">
								<li className="flex flex-col gap-2 justify-center text-sm">
									<span className="text-primary">Valor</span>
									<p>Por $ 1.000</p>
								</li>
								<li className="flex flex-col gap-2 items-center md:flex-row">
									<span className="text-4xl">3</span>
									<p className="font-normal">
										<strong>Puntos</strong>
									</p>
								</li>
							</ul>
						</AccordionTrigger>
						<AccordionContent className="p-0">
							<Separator className="bg-primary/20" />
							<div className="flex relative flex-col gap-4 items-center p-8 lg:flex-row">
								{/* Selector de combustibles */}
								<div className="flex relative flex-col gap-2 justify-center items-center w-full lg:w-1/2">
									<div className="flex overflow-hidden justify-center items-center w-full">
										<div className="flex flex-col w-full transition-transform duration-500 ease-in-out">
											<div
												className={`flex justify-center items-center px-6 py-12 w-full font-bold bg-white rounded-lg border shadow transition-all duration-500 ${'z-10 opacity-100 scale-100'}`}>
												<h2 className="text-center md:text-4xl text-primary">Lubricantes</h2>
											</div>
										</div>
									</div>
								</div>

								<Separator orientation="vertical" />
								<section className="flex flex-col gap-2 justify-center items-center w-full lg:w-1/2">
									<div className="flex gap-2 justify-around items-center m-auto w-full">
										{' '}
										<Label className="flex flex-col gap-2 justify-center items-center w-1/2">
											Valor{' '}
											<Select value={valor} onValueChange={value => setValor(Number.parseInt(value))}>
												<SelectTrigger className="m-2 w-full h-8 text-sm ring-2 ring-secondary">
													$ {Intl.NumberFormat('es-CO').format(valor)}
												</SelectTrigger>
												<SelectContent>
													{Array.from({ length: 200 }, (_, i) => (i + 1) * 1000).map(cantidad => (
														<SelectItem key={cantidad} value={cantidad.toString()}>
															<span className="text-xs text-muted-foreground">$</span>
															{Intl.NumberFormat('es-CO').format(cantidad)}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</Label>
									</div>
									<div className="flex gap-2 justify-around items-center w-full">
										<span className="flex flex-col justify-center items-center font-bold">
											<p className="border-b border-secondary">Puntos</p>{' '}
											<p className="text-2xl font-normal">{(valor / 1000) * LubricantesCalcs[1].pts_x_valor}</p>
										</span>
									</div>
								</section>
							</div>
						</AccordionContent>
					</AccordionItem>
					<Separator className="my-4 bg-primary/20" />
				</Accordion>
			</div>
		</div>
	)
}
