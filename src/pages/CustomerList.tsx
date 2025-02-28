import 'primeicons/primeicons.css';
import { useEffect, useRef, useState } from "react";
import CustomerCard from "../components/CustomerCard";
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Paginator } from 'primereact/paginator';
import { Customer, useCustomerService } from "../services/customer-service";
import { Dialog } from 'primereact/dialog';
import { CreateCustomerForm } from '../components/CreateCustomerForm';
import { Toast } from 'primereact/toast';
import { EditCustomerForm } from '../components/EditCustomer';
import { DeleteCustomerForm } from '../components/DeleteCustomerForm';
import TopBar from '../components/TopBar';

const headerTitle: any = {
    'create': 'Criar cliente:',
    'edit': 'Editar cliente:',
    'delete': 'Excluir cliente',
}

export default function CustomerList() {
    const { getAllCustomers, selectCustomers } = useCustomerService();

    const pages = [16, 12, 8, 4];
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(16);

    const onPageChange = (event: any) => {
        setFirst(event.first);
        setRows(event.rows);
    };
    
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer>();

    const [actionType, setActionType] = useState<'create' | 'edit' | 'delete'>('create');
    const [visible, setVisible] = useState(false);

    const toast = useRef(null);

    const onCreate = () => {
        setActionType('create');
        setVisible(true);
    }

    const onEdit = (customer: Customer) => {
        setSelectedCustomer(customer)
        setActionType('edit');
        setVisible(true);
    }

    const onDelete = (customer: Customer) => {
        setSelectedCustomer(customer)
        setActionType('delete');
        setVisible(true);
    }

    const onSelect = (customer: Customer) => {
        selectCustomers([{ id: customer.id, select: true }]).then((response) => {
            if (response.success) {
                /* @ts-ignore */
                toast.current.show({ severity: 'success', summary: 'Successo!', detail: 'Cliente "selecionado" com sucesso', life: 3000 });
                getAll();
            } else {
                /* @ts-ignore */
                toast.current.show({ severity: 'error', summary: 'Erro...', detail: response.errorMessage, life: 3000 });
            }
        });
    }

    const onSuccess = (mesage: string) => {
        setVisible(false);
        getAll();
        /* @ts-ignore */
        toast.current.show({ severity: 'success', summary: 'Successo!', detail: mesage, life: 3000 });
    }

    const onError = (mesage: string) => {
        setVisible(false);
        /* @ts-ignore */
        toast.current.show({ severity: 'error', summary: 'Erro...', detail: mesage, life: 3000 });
    }

    const getAll = () => {
        getAllCustomers(false).then((response) => {
            if (response.success) {
                const customers = response.data || [];
                customers?.sort((a, b) => a.createAt.getTime() - b.createAt.getTime())!;
                setCustomers(customers);
                setFilteredCustomers(customers.slice(first, first + rows));
            } else {
                /* @ts-ignore */
                toast.current.show({ severity: 'error', summary: 'Erro...', detail: response.errorMessage, life: 3000 });
            }
        });
    }

    useEffect(() => {
        getAll();
    }, [first, rows]);

    return (
        <>
            <Toast ref={toast} />
            <TopBar />
            <div className="body-content">
                <div className="flex justify-content-between flex-wrap">
                    <div className="py-3">
                        <b>{customers.length} </b>
                        <span> clientes encontrados</span>
                    </div>
                    <div>
                        <span>Clientes por página </span>
                        <Dropdown
                            value={rows}
                            onChange={(e) => setRows(e.value)}
                            options={pages}
                            optionLabel="name"
                            placeholder="selecione"
                            className="" />
                    </div>
                </div>
                <div className="grid mt-1">
                    {filteredCustomers.map((customer: Customer) => (
                        <div className="col-3" key={customer.id}>
                            <CustomerCard {...customer} edit={() => onEdit(customer)} remove={() => onDelete(customer)} select={() => onSelect(customer)} />
                        </div>
                    ))}
                </div>
                <Button label="Criar cliente" severity="warning" outlined className="w-full mt-2" onClick={() => onCreate()} />
                <div className="mt-2">
                    <Paginator first={first} rows={rows} totalRecords={customers.length} rowsPerPageOptions={pages} onPageChange={onPageChange} />
                </div>
            </div>
            <Dialog
                header={headerTitle[actionType]}
                visible={visible}
                style={{ width: '45vw' }}
                draggable={false}
                onHide={() => { if (!visible) return; setVisible(false); }}>
                {actionType === 'create' && <CreateCustomerForm onSuccess={onSuccess} onError={onError} />}
                {actionType === 'edit' && <EditCustomerForm customer={selectedCustomer!} onSuccess={onSuccess} onError={onError} />}
                {actionType === 'delete' && <DeleteCustomerForm customer={selectedCustomer!} onSuccess={onSuccess} onError={onError} />}
            </Dialog>
        </>
    );
}
