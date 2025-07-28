import { NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'

export default function NavItemRegular({ label, href, icon }) {
	return (
		<NavigationMenuItem>
			<NavigationMenuLink
				title={label}
				className="flex items-center justify-center bg-primary py-1 px-4 text-white rounded-full shadow-md hover:bg-[hsl(var(--primary-light))] w-24 xl:w-40"
				href={href}>
				<span className="flex items-center justify-center w-4 h-4 mr-2 ">{icon}</span>
				<span className="overflow-hidden text-sm truncate whitespace-nowrap">{label}</span>
			</NavigationMenuLink>
		</NavigationMenuItem>
	)
}
