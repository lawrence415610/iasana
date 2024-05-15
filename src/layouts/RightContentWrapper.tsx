import React from 'react';
import { Box } from '@mui/material';

interface RightContentWrapperProps {
	children: React.ReactNode;
	open: boolean;
}

const RightContentWrapper: React.FC<RightContentWrapperProps> = (props) => {
	const { open } = props;
	return (
		<Box
			sx={
				open
					? {
							paddingLeft: '15rem',
							paddingTop: '3.2rem',
							width: '100%',
							transition: 'all .2s',
					  }
					: {
							paddingLeft: '0',
							paddingTop: '3.2rem',
							width: '100%',
							transition: 'all .2s',
					  }
			}
		>
			{props.children}
		</Box>
	);
};

export default RightContentWrapper;
