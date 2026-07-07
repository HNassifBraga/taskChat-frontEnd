import { api } from "../../api/api";
import type { Task, TaskStatus } from "../../../interfaces/interfaceTasks";

interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export const updateTaskStatusService = async (
  taskId: number,
  status: TaskStatus
): Promise<Task> => {
  const response = await api.put<ApiSuccessResponse<Task>>(
    'updateTaskStatus',
    { taskId, status },
    { withCredentials: true }
  );

  return response.data.data;
};
