import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { BaseResponse, useCustomerService } from "../services/customer-service";

export interface CreateCustomerFormProps {
    onSuccess: (respone: string) => void;
    onError: (respone: string) => void;
}

export function CreateCustomerForm({ onSuccess, onError }: CreateCustomerFormProps) {
    const { postCustomer } = useCustomerService();
    const [name, setName] = useState<string>('')
    const [salary, setSalary] = useState<number>()
    const [companyValue, setcompanyValue] = useState<number>()

    const handleSubmit = (e: any) => {
        e.preventDefault();
        postCustomer({ name: name!, salary: salary!, companyValue: companyValue! })
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
                        label="Cirar cliente"
                        className="w-full"
                        style={{ backgroundColor: "#E65C1C", border: "none" }} />
                </div>
            </div>
        </form>
    );
}