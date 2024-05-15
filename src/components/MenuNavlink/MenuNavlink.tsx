import React from 'react';
import { NavLink } from 'react-router-dom';
import { ListItemIcon, ListItemText, MenuItem, MenuList, Link } from '@mui/material';

interface MenuNavlinkProps {
	links?: {
		name: string;
		icon: React.ReactNode;
		path: string;
	}[];
}

const MenuNavlink: React.FC<MenuNavlinkProps> = (props) => {
	const { links } = props;
	return (
		<MenuList>
			{links &&
				links.map((link, index) => (
					<Link key={`${index}`} underline="none" component={NavLink} to={link.path}>
						<MenuItem>
							<ListItemIcon>{link.icon}</ListItemIcon>
							<ListItemText sx={{ color: 'var(--text)' }}>{link.name}</ListItemText>
						</MenuItem>
					</Link>
				))}
		</MenuList>
	);
};

export default MenuNavlink;
