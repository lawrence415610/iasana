import { ITaskList } from './TaskList.ts';
import { IUser } from './User.ts';
import { Color } from '../style/Color.ts';
import { ITag } from './Tag.ts';
import { ITask } from './Task.ts';

export interface IProject {
	readonly projectId?: string;
	name?: string;
	description?: string;
	color?: string;
	createdDate?: Date;
	isStar?: boolean;
	readonly creator?: IUser;
	users?: IUser[];
	allTags?: ITag[];
	taskListOrder?: string[];
	taskLists?: { [key: string]: ITaskList };
	tasks?: { [key: string]: ITask };
}

export const project1 = {
	name: 'Pam Schowalter 1',
	users: [
		{
			userId: 'sampleUserId',
			name: 'Lawrence Liu',
			email: 'lawrenceliu@gmail.com',
		},
	],
	color: '#bce54f',
	isStar: false,
	description: 'description 1',
	creator: {
		userId: 'sampleUserId',
		name: 'Lawrence Liu',
		email: 'lawrenceliu@gmail.com',
	},
	createdDate: undefined,
	allTags: [
		{
			tagId: 'sampleTagId',
			name: 'Sample Tag',
			color: Color.AQUA,
		},
	],
	projectId: '1',
	taskListOrder: ['sampleTaskListId'],
	tasks: {
		sampleTaskId: {
			taskId: 'sampleTaskId',
			name: 'New Task',
			creator: {
				userId: 'sampleUserId',
				name: 'Lawrence Liu',
				email: 'lawrenceliu@gmail.com',
			},
			isCompleted: false,
		},
	},
	taskLists: {
		sampleTaskListId: {
			taskListId: 'sampleTaskListId',
			name: 'New Task List',
			taskIds: ['sampleTaskId'],
		},
	},
};
