import type { UsersInCompany } from "../../interfaces/interfaceUser";
import { api } from "../api/api";

interface ApiSuccessResponse<T> {
    success: true;
    data: T;
}

export const getAllActiveUsersInCompany = async(id:number):Promise<UsersInCompany[]>=>{
    const response = await api.get<ApiSuccessResponse<UsersInCompany[]>>('/getActiveUsersCompany');
    const data = response.data.data;
    const list:UsersInCompany[] = []
    data.map((u)=>{
        if(u.id != id)
        {
            list.push(u)
        }
    })
    return list;
}