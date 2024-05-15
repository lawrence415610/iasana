import axios from 'axios';

const baseUrl = 'http://localhost:3333';
// const baseUrl = 'https://d27a-110-175-248-157.ngrok.io';

export default axios.create({
	baseURL: baseUrl,
});
