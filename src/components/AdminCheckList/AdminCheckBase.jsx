import { CheckListProvider } from '../../context/ChecklistContext'
import AdminCheck from './AdminCheck.jsx'

const AdminCheckBase = () => {
	return (
		<CheckListProvider>
			<AdminCheck />
		</CheckListProvider>
	)
}

export default AdminCheckBase
