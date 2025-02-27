import 'primeicons/primeicons.css';
import { useEffect, useRef, useState } from "react";
import { useUser } from "../providers/UserContext";
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

const headerTitle: any = {
    'create': 'Criar cliente:',
    'edit': 'Editar cliente:',
    'delete': 'Excluir cliente',
}

export default function CustomerList() {
    const { userName } = useUser();
    const { getAllCustomers } = useCustomerService();

    const pages = [16, 12, 8, 4];
    const [selectedPages, setSelectedPages] = useState<number>(16);
    const [customers, setCustomers] = useState<Customer[]>([]);
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
        getAllCustomers().then((response) => {
            if (response.success) {
                setCustomers(response.data!);
            } else {
                /* @ts-ignore */
                toast.current.show({ severity: 'error', summary: 'Erro...', detail: response.errorMessage, life: 3000 });
            }
        });
    }

    useEffect(() => {
        getAll();
    }, [selectedPages]);

    return (
        <>
            <Toast ref={toast} />
            <div className="top-menu flex justify-content-between flex-wrap p-4">
                <div className="flex justify-content-center flex-wrap gap-3">
                    <img src="menu_btn.png" style={{ height: 50 }} />
                    <img src="teddy_logo.png" style={{ height: 50 }} />
                </div>
                <div className="flex justify-content-center flex-wrap gap-5 my-3">
                    <div className="underline" style={{ color: '#E65C1C' }}>Clientes</div>
                    <div>Clientes Selecionados</div>
                    <div>Sair</div>
                </div>
                <div className=" my-3">Olá, <b>{userName || 'Foobar'}!</b></div>
            </div>

            <div className="body-content">
                <div className="flex justify-content-between flex-wrap">
                    <div className="py-3">
                        <b>{customers.length} </b>
                        <span> clientes encontrados</span>
                    </div>
                    <div>
                        <span>Clientes por página </span>
                        <Dropdown
                            value={selectedPages}
                            onChange={(e) => setSelectedPages(e.value)}
                            options={pages}
                            optionLabel="name"
                            placeholder="selecione"
                            className="" />
                    </div>
                </div>

                <div className="grid mt-1">
                    {customers.map((customer: Customer) => (
                        <div className="col-3" key={customer.id}>
                            <CustomerCard {...customer} edit={() => onEdit(customer)} remove={() => onDelete(customer)} />
                        </div>
                    ))}
                </div>

                <Button label="Criar cliente" severity="warning" outlined className="w-full mt-2" onClick={() => onCreate()} />

                <div className="mt-2">
                    <Paginator first={1} rows={16} totalRecords={120} onPageChange={() => { }} />
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
