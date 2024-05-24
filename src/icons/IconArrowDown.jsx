export default function IconArrowDown() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
			<defs>
				<linearGradient id="miGradiente" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" style={{ stopColor: 'rgb(115,44,100)', stopOpacity: 1 }} />
					<stop offset="100%" style={{ stopColor: 'rgb(0,0,0)', stopOpacity: 1 }} />
				</linearGradient>
			</defs>
			<path
				d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
				fill="url(#miGradiente)"
			/>
		</svg>
	)
}
