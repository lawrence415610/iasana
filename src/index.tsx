import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import MyThemeProvider from './style/MyThemeProvider';
import { Provider } from 'react-redux';
import store from './store';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<Provider store={store}>
		<MyThemeProvider>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<App />
			</LocalizationProvider>
		</MyThemeProvider>
	</Provider>
);
