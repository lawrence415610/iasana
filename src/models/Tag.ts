import { Color } from '../style/Color.ts';
import { ITask } from './Task.ts';
export interface ITag {
	readonly tagId: string;
	name: string;
	color: Color;
	tasks?: ITask[];
}

export class Tag implements ITag {
	constructor(public readonly tagId: string, public name: string, public color: Color) {}
}
