import {
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import React from 'react'
import { cn } from '@/lib/utils'
import PropTypes from 'prop-types'
import { Diamond, Home, Info, Menu, User2 } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

export default function NavItemAppsWeb({ label, icon, submenu }) {
	return (
		<NavigationMenuItem>
			<NavigationMenuTrigger
				title={label}
				className="flex items-center justify-center bg-[hsl(var(--primary-dark))] py-2 px-4 text-white rounded-full shadow-md h-8 w-48 text-nowrap truncate">
				<span className="w-4 h-4 mr-2 flex items-center justify-center">{icon}</span>
				<span className="truncate overflow-hidden whitespace-nowrap">{label}</span>
			</NavigationMenuTrigger>
			<NavigationMenuContent>
				<ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
					<li className="row-span-8">
						<NavigationMenuLink asChild>
							<a
								className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md "
								href="#/apps-web">
								<div className="mb-2 mt-4 text-lg font-medium">
									{icon}
									Apps web
								</div>
								<p className="text-sm leading-tight text-muted-foreground">Apps web para fidelización de clientes</p>
							</a>
						</NavigationMenuLink>
					</li>
					<li>
						<h2 className="text-lg font-medium text-accent">Aplicativos Web Atento</h2>
					</li>
					<li className="flex flex-wrap gap-3 justify-center items-center">
						{submenu.map((item, index) => (
							<ListItem href={item.route} title={item.title} image={item.image} key={index}>
								{item.description ? item.description : ''}
							</ListItem>
						))}
					</li>
					<li>
						<Separator className="my-4" />
					</li>
					<li>
						<Button variant="outline" className="w-full bg-primary text-white">
							Ver todos
						</Button>
					</li>
				</ul>
			</NavigationMenuContent>
		</NavigationMenuItem>
	)
}

const ListItem = React.forwardRef(({ className, title, children, image, ...props }, ref) => {
	return (
		<div>
			<NavigationMenuLink asChild title={title}>
				<a
					ref={ref}
					className={cn(
						'block aspect-square w-16 h-16 select-none space-y-1 rounded-xl p-3 leading-none no-underline outline-none transition-colors focus:bg-accent focus:text-accent-foreground shadow-lg hover:shadow-xl hover:scale-105',
						className
					)}
					{...props}>
					<figure className="text-sm font-medium leading-none">
						<img src={image} alt={title} className="w-full h-full object-cover" />
					</figure>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
				</a>
			</NavigationMenuLink>
		</div>
	)
})

ListItem.propTypes = {
	className: PropTypes.string,
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	href: PropTypes.string.isRequired,
}

ListItem.displayName = 'ListItem'
