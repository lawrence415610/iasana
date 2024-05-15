import React from 'react';
import { Box } from '@mui/material';
import { IUser } from '../../models/Index';

// const NameCard: React.FC<IUser> = (props) => {
// 	const { name, email, avatar, userId } = props;
// 	return (
// 		<Card id={`namecard-${userId}`}>
// 			{avatar && (
// 				<CardMedia
// 					component="img"
// 					image={avatar}
// 					alt={name}
// 					sx={{
// 						width: '100%',
// 						height: 'auto',
// 					}}
// 				/>
// 			)}
// 			<CardContent>
// 				<h3>{name}</h3>
// 				<p>{email}</p>
// 			</CardContent>
// 		</Card>
// 	);
// };

const MyAvatar: React.FC<IUser> = (props) => {
	// const { name, avatar, userId } = props;
	const { avatar, name } = props;
	return (
		// <Tooltip title={<NameCard {...props} />} arrow>
		// 	<Avatar
		// 		id={`avatar-${userId.toString()}`}
		// 		alt={name}
		// 		src={avatar}
		// 		sx={{
		// 			width: '2rem',
		// 			height: '2rem',
		// 			border: '0.1rem solid var(--border-50)',
		// 			cursor: 'pointer',
		// 			'&:hover': {
		// 				border: '0.1rem solid var(--border)',
		// 				zIndex: 9999,
		// 			},
		// 		}}
		// 	>
		// 		{`${name && name.split(' ')[0][0]}${name && name.split(' ')[1][0]}`}
		// 	</Avatar>
		// </Tooltip>
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{avatar && (
				<img
					style={{
						height: '1.6rem',
						width: '1.6rem',
						borderRadius: '50%',
					}}
					src={avatar}
				/>
			)}
			{!avatar && (
				<Box
					sx={{
						border: '0.1rem solid white',
						height: '1.7rem',
						width: '1.7rem',
						textAlign: 'center',
						borderRadius: '50%',
					}}
				>{`${name && name.split(' ')[0][0]}${name && name.split(' ')[1][0]}`}</Box>
			)}
		</Box>
	);
};

export default MyAvatar;
