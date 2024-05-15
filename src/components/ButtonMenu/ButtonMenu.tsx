import React, { useState } from 'react';
import {
	Button,
	IconButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	MenuList,
	SxProps,
	Theme,
} from '@mui/material';

interface ButtonMenuProps {
	variant: 'button' | 'icon';
	icon: React.ReactNode;
	btnText?: string;
	menuItems: {
		icon?: React.ReactNode;
		text: string;
		cb?: () => void;
	}[];
	sxBtn?: SxProps<Theme>;
	btnVariant?: 'text' | 'outlined' | 'contained';
}
// TODO: storybook test, pass in arg types
const ButtonMenu: React.FC<ButtonMenuProps> = (props) => {
	const { icon, btnText, menuItems, variant, sxBtn, btnVariant } = props;
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	const btnOrIcon = () => {
		if (variant === 'button') {
			return (
				<Button
					sx={sxBtn}
					variant={btnVariant}
					startIcon={icon}
					size="small"
					onClick={handleClick}
				>
					{btnText}
				</Button>
			);
		} else {
			return <IconButton onClick={handleClick}>{icon}</IconButton>;
		}
	};
	const clickHandler = (cb: () => void) => {
		cb();
		handleClose();
	};
	return (
		<>
			{btnOrIcon()}
			<Menu
				id={`button-menu-${Math.random()}`}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
			>
				<MenuList>
					{menuItems.map((menuItem) => {
						return (
							<MenuItem
								onClick={
									menuItem.cb ? () => clickHandler(menuItem.cb!) : handleClose
								}
								key={`${menuItem.text} ${Math.random()}`}
							>
								<ListItemIcon>{menuItem.icon}</ListItemIcon>
								<ListItemText>{menuItem.text}</ListItemText>
							</MenuItem>
						);
					})}
				</MenuList>
			</Menu>
		</>
	);
};

export default ButtonMenu;
