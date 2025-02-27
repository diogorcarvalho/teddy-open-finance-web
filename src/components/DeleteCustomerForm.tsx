import { Button } from "primereact/button";
import { BaseResponse, Customer, useCustomerService } from "../services/customer-service";

export interface DeleteCustomerFormProps {
    customer: Customer;
    onSuccess: (respone: string) => void;
    onError: (respone: string) => void;
}

export function DeleteCustomerForm({ customer, onSuccess, onError }: DeleteCustomerFormProps) {
    const { deleteCustomer } = useCustomerService();
    
    const handleSubmit = (e: any) => {
        e.preventDefault();
        deleteCustomer(customer.id)
            .then((respone: BaseResponse<string>) => {
                if (respone.success) {
                    onSuccess(respone.data!);
                } else {
                    onError(respone.errorMessage!);
                }
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            {customer && <div className="mb-2">Você está prestes a excluir o cliente: <b>{customer.name}</b></div>}
            <div className="formgrid grid">
                <div className="field col-12 md:col-12">
                    <Button
                        type="submit"
                        label="Excluir cliente"
                        className="w-full"
                        style={{ backgroundColor: "#E65C1C", border: "none" }} />
                </div>
            </div>
        </form>
    );
}