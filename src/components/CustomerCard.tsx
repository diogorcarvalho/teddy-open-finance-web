import 'primeicons/primeicons.css';
import { formatCurrency } from '../utils/formatCurrency';
import { Button } from 'primereact/button';

export interface CustomerCardProps {
    name: string;
    salary: number;
    companyValue: number;
    edit?: () => void | undefined;
    remove?: () => void | undefined;
    select?: () => void | undefined;
    unselect?: () => void | undefined;
}

export default function CustomerCard({ name: customerName, salary, companyValue, edit, remove, select, unselect }: CustomerCardProps) {
    return (
        <div className="card">
            <div className="mb-1">
                <div className="text-center font-bold">{customerName}</div>
                <div className="text-center text-sm">Salário: {formatCurrency(salary)}</div>
                <div className="text-center text-sm">Empresa: {formatCurrency(companyValue)}</div>
            </div>
            <div className="flex justify-content-between">
                {select && <Button icon="pi pi-plus" rounded text onClick={() => select()} />}
                {edit && <Button icon="pi pi-pencil" rounded text onClick={() => edit()} />}
                {remove && <Button icon="pi pi-trash" rounded text severity="danger" onClick={() => remove()} />}
                {unselect && <Button icon="pi pi-minus" rounded text onClick={() => unselect()} />}
            </div>
        </div>
    );
}
