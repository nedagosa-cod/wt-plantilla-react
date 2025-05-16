import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

import { Book, BookOpenCheck, Database, LogOut, Palette, Settings, ShieldUser, SpellCheck, UserCog } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { useContext } from 'react'
import GlobalContext from '@/context/GlobalContext'
import { Link } from 'react-router-dom'
export default function ConfigMenu() {
	const { SetActiveAppNote } = useContext(GlobalContext)
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="bg-white p-1 my-1 rounded cursor-pointer">
					<Settings className="h-6 w-6 text-primary" />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel className="text-primary">Web Training Config</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						Admin
						<DropdownMenuShortcut>
							<ShieldUser className="h-4 w-4 mr-2 text-primary" />
						</DropdownMenuShortcut>
					</DropdownMenuItem>
					<ThemeToggle />
					<DropdownMenuItem>
						Guia para usuario
						<DropdownMenuShortcut>
							<BookOpenCheck className="h-4 w-4 mr-2 text-primary" />
						</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						Reportar problema
						<DropdownMenuShortcut>
							<UserCog className="h-4 w-4 mr-2 text-primary" />
						</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Bases de datos
						<DropdownMenuShortcut>
							<Database className="h-4 w-4 mr-2 text-primary" />
						</DropdownMenuShortcut>
					</DropdownMenuItem>
					{/* <DropdownMenuSub>
						<DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuItem>Email</DropdownMenuItem>
								<DropdownMenuItem>Message</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>More...</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub> */}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Link to="/corrector">Corrector Ortografico</Link>
					<DropdownMenuShortcut>
						<SpellCheck className="h-4 w-4 mr-2 text-primary" />
					</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => SetActiveAppNote(true)}>
					Mis Notas
					<DropdownMenuShortcut>
						<Book className="h-4 w-4 mr-2 text-primary" />
					</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					Salir
					<DropdownMenuShortcut>
						<LogOut className="h-4 w-4 mr-2 text-primary" />
					</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
