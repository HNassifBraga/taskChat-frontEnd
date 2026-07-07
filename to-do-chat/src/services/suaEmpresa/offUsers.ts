import { api } from "../api/api";
import type { UsersInCompany } from "../../interfaces/interfaceUser";

interface ApiSuccessResponse<T> {
    success: true;
    data: T;
}

export const getAllOffUsersInCompany = async():Promise<UsersInCompany[]>=>
{
    const response = await api.get<ApiSuccessResponse<UsersInCompany[]>>('/getOffUsersCompany');
    return response.data.data;
}