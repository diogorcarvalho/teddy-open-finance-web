import { NavLink } from "react-router-dom";
import { useUser } from "../providers/UserContext";

export default function TopBar() {
    const { userName } = useUser();
    
    return (
        <div className="top-menu flex justify-content-between flex-wrap p-4">
            <div className="flex justify-content-center flex-wrap gap-3">
                <img src="menu_btn.png" style={{ height: 50 }} />
                <img src="teddy_logo.png" style={{ height: 50 }} />
            </div>
            <div className="flex justify-content-center flex-wrap gap-5 my-3">
                <NavLink to="/customer-list" className={({isActive}) => isActive ? 'menu-item-actived' : 'menu-item'}>Clientes</NavLink>
                <NavLink to="/selected-customer-list" className={({isActive}) => isActive ? 'menu-item-actived' : 'menu-item'}>Clientes Selecionados</NavLink>
                <NavLink to="/" className="menu-item">Sair</NavLink>
            </div>
            <div className=" my-3">Olá, <b>{userName || 'Foobar'}!</b></div>
        </div>
    );
}