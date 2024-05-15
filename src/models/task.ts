import { ITag } from './Tag.ts';
import { IUser } from './User.ts';

export interface ITask {
	readonly taskId: string;
	name: string;
	isCompleted: boolean;
	readonly createdDate?: Date;
	readonly creator: IUser;
	dueDate?: string;
	description?: string;
	coverImgURL?: string;
	tags?: ITag[];
	assignee?: IUser;
}
