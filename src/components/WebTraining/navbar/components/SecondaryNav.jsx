import { Home } from 'lucide-react'
import { NavigationMenu, NavigationMenuList } from '@/components/ui/navigation-menu'
import { Separator } from '@/components/ui/separator'
import NavItemRegular from './NavItemRegular'
import NavItemPortada from './NavItemPortada'
import NavItemLista from './NavItemLista'

const components = [
	{
		title: 'Alert Dialog',
		href: '/docs/primitives/alert-dialog',
		description: 'A modal dialog that interrupts the user with important content and expects a response.',
	},
	{
		title: 'Hover Card',
		href: '/docs/primitives/hover-card',
		description: 'For sighted users to preview content available behind a link.',
	},
	{
		title: 'Progress',
		href: '/docs/primitives/progress',
		description:
			'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
	},
	{
		title: 'Scroll-area',
		href: '/docs/primitives/scroll-area',
		description: 'Visually or semantically separates content.',
	},
	{
		title: 'Tabs',
		href: '/docs/primitives/tabs',
		description: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
	},
	{
		title: 'Tooltip',
		href: '/docs/primitives/tooltip',
		description:
			'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
	},
]

export function SecondaryNavbar({ data, activeSegment }) {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				{data.map((item, i) => {
					return item.segments ? (
						item.segments.map((segment, index) => {
							if (segment.includes(activeSegment)) {
								if (item.dropDown && !item.portada) {
									return (
										<NavItemLista
											key={`${i}-${index}`}
											components={item.dropDown}
											label={item.title}
											icon={<Home className="h-4 w-4 mr-2 text-primary" />}
										/>
									)
								} else if (item.dropDown && item.portada) {
									return (
										<NavItemPortada
											key={`${i}-${index}`}
											label={item.title}
											href={`#${item.route}`}
											icon={<Home className="h-4 w-4 mr-2 text-primary" />}
										/>
									)
								}

								return (
									<NavItemRegular
										key={`${i}-${index}`}
										label={item.title}
										href={`#${item.route}`}
										icon={<Home className="h-4 w-4 mr-2 text-primary" />}
									/>
								)
							}
						})
					) : item.dropDown ? (
						<NavItemLista
							key={`${i}-${item.title}`}
							components={item.dropDown}
							label={item.title}
							icon={<Home className="h-4 w-4 mr-2 text-primary" />}
						/>
					) : (
						<NavItemRegular
							key={`${i}-${item.title}`}
							label={item.title}
							href={`#${item.route}`}
							icon={<Home className="h-4 w-4 mr-2 text-primary" />}
						/>
					)
				})}
				{/* 
				<NavItemRegular label="Inicio" href="/#" icon={<Home className="h-4 w-4 mr-2 text-primary" />} />
				<Separator orientation="vertical" className="h-10" />
				<NavItemPortada label="Checklist" href="/#" icon={<Home className="h-4 w-4 mr-2 text-primary" />} />
				<Separator orientation="vertical" className="h-10" />
				<NavItemLista components={components} label="Scripts" icon={<Home className="h-4 w-4 mr-2 text-primary" />} />
				<Separator orientation="vertical" className="h-10" /> */}
			</NavigationMenuList>
		</NavigationMenu>
	)
}
