import { api } from "../../api/api";
import type { Task, TaskStatus } from "../../../interfaces/interfaceTasks";

interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export const getTaskService = async (
  filters: { status?: TaskStatus; assignedUserId?: number } = {}
): Promise<Task[]> => {
  const response = await api.post<ApiSuccessResponse<Task[]>>(
    'getTasks',
    filters,
    { withCredentials: true }
  );
  return response.data.data;
};
