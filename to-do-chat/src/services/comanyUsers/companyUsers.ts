import { api } from "../api/api";
import type { UsersInCompany } from "../../interfaces/interfaceUser";

interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export const CompanyUsers = async (): Promise<UsersInCompany[]> => {
  const response = await api.get<ApiSuccessResponse<UsersInCompany[]>>(
    '/companyUsers',
    { withCredentials: true }
  );
  return response.data.data;
};
