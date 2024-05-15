import type { Preview } from '@storybook/react';
import '../src/index.scss';

/* TODO: update import for your custom Material UI themes */
// import { lightTheme, darkTheme } from '../path/to/themes';
import { CssBaseline } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},

	decorators: [
		// Adds global styles and theme switching support.
		withThemeFromJSXProvider({
			GlobalStyles: CssBaseline,
			// Uncomment for theme switching
			// Provider: ThemeProvider,
			// themes: {
			// Provide your custom themes here
			//   light: lightTheme,
			//   dark: darkTheme,
			// },
			// defaultTheme: 'light',
		}),
	],
};

export default preview;
