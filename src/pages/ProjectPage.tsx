import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import ProjectInfo from '../components/ProjectInfo/ProjectInfo';
import { Box, Tabs, Tab } from '@mui/material';
import ProjectBoard from '../components/ProjectBoard/ProjectBoard';
import { useParams } from 'react-router-dom';
import ProjectOverview from '../components/ProjectOverview/ProjectOverview.tsx';
import ProjectCreationPage from './ProjectCreationPage.tsx';
import { useAppDispatch } from '../store/hooks.ts';
import { getProject } from '../store/slices/projectSlice.ts';
interface TabPanelProps {
	children: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box>
					<h3>{children}</h3>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const ProjectPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const projectId = useParams<{ projectId: string }>().projectId!;
	const isNew = projectId === 'new';
	if (isNew) {
		return <ProjectCreationPage />;
	}

	const [tabValue, setTabValue] = React.useState(0);
	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
	};

	useEffect(() => {
		dispatch(getProject(projectId));
	}, [dispatch, projectId]);

	return (
		<Stack direction="column" justifyContent="flex-start" spacing={2}>
			<Box>
				<Stack
					direction="row"
					justifyContent="space-between"
					padding="1.5rem 1.5rem 0 1.5rem"
				>
					<ProjectInfo />
				</Stack>
				<Stack>
					<Box sx={{ width: '100%' }}>
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
							<Tabs
								value={tabValue}
								onChange={handleTabChange}
								aria-label="basic tabs example"
							>
								<Tab label="Overview" {...a11yProps(0)} />
								<Tab label="Board" {...a11yProps(1)} />
								<Tab label="List" {...a11yProps(2)} />
								<Tab label="Calendar" {...a11yProps(3)} />
							</Tabs>
						</Box>
						<TabPanel value={tabValue} index={0}>
							<ProjectOverview />
						</TabPanel>
						<TabPanel value={tabValue} index={1}>
							<ProjectBoard />
						</TabPanel>
						<TabPanel value={tabValue} index={2}>
							List
						</TabPanel>
						<TabPanel value={tabValue} index={3}>
							Calendar
						</TabPanel>
					</Box>
				</Stack>
			</Box>
		</Stack>
	);
};

export default ProjectPage;
