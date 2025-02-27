import { Toast } from "primereact/toast";
import { useRef } from "react";
import { useCustomerService } from "../services/customer-service";
import TopBar from "../components/TopBar";

export default function SelectedCustomerList() {
    const { } = useCustomerService();

    const toast = useRef(null);
    
    return (
        <>
            <Toast ref={toast} />
            <TopBar />
            <div className="body-content">

            </div>
        </>
    );
}