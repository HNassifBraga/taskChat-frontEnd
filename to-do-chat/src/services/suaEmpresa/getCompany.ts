import { api } from "../api/api";
import type { companyComplete } from "../../interfaces/interfaceCompany";

export const getCompany = async():Promise<companyComplete>=>{
    const company = await api.get<companyComplete>('/getCompany', {withCredentials:true});
    return company.data
}