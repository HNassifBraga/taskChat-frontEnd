import { api } from "../api/api";
export const LogIn= async(email:string,pass:string)=>{
    const response = await api.post('/login',{email:email,pass:pass}, {withCredentials:true})
    return response.data;
}


