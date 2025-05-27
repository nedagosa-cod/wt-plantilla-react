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

export default function NavItemPortada({ label, icon, submenu }) {
	return (
		<NavigationMenuItem>
			<NavigationMenuTrigger
				title={label}
				className="flex items-center justify-center bg-[hsl(var(--primary-dark))] py-2 px-4 text-white rounded-full shadow-md h-8 w-20 xl:w-40 text-nowrap truncate">
				<span className="w-4 h-4 mr-2 flex items-center justify-center">{icon}</span>
				<span className="truncate overflow-hidden whitespace-nowrap text-sm hidden xl:block ">{label}</span>
			</NavigationMenuTrigger>
			<NavigationMenuContent>
				<ul className="grid gap-3 p-4 md:w-[400px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
					{submenu.map((item, index) =>
						index === 0 ? (
							<li className="row-span-4" key={index}>
								<NavigationMenuLink asChild>
									<a
										className="flex h-full  w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-5 no-underline outline-none focus:shadow-md"
										href={item.route}>
										<div className="mb-2 mt-4 text-lg font-medium flex items-center justify-center">
											{icon}

											{item.title}
										</div>
										<p className="text-sm leading-tight text-muted-foreground">
											{item.description && item.description}
										</p>
									</a>
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
				<a
					target="_blank"
					ref={ref}
					className={cn(
						'flex flex-col select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						className
					)}
					{...props}>
					<span className="flex items-center  mr-2 text-primary">
						{iconItem ? (
							<span className="w-4 h-4 mr-2 flex items-center justify-center">{icons[iconItem]}</span>
						) : (
							parentIcon
						)}
						<div className="text-sm font-medium leading-none">{title}</div>
					</span>
					<div className="flex flex-col gap-2">
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
