import React, { useState } from 'react';
import { Stack, Checkbox, Box, Portal, Card, CardMedia, Tooltip, Button } from '@mui/material';
import classes from './TaskTicket.module.scss';
import { ClickAwayListener } from '@mui/base';
import {
	CheckCircleOutlineOutlined,
	CheckCircle,
	PermIdentityOutlined,
	CalendarTodayOutlined,
	MoreHoriz,
	Delete,
} from '@mui/icons-material';
import TaskDetail from '../TaskDetail/TaskDetail';
import ButtonMenu from '../ButtonMenu/ButtonMenu';
import MyAvatar from '../MyAvatar/MyAvatar';
import { Draggable } from '@hello-pangea/dnd';
import dayjs from 'dayjs';
import { ITask } from '../../models/Index.ts';
import { useAppDispatch } from '../../store/hooks.ts';
import { Slide } from 'react-awesome-reveal';
import { useProject } from '../../store/selectors/projectSelector.ts';
import { updateProjectInState } from '../../store/slices/projectSlice.ts';

interface TaskTicketProps extends ITask {
	index: number;
	taskListId: string;
}

const TaskTicket: React.FC<TaskTicketProps> = (props) => {
	const dispatch = useAppDispatch();
	const { name, assignee, dueDate, isCompleted, coverImgURL, tags, index, taskId, taskListId } =
		props;
	const [isHover, setIsHover] = useState(false);
	const panalContainer = React.useRef(null);
	const [isPanalOpen, SetIsPanalOpen] = useState(false);
	const project = useProject()!;

	const handleHover = () => {
		setIsHover(true);
	};
	const handleLeave = () => {
		setIsHover(false);
	};
	const clickHandler = () => {
		SetIsPanalOpen(true);
	};
	const handleClickAway = () => {
		SetIsPanalOpen(false);
	};

	const deleteTaskHandler = () => {
		const newTasks = Object.keys(project.tasks!)
			.filter((key) => key !== taskId)
			.reduce((result, key) => {
				result[key] = project.tasks![key];
				return result;
			}, {} as { [key: string]: ITask });

		const updatedProject = {
			...project,
			taskLists: {
				...project.taskLists,
				[taskListId]: {
					...project.taskLists![taskListId],
					taskIds: project.taskLists![taskListId].taskIds?.filter((id) => id !== taskId),
				},
			},
			tasks: newTasks,
		};
		dispatch(updateProjectInState(updatedProject));
	};

	return (
		<>
			<Draggable draggableId={taskId} index={index}>
				{(provided, snapshot) => (
					<ClickAwayListener onClickAway={handleClickAway}>
						<Card
							elevation={snapshot.isDragging ? 8 : 1}
							sx={{
								borderRadius: '.6rem',
								marginBottom: '.6rem',
								backgroundColor: `${
									isPanalOpen
										? 'rgba(0, 80, 161, .3)'
										: 'var(--medium--background)'
								}`,
								border: `${
									isPanalOpen
										? 'solid 1px var(--endeavour)'
										: 'solid 0.1rem var(--border-50)'
								}`,
								'&:hover': {
									cursor: 'pointer',
								},
								transitions: 'all .3s ease-in-out',
							}}
							onMouseOver={handleHover}
							onMouseLeave={handleLeave}
							onClick={clickHandler}
							{...provided.draggableProps}
							{...provided.dragHandleProps}
							ref={provided.innerRef}
						>
							{coverImgURL ? (
								<CardMedia
									sx={{ height: 100 }}
									image={coverImgURL}
									title={props.name}
								/>
							) : null}
							<Box
								sx={{
									padding: '.6rem',
								}}
							>
								<Stack
									className={classes['taskticket__main']}
									direction="row"
									alignItems="center"
									justifyContent="space-between"
								>
									<Stack direction="row" alignItems="center">
										<Checkbox
											size="small"
											icon={<CheckCircleOutlineOutlined />}
											checkedIcon={<CheckCircle />}
											checked={isCompleted}
										/>
										<h5>{name}</h5>
									</Stack>
									<Box
										sx={{
											opacity: isHover ? 1 : 0,
											border: 'solid 1px var(--border-50)',
											borderRadius: '0.3rem',
											backgroundColor: 'var(--shrouded--hover)',
										}}
									>
										<ButtonMenu
											variant="icon"
											icon={<MoreHoriz />}
											menuItems={[
												{
													icon: <Delete fontSize="small" color="error" />,
													text: 'Delete task',
													cb: deleteTaskHandler,
												},
											]}
										/>
									</Box>
								</Stack>
								<Stack
									direction="row"
									spacing={1}
									sx={{
										marginBottom: '.5rem',
									}}
								>
									{tags
										? Object.values(tags).map((tag) => (
												<Button
													key={tag.tagId}
													variant="contained"
													sx={{
														backgroundColor: tag.color,
														fontSize: '0.6rem',
														padding: '0 .5rem',
														borderRadius: '.5rem',
														boxShadow: 'none',
													}}
												>
													{tag.name}
												</Button>
										  ))
										: null}
								</Stack>
								<Stack direction="row" spacing={1} alignItems="center">
									{assignee ? (
										<MyAvatar {...assignee} />
									) : (
										<Tooltip title="no assignee" arrow>
											<Box
												sx={{
													border: 'dashed 1px var(--border)',
													borderRadius: '50%',
													width: '2rem',
													height: '2rem',
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													color: 'var(--text-50)',
												}}
											>
												<PermIdentityOutlined />
											</Box>
										</Tooltip>
									)}
									{dueDate ? (
										<Tooltip title="due date" arrow>
											<Box
												sx={{
													fontSize: '.8rem',
												}}
											>
												{dayjs(dueDate).format('MMM D')}
											</Box>
										</Tooltip>
									) : (
										<Tooltip title="no due day" arrow>
											<Box
												sx={{
													border: 'dashed 1px var(--border)',
													borderRadius: '50%',
													width: '2rem',
													height: '2rem',
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													color: 'var(--text-50)',
												}}
											>
												<CalendarTodayOutlined />
											</Box>
										</Tooltip>
									)}
								</Stack>
							</Box>
							{isPanalOpen ? (
								<Portal container={panalContainer.current}>
									<Slide direction="right" duration={200}>
										<TaskDetail
											key={taskId}
											{...props}
											onDeleteTask={deleteTaskHandler}
										/>
									</Slide>
								</Portal>
							) : null}
						</Card>
					</ClickAwayListener>
				)}
			</Draggable>
			<Box
				ref={panalContainer}
				sx={{
					position: 'absolute',
					top: '14.2rem',
					right: '0',
					width: '30%',
					minWidth: '25rem',
					zIndex: '100',
				}}
			/>
		</>
	);
};

export default TaskTicket;
