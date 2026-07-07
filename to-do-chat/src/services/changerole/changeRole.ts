import { api } from "../api/api";
import axios from "axios";

export const changeRole = async(role:'ADMIN'|'USER', id:number)=>{
    try{
        const response = await api.post('/updateRole',{role,id})
        return response
    }catch(e)
    {
        if (axios.isAxiosError(e)) {
            console.log(e.response)
        }
        throw e;
    }
}