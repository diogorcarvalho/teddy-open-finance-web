import { useState } from "react";
import { BaseResponse, Customer, useCustomerService } from "../services/customer-service";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";

export interface EditCustomerFormProps {
    customer: Customer;
    onSuccess: (respone: string) => void;
    onError: (respone: string) => void;
}

export function EditCustomerForm({ customer, onSuccess, onError }: EditCustomerFormProps) {
    const { patchCustomer } = useCustomerService();
    const [name, setName] = useState<string>(customer.name)
    const [salary, setSalary] = useState<number>(customer.salary)
    const [companyValue, setcompanyValue] = useState<number>(customer.companyValue)

    const handleSubmit = (e: any) => {
        e.preventDefault();
        patchCustomer({ id: customer.id, name: name!, salary: salary!, companyValue: companyValue! })
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
            <div className="formgrid grid">
                <div className="field col-12 md:col-12">
                    <InputText
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Digite o nome:"
                        className="w-full"
                        required />
                </div>
                <div className="field col-12 md:col-12">
                    <InputNumber
                        inputId="currency-brl"
                        value={salary}
                        onValueChange={(e) => setSalary(e.value!)}
                        mode="currency"
                        currency="BRL"
                        locale="bt-BR"
                        placeholder="Digite o salário:"
                        className="w-full" required />
                </div>
                <div className="field col-12 md:col-12">
                    <InputNumber
                        inputId="currency-brl"
                        value={companyValue}
                        onValueChange={(e) => setcompanyValue(e.value!)}
                        mode="currency"
                        currency="BRL"
                        locale="bt-BR"
                        placeholder="Digite o valor da empresa"
                        className="w-full" required />
                </div>
                <div className="field col-12 md:col-12">
                    <Button
                        type="submit"
                        label="Editar cliente"
                        className="w-full"
                        style={{ backgroundColor: "#E65C1C", border: "none" }} />
                </div>
            </div>
        </form>
    );
}
