import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import {
	getProjectById,
	updateProjectById,
	createSingleProject,
	createSingleTaskList,
	deleteProjectById,
	createSingleTask,
	updateTaskListById,
	updateTwoTaskListsById,
	updateTaskDetailsById,
	createSingleTag,
} from '../../apis/api.ts';
import { IProject, project1 } from '../../models/Project.ts';

const initialState: IProject = project1;

const projectSlice = createSlice({
	name: 'project',
	initialState,
	reducers: {
		updateProjectInState: (state, action) => {
			const updatedProject = action.payload;
			return {
				...state,
				...updatedProject,
			};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getProject.pending, (state) => {
				toast.loading('Loading project');
				return {
					...state,
				};
			})
			.addCase(getProject.fulfilled, (state, action) => {
				toast.dismiss();
				toast.success('Project loaded');
				const project = action.payload;
				return {
					...state,
					...project,
				};
			})
			.addCase(getProject.rejected, (state) => {
				toast.dismiss();
				toast.error('Failed to load project');
				return {
					...state,
				};
			})
			.addCase(updateProject.pending, (state) => {
				toast.loading('Updating project');
				return {
					...state,
				};
			})
			.addCase(updateProject.fulfilled, (state, action) => {
				toast.dismiss();
				toast.success('Project updated');
				const updatedField = action.payload;
				return {
					...state,
					...updatedField,
				};
			})
			.addCase(updateProject.rejected, (state) => {
				toast.dismiss();
				toast.error('Failed to update project');
				return {
					...state,
				};
			})
			.addCase(createProject.pending, (state) => {
				toast.loading('Creating project');
				return {
					...state,
				};
			})
			.addCase(createProject.fulfilled, (state, action) => {
				toast.dismiss();
				toast.success('Project created');
				const project = action.payload;
				return {
					...state,
					...project,
				};
			})
			.addCase(createProject.rejected, (state) => {
				toast.dismiss();
				toast.error('Failed to create project');
				return {
					...state,
				};
			})
			.addCase(createTaskList.pending, (state) => {
				toast.loading('Creating task list');
				return {
					...state,
				};
			})
			.addCase(createTaskList.fulfilled, (state, action) => {
				toast.dismiss();
				toast.success('Task list created');
				const project = action.payload;
				return {
					...state,
					...project,
				};
			})
			.addCase(createTaskList.rejected, (state) => {
				toast.dismiss();
				toast.error('Failed to create task list');
				return {
					...state,
				};
			})
			.addCase(createTask.pending, (state) => {
				toast.loading('Creating task');
				return {
					...state,
				};
			})
			.addCase(createTask.fulfilled, (state, action) => {
				toast.dismiss();
				toast.success('Task created');
				const project = action.payload;
				//TODO: allow trigger getProject is a better way
				return {
					...state,
					...project,
				};
			})
			.addCase(createTask.rejected, (state) => {
				toast.dismiss();
				toast.error('Failed to create task');
				return {
					...state,
				};
			})
			.addCase(updateTaskList.pending, (state) => {
				toast.loading('Updating task list');
				return {
					...state,
				};
			})
			.addCase(updateTaskList.fulfilled, (state, action) => {
				toast.dismiss();
				toast.success('Task list updated');
				const taskList = action.payload;
				return {
					...state,
					taskLists: {
						...state.taskLists,
						[taskList.taskListId]: taskList,
					},
				};
			})
			.addCase(updateTaskList.rejected, (state) => {
				toast.dismiss();
				toast.error('Failed to update task list');
				return {
					...state,
				};
			})
			.addCase(updateTwoTaskLists.pending, (state) => {
				toast.loading('Updating task lists');
				return {
					...state,
				};
			})
			.addCase(updateTwoTaskLists.fulfilled, (state, action) => {
				toast.dismiss();
				toast.success('Task lists updated');
				const taskLists = action.payload;
				return {
					...state,
					taskLists: {
						...state.taskLists,
						[taskLists![0].taskListId]: taskLists![0],
						[taskLists![1].taskListId]: taskLists![1],
					},
				};
			})
			.addCase(updateTwoTaskLists.rejected, (state) => {
				toast.dismiss();
				toast.error('Failed to update task lists');
				return {
					...state,
				};
			})
			.addCase(updateTaskDetail.pending, (state) => {
				toast.loading('Updating task detail');
				return {
					...state,
				};
			})
			.addCase(updateTaskDetail.fulfilled, (state, action) => {
				toast.dismiss();
				toast.success('Task detail updated');
				const task = action.payload;
				return {
					...state,
					tasks: {
						...state.tasks,
						[task.taskId]: task,
					},
				};
			})
			.addCase(updateTaskDetail.rejected, (state) => {
				toast.dismiss();
				toast.error('Failed to update task detail');
				return {
					...state,
				};
			})
			.addCase(createTag.pending, (state) => {
				toast.loading('Creating tag');
				return {
					...state,
				};
			})
			.addCase(createTag.fulfilled, (state, action) => {
				toast.dismiss();
				toast.success('Tag created');
				const project = action.payload;
				return {
					...state,
					...project,
				};
			})
			.addCase(createTag.rejected, (state) => {
				toast.dismiss();
				toast.error('Failed to create tag');
				return {
					...state,
				};
			});
	},
});

export const getProject = createAsyncThunk('project/getProject', getProjectById);
export const createProject = createAsyncThunk('project/createProject', createSingleProject);
export const updateProject = createAsyncThunk('project/updateProject', updateProjectById);
export const deleteProject = createAsyncThunk('project/deleteProject', deleteProjectById);

export const createTaskList = createAsyncThunk('project/createTaskList', createSingleTaskList);
export const updateTaskList = createAsyncThunk('project/updateTaskList', updateTaskListById);
export const updateTwoTaskLists = createAsyncThunk(
	'project/updateTwoTaskLists',
	updateTwoTaskListsById
);

export const createTask = createAsyncThunk('project/createTask', createSingleTask);
export const updateTaskDetail = createAsyncThunk('project/updateTaskDetail', updateTaskDetailsById);

export const createTag = createAsyncThunk('project/createTag', createSingleTag);

export const { updateProjectInState } = projectSlice.actions;
export default projectSlice.reducer;
