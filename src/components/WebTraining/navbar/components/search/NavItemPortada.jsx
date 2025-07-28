import {
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import React from 'react'
import { cn } from '@/lib/utils'
import PropTypes from 'prop-types'
import { icons } from '../../../../../icons/icons-list'
import { NavLink } from 'react-router-dom'

export default function NavItemPortada({ label, icon, submenu }) {
	return (
		<NavigationMenuItem>
			<NavigationMenuTrigger
				title={label}
				className="flex items-center justify-center w-20 h-8 px-4 py-2 text-white truncate rounded-full shadow-md bg-primary xl:w-40 text-nowrap">
				<span className="flex items-center justify-center w-4 h-4 mr-2">{icon}</span>
				<span className="hidden overflow-hidden text-sm truncate whitespace-nowrap xl:block ">{label}</span>
			</NavigationMenuTrigger>
			<NavigationMenuContent>
				<ul className="grid gap-3 p-4 md:w-[400px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
					{submenu.map((item, index) =>
						index === 0 ? (
							<li className="row-span-4" key={index}>
								<NavigationMenuLink asChild>
									<NavLink
										className="flex flex-col justify-end w-full h-full p-5 no-underline rounded-md outline-none select-none bg-gradient-to-b from-muted/50 to-muted focus:shadow-md"
										to={item.route}>
										<div className="flex items-center justify-center mt-4 mb-2 text-lg font-medium">
											{icon}

											{item.title}
										</div>
										<p className="text-sm leading-tight text-muted-foreground">
											{item.description && item.description}
										</p>
									</NavLink>
								</NavigationMenuLink>
							</li>
						) : (
							<ListItem href={item.route} title={item.title} key={index} iconItem={item.icon} parentIcon={icon}>
								{item.description ? item.description : ''}
							</ListItem>
						)
					)}
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
						'flex flex-col select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
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
					<div className="flex flex-col gap-2">
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
