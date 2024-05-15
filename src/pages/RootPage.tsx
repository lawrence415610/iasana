import React from 'react';
import TopNavigationBar from '../layouts/TopNavigationBar';
import LeftDrawer from '../layouts/LeftDrawer';
import { Stack } from '@mui/material';
import { Outlet } from 'react-router';
import RightContentWrapper from '../layouts/RightContentWrapper';

const RootPage: React.FC = () => {
	const [open, setOpen] = React.useState(true);
	const toggleDrawerHandler = () => {
		setOpen(!open);
	};

	return (
		<>
			<nav>
				<TopNavigationBar onToggleDrawer={toggleDrawerHandler} />
			</nav>
			<main>
				<Stack direction="row">
					<LeftDrawer open={open} onToggleDrawer={toggleDrawerHandler} />
					<RightContentWrapper open={open}>
						<Outlet />
					</RightContentWrapper>
				</Stack>
			</main>
		</>
	);
};

export default RootPage;
