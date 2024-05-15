import React, { useCallback, useState } from 'react';
import { IconButton, Stack, TextareaAutosize } from '@mui/material';
import MyAvatar from '../MyAvatar/MyAvatar';
import { Add } from '@mui/icons-material';
import { useAppDispatch } from '../../store/hooks';
import { useProject } from '../../store/selectors/projectSelector';
import { debounce } from 'lodash';
import { updateProject } from '../../store/slices/projectSlice';

const ProjectOverview = () => {
	const dispatch = useAppDispatch();
	const project = useProject();
	const { description, creator, users, projectId } = project!;
	const [des, setDes] = useState(description);

	const debouncedDispatch = useCallback(
		debounce((projectId, descripiton) => {
			dispatch(
				updateProject({
					projectId,
					data: { description: descripiton },
				})
			);
		}, 500),
		[]
	);

	const desChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setDes(e.target.value);
		debouncedDispatch(projectId, e.target.value);
	};

	return (
		<Stack width="100%" alignItems="center" pt={8}>
			<Stack width="80%" spacing={4}>
				<Stack direction="row" alignItems="center" spacing={2}>
					{creator ? <MyAvatar {...creator} /> : null}
					<h4>This project is created by {creator?.name}</h4>
				</Stack>
				<Stack>
					<h3>Description</h3>
					<TextareaAutosize
						style={{
							margin: '1rem',
						}}
						minRows={5}
						value={des}
						onChange={desChangeHandler}
					/>
				</Stack>
				<Stack spacing={2}>
					<h3>Members</h3>
					<Stack direction="row" spacing={2}>
						{users &&
							users.length > 0 &&
							users.map((user) => (
								<Stack
									key={`member-${user.userId}`}
									direction="row"
									alignItems="center"
									spacing={2}
									sx={{
										width: '15rem',
										border: '1px solid var(--border)',
										borderRadius: '.5rem',
										padding: '.5rem',
										overflow: 'hidden',
									}}
								>
									<MyAvatar {...user} />
									<Stack>
										<h5>{user.name}</h5>
										<h5>{user.email}</h5>
									</Stack>
								</Stack>
							))}
						{!users || users.length === 0 ? (
							<Stack>
								<h4>No members yet</h4>
							</Stack>
						) : null}
						<Stack
							direction="row"
							alignItems="center"
							spacing={2}
							sx={{
								width: '15rem',
								border: '1px solid var(--border)',
								borderRadius: '.5rem',
								padding: '.5rem',
								overflow: 'hidden',
							}}
						>
							<IconButton
								sx={{
									border: '1px solid var(--border)',
								}}
							>
								<Add />
							</IconButton>
							<h4>Invite more people</h4>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default ProjectOverview;
