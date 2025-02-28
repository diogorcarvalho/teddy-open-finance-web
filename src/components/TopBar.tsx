import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../providers/UserContext";
import { confirmDialog } from 'primereact/confirmdialog';

export default function TopBar() {
    const navigate = useNavigate();
    const { setUserName } = useUser();
    const { userName } = useUser();

    const quitApp = () => {
        confirmDialog({
            message: 'Desela sair do aplicativo?',
            header: 'Sair do aplicativo',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                setUserName('');
                navigate('/');
            },
        });
    }

    return (
        <div className="top-menu flex justify-content-between flex-wrap p-4">
            <div className="flex justify-content-center flex-wrap gap-3">
                <img src="menu_btn.png" style={{ height: 50 }} />
                <img src="teddy_logo.png" style={{ height: 50 }} />
            </div>
            <div className="flex justify-content-center flex-wrap gap-5 my-3">
                <NavLink to="/customer-list" className={({ isActive }) => isActive ? 'menu-item-actived' : 'menu-item'}>Clientes</NavLink>
                <NavLink to="/selected-customer-list" className={({ isActive }) => isActive ? 'menu-item-actived' : 'menu-item'}>Clientes Selecionados</NavLink>
                <div className="menu-item cursor-pointer" onClick={quitApp}>Sair</div>
            </div>
            <div className=" my-3">Olá, <b>{userName || '...'}!</b></div>
        </div>
    );
}