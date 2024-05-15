import { useAppSelector } from '../hooks';

export const useUser = () =>
	useAppSelector((state) => {
		return state.user;
	});
