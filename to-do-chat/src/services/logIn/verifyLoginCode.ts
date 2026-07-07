import { api } from "../api/api";

export const verifyLoginCode = async(email:string, code:string)=>{
    const response = await api.post('/verifyLoginCode',{email, code}, {withCredentials:true});
    return response.data;
}
