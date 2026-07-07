import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { requestPasswordReset } from "../../services/logIn/passwordReset";
import styles from './Login.module.css';

export const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleRequestReset = async () => {
        setError('');
        setMessage('');

        try {
            const response = await requestPasswordReset(email);
            setMessage(response.message || 'Se esse email estiver cadastrado, enviaremos um código de recuperação.');
            navigate('/reset-password', {state:{email}});
        } catch (e) {
            if (axios.isAxiosError(e)) {
                const data = e.response?.data;
                setError(data?.error?.message || data?.message || 'Erro ao solicitar recuperação de senha');
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
                    <h1 className="text-center mb-4 fs-2">Recuperar senha</h1>
                    <p className="text-secondary text-center">
                        Digite seu email para receber o código de recuperação.
                    </p>
                    <form onSubmit={(e) => { e.preventDefault(); handleRequestReset(); }}>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className={`rounded w-100 p-2 ${styles.input} text-white`}
                                placeholder="exemplo@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button className={styles.button} type="submit">
                            Enviar código
                        </button>
                    </form>
                    <div className={message ? "m-3 d-flex justify-content-center alert alert-success d-block" : "d-none"}>
                        {message}
                    </div>
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
