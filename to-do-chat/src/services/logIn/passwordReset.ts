import { api } from "../api/api";

export const requestPasswordReset = async(email:string)=>{
    const response = await api.post('/requestPasswordReset',{email});
    return response.data;
}

export const resetPassword = async(email:string, code:string, newPassword:string)=>{
    const response = await api.post('/resetPassword',{email, code, newPassword});
    return response.data;
}
