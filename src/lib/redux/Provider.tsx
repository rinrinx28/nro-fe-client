'use client';
import { useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
import { setServer } from './storage/minigame/server';
import { updateUser } from './storage/user/user';
import apiClient from '../server/apiClient';
import { useAppDispatch } from './hook';

export default function StoreProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const storeRef = useRef<AppStore>();
	if (!storeRef.current) {
		// Create the store instance the first time this renders
		storeRef.current = makeStore();
	}
	let server;

	if (typeof window !== 'undefined' && window.localStorage) {
		server = localStorage.getItem('server') ?? '24';
	} else {
		server = '24'; // Giá trị mặc định nếu không có localStorage
	}
	storeRef.current.dispatch(setServer(server));

	useEffect(() => {
		window.scrollTo(0, 0); // Scroll to top when the page reloads
	}, []); // Empty dependency array means it runs once when the component mounts

	useEffect(() => {
		const token = localStorage.getItem('token');
		// relogin
		if (token && storeRef) {
			apiClient
				.get('/auth/relogin', {
					headers: {
						Authorization: 'Bearer ' + token,
					},
				})
				.then((res) => {
					storeRef.current?.dispatch(
						updateUser({ isLogin: true, token: token, ...res.data }),
					);
				})
				.catch((err) => {
					localStorage.removeItem('token');
				});
		}
		return () => {};
	}, [storeRef]);

	return <Provider store={storeRef.current}>{children}</Provider>;
}
