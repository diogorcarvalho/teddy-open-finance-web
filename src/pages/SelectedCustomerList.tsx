import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { Customer, useCustomerService } from "../services/customer-service";
import TopBar from "../components/TopBar";
import CustomerCard from "../components/CustomerCard";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

export default function SelectedCustomerList() {
    const { getAllCustomers, selectCustomers } = useCustomerService();
    const [customers, setCustomers] = useState<Customer[]>([]);

    const toast = useRef(null);

    const onUnselect = (customer: Customer) => {
        selectCustomers([{ id: customer.id, select: false }]).then((response) => {
            if (response.success) {
                /* @ts-ignore */
                toast.current.show({ severity: 'success', summary: 'Successo!', detail: 'Cliente "desselecionado" com sucesso', life: 3000 });
                getAll();
            } else {
                /* @ts-ignore */
                toast.current.show({ severity: 'error', summary: 'Erro...', detail: response.errorMessage, life: 3000 });
            }
        });
    }

    const onUnselectAll = () => {
        confirmDialog({
            message: 'Tem certeza que deseja remover todos os clientes da seleção?',
            header: 'Desselecionar todos os clientes',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                selectCustomers(customers.map((item) => ({ id: item.id, select: false }))).then((response) => {
                    if (response.success) {
                        /* @ts-ignore */
                        toast.current.show({ severity: 'success', summary: 'Successo!', detail: 'Todos os clientes foram "desselecionado" com sucesso', life: 3000 });
                        getAll();
                    } else {
                        /* @ts-ignore */
                        toast.current.show({ severity: 'error', summary: 'Erro...', detail: response.errorMessage, life: 3000 });
                    }
                });
            },
        });
    }

    const getAll = () => {
        getAllCustomers(true).then((response) => {
            if (response.success) {
                const customers = response.data || [];
                customers?.sort((a, b) => a.createAt.getTime() - b.createAt.getTime())!;
                setCustomers(customers);
            } else {
                /* @ts-ignore */
                toast.current.show({ severity: 'error', summary: 'Erro...', detail: response.errorMessage, life: 3000 });
            }
        });
    }

    useEffect(() => {
        getAll();
    }, []);

    return (
        <>
            <Toast ref={toast} />
            <TopBar />
            <div className="body-content">
                <h3 className="font-semibold">Clientes selecionados:</h3>
                <div className="grid mt-1">
                    {customers.map((customer: Customer) => (
                        <div className="col-3" key={customer.id}>
                            <CustomerCard {...customer} unselect={() => onUnselect(customer)} />
                        </div>
                    ))}
                </div>
                <Button label="Limpar clientes selecionados" severity="warning" outlined className="w-full mt-2" onClick={() => onUnselectAll()} />
            </div>
        </>
    );
}