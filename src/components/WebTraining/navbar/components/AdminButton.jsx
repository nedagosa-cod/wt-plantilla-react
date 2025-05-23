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
				<Button variant="outline">
					<User className="h-4 w-4 mr-1" /> Administrador
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Ingreso administrador</DialogTitle>
					<DialogDescription>Ingresa para realizar actualizaciones y cambios en la Web Training</DialogDescription>
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
	)
}
