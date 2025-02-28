export interface Customer {
    id: string;
    name: string;
    salary: number;
    companyValue: number;
    createAt: Date;
    updateAt: Date;
}

export interface CreateCustomerRequest {
    name: string;
    salary: number;
    companyValue: number;
}

export interface EditCustomerRequest {
    id: string;
    name: string;
    salary: number;
    companyValue: number;
}

export interface BaseResponse<T> {
    success: boolean;
    errorMessage?: string;
    data?: T;
}

export function useCustomerService() {
    async function getAllCustomers(selected: boolean): Promise<BaseResponse<Customer[]>> {
        try {
            const response = await fetch(`http://localhost:3000/api/customers?selected=${selected}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                return { success: false, errorMessage: errorMessage.message };
            }
            
            const customers: any[] = await response.json();

            return {
                success: true,
                data: customers.map((item: Customer) => ({ ...item, createAt: new Date(item.createAt), updateAt: new Date(item.updateAt) } as Customer)),
            };
        } catch (error) {
            return { success: false, errorMessage: `${error}` };
        }
    }

    async function postCustomer(request: CreateCustomerRequest): Promise<BaseResponse<string>> {
        try {
            const response = await fetch(`http://localhost:3000/api/customers`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request),
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                return { success: false, errorMessage: errorMessage.message };
            }
        
            const messageResponse = await response.json();

            return {
                success: true,
                data: messageResponse.message,
            };
        } catch (error) {
            return { success: false, errorMessage: `${error}` };
        }
    }

    async function patchCustomer(request: EditCustomerRequest): Promise<BaseResponse<string>> {
        try {
            const response = await fetch(`http://localhost:3000/api/customers`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request),
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                return { success: false, errorMessage: errorMessage.message };
            }

            const messageResponse = await response.json();

            return {
                success: true,
                data: messageResponse.message,
            };
        } catch (error) {
            return { success: false, errorMessage: `${error}` };
        }
    }

    async function selectCustomers(itens: { id: string, select: boolean }[]): Promise<BaseResponse<string>> {
        try {
            const response = await fetch(`http://localhost:3000/api/customers/select`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(itens),
            });

            if (!response.ok) {
                return { success: false, errorMessage: response.statusText };
            }

            const messageResponse = await response.json();

            return {
                success: true,
                data: messageResponse.message,
            };
        } catch (error) {
            return { success: false, errorMessage: `${error}` };
        }
    }

    async function deleteCustomer(id: string): Promise<BaseResponse<string>> {
        try {
            const response = await fetch(`http://localhost:3000/api/customers/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                return { success: false, errorMessage: response.statusText };
            }

            const messageResponse = await response.json();

            return {
                success: true,
                data: messageResponse.message,
            };
        } catch (error) {
            return { success: false, errorMessage: `${error}` };
        }
    }

    return {
        getAllCustomers,
        postCustomer,
        patchCustomer,
        deleteCustomer,
        selectCustomers,
    };
};