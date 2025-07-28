import { Button } from '@/components/ui/button'

import { Book, BookOpenCheck, Database, LogOut, Palette, Settings, SpellCheck, User, UserCog } from 'lucide-react'
import { useContext } from 'react'
import GlobalContext from '@/context/GlobalContext'
import { Link } from 'react-router-dom'
import { useTheme } from '@/context/ThemeContext'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import ExcelDrawer from './DDBBDrawer'
import { NotesSheet } from '../../notas/MisNotas'

export default function ConfigMenu() {
	const { SetActiveAppNote } = useContext(GlobalContext)
	const { setTheme, theme } = useTheme()
	return (
		<Popover>
			<PopoverTrigger>
				<div className="p-1 my-1 bg-white rounded cursor-pointer">
					<Settings className="w-6 h-6 text-primary" />
				</div>
			</PopoverTrigger>
			<PopoverContent>
				<div className="grid gap-4">
					<div className="space-y-2">
						<h4 className="font-medium leading-none">Web Training Config</h4>
						<p className="text-sm text-muted-foreground">versión 1.3.0</p>
					</div>
					<Separator />
					<div className="grid gap-2">
						<div className="grid grid-cols-1 items-center">
							<Button
								variant="ghost"
								className="flex justify-between w-full"
								onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
								Cambiar de tema <Palette className="w-4 h-4 text-primary" />
							</Button>
							<ExcelDrawer />

							<Button variant="ghost" className="flex justify-between w-full">
								Reportar un problema <UserCog className="w-4 h-4 text-primary" />
							</Button>
							<Separator />
							<Link to="/corrector">
								<Button variant="ghost" className="flex justify-between w-full">
									Corrector Ortografico <SpellCheck className="w-4 h-4 text-primary" />
								</Button>
							</Link>
							<NotesSheet />
							<Separator />
							<Button variant="ghost" className="flex justify-between w-full">
								Guia Web Training <BookOpenCheck className="w-4 h-4 text-primary" />
							</Button>
							<Separator />
							<Button variant="ghost" className="flex justify-between w-full">
								Salir <LogOut className="w-4 h-4 text-primary" />
							</Button>
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}
