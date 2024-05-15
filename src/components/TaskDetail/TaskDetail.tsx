import React, { useState } from 'react';
import { removeUndefined } from '../../utilities/utilities.ts';
import { Delete, CheckCircle, PanoramaFishEye, PersonOutline, Add } from '@mui/icons-material';
import {
	Autocomplete,
	Box,
	Button,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	ListItem,
	Stack,
	TextField,
	TextareaAutosize,
	ToggleButton,
	Tooltip,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import MyAvatar from '../MyAvatar/MyAvatar';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ITask } from '../../models/Index.ts';
import { useAppDispatch } from '../../store/hooks.ts';
import dayjs from 'dayjs';
import { Color, colors } from '../../style/Color.ts';
import { useProject } from '../../store/selectors/projectSelector.ts';
import {
	createTag,
	updateProjectInState,
	updateTaskDetail,
} from '../../store/slices/projectSlice.ts';

interface TaskDetailProps extends ITask {
	onDeleteTask: () => void;
}
const TaskDetail: React.FC<TaskDetailProps> = (props) => {
	const {
		createdDate,
		creator,
		assignee,
		dueDate,
		description,
		tags,
		isCompleted,
		coverImgURL,
		name,
		taskId,
		onDeleteTask,
	} = props;
	const dispatch = useAppDispatch();
	const project = useProject();
	const { users, allTags } = project;

	const [isDialogOpen, setIsDialogOpen] = React.useState(false);
	const handleDialogOpen = () => setIsDialogOpen(true);
	const handleDialogClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
		if (reason !== 'backdropClick') {
			setIsDialogOpen(false);
		}
	};

	const { handleSubmit, control } = useForm<ITask>({
		defaultValues: {
			assignee,
			description,
			tags,
			creator,
			createdDate,
			dueDate,
			isCompleted,
			coverImgURL,
			name,
			taskId,
		},
	});

	const [displayAssignee, setDisplayAssignee] = React.useState(assignee);
	const [tagColor, setTagColor] = useState('WHITE');
	const [tagName, setTagName] = useState('');
	const handleSelectTagColor = (e: any) => {
		setTagColor(e.target.value);
	};
	const tagNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTagName(e.target.value);
	};
	const createTagHandler = () => {
		const tagId = uuidv4();
		const currentAllTags = [...project.allTags!];
		currentAllTags.push({
			tagId,
			name: tagName,
			color: Color[tagColor as keyof typeof Color],
		});
		const updatedProject = {
			...project,
			allTags: currentAllTags,
		};
		dispatch(updateProjectInState(updatedProject));
		dispatch(
			createTag({
				tagId,
				name: tagName,
				color: Color[tagColor as keyof typeof Color],
				projectId: project.projectId!,
			})
		);
		setIsDialogOpen(false);
	};

	const onSubmit: SubmitHandler<ITask> = (data) => {
		data = removeUndefined(data);
		const updatedProject = {
			...project,
			tasks: {
				...project.tasks,
				[data.taskId]: data,
			},
		};
		dispatch(updateProjectInState(updatedProject));
		dispatch(updateTaskDetail(data));
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack
				direction="column"
				sx={{
					width: '100%',
					height: 'calc(100vh - 14.2rem)',
					border: '1px solid var(--border-50)',
					padding: '1rem',
					gap: '1rem',
					overflowY: 'auto',
					backgroundColor: 'var(--black)',
				}}
			>
				<Stack direction="row" marginBottom="1rem" justifyContent="space-between">
					<Controller
						name="isCompleted"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Button
								onClick={() => {
									onChange(!value);
									handleSubmit(onSubmit)();
								}}
								variant="outlined"
								startIcon={value ? <CheckCircle /> : <PanoramaFishEye />}
							>
								{value ? 'Completed' : 'Mark complete'}
							</Button>
						)}
					/>
					<Button
						sx={{
							width: '6rem',
						}}
						variant="contained"
						color="error"
						startIcon={<Delete />}
						onClick={onDeleteTask}
					>
						Delete
					</Button>
				</Stack>

				<Stack direction="column" spacing={3}>
					<Stack direction="row" alignItems="center" justifyContent="space-between">
						<h5>Task name</h5>
						<Controller
							name="name"
							control={control}
							render={({ field }) => (
								<TextField
									sx={{
										width: '80%',
									}}
									{...field}
									size="small"
									onBlur={handleSubmit(onSubmit)}
								/>
							)}
						/>
					</Stack>
					<Stack direction="row" alignItems="center" spacing={3}>
						<h5>Created by</h5>
						<Box
							sx={{
								paddingLeft: '1.5rem',
							}}
						>
							<MyAvatar {...creator} />
						</Box>
						<h5>{dayjs(createdDate).format('MM/DD/YYYY')}</h5>
					</Stack>
					<Stack direction="row" alignItems="center" justifyContent="space-between">
						<h5>Tags</h5>
						<Tooltip title="Create new tag" arrow>
							<IconButton
								size="small"
								sx={{
									marginLeft: '3.8rem',
								}}
								onClick={handleDialogOpen}
							>
								<Add fontSize="small" />
							</IconButton>
						</Tooltip>
						<Dialog
							disableEscapeKeyDown
							open={isDialogOpen}
							onClose={handleDialogClose}
						>
							<DialogTitle>Add a new tag</DialogTitle>
							<DialogContent>
								<Stack gap=".5rem">
									<h4>Tag Name</h4>
									<TextField
										size="small"
										onChange={tagNameHandler}
										value={tagName}
									/>
									<h4>Tag Color</h4>
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
													value={key}
													selected={tagColor === key}
													onChange={handleSelectTagColor}
												/>
											</Tooltip>
										))}
									</Box>
								</Stack>
							</DialogContent>
							<DialogActions>
								<Button variant="outlined" onClick={handleDialogClose}>
									Cancel
								</Button>
								<Button variant="contained" onClick={createTagHandler}>
									Add
								</Button>
							</DialogActions>
						</Dialog>

						<Controller
							name="tags"
							control={control}
							render={({ field: { onChange } }) => (
								<Autocomplete
									multiple
									sx={{
										width: '72%',
									}}
									onChange={(event, newValue) => {
										onChange(newValue);
									}}
									onBlur={handleSubmit(onSubmit)}
									filterSelectedOptions
									selectOnFocus
									blurOnSelect
									handleHomeEndKeys
									options={allTags!}
									isOptionEqualToValue={(option, value) =>
										option.name === value.name
									}
									getOptionLabel={(option) => option.name}
									value={tags ? tags : []}
									renderTags={(value, getTagProps) => {
										return value.map((option, index) => (
											<Box key={index}>
												<Chip
													label={option.name}
													{...getTagProps({ index })}
													sx={{
														backgroundColor: option.color,
														color: 'var(--black)',
														fontSize: '0.6rem',
														padding: '.2rem 0 .2rem 0',
														borderRadius: '.5rem',
														boxShadow: 'none',
														height: '1.2rem',
														textAlign: 'center',
														position: 'relative',
														'& .MuiChip-deleteIconFilledColorDefault': {
															color: 'var(--coral)',
															position: 'absolute',
															right: '-.8rem',
															top: '-.7rem',
															fontSize: '1.1rem',
															'&:hover': {
																color: 'var(--bright--coral)',
															},
														},
													}}
												/>
											</Box>
										));
									}}
									renderOption={(props, option) => {
										const { name, color } = option;
										return (
											<ListItem {...props}>
												<Box
													sx={{
														display: 'flex',
														alignItems: 'center',
														backgroundColor: color,
														fontSize: '0.6rem',
														padding: '0 .5rem',
														borderRadius: '.5rem',
														boxShadow: 'none',
														height: '1.2rem',
														color: 'var(--black)',
														textAlign: 'center',
													}}
												>
													{name}
												</Box>
											</ListItem>
										);
									}}
									renderInput={(params) => (
										<TextField
											{...params}
											size="small"
											variant="outlined"
											placeholder="add tags"
										/>
									)}
								/>
							)}
						/>
					</Stack>

					<Stack direction="row" alignItems="center" justifyContent="space-between">
						<h5>Assignee</h5>
						<Controller
							name="assignee"
							control={control}
							render={({ field: { onChange } }) => (
								<Autocomplete
									sx={{
										width: '80%',
									}}
									onChange={(event, newValue) => {
										if (newValue) {
											onChange(newValue);
											setDisplayAssignee(newValue);
										}
									}}
									onBlur={handleSubmit(onSubmit)}
									value={assignee}
									filterSelectedOptions
									selectOnFocus
									blurOnSelect
									options={users!}
									getOptionLabel={(option) => `${option.name} ${option.email}`}
									isOptionEqualToValue={(option, value) => {
										if (value === undefined) {
											return true;
										} else {
											return option.name === value.name;
										}
									}}
									renderOption={(props, option) => {
										const { name, email } = option;
										return (
											<ListItem
												sx={{
													display: 'flex',
													alignItems: 'center',
													gap: '1rem',
												}}
												{...props}
											>
												<MyAvatar {...option} />
												<Box>{name}</Box>
												<Box>{email}</Box>
											</ListItem>
										);
									}}
									renderInput={(params) => (
										<Box
											sx={{
												position: 'relative',
											}}
										>
											<Box
												sx={{
													position: 'absolute',
													top: '12px',
													left: '12px',
												}}
											>
												{displayAssignee && (
													<MyAvatar {...displayAssignee} />
												)}
												{!displayAssignee && (
													<Stack
														alignItems="center"
														justifyContent="center"
														sx={{
															width: '2rem',
															height: '2rem',
															border: '1px dashed var(--border)',
															borderRadius: '1rem',
														}}
													>
														<PersonOutline />
													</Stack>
												)}
											</Box>
											<TextField
												{...params}
												sx={{
													'.MuiOutlinedInput-root .MuiAutocomplete-input':
														{
															paddingLeft: '3rem',
														},
												}}
												placeholder={
													displayAssignee
														? `${displayAssignee?.name}   ${displayAssignee?.email}`
														: 'please select an assignee'
												}
											/>
										</Box>
									)}
								/>
							)}
						/>
					</Stack>

					<Stack direction="row" alignItems="center" justifyContent="space-between">
						<h5>Due date</h5>
						<Controller
							name="dueDate"
							control={control}
							render={({ field: { onChange } }) => (
								<DatePicker
									sx={{
										width: '80%',
									}}
									onChange={(date) => {
										if (!date) return;
										onChange(date.toDate().toISOString());
									}}
									value={dueDate ? dayjs(dueDate) : undefined}
									onClose={handleSubmit(onSubmit)}
								/>
							)}
						/>
					</Stack>
					<Stack direction="row" alignItems="center" spacing={3}>
						<h5>Cover image</h5>
						<input type="file" />
					</Stack>
					<Stack direction="column" spacing={1}>
						<h5>Description</h5>
						<Controller
							name="description"
							control={control}
							render={({ field: { onChange } }) => (
								<TextareaAutosize
									minRows={5}
									defaultValue={description}
									onChange={(e) => onChange(e.target.value)}
									onBlur={handleSubmit(onSubmit)}
								/>
							)}
						/>
					</Stack>
				</Stack>
			</Stack>
		</form>
	);
};

export default TaskDetail;
