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
import { NavLink } from 'react-router-dom'

export default function NavItemLista({ components, label, icon }) {
	return (
		<NavigationMenuItem>
			<NavigationMenuTrigger
				title={label}
				className="flex items-center justify-center w-20 h-8 px-4 py-2 text-white truncate rounded-full shadow-md bg-primary xl:w-40 text-nowrap">
				<span className="flex items-center justify-center w-4 h-4 mr-2">{icon}</span>
				<span className="hidden overflow-hidden text-sm truncate whitespace-nowrap xl:block ">{label}</span>
			</NavigationMenuTrigger>
			<NavigationMenuContent>
				<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
					{components.map((component, index) => (
						<ListItem
							key={`${index}-${component.title}`}
							title={component.title}
							href={component.route}
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
				<NavLink
					to={props.href}
					ref={ref}
					className={cn(
						'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gradient-to-l from-secondarySoft to-transparent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						className
					)}
					{...props}>
					<span className="flex items-center mr-2 text-primary">
						{iconItem ? (
							<span className="flex items-center justify-center w-4 h-4 mr-2">{icons[iconItem]}</span>
						) : (
							parentIcon
						)}
						<div className="text-sm font-medium leading-none">{title}</div>
					</span>
					<div>
						<p className="text-sm leading-snug line-clamp-2 text-muted-foreground">{children}</p>
					</div>
				</NavLink>
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
