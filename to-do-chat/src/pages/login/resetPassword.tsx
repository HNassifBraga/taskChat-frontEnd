import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { resetPassword } from "../../services/logIn/passwordReset";
import styles from './Login.module.css';

interface LocationState {
    email?: string;
}

export const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as LocationState | null;
    const [email, setEmail] = useState(state?.email ?? '');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');

    const handleResetPassword = async () => {
        setError('');

        try {
            await resetPassword(email, code, newPassword);
            navigate('/login');
        } catch (e) {
            if (axios.isAxiosError(e)) {
                const data = e.response?.data;
                setError(data?.error?.message || data?.message || 'Erro ao redefinir senha');
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
                    <h1 className="text-center mb-4 fs-2">Nova senha</h1>
                    <p className="text-secondary text-center">
                        Digite o código recebido por email e escolha sua nova senha.
                    </p>
                    <form onSubmit={(e) => { e.preventDefault(); handleResetPassword(); }}>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className={`rounded w-100 p-2 ${styles.input} text-white`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
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
                        <div className="mb-4">
                            <label className="form-label">Nova senha</label>
                            <input
                                type="password"
                                className={`rounded w-100 p-2 ${styles.input} text-white`}
                                placeholder="Digite sua nova senha"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <button className={styles.button} type="submit">
                            Redefinir senha
                        </button>
                    </form>
                    <div className={error ? "m-3 d-flex justify-content-center alert alert-danger d-block" : "d-none"}>
                        {error}
                    </div>
                </div>
            </div>
            <button className="btn btn-link mt-3" onClick={() => navigate('/forgot-password')}>
                Solicitar outro código
            </button>
        </div>
    );
};
