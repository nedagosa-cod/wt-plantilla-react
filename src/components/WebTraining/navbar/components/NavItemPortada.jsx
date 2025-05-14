import {
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import React from 'react'
import { cn } from '@/lib/utils'
import PropTypes from 'prop-types'

export default function NavItemPortada({ label, href, icon }) {
	return (
		<NavigationMenuItem>
			<NavigationMenuTrigger className="flex items-center justify-center bg-[hsl(var(--primary-dark))] py-2 px-4 text-white rounded-full shadow-md h-8">
				{icon}
				{label}
			</NavigationMenuTrigger>
			<NavigationMenuContent>
				<ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
					<li className="row-span-3">
						<NavigationMenuLink asChild>
							<a
								className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
								href={href}>
								<div className="mb-2 mt-4 text-lg font-medium">shadcn/ui</div>
								<p className="text-sm leading-tight text-muted-foreground">
									Beautifully designed components built with Radix UI and Tailwind CSS.
								</p>
							</a>
						</NavigationMenuLink>
					</li>
					<ListItem href="/docs" title="Introduction">
						Re-usable components built using Radix UI and Tailwind CSS.
					</ListItem>
					<ListItem href="/docs/installation" title="Installation">
						How to install dependencies and structure your app.
					</ListItem>
					<ListItem href="/docs/primitives/typography" title="Typography">
						Styles for headings, paragraphs, lists...etc
					</ListItem>
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
