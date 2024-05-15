import React from 'react';
import { Edit, MoreHoriz, AddOutlined } from '@mui/icons-material';
import ButtonMenu from './ButtonMenu';

export default {
	component: ButtonMenu,
	tags: ['autodocs'],
	argTypes: { onClick: { action: 'clicked' } },
};

export const Icon = {
	args: {
		variant: 'icon',
		icon: <MoreHoriz />,
		menuItems: [
			{
				icon: <Edit />,
				text: 'Rename section',
				cb: () => {
					console.log('clicked');
				},
			},
		],
	},
};

export const ButtonWithIcon = {
	args: {
		variant: 'button',
		icon: <AddOutlined />,
		btnText: 'Add task',
		menuItems: [
			{
				icon: <Edit />,
				text: 'Add task',
				cb: () => {
					console.log('clicked');
				},
			},
		],
	},
	argTypes: { onClick: { action: 'clicked!' } },
};
