import { useCallback, useEffect, useState, type DragEvent } from 'react';
import { ChatComponent } from './socket';
import { CompanyUsers } from '../../services/comanyUsers/companyUsers';
import { getUserCookie } from '../../services/getUserCookie/getUserCookie';
import { createTaskService } from '../../services/tasks/createTask/createTask';
import { getTaskService } from '../../services/tasks/getTasks.ts/getTasks';
import { updateTaskStatusService } from '../../services/tasks/updateTaskStatus/updateTaskStatus';
import { io, Socket } from 'socket.io-client';
import { NavBar } from '../navbar/navbar';
import styles from './DashBoard.module.css';
import type { Task, TaskStatus } from '../../interfaces/interfaceTasks';
import type { UsersInCompany } from '../../interfaces/interfaceUser';
import { apiBaseURL } from '../../services/api/api';

let socket: Socket;

const KANBAN_COLUMNS: { status: TaskStatus; label: string }[] = [
  { status: 'A_FAZER', label: 'A fazer' },
  { status: 'EM_REVISAO', label: 'Em revisão' },
  { status: 'CONCLUIDO', label: 'Concluído' },
  { status: 'ATRASADO', label: 'Atrasado' },
  { status: 'CANCELADO', label: 'Cancelado' },
];

const USER_KANBAN_COLUMNS: { status: TaskStatus; label: string }[] = [
  { status: 'A_FAZER', label: 'A fazer' },
  { status: 'EM_REVISAO', label: 'Em revisão' },
  { status: 'ATRASADO', label: 'Atrasado' },
];

const isOverdueTodoTask = (task: Task): boolean => {
  if (task.status !== 'A_FAZER' || !task.dateLimit) return false;

  const dueDate = new Date(task.dateLimit);
  if (Number.isNaN(dueDate.getTime())) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  return dueDate < today;
};

type ModalStep = 'closed' | 'employee' | 'form' | 'viewEmployee';

export function ChatPage() {
  const [activeFriendId, setActiveFriendId] = useState<number | null>(null);
  const [companyUsers, setCompanyUsers] = useState<UsersInCompany[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [companyId, setCompanyId] = useState<number | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [friendName, setFriendName] = useState<string | null>(null);
  const [chatRefreshKey, setChatRefreshKey] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskOwnerLabel, setTaskOwnerLabel] = useState('Minhas tarefas');
  const [viewedTaskUserId, setViewedTaskUserId] = useState<number | undefined>();
  const [modalStep, setModalStep] = useState<ModalStep>('closed');
  const [taskFormBackStep, setTaskFormBackStep] = useState<ModalStep>('employee');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createError, setCreateError] = useState('');

  const loadTasks = useCallback(async (
    assignedUserId?: number,
    ownerLabel = 'Minhas tarefas'
  ) => {
    try {
      const allTasks = await getTaskService({ assignedUserId });
      const normalizedTasks = await Promise.all(
        allTasks.map(async (task) => {
          if (!isOverdueTodoTask(task)) return task;

          try {
            return await updateTaskStatusService(task.id, 'ATRASADO');
          } catch (error) {
            console.error('Erro ao marcar tarefa como atrasada', error);
            return task;
          }
        })
      );

      setTasks(normalizedTasks);
      setTaskOwnerLabel(ownerLabel);
      setViewedTaskUserId(assignedUserId);
    } catch (error) {
      console.error('Erro ao carregar tarefas', error);
    }
  }, []);

  useEffect(() => {
    socket = io(apiBaseURL || '/', {
      withCredentials: true,
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [users, cookies] = await Promise.all([
          CompanyUsers(),
          getUserCookie(),
        ]);

        setCompanyUsers(users);
        setUserId(cookies.id);
        setCompanyId(cookies.companyId);
        setUserRole(cookies.role);
        await loadTasks();
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard', error);
      }
    };

    loadInitialData();
  }, [loadTasks]);

  const isManager = userRole === 'CEO' || userRole === 'ADMIN';

  const assignableEmployees = companyUsers.filter((user) => {
    if (userRole === 'ADMIN' && user.role === 'CEO') return false;
    return true;
  });

  const viewableEmployees = assignableEmployees;

  const handleOpenCreateTask = () => {
    setCreateError('');
    setTaskTitle('');
    setTaskDueDate('');
    setSelectedEmployeeId(null);

    if (isManager) {
      setTaskFormBackStep('employee');
      setModalStep('employee');
    } else {
      setSelectedEmployeeId(userId);
      setTaskFormBackStep('closed');
      setModalStep('form');
    }
  };

  const handleOpenChatTaskForm = () => {
    if (!activeFriendId || !isManager) return;

    setCreateError('');
    setTaskTitle('');
    setTaskDueDate('');
    setSelectedEmployeeId(activeFriendId);
    setTaskFormBackStep('closed');
    setModalStep('form');
  };

  const handleOpenEmployeeTasks = () => {
    setCreateError('');
    setModalStep('viewEmployee');
  };

  const handleLoadEmployeeTasks = async (employee: UsersInCompany) => {
    await loadTasks(
      employee.id,
      employee.id === userId ? 'Minhas tarefas' : `Tarefas de ${employee.nome}`
    );
    setModalStep('closed');
  };

  const handleCloseModal = () => {
    setModalStep('closed');
    setSelectedEmployeeId(null);
    setTaskTitle('');
    setTaskDueDate('');
    setCreateError('');
    setTaskFormBackStep('employee');
  };

  const handleSelectEmployee = (employeeId: number) => {
    setSelectedEmployeeId(employeeId);
  };

  const handleProceedToForm = () => {
    if (!selectedEmployeeId) {
      setCreateError('Selecione um funcionário para continuar');
      return;
    }
    setCreateError('');
    setTaskFormBackStep('employee');
    setModalStep('form');
  };

  const handleCreateTask = async () => {
    if (!selectedEmployeeId || !taskTitle.trim() || !taskDueDate) {
      setCreateError('Preencha o texto da tarefa e a data limite');
      return;
    }

    setIsSubmitting(true);
    setCreateError('');

    try {
      await createTaskService({
        assignedUserId: selectedEmployeeId,
        task: taskTitle.trim(),
        dueDate: new Date(taskDueDate).toISOString(),
      });

      if (activeFriendId === selectedEmployeeId) {
        setChatRefreshKey((currentKey) => currentKey + 1);
      }

      handleCloseModal();
      await loadTasks();
    } catch (error: unknown) {
      const message =
        error &&
        typeof error === 'object' &&
        'response' in error &&
        error.response &&
        typeof error.response === 'object' &&
        'data' in error.response &&
        error.response.data &&
        typeof error.response.data === 'object' &&
        'error' in error.response.data &&
        error.response.data.error &&
        typeof error.response.data.error === 'object' &&
        'message' in error.response.data.error &&
        typeof error.response.data.error.message === 'string'
          ? error.response.data.error.message
          : 'Erro ao criar tarefa';

      setCreateError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDueDate = (dateLimit: string | null) => {
    if (!dateLimit) return 'Sem data limite';
    return new Date(dateLimit).toLocaleDateString('pt-BR');
  };

  const handleTaskDragStart = (event: DragEvent<HTMLDivElement>, taskId: number) => {
    event.dataTransfer.setData('text/plain', String(taskId));
  };

  const handleTaskDrop = async (
    event: DragEvent<HTMLDivElement>,
    status: TaskStatus
  ) => {
    event.preventDefault();
    const taskId = Number(event.dataTransfer.getData('text/plain'));

    if (!taskId || Number.isNaN(taskId)) return;

    const currentTask = tasks.find((task) => task.id === taskId);
    if (!currentTask || currentTask.status === status) return;

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, status } : task
      )
    );

    try {
      await updateTaskStatusService(taskId, status);
    } catch (error) {
      console.error('Erro ao atualizar status da tarefa', error);
      await loadTasks(viewedTaskUserId, taskOwnerLabel);
    }
  };

  const friendList = companyUsers.filter((user) => user.id !== userId);
  const visibleKanbanColumns = isManager ? KANBAN_COLUMNS : USER_KANBAN_COLUMNS;

  return (
    <div>
      <NavBar />
      <div className={`${styles.bg} ${styles.dashboardLayout}`}>
        <section className={styles.kanbanSection}>
          <div className="d-flex justify-content-between align-items-center mb-3 px-2">
            <div>
              <h4 className="text-white mb-0">Quadro de tarefas</h4>
              <span className="text-secondary small">{taskOwnerLabel}</span>
            </div>
            <div className="d-flex gap-2">
              {isManager && (
                <>
                  <button
                    type="button"
                    className="btn btn-outline-light btn-sm"
                    onClick={() => loadTasks()}
                  >
                    Ver minhas tarefas
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-info btn-sm"
                    onClick={handleOpenEmployeeTasks}
                  >
                    Ver funcionários
                  </button>
                </>
              )}
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleOpenCreateTask}
              >
                Criar Tarefa
              </button>
            </div>
          </div>

          <div className={styles.kanbanBoard}>
            {visibleKanbanColumns.map((column) => {
              const columnTasks = tasks.filter(
                (task) => task.status === column.status
              );

              return (
                <div key={column.status} className={styles.kanbanColumn}>
                  <div className={styles.columnHeader}>
                    {column.label} ({columnTasks.length})
                  </div>
                  <div
                    className={styles.columnBody}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => handleTaskDrop(event, column.status)}
                  >
                    {columnTasks.map((task) => (
                      <div
                        key={task.id}
                        className={styles.taskCard}
                        draggable
                        onDragStart={(event) => handleTaskDragStart(event, task.id)}
                      >
                        <div>{task.task}</div>
                        <div className={styles.taskMeta}>
                          De: {task.autor}
                          {task.atarefado ? ` · Para: ${task.atarefado}` : ''}
                        </div>
                        <div className={styles.taskMeta}>
                          Limite: {formatDueDate(task.dateLimit)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className={styles.chatSection}>
          <div
            className={`d-flex flex-column overflow-hidden rounded ${styles.bg_chat}`}
          >
            <div className="d-flex flex-grow-1 overflow-hidden">
              <div className={`text-white overflow-auto ${styles.lista}`}>
                <h3 className="text-center w-100 fs-5 border-bottom border-secondary p-3 mb-0">
                  Empresa
                </h3>
                <ul className="mt-3 mx-2 list-unstyled">
                  {friendList.map((friend) => (
                    <li
                      key={friend.id}
                      onClick={() => {
                        setActiveFriendId(friend.id);
                        setFriendName(friend.nome);
                      }}
                      style={{
                        cursor: 'pointer',
                        padding: '8px',
                        background:
                          activeFriendId === friend.id
                            ? '#4f545c'
                            : 'transparent',
                        borderRadius: '4px',
                      }}
                    >
                      <span
                        className={`rounded-circle px-2 me-2 ${
                          activeFriendId === friend.id
                            ? 'bg-success'
                            : 'bg-secondary'
                        }`}
                      />
                      {friend.nome}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="d-flex flex-grow-1">
                {activeFriendId ? (
                  <div className="d-flex flex-column w-100 align-items-center">
                    <h3 className="w-100 bg-transparent d-flex justify-content-center fs-5 text-white p-3 border-bottom border-secondary mb-0">
                      {friendName}
                    </h3>
                    <ChatComponent
                      key={chatRefreshKey}
                      amigoSelecionadoId={activeFriendId}
                      socketInstancia={socket}
                      companyId={companyId}
                      userId={userId}
                      canCreateTask={isManager}
                      onCreateTask={handleOpenChatTaskForm}
                    />
                  </div>
                ) : (
                  <div className="text-secondary p-4">
                    Selecione um colega para iniciar a conversa
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {modalStep !== 'closed' && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(event) => event.stopPropagation()}
          >
            {modalStep === 'viewEmployee' && (
              <>
                <div className={styles.modalHeader}>
                  Ver tarefas de funcionário
                </div>
                <div className={styles.modalBody}>
                  {viewableEmployees.length === 0 ? (
                    <p className="text-secondary mb-0">
                      Nenhum funcionário disponível para consulta.
                    </p>
                  ) : (
                    viewableEmployees.map((employee) => (
                      <div
                        key={employee.id}
                        className={styles.employeeItem}
                        onClick={() => handleLoadEmployeeTasks(employee)}
                      >
                        {employee.nome}
                        {employee.id === userId && (
                          <span className="text-info ms-2">(Eu)</span>
                        )}
                        <span className="text-secondary ms-2">
                          ({employee.role})
                        </span>
                      </div>
                    ))
                  )}
                </div>
                <div className={styles.modalFooter}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={handleCloseModal}
                  >
                    Fechar
                  </button>
                </div>
              </>
            )}

            {modalStep === 'employee' && (
              <>
                <div className={styles.modalHeader}>
                  Selecionar funcionário
                </div>
                <div className={styles.modalBody}>
                  {assignableEmployees.length === 0 ? (
                    <p className="text-secondary mb-0">
                      Nenhum funcionário disponível para atribuição de tarefa.
                    </p>
                  ) : (
                    assignableEmployees.map((employee) => (
                      <div
                        key={employee.id}
                        className={`${styles.employeeItem} ${
                          selectedEmployeeId === employee.id
                            ? styles.employeeItemSelected
                            : ''
                        }`}
                        onClick={() => handleSelectEmployee(employee.id)}
                      >
                        {employee.nome}
                        {employee.id === userId && (
                          <span className="text-info ms-2">(Eu)</span>
                        )}
                        <span className="text-secondary ms-2">
                          ({employee.role})
                        </span>
                      </div>
                    ))
                  )}
                  {createError && (
                    <p className="text-danger mt-2 mb-0">{createError}</p>
                  )}
                </div>
                <div className={styles.modalFooter}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={handleCloseModal}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={handleProceedToForm}
                  >
                    Continuar
                  </button>
                </div>
              </>
            )}

            {modalStep === 'form' && (
              <>
                <div className={styles.modalHeader}>Criar tarefa</div>
                <div className={styles.modalBody}>
                  <div className="mb-3">
                    <label className="form-label text-white">Texto da tarefa</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      value={taskTitle}
                      onChange={(event) => setTaskTitle(event.target.value)}
                      placeholder="Descreva a tarefa"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-white">Data limite</label>
                    <input
                      type="date"
                      className="form-control"
                      value={taskDueDate}
                      onChange={(event) => setTaskDueDate(event.target.value)}
                    />
                  </div>
                  {createError && (
                    <p className="text-danger mb-0">{createError}</p>
                  )}
                </div>
                <div className={styles.modalFooter}>
                  {taskFormBackStep !== 'closed' && (
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm me-auto"
                      onClick={() => setModalStep(taskFormBackStep)}
                    >
                      Voltar
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={handleCloseModal}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={handleCreateTask}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Salvando...' : 'Criar'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
