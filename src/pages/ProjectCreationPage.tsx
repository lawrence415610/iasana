import React from 'react';
import {
	Box,
	Button,
	IconButton,
	Stack,
	TextField,
	TextareaAutosize,
	ToggleButton,
	Tooltip,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { colors } from '../style/Color';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { IProject } from '../models/Index.ts';
import { useAppDispatch } from '../store/hooks.ts';
import { useUser } from '../store/selectors/userSelector.ts';
import { createProject } from '../store/slices/projectSlice.ts';
import { v4 as uuidv4 } from 'uuid';

const ProjectCreationPage = () => {
	const user = useUser();

	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({
		defaultValues: {
			projectId: uuidv4(),
			name: '',
			description: '',
			color: '#ffffff',
			isStar: false,
			creatorId: user.userId,
		},
	});

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onCancalHandler = () => {
		navigate('/');
	};

	const onSubmit: SubmitHandler<IProject> = (project) => {
		dispatch(createProject(project)).then(() => {
			navigate('/');
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack justifyContent="center" alignItems="center" marginTop="5rem">
				<Stack gap="1rem" width="80%">
					<Stack alignItems="center" direction="row" justifyContent="space-between">
						<h1>Create a Project</h1>
						<IconButton onClick={onCancalHandler}>
							<Close />
						</IconButton>
					</Stack>
					<h4>Project Name</h4>
					<Controller
						name="name"
						control={control}
						rules={{
							required: true,
						}}
						render={({ field }) => (
							<TextField
								{...field}
								size="small"
								sx={{
									width: '23.5rem',
								}}
							/>
						)}
					/>
					{errors.name?.type === 'required' && (
						<span role="alert" style={{ color: 'red' }}>
							* Project name is required
						</span>
					)}
					<h4>Project Color</h4>
					<Controller
						name="color"
						control={control}
						render={({ field: { value, onChange } }) => (
							<Box
								sx={{
									display: 'flex',
									flexWrap: 'wrap',
									gap: '.5rem',
								}}
							>
								{Object.keys(colors).map((key) => (
									<Tooltip title={key} key={key} arrow>
										<ToggleButton
											sx={{
												width: '1rem',
												height: '1rem',
												borderRadius: '.3rem',
												backgroundColor: colors[key],
												'&.Mui-selected': {
													backgroundColor: colors[key],
													border: '2px solid var(--white)',
												},
											}}
											value={colors[key]}
											selected={value === colors[key]}
											onChange={(e: any) => {
												onChange(e.target.value);
											}}
										/>
									</Tooltip>
								))}
							</Box>
						)}
					/>
					<h4>Project Description</h4>
					<Controller
						name="description"
						control={control}
						render={({ field: { onChange } }) => (
							<TextareaAutosize
								onChange={(e) => onChange(e.target.value)}
								minRows={8}
								style={{
									width: '23.5rem',
									resize: 'none',
									borderRadius: '.5rem',
									padding: '.5rem',
								}}
							/>
						)}
					/>
					<Stack direction="row" gap="1rem">
						<Button variant="outlined" onClick={onCancalHandler}>
							Cancal
						</Button>
						<Button variant="contained" onClick={handleSubmit(onSubmit)}>
							Create
						</Button>
					</Stack>
				</Stack>
			</Stack>
		</form>
	);
};

export default ProjectCreationPage;
