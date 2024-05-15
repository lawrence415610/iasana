import { useAppSelector } from '../hooks';

export const useProject = () => {
	return useAppSelector((state) => {
		return state.project;
	});
};

export const useTasks = () =>
	useAppSelector((state) => {
		return state.project.tasks;
	});
