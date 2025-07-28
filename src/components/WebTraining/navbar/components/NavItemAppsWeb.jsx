import {
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import React from 'react'
import { cn } from '@/lib/utils'
import PropTypes from 'prop-types'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export default function NavItemAppsWeb({ label, icon, submenu }) {
	const navigate = useNavigate()
	return (
		<NavigationMenuItem>
			<NavigationMenuTrigger
				title={label}
				className="flex justify-center items-center px-4 py-2 w-24 h-8 text-white truncate rounded-full shadow-md bg-primary xl:w-44 text-nowrap">
				<span className="flex justify-center items-center mr-2 w-4 h-4">{icon}</span>
				<span className="hidden overflow-hidden text-sm truncate whitespace-nowrap xl:block">{label}</span>
			</NavigationMenuTrigger>
			<NavigationMenuContent>
				<ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
					<li className="row-span-8">
						<NavigationMenuLink asChild>
							<a
								className="flex flex-col gap-6 justify-end p-6 w-full h-full no-underline bg-gradient-to-b rounded-md outline-none select-none from-muted/50 to-muted focus:shadow-md"
								href="#/apps-web">
								<div className="mt-4 mb-2 text-lg font-medium">
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
						{submenu.map((item, index) => {
							return (
								<ListItem href={item.route} title={item.title} image={item.image} key={index}>
									{item.description ? item.description : ''}
								</ListItem>
							)
						})}
					</li>
					<li>
						<Separator className="my-4" />
					</li>
					<li>
						<Button variant="outline" className="w-full text-white bg-primary" onClick={() => navigate('/appsweb')}>
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
					target="_blank"
					className={cn(
						'flex justify-center items-center p-3 space-y-1 w-16 h-16 leading-none no-underline rounded-xl shadow-lg transition-colors outline-none select-none aspect-square focus:bg-accent focus:text-accent-foreground hover:shadow-xl hover:scale-105',
						className
					)}
					{...props}>
					<figure className="text-sm font-medium leading-none">
						<img src={`./noTocar/imagenes/appsWeb/${image}`} alt={title} className="object-cover w-full h-full" />
					</figure>
					<p className="text-sm leading-snug line-clamp-2 text-muted-foreground">{children}</p>
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
