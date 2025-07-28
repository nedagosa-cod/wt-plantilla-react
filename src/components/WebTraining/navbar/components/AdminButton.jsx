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
import { User } from 'lucide-react'
export default function AdminButton() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" className="h-8">
					<User className="mr-1 w-4 h-4" /> Administrador
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Ingreso administrador</DialogTitle>
					<DialogDescription>Ingresa para realizar actualizaciones y cambios en la Web Training</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 gap-4 items-center">
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
	)
}
