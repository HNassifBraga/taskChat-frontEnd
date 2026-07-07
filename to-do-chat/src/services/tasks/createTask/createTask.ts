import { api } from "../../api/api";
import type { CreateTaskPayload, Task } from "../../../interfaces/interfaceTasks";

interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export const createTaskService = async (
  data: CreateTaskPayload
): Promise<Task> => {
  const response = await api.post<ApiSuccessResponse<Task>>('createTask', data);
  return response.data.data;
};
