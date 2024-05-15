import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import { getUserById } from '../../apis/api.ts';
import { user1 } from '../../models/User.ts';
const initialState = user1;

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		updateUserInState: (state, action) => {
			const updatedUser = action.payload;
			return {
				...state,
				...updatedUser,
			};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUser.pending, (state) => {
				toast.loading('Loading user');
				return {
					...state,
				};
			})
			.addCase(getUser.fulfilled, (state, action) => {
				toast.dismiss();
				toast.success('User loaded');
				const user = action.payload;
				return {
					...state,
					...user,
				};
			})
			.addCase(getUser.rejected, (state, action) => {
				toast.dismiss();
				toast.error('Failed to load user');
				console.log(action.error.message);
				return {
					...state,
				};
			});
	},
});

export const { updateUserInState } = userSlice.actions;

export const getUser = createAsyncThunk('user/getUser', getUserById);

export default userSlice.reducer;
