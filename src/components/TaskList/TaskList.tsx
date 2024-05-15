import React, { useCallback } from 'react';
import { Box, Stack, IconButton, Input, Button, Modal, Paper } from '@mui/material';
import { MoreHoriz, Edit, Delete, Add } from '@mui/icons-material';
import TaskTicket from '../TaskTicket/TaskTicket';
import ButtonMenu from '../ButtonMenu/ButtonMenu';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { ITaskList } from '../../models/Index.ts';
import { useAppDispatch } from '../../store/hooks.ts';
import { useUser } from '../../store/selectors/userSelector.ts';
import { useProject, useTasks } from '../../store/selectors/projectSelector.ts';
import {
	createTask,
	updateProjectInState,
	updateTaskList,
} from '../../store/slices/projectSlice.ts';
import { debounce } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
interface TaskListProps {
	taskList: ITaskList;
	index: number;
}

const TaskList: React.FC<TaskListProps> = (props) => {
	const dispatch = useAppDispatch();
	const creator = useUser();
	const tasks = useTasks();
	const project = useProject();
	const { taskList, index } = props;
	const [taskListName, setTaskListName] = React.useState(taskList.name);
	const tasksInTaskList = taskList.taskIds!.map((taskId) => {
		return tasks![taskId];
	});
	const tasksArray = tasksInTaskList ? Object.values(tasksInTaskList) : [];
	const deleteTaskListHandler = () => {
		const taskListId = taskList.taskListId;
		const newTaskLists = Object.keys(project.taskLists!)
			.filter((key) => key !== taskListId)
			.reduce((result, key) => {
				result[key] = project.taskLists![key];
				return result;
			}, {} as { [key: string]: ITaskList });

		const prevTaskList = project.taskLists![taskListId];
		const prevTaskIds = prevTaskList.taskIds;
		const newTasks = project.tasks!;
		prevTaskIds?.forEach((taskId) => {
			delete newTasks[taskId];
		});
		const updatedProject = {
			...project,
			taskListOrder: project.taskListOrder?.filter((id) => id !== taskListId),
			taskLists: newTaskLists,
			tasks: newTasks,
		};
		dispatch(updateProjectInState(updatedProject));
	};

	const addBtnClickHandler = () => {
		const taskId = uuidv4();
		const newTask = {
			taskId,
			description: '',
			name: 'New Task',
			isCompleted: false,
			creator: creator,
		};
		const updatedProject = {
			...project,
			taskLists: {
				...project.taskLists,
				[taskList.taskListId]: {
					...taskList,
					taskIds: [...(taskList.taskIds as string[]), taskId],
				},
			},
			tasks: {
				...project.tasks,
				[newTask.taskId]: newTask,
			},
		};
		dispatch(updateProjectInState(updatedProject));

		dispatch(
			createTask({
				taskListId: taskList.taskListId,
				creatorId: creator.userId,
				projectId: project.projectId!,
				taskId,
			})
		);
	};

	const debouncedDispatch = useCallback(
		debounce((taskListId, name) => {
			dispatch(
				updateTaskList({
					taskListId,
					data: {
						name,
					},
				})
			);
		}, 500),
		[]
	);

	const updateTaskListNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTaskListName(e.target.value);
		debouncedDispatch(taskList.taskListId, e.target.value);
	};

	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const handleModalOpen = () => setIsModalOpen(true);
	const handleModalClose = () => setIsModalOpen(false);

	return (
		<Draggable draggableId={taskList.taskListId} index={index}>
			{(provided, snapshot) => (
				<Box
					sx={{
						padding: '.5rem .5rem 0 .5rem',
						marginRight: '1rem',
						borderRadius: '0.5rem',
						'&:hover': {
							border: '1px solid var(--border-50)',
						},
						backgroundColor: 'var(--black)',
						border: `${snapshot.isDragging ? '1px solid var(--endeavour)' : 'none'}`,
					}}
					{...provided.draggableProps}
					ref={provided.innerRef}
				>
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
						padding="1.5rem .5rem .5rem .5rem"
						{...provided.dragHandleProps}
					>
						<Input
							value={taskListName}
							onChange={updateTaskListNameHandler}
							sx={{
								fontSize: '1.1rem',
							}}
						/>
						<Stack direction="row" justifyContent="flex-end">
							<IconButton onClick={addBtnClickHandler}>
								<Add fontSize="small" />
							</IconButton>
							<ButtonMenu
								variant="icon"
								icon={<MoreHoriz fontSize="small" />}
								menuItems={[
									{
										icon: <Edit fontSize="small" />,
										text: 'Rename task list',
									},
									{
										icon: <Delete fontSize="small" color="error" />,
										text: 'Delete task list',
										cb: handleModalOpen,
									},
								]}
							/>
							{/*TODO: change it to dialog*/}
							<Modal open={isModalOpen} onClose={handleModalClose}>
								<Box
									sx={{
										position: 'absolute',
										top: '50%',
										left: '50%',
										transform: 'translate(-50%, -50%)',
										width: 400,
										p: 4,
									}}
								>
									<Paper
										sx={{
											padding: '1rem',
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'flex-end',
											gap: '2rem',
										}}
									>
										<h4 style={{ color: 'var(--coral)' }}>
											Warning: Do you wish to delete this task list with all
											the tasks?
										</h4>
										<Stack direction="row" justifyContent="flex-end" gap="1rem">
											<Button variant="outlined" onClick={handleModalClose}>
												Cancel
											</Button>
											<Button
												variant="contained"
												onClick={deleteTaskListHandler}
											>
												Delete
											</Button>
										</Stack>
									</Paper>
								</Box>
							</Modal>
						</Stack>
					</Stack>
					<Droppable droppableId={taskList.taskListId} type="task">
						{(provided, snapshot) => (
							<Stack
								direction="column"
								{...provided.droppableProps}
								ref={provided.innerRef}
								sx={{
									padding: '1rem .5rem 0 .5rem',
									width: '18rem',
									height: 'calc(100vh - 21rem)',
									overflowY: 'auto',
									backgroundColor: snapshot.isDraggingOver
										? 'var(--dark--gray-2-50)'
										: 'transparent',
									borderRadius: '.5rem',
								}}
							>
								<Box>
									{tasksArray &&
										tasksArray.length > 0 &&
										tasksArray.map((task, index) => {
											return (
												<TaskTicket
													key={task.taskId}
													{...task}
													index={index}
													taskListId={taskList.taskListId}
												/>
											);
										})}
									{provided.placeholder}
									<Button
										onClick={addBtnClickHandler}
										fullWidth
										variant="text"
										startIcon={<Add fontSize="small" />}
									>
										Add task
									</Button>
								</Box>
							</Stack>
						)}
					</Droppable>
				</Box>
			)}
		</Draggable>
	);
};

export default TaskList;
