import React, { useState } from 'react';
import { Button, Stack, Checkbox, Box } from '@mui/material';
import {
	ExpandMoreOutlined,
	Edit,
	Delete,
	StarBorder,
	Star,
	ViewKanban,
} from '@mui/icons-material';
import ButtonMenu from '../ButtonMenu/ButtonMenu.tsx';
import MyAvatar from '../MyAvatar/MyAvatar.tsx';
import { useAppDispatch } from '../../store/hooks.ts';
import { useProject } from '../../store/selectors/projectSelector.ts';
import { deleteProject, updateProject } from '../../store/slices/projectSlice.ts';
import { useNavigate } from 'react-router-dom';

const ProjectInfo = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const project = useProject();
	const { color, users, isStar, name, projectId } = project!;
	const [isStarred, setIsStarred] = useState(isStar);

	const starHandler = () => {
		setIsStarred(!isStarred);
		dispatch(
			updateProject({
				projectId: projectId!,
				data: { isStar: !isStarred },
			})
		);
	};

	const deleteHandler = () => {
		dispatch(deleteProject(projectId!));
		navigate('/');
	};

	return (
		<>
			<Stack direction="row" alignItems="center">
				<Box
					sx={{
						bgcolor: color,
						borderRadius: '1rem',
						width: '3.5rem',
						height: '3.5rem',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<ViewKanban fontSize="large" />
				</Box>
				<h3 style={{ marginLeft: '1.5rem' }}>{name}</h3>
				<ButtonMenu
					variant="icon"
					icon={<ExpandMoreOutlined />}
					menuItems={[
						{
							icon: <Edit fontSize="small" />,
							text: 'Rename project',
						},
						{
							icon: <Delete fontSize="small" color="error" />,
							text: 'Delete project',
							cb: deleteHandler,
						},
					]}
				/>
				<Checkbox
					checked={isStarred}
					onChange={starHandler}
					size="medium"
					icon={<StarBorder />}
					checkedIcon={<Star />}
				/>
			</Stack>
			<Stack direction="row" alignItems="center" spacing={3}>
				<Stack direction="row">
					{users &&
						users.length > 0 &&
						users.map((user) => {
							return (
								<Box
									key={`user-${user.userId}`}
									sx={{
										marginRight: '-1.3rem',
									}}
								>
									<MyAvatar
										userId={user.userId}
										name={user.name}
										avatar={user.avatar}
										email={user.email}
									/>
								</Box>
							);
						})}
				</Stack>
				<Button variant="outlined">invite</Button>
			</Stack>
		</>
	);
};

export default ProjectInfo;
