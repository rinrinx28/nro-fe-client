import axios from 'axios';

const urlConfig = {
	dev: 'http://localhost:3037',
	vps: 'http://144.126.145.81:3037',
	sv: 'https://api.nrogame.me',
};

const apiClient = axios.create({
	baseURL: urlConfig.sv,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Request Interceptor: Thêm token vào header của mỗi request
apiClient.interceptors.request.use(
	(config) => {
		const accessToken = localStorage.getItem('token');
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

export default apiClient;
