import { Search, X } from 'lucide-react'
import { useState } from 'react'

export default function BuscadorWT({ open }) {
	const [query, setQuery] = useState('')
	const [isFocused, setIsFocused] = useState(false)
	return (
		<div
			className={`absolute top-full mt-6 left-1/2 transform -translate-x-1/2 w-1/2 bg-white shadow-md rounded-b-3xl transition-all duration-300 overflow-hidden border-b-2 border-primary ${
				open ? 'max-h-20 opacity-100 mt-1' : 'max-h-0 opacity-0 ring-2 ring-primary '
			}`}>
			<div className={`relative flex items-center h-16 overflow-hidden transition-all duration-300`}>
				<input
					type="text"
					value={query}
					onChange={e => setQuery(e.target.value)}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					placeholder="¿Qué estás buscando?"
					className="w-full h-full pl-6 pr-12 text-xl bg-transparent outline-none text-primary placeholder-accent"
				/>

				<X className="w-8 h-8 text-accent hover:text-primary cursor-pointer mr-4" />

				<label className="relative inline-flex items-center cursor-pointer">
					<input type="checkbox" value="" className="sr-only peer" />
					<div className="peer rounded outline-none duration-100 after:duration-500 w-16 h-6 bg-[hsl(var(--primary-dark))] after:rounded after:content-['Vista'] after:absolute after:outline-none after:h-4 after:w-10 after:bg-white after:top-1 after:left-1 after:flex after:justify-center after:items-center  after:text-[hsl(var(--primary-dark))] after:font-bold peer-checked:after:translate-x-4 peer-checked:after:content-['Global'] peer-checked:after:border-white mr-4 text-xs"></div>
				</label>

				<button className="flex items-center justify-center w-16 h-16 transition-all duration-300 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 mb-">
					<Search className="w-6 h-6 text-white" />
					<span className="sr-only">Buscar</span>
				</button>
			</div>
		</div>
	)
}
