import React from 'react';
import { Box, Divider, Drawer, Paper } from '@mui/material';
import MenuNavlink from '../components/MenuNavlink/MenuNavlink';
import MyAccordion from '../components/MyAccordion/MyAccordion';
import { GroupOutlined, HomeOutlined, TaskAltOutlined } from '@mui/icons-material';
import { IProject } from '../models/Project.ts';
import { useUser } from '../store/selectors/userSelector.ts';
interface LeftDrawerProps {
	open: boolean;
	onToggleDrawer: () => void;
}

const LeftDrawer: React.FC<LeftDrawerProps> = (props) => {
	const user = useUser();
	const projects = user.projects;

	const links =
		projects &&
		projects.length > 0 &&
		projects.map((project: IProject) => ({
			path: `/projects/${project.projectId}`,
			name: project.name!,
			icon: (
				<Box
					sx={{
						width: '1.2rem',
						height: '1.2rem',
						borderRadius: '.3rem',
						backgroundColor: `${project.color}`,
						marginRight: '1rem',
					}}
				/>
			),
		}));

	const starredLinks =
		projects &&
		projects.length > 0 &&
		projects
			.filter((project: IProject) => project.isStar)
			.map((project: IProject) => ({
				path: `/projects/${project.projectId}`,
				name: project.name!,
				icon: (
					<Box
						sx={{
							width: '1.2rem',
							height: '1.2rem',
							borderRadius: '.3rem',
							backgroundColor: `${project.color}`,
							marginRight: '1rem',
						}}
					/>
				),
			}));

	const { open, onToggleDrawer } = props;

	return (
		<Drawer
			sx={{
				'.active span': {
					color: 'var(--yellow)',
					fontWeight: 'bold',
				},
				'.active svg': {
					color: 'var(--yellow)',
				},
			}}
			anchor="left"
			open={open}
			onClose={onToggleDrawer}
			variant="persistent"
		>
			<Paper
				variant="outlined"
				square
				sx={{
					marginTop: '3.2rem',
					width: '15rem',
					height: '100%',
				}}
			>
				<MenuNavlink
					links={[
						{ name: 'Home', icon: <HomeOutlined />, path: '/' },
						{ name: 'My Tasks', icon: <TaskAltOutlined />, path: '/my-tasks' },
						{ name: 'Team', icon: <GroupOutlined />, path: '/team' },
					]}
				/>
				<Divider />
				<MyAccordion title="Starred">
					{starredLinks && <MenuNavlink links={starredLinks} />}
				</MyAccordion>
				<MyAccordion title="Projects">{links && <MenuNavlink links={links} />}</MyAccordion>
			</Paper>
		</Drawer>
	);
};

export default LeftDrawer;
