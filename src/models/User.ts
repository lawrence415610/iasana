import { IProject, project1 } from './Project';

export interface IUser {
	readonly userId: string;
	name: string;
	email: string;
	password?: string;
	avatar?: string | null;
	projects?: IProject[];
}

export const user1 = {
	userId: 'sampleUserId',
	name: 'Lawrence Liu',
	email: 'sfsdf@yew.com',
	projects: [project1],
};
