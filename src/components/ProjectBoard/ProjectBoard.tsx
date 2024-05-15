import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import { FilterList, Sort, CheckCircle, DoNotDisturb, Add } from '@mui/icons-material';
import ButtonMenu from '../ButtonMenu/ButtonMenu';
import TaskList from '../TaskList/TaskList';
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import { useAppDispatch } from '../../store/hooks';
import {
	createTaskList,
	updateProject,
	updateProjectInState,
	updateTaskList,
	updateTwoTaskLists,
} from '../../store/slices/projectSlice.ts';
import { useProject } from '../../store/selectors/projectSelector.ts';
import { v4 as uuidv4 } from 'uuid';
import { ITaskList } from '../../models/TaskList.ts';

const ProjectBoard = () => {
	const dispatch = useAppDispatch();
	const project = useProject();
	const { taskListOrder, taskLists, projectId } = project!;

	const onDragEnd = (result: DropResult) => {
		const { destination, source, draggableId, type } = result;

		if (!destination) {
			return;
		}

		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}

		if (type === 'taskList') {
			const newTaskListOrder = Array.from(taskListOrder as string[]);
			newTaskListOrder.splice(source.index, 1);
			newTaskListOrder.splice(destination.index, 0, draggableId);
			const updatedProject = {
				...project,
				taskListOrder: newTaskListOrder,
			};
			dispatch(updateProjectInState(updatedProject));
			dispatch(
				updateProject({
					projectId: projectId!,
					data: { taskListOrder: newTaskListOrder },
				})
			);
			return;
		}

		const start = taskLists![source.droppableId];
		const finish = taskLists![destination.droppableId];

		if (start === finish) {
			const newTaskIds = Array.from(start.taskIds as string[]);
			newTaskIds.splice(source.index, 1);
			newTaskIds.splice(destination.index, 0, draggableId);

			const newTaskList = {
				...start,
				taskIds: newTaskIds,
			};

			const updatedProject = {
				...project,
				taskLists: {
					...taskLists,
					[newTaskList.taskListId]: newTaskList,
				},
			};
			dispatch(updateProjectInState(updatedProject));
			dispatch(
				updateTaskList({
					taskListId: newTaskList.taskListId,
					data: { taskIds: newTaskIds },
				})
			);
			return;
		}

		const startTaskIds = Array.from(start.taskIds as string[]);
		startTaskIds.splice(source.index, 1);
		const newStart = {
			...start,
			taskIds: startTaskIds,
		};

		const finishTaskIds = Array.from(finish.taskIds as string[]);
		finishTaskIds.splice(destination.index, 0, draggableId);
		const newFinish = {
			...finish,
			taskIds: finishTaskIds,
		};

		const updatedProject = {
			...project,
			taskLists: {
				...taskLists,
				[newStart.taskListId]: newStart,
				[newFinish.taskListId]: newFinish,
			},
		};
		dispatch(updateProjectInState(updatedProject));
		dispatch(
			updateTwoTaskLists({
				taskListIdStart: newStart.taskListId,
				taskListIdFinish: newFinish.taskListId,
				taskIdsStart: newStart.taskIds,
				taskIdsFinish: newFinish.taskIds,
			})
		);
		return;
	};

	const addTaskListBtnClickHandler = () => {
		const taskListId = uuidv4();
		const newTaskList: ITaskList = {
			taskListId,
			name: 'New TaskList',
			taskIds: [],
		};
		const updatedProject = {
			...project,
			taskListOrder: [...(project.taskListOrder as string[]), taskListId],
			taskLists: {
				...project.taskLists,
				[newTaskList.taskListId]: newTaskList,
			},
		};
		dispatch(updateProjectInState(updatedProject));
		dispatch(createTaskList({ projectId: projectId!, taskListId }));
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="all-columns" direction="horizontal" type="taskList">
				{(provided) => (
					<Box {...provided.droppableProps} ref={provided.innerRef}>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'flex-start',
								alignItems: 'center',
								margin: '.5rem 1.5rem',
								gap: '.5rem',
							}}
						>
							<ButtonMenu
								variant="button"
								btnText="Filter"
								icon={<FilterList />}
								menuItems={[
									{ text: 'Incomplete tasks', icon: <CheckCircle /> },
									{ text: 'Completed tasks', icon: <DoNotDisturb /> },
									{ text: 'Just my tasks', icon: <DoNotDisturb /> },
									{ text: 'Due this week', icon: <DoNotDisturb /> },
								]}
							/>
							<ButtonMenu
								variant="button"
								btnText="Sort"
								icon={<Sort />}
								menuItems={[
									{ text: 'Start Date', icon: <CheckCircle /> },
									{ text: 'Due Date', icon: <DoNotDisturb /> },
								]}
							/>
						</Box>

						<Stack
							direction="row"
							sx={{
								backgroundColor: 'var(--medium--background-50)',
								padding: '1rem 0 0 1rem',
								borderTop: '1px solid var(--border-50)',
								overflowX: 'scroll',
							}}
						>
							{taskListOrder &&
								taskListOrder.map((taskListId, index) => {
									const taskList = taskLists![taskListId];
									return (
										<TaskList
											key={taskList.taskListId}
											taskList={taskList}
											index={index}
										/>
									);
								})}
							{provided.placeholder}
							<Button
								sx={{
									height: 'fit-content',
									minWidth: 'fit-content',
								}}
								variant="text"
								onClick={addTaskListBtnClickHandler}
								startIcon={<Add fontSize="small" />}
							>
								Add List
							</Button>
						</Stack>
					</Box>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default ProjectBoard;
