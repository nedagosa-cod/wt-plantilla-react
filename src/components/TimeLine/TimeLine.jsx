import { Chrono } from 'react-chrono'
import './timeLine.scss'

const TimeLine = () => {
	const items = [
		{
			title: 'May 1945',
			cardTitle: 'Dunkirk',
			url: '/public/background.jpg',
			media: {
				name: 'dunkirk beach',
				source: {
					url: './public/background.jpg',
				},
				type: 'IMAGE',
			},
			cardSubtitle:
				'Men of the British Expeditionary Force (BEF) wade out to a destroyer during the evacuation from Dunkirk.',
			cardDetailedText: [
				`On 10 May 1940, <a href="http://www.google.com">Hitler</a> began his <strong>long-awaited</strong> offensive in the west by invading neutral Holland and Belgium and attacking northern France.
	    <br>`,
				`<ul>
		<li>Holland capitulated after only five days of fighting, and the Belgians surrendered on 28 May.</li>
		<li>With the success of the German ‘Blitzkrieg’, the British Expeditionary Force and French troops were in danger of being cut off and destroyed.</li>
		<li>
		  Germany’s armoured spearheads reached the Channel coast on 20 May, and the British began to evacuate their troops from Dunkirk
		</li>
		<li>
		The evacuation was codenamed ‘Operation Dynamo’ and was directed by Admiral Bertram Ramsay from his headquarters deep in the cliffs at Dover.
		</li>
	    </ul>
	    `,
			],
		},
	]
	return (
		<div className="timeline">
			<Chrono
				scrollable
				textOverlay
				items={items}
				toolbarPosition="BOTTOM"
				disableToolbar="false"
				mode="HORIZONTAL"
				mediaSettings={{ align: 'right', fit: 'contain' }}
				theme={{
					primary: 'red',
					secondary: 'blue',
					// cardBgColor: 'yellow',
					titleColor: 'black',
					titleColorActive: 'red',
				}}
				fontSizes={{
					cardSubtitle: '2rem',
					cardText: '1.6rem',
					cardTitle: '4rem',
					title: '2.6rem',
				}}
				buttonTexts={{
					first: 'Inicio',
					last: 'Ultimo',
					next: 'Siguiente',
					previous: 'Anterior',
				}}
				itemWidth="200"
				cardWidth="800"
				cardHeight={700}
				timelinePointDimension={30}
			/>
		</div>
	)
}

export default TimeLine
