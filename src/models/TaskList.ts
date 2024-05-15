export interface ITaskList {
	readonly taskListId: string;
	name: string;
	taskIds?: string[];
}

export class TaskList implements ITaskList {
	constructor(
		public readonly taskListId: string,
		public name: string,
		public taskIds?: string[]
	) {}
}
