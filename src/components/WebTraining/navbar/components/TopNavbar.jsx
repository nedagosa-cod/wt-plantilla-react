import { Diamond, Home, Info, Menu, User, User2 } from 'lucide-react'
import ConfigMenu from './ConfigMenu'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ThemeToggle } from './ThemeToggle'

const icons = {
	home: <Home className="h-4 w-4" />,
	checklist: <Menu className="h-4 w-4" />,
	note: <Info className="h-4 w-4" />,
	tipify: <Diamond className="h-4 w-4" />,
	admin: <User2 className="h-4 w-4" />,
}
export default function TopNavbar({ segmentos, activeSegment, setActiveSegment }) {
	return (
		<div className="bg-primary relative z-10 [box-shadow:#3c40434d_0_1px_2px_0,#3c404326_0_2px_6px_2px,#0000004d_0_30px_60px_-30px,#34343459_0_-2px_6px_0_inset]">
			<div className="mx-auto">
				<div className="flex items-center justify-between ">
					<div className="hidden md:flex justify-around space-x-6 w-full px-1">
						{segmentos.map((item, index) => (
							<Button
								key={index}
								variant="ghost"
								asChild
								className={
									activeSegment == item.segment
										? `cursor-pointer  bg-secondary text-dark dark:text-white h-8 px-2 w-full`
										: `cursor-pointer text-white hover:bg-secondary hover:text-foreground h-8 px-2 w-full`
								}>
								<a
									onClick={() => setActiveSegment(item.segment)}
									href={`#${item.segment.toLowerCase().replace(' ', '_')}`}
									className="flex items-center text-sm font-medium">
									<span className="mr-1">{icons[item.icon]}</span> {item.segment}
								</a>
							</Button>
						))}
					</div>
					<div className="flex items-center space-x-4 bg-[hsl(var(--primary-dark))] px-4">
						<Dialog>
							<DialogTrigger asChild>
								<Button variant="outline" className="px-2 h-8">
									<User className="h-4 w-4 mr-1" /> Administrador
								</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle>Ingreso administrador</DialogTitle>
									<DialogDescription>
										Ingresa para realizar actualizaciones y cambios en la Web Training
									</DialogDescription>
								</DialogHeader>
								<div className="grid gap-4 py-4">
									<div className="grid grid-cols-4 items-center gap-4">
										<Label htmlFor="name" className="text-right">
											contraseña
										</Label>
										<Input id="name" className="col-span-3" type="password" />
									</div>
								</div>
								<DialogFooter>
									<Button>Iniciar</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
						<ConfigMenu />
					</div>
				</div>
			</div>
		</div>
	)
}
