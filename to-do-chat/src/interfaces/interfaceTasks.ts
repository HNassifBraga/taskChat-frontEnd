export type TaskStatus =
  | 'A_FAZER'
  | 'EM_REVISAO'
  | 'CONCLUIDO'
  | 'ATRASADO'
  | 'CANCELADO';

export interface Task {
  id: number;
  task: string;
  status: TaskStatus;
  dateLimit: string | null;
  createdAt: string;
  autor: string;
  atarefado: string | null;
  atarefadoId: number | null;
}

export interface CreateTaskPayload {
  assignedUserId: number;
  task: string;
  description?: string;
  dueDate: string;
}
