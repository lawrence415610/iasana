import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TeamPage from './pages/TeamPage';
import ProjectPage from './pages/ProjectPage';
import RootPage from './pages/RootPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootPage />,
		children: [
			{
				path: '/',
				element: <HomePage />,
			},
			{
				path: '/team',
				element: <TeamPage />,
			},
			{
				path: '/projects/:projectId',
				element: <ProjectPage />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
