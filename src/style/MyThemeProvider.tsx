import React, { ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
const myTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#f8df72', // yellow
			dark: '#f1bd6c', // yellow orange
		},
		secondary: {
			main: '#0050a1',
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				text: {
					color: '#d9d9d999',
					'&:hover': {
						color: '#d9d9d9',
					},
				},
			},
		},
		MuiIconButton: {
			styleOverrides: {
				root: {
					color: '#d9d9d999',
					borderRadius: '.5rem',
					'&:hover': {
						color: '#d9d9d9',
					},
				},
			},
		},
		MuiCheckbox: {
			styleOverrides: {
				root: {
					borderRadius: '.5rem',
				},
			},
		},
		MuiInput: {
			styleOverrides: {
				root: {
					fontSize: '1.1rem',
					cursor: 'pointer',
					input: {
						borderRadius: '0.5rem',
						padding: '.3rem .5rem',
						'&:hover': {
							cursor: 'pointer',
						},
						'&:focus': {
							border: '1px solid var(--yellow)',
						},
					},
				},
			},
			defaultProps: {
				disableUnderline: true,
			},
		},
	},
});

const MyThemeProvider: React.FC<{ children: ReactNode }> = (props) => {
	return (
		<ThemeProvider theme={myTheme}>
			<CssBaseline />
			{props.children}
		</ThemeProvider>
	);
};

export default MyThemeProvider;
