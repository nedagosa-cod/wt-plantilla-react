import {
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import React from 'react'
import PropTypes from 'prop-types'
import { cn } from '@/lib/utils'

export default function NavItemLista({ components, label, icon }) {
	return (
		<NavigationMenuItem>
			<NavigationMenuTrigger
				title={label}
				className="flex items-center justify-center bg-[hsl(var(--primary-dark))] py-2 px-4 text-white rounded-full shadow-md h-8 w-48 text-nowrap truncate">
				{icon}
				<span className="truncate overflow-hidden whitespace-nowrap">{label}</span>
			</NavigationMenuTrigger>
			<NavigationMenuContent>
				<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
					{components.map((component, index) => (
						<ListItem key={`${index}-${component.title}`} title={component.title} href={`#${component.route}`}>
							{component.title}
						</ListItem>
					))}
				</ul>
			</NavigationMenuContent>
		</NavigationMenuItem>
	)
}

const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					target="_blank"
					ref={ref}
					className={cn(
						'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						className
					)}
					{...props}>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
				</a>
			</NavigationMenuLink>
		</li>
	)
})

ListItem.propTypes = {
	className: PropTypes.string,
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	href: PropTypes.string.isRequired,
}

ListItem.displayName = 'ListItem'
