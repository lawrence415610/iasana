export enum Color {
	WHITE = '#ffffff',
	RED = '#f06a6a',
	VIOLET = '#9747ff',
	INDEGO = '#8d84e8',
	CORAL = '#d1395a',
	MAGENTA = '#f9aaef',
	YELLOW = '#f8df72',
	GREEN = '#5da283',
	TURBO = '#ffe200',
	ENDEAVOUR = '#0050a1',
	BLUE = '#4573d2',
	AQUA = '#9ee7e3',
}

interface ColorMap {
	[key: string]: string;
}

export const colors: ColorMap = Color;

export function getRandomColor() {
	const values = Object.values(Color);
	const randomIndex = Math.floor(Math.random() * values.length);

	return values[randomIndex];
}
