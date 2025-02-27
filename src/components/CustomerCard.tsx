import 'primeicons/primeicons.css';
import { formatCurrency } from '../utils/formatCurrency';
import { Button } from 'primereact/button';

export interface CustomerCardProps {
    name: string;
    salary: number;
    companyValue: number;
    edit: () => void
    remove: () => void
}

export default function CustomerCard({ name: customerName, salary, companyValue, edit, remove, }: CustomerCardProps) {
    return (
        <div className="card">
            <div className="mb-1">
                <div className="text-center font-bold">{customerName}</div>
                <div className="text-center text-sm">Salário: {formatCurrency(salary)}</div>
                <div className="text-center text-sm">Empresa: {formatCurrency(companyValue)}</div>
            </div>
            <div className="flex justify-content-between">
                <Button icon="pi pi-plus" rounded text disabled={true} />
                <Button icon="pi pi-pencil" rounded text onClick={() => edit()} />
                <Button icon="pi pi-trash" rounded text severity="danger" onClick={() => remove()} />
            </div>
        </div>
    );
}
