import { useNavigate, useLocation} from "react-router-dom";
import { LogOut1 } from "../../services/logOut/logout";
import {  useState, useEffect } from "react";
import { getUserCookie } from "../../services/getUserCookie/getUserCookie";
import styles from './Navbar.module.css'
export  function NavBar()
{
    const location = useLocation();
    const navigate = useNavigate();
    const [ role,setRole] = useState<string>('');
    const [company, setCompany] = useState<number|null>(null)
    let idades = localStorage.getItem('idade');
    if(idades == 'null'){
        idades = null;
    }
    useEffect(()=>{
        const getUsercookies = async()=>{
            const cookie = await getUserCookie();
            setRole(cookie.role)
            if(cookie.companyId === null)
            {
                setCompany(null)
            }else{
                setCompany(cookie.companyId)
            }
        };
        getUsercookies();
    },[]);
   
    const handleLogout=async()=>{
        await LogOut1();
        navigate('/')
    }

    const nome = localStorage.getItem('nome') ?? 'Usuário';

    const fLetter = nome[0] ?? 'U';
    return (
    <>
        <nav className={`d-flex  justify-content-between p-3 ${styles.bg} border-secondary border-bottom` }>
            <div className="d-flex align-items-center ">
                <div className="text-white  fs-4  ">
                    <span
                    className={`d-inline-flex align-items-center justify-content-center rounded-4   ${styles.logo}`}
                    >
                    T
                    </span>
                    TaskChat
                </div>
                {
                    location.pathname!== '/mainPage' && !company && (
                        <button className={`${styles.buttonNegar} text-white mx-2 border-0 rounded p-2`} onClick={()=>navigate('/mainPage')}>main page</button>
                    )
                }
                {
                    location.pathname!== '/mainPage' && !idades && role == 'USER'  && (
                        <button className={`${styles.buttonNegar} text-white mx-2 border-0 rounded p-2`} onClick={()=>navigate('/mainPage')}>registrar empresa</button>
                    )
                }
                {
                    location.pathname!== '/getAllUsers' && role == 'SUPERUSER' && (
                        <>
                            <button className={`${styles.buttonNegar} text-white mx-2 border-0 rounded p-2`} onClick={()=>navigate('/getAllUsers')}>Users Table</button>
                        </>
                        
                    )
                }{
                    location.pathname!== '/getAllCompany' && role == 'SUPERUSER' && (
                        <>
                            <button className={`${styles.buttonNegar} text-white mx-2 border-0 rounded p-2`} onClick={()=>navigate('/getAllCompany')}>Company Table</button>
                        </>
                        
                    )
                }{
                    location.pathname!== '/myCompany' && (role == 'ADMIN' || role == 'CEO' || role == 'SUPERUSER') && (
                        <>
                            <button className={`${styles.buttonNegar} text-white mx-2 border-0 rounded p-2`} onClick={()=>navigate('/myCompany')}>sua empresa</button>
                        </>
                        
                    )
                }{
                    location.pathname!== '/dashboard'  &&  company && (
                        <>
                            <button className={`${styles.buttonNegar} text-white mx-2 border-0 rounded p-2`} onClick={()=>navigate('/dashboard')}>dashboard</button>
                        </>
                        
                    )
                }
            </div> 
            
            <div className="d-flex align-items-center mx-4">
                <p className="text-white m-0">Ola, {nome}</p>
                 <span className={`d-inline-flex align-items-center justify-content-center rounded-4 text-white mx-2 ${styles.logo}`}>
                    {fLetter}
                    </span>

                <button className={`${styles.buttonNegar} text-white mx-2 border-0 rounded p-2`} onClick={handleLogout}>(Log Out)</button>
            </div>
            
            
        </nav>

    </>
    )
}


