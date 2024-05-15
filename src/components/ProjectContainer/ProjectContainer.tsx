import { ViewKanban } from '@mui/icons-material';
import { Box, Card, CardContent, Grid, Stack } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { IProject } from '../../models/Project';

interface ProjectContainerProps {
	projects: IProject[];
	title: string;
}

const ProjectContainer: React.FC<ProjectContainerProps> = (props) => {
	const { projects, title } = props;
	return (
		<Grid item md={6}>
			<h3
				style={{
					marginBottom: '1rem',
				}}
			>
				{title}
			</h3>
			<Card
				variant="outlined"
				sx={{
					height: '40vh',
					overflow: 'auto',
				}}
			>
				<CardContent>
					<Grid container spacing={4}>
						{projects.map((project) => (
							<Grid item key={project.projectId}>
								<NavLink to={`/projects/${project.projectId}`}>
									<Stack
										display="flex"
										alignItems="center"
										justifyContent="center"
									>
										<Box
											sx={{
												bgcolor: project.color,
												borderRadius: '1rem',
												width: '3.8rem',
												height: '3.8rem',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												cursor: 'pointer',
												'&:hover': {
													opacity: 0.8,
												},
											}}
										>
											<ViewKanban fontSize="large" />
										</Box>
										<h4>{project.name}</h4>
									</Stack>
								</NavLink>
							</Grid>
						))}
					</Grid>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default ProjectContainer;
