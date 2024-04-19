const ScriptDesc = ({ children, scripts, setTextProperties }) => {
	return (
		<div className="description__script">
			<div dangerouslySetInnerHTML={{ __html: setTextProperties(children) }} />
			{scripts && <br />}
			{scripts &&
				scripts.map((script, i) => {
					return (
						<span
							key={i}
							dangerouslySetInnerHTML={{ __html: setTextProperties(script) }}
							style={{ marginBottom: '4px' }}
						/>
					)
				})}
		</div>
	)
}

export default ScriptDesc
