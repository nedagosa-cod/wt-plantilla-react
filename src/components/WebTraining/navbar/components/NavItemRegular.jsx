import { NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'

export default function NavItemRegular({ label, href, icon }) {
	return (
		<NavigationMenuItem>
			<NavigationMenuLink className={navigationMenuTriggerStyle()} href={href}>
				{icon}
				{label}
			</NavigationMenuLink>
		</NavigationMenuItem>
	)
}
