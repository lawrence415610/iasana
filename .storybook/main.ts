import type { StorybookConfig } from '@storybook/react-webpack5';
const config: StorybookConfig = {
	stories: ['../src/components/**/*.mdx', '../src/components/**/*.stories.@(ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/preset-create-react-app',
		'@storybook/addon-interactions',
		'@storybook/addon-styling',
	],
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
	docs: {
		autodocs: 'tag',
	},
	staticDirs: ['../public'],
};

export default config;
