import React from 'react';
import { AppBar, Grid, IconButton, Stack } from '@mui/material';
import { Button } from '@mui/material';
import MySearchbar from '../components/MySearchbar/MySearchbar';
import MyAvatar from '../components/MyAvatar/MyAvatar';
import ButtonMenu from '../components/ButtonMenu/ButtonMenu';
import { MenuRounded, FormatListBulleted, AddCircle } from '@mui/icons-material';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../store/selectors/userSelector';

interface TopNavigationBarProps {
	onToggleDrawer: () => void;
}

const TopNavigationBar: React.FC<TopNavigationBarProps> = (props) => {
	const { onToggleDrawer } = props;
	//TODO: How can I cache this user? If I refresh the project page, the user will go back to the default state
	const user = useUser();
	const navigate = useNavigate();
	const handleCreateProject = () => {
		navigate('/projects/new');
	};
	return (
		<AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
			<Toaster />
			<Grid
				container
				bgcolor="var(--topbar--background)"
				height="50px"
				borderBottom=".1rem solid var(--border)"
			>
				<Grid item md={3}>
					<Stack
						direction="row"
						spacing={2}
						sx={{
							display: 'flex',
							alignItems: 'center',
							height: '50px',
							paddingLeft: '1rem',
						}}
					>
						<IconButton onClick={onToggleDrawer}>
							<MenuRounded />
						</IconButton>
						<ButtonMenu
							variant="button"
							btnVariant="outlined"
							icon={<AddCircle fontSize="large" />}
							btnText="CREATE"
							sxBtn={{
								borderRadius: '2rem',
								p: '.2rem .6rem .2rem .5rem',
							}}
							menuItems={[
								{
									text: 'Create project',
									icon: <AddCircle />,
									cb: handleCreateProject,
								},
								{ text: 'Create task', icon: <FormatListBulleted /> },
							]}
						/>
					</Stack>
				</Grid>
				<Grid
					item
					md={6}
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<MySearchbar />
				</Grid>
				<Grid item md={3}>
					<Stack
						direction="row"
						spacing={2}
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-end',
							paddingRight: '1rem',
							height: '50px',
						}}
					>
						{user && <MyAvatar {...user} />}
						<Button
							variant="contained"
							sx={{
								width: '6rem',
								height: '2rem',
							}}
						>
							logout
						</Button>
					</Stack>
				</Grid>
			</Grid>
		</AppBar>
	);
};

export default TopNavigationBar;
