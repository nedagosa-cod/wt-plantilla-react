import { NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'

export default function NavItemRegular({ label, href, icon }) {
	return (
		<NavigationMenuItem>
			<NavigationMenuLink
				title={label}
				className="flex items-center justify-center bg-[hsl(var(--primary-dark))] py-1 px-4 text-white rounded-full shadow-md hover:bg-[hsl(var(--primary-light))] w-48"
				href={href}>
				{icon}
				<span className="truncate overflow-hidden whitespace-nowrap">{label}</span>
			</NavigationMenuLink>
		</NavigationMenuItem>
	)
}
