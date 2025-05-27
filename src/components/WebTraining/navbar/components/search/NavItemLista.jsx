import {
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import React from 'react'
import PropTypes from 'prop-types'
import { cn } from '@/lib/utils'
import { icons } from '@/icons/icons-list'

export default function NavItemLista({ components, label, icon }) {
	return (
		<NavigationMenuItem>
			<NavigationMenuTrigger
				title={label}
				className="flex items-center justify-center bg-[hsl(var(--primary-dark))] py-2 px-4 text-white rounded-full shadow-md h-8 w-20 xl:w-40 text-nowrap truncate">
				<span className="w-4 h-4 mr-2 flex items-center justify-center">{icon}</span>
				<span className="truncate overflow-hidden text-sm whitespace-nowrap hidden xl:block ">{label}</span>
			</NavigationMenuTrigger>
			<NavigationMenuContent>
				<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
					{components.map((component, index) => (
						<ListItem
							key={`${index}-${component.title}`}
							title={component.title}
							href={`#${component.route}`}
							iconItem={component.icon}
							parentIcon={icon}>
							{component.description ? component.description : label}
						</ListItem>
					))}
				</ul>
			</NavigationMenuContent>
		</NavigationMenuItem>
	)
}

const ListItem = React.forwardRef(({ className, title, children, iconItem, parentIcon, ...props }, ref) => {
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
					<span className="flex items-center mr-2 text-primary">
						{iconItem ? (
							<span className="w-4 h-4 mr-2 flex items-center justify-center">{icons[iconItem]}</span>
						) : (
							parentIcon
						)}
						<div className="text-sm font-medium leading-none">{title}</div>
					</span>
					<div>
						<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
					</div>
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
