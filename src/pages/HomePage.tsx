import React, { useEffect } from 'react';
import { Button, Grid, Stack } from '@mui/material';
import ProjectContainer from '../components/ProjectContainer/ProjectContainer';
import { IProject } from '../models/Project';
import { useUser } from '../store/selectors/userSelector';
import { useAppDispatch } from '../store/hooks';
import { getUser } from '../store/slices/userSlice';

const HomePage: React.FC = () => {
	const today = new Date().toDateString().toUpperCase();
	const hour = new Date().getHours();
	const greeting = hour < 12 ? 'Good Morning' : 'Good Afternoon';
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getUser('2'));
	}, [dispatch]);

	const user = useUser();
	const projects = user.projects;
	return (
		<Stack
			spacing={12}
			sx={{
				padding: '3rem',
			}}
		>
			<h1>HOME</h1>
			<Stack
				spacing={2}
				sx={{
					textAlign: 'center',
					width: '100%',
				}}
			>
				<h4>{today}</h4>
				<h2>{greeting}, Yelin!</h2>
			</Stack>
			{projects && projects.length > 0 ? (
				<Grid container spacing={4}>
					<ProjectContainer projects={projects} title="Projects" />
					<ProjectContainer
						projects={projects.filter((project: IProject) => project.isStar)}
						title="Starred"
					/>
				</Grid>
			) : (
				<Stack
					spacing={2}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						width: '100%',
					}}
				>
					<h3>No projects yet</h3>
					<Button variant="outlined">Create your first project</Button>
				</Stack>
			)}
		</Stack>
	);
};

export default HomePage;
