import { IProject } from '../models/Project';
import { ITask } from '../models/Task';
import { ITaskList } from '../models/TaskList';
import { Color } from '../style/Color';
import backend from './backend';

export const getUserById = async (userId: string) => {
	try {
		const response1 = await backend.get(`/users/${userId}`);
		const response2 = await backend.get(`/users/${userId}/projects`);
		const [data1, data2] = await Promise.all([response1.data, response2.data]);
		return { ...data1, projects: data2 };
	} catch (error) {
		console.log(error);
	}
};

export const getProjectById = async (projectId: string) => {
	try {
		const response = await backend.get(`/projects/${projectId}`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const updateProjectById = async (payload: { projectId: string; data: IProject }) => {
	try {
		//TODO: dispatch two actions finally should get Project
		const response = await backend.patch(`/projects/${payload.projectId}`, payload.data);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const deleteProjectById = async (projectId: string) => {
	try {
		//TODO: need to add logic to kill more tasklists
		const response1 = await backend.delete(`/projects/${projectId}`);
		await backend.get(`/users/${response1.data}`);
	} catch (error) {
		console.log(error);
	}
};

export const createSingleProject = async (project: IProject) => {
	try {
		const response = await backend.post('/projects', project);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const createSingleTaskList = async (payload: { projectId: string; taskListId: string }) => {
	try {
		const response1 = await backend.post('/tasklists', payload);
		console.log(response1);
		const response2 = await backend.get(`/projects/${payload.projectId}`);
		return response2.data;
	} catch (error) {
		console.error(error);
	}
};

export const updateTaskListById = async (payload: {
	taskListId: string;
	data: { name?: string; taskIds?: string[] };
}) => {
	try {
		const response = await backend.patch(`/tasklists/${payload.taskListId}`, payload.data);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const updateTwoTaskListsById = async (payload: {
	taskListIdStart: string;
	taskListIdFinish: string;
	taskIdsStart: string[];
	taskIdsFinish: string[];
}) => {
	try {
		const response1 = await backend.patch(`/tasklists/${payload.taskListIdStart}`, {
			taskIds: payload.taskIdsStart,
		});
		const response2 = await backend.patch(`/tasklists/${payload.taskListIdFinish}`, {
			taskIds: payload.taskIdsFinish,
		});
		const result = await Promise.all([response1.data, response2.data]);
		console.log(result);
		return result as ITaskList[];
	} catch (error) {
		console.error(error);
	}
};

export const createSingleTask = async (payload: {
	taskListId: string;
	creatorId: string;
	projectId: string;
	taskId: string;
}) => {
	try {
		const { projectId, ...createTaskDto } = payload;
		await backend.post('/tasks', createTaskDto);
		const response2 = await backend.get(`/projects/${projectId}`);
		return response2.data;
	} catch (error) {
		console.error(error);
	}
};

export const updateTaskDetailsById = async (data: ITask) => {
	const { taskId, ...taskDetails } = data;
	try {
		const response = await backend.patch(`/tasks/${taskId}/taskdetails`, taskDetails);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const createSingleTag = async (payload: {
	tagId: string;
	projectId: string;
	name: string;
	color: Color;
}) => {
	try {
		await backend.post('/tags', payload);
		const response = await backend.get(`/projects/${payload.projectId}`);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};
