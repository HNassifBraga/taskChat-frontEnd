import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { verifyLoginCode } from "../../services/logIn/verifyLoginCode";
import { createLocalStorage } from "../../services/createLocalStorage/createLocalStorage";
import styles from './Login.module.css';

interface LocationState {
    email?: string;
}

export const VerifyLoginCode = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as LocationState | null;
    const [email, setEmail] = useState(state?.email ?? '');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const handleVerifyCode = async () => {
        setError('');

        try {
            await verifyLoginCode(email, code);
            await createLocalStorage();
            navigate('/mainPage');
        } catch (e) {
            if (axios.isAxiosError(e)) {
                const data = e.response?.data;
                setError(data?.error?.message || data?.message || 'Erro ao validar código');
            }
        }
    };

    return (
        <div className={`container-fluid vh-100 d-flex align-items-center justify-content-center px-3 flex-column ${styles.bg_login}`}>
            <div className="text-white mb-5 fs-4">
                <span className={`d-inline-flex align-items-center justify-content-center rounded-4 ${styles.logo}`}>
                    T
                </span>
                TaskChat
            </div>
            <div className={`shadow p-4 p-md-5 ${styles.card} rounded text-white`}>
                <div className="card-body">
                    <h1 className="text-center mb-4 fs-2">Digite o código</h1>
                    <p className="text-secondary text-center">
                        Enviamos um código de desbloqueio para o email informado.
                    </p>

                    <form onSubmit={(e) => { e.preventDefault(); handleVerifyCode(); }}>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className={`rounded w-100 p-2 ${styles.input} text-white`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Código</label>
                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                className={`rounded w-100 p-2 ${styles.input} text-white`}
                                placeholder="Digite o código de 6 dígitos"
                                value={code}
                                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                            />
                        </div>

                        <button className={styles.button} type="submit">
                            Validar código
                        </button>
                    </form>

                    <div className={error ? "m-3 d-flex justify-content-center alert alert-danger d-block" : "d-none"}>
                        {error}
                    </div>
                </div>
            </div>
            <button className="btn btn-link mt-3" onClick={() => navigate('/login')}>
                Voltar para login
            </button>
        </div>
    );
};
