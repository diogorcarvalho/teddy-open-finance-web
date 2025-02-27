import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { Button } from 'primereact/button';
import { useUser } from '../providers/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [name, setName] = useState<string>("");
    const { setUserName } = useUser();
    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setUserName(name);
        navigate("/customer-list");
    };

    return (
        <div className="flex justify-content-center align-items-center h-screen">
            <form onSubmit={handleSubmit} className="text-center">
                <h2>Olá, seja bem-vindo!</h2>
                <div className="mt-3">
                    <InputText
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Digite o seu nome:"
                        className="w-20rem"
                        required
                    />
                </div>
                <Button
                    type="submit"
                    label="Entrar"
                    className="mt-3 w-20rem"
                    style={{ backgroundColor: "#E65C1C", border: "none" }}
                />
            </form>
        </div>
    );
}
