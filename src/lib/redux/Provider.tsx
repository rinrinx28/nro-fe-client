'use client';
import { useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
import { setServer } from './storage/minigame/server';
import { updateUser } from './storage/user/user';
import apiClient from '../server/apiClient';
import { setClans } from './storage/clan/clans';
import { setConfigs } from './storage/eshop/config';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { setFinger } from './storage/user/finger';

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
	// storeRef.current.dispatch(setBots([]));
	// storeRef.current.dispatch(setClans([]));
	// storeRef.current.dispatch(setInviteClans([]));
	// storeRef.current.dispatch(setMsgClans([]));
	// storeRef.current.dispatch(setConfigs([]));
	// storeRef.current.dispatch(setServices([]));
	// storeRef.current.dispatch(setMinigames([]));
	// storeRef.current.dispatch(setMessages([]));
	// storeRef.current.dispatch(setUserActives([]));
	// storeRef.current.dispatch(setUserBets([]));
	// storeRef.current.dispatch(setUserStores([]));

	// useEffect(() => {
	// 	window.scrollTo(0, 0); // Scroll to top when the page reloads
	// }, []); // Empty dependency array means it runs once when the component mounts

	// Auto Call Request;
	useEffect(() => {
		const setFp = async (token: string) => {
			const fp = await FingerprintJS.load();

			const { visitorId } = await fp.get();
			storeRef.current?.dispatch(setFinger(visitorId));
			apiClient
				.post('/auth/relogin', { hash: visitorId })
				.then((res) => {
					storeRef.current?.dispatch(
						updateUser({ isLogin: true, token: token, ...res.data }),
					);
				})
				.catch((err) => {
					localStorage.removeItem('token');
				});
		};
		const saveFp = async () => {
			const fp = await FingerprintJS.load();

			const { visitorId } = await fp.get();
			storeRef.current?.dispatch(setFinger(visitorId));
		};
		const token = localStorage.getItem('token');
		// relogin
		if (token && storeRef) {
			setFp(token);
		} else {
			saveFp();
		}
		const listClan = async () => {
			try {
				const { data } = await apiClient.get('/no-call/list/clan');
				storeRef.current?.dispatch(setClans(data));
			} catch (err: any) {
				console.log(err.response.data.message.message);
			}
		};
		const listConfig = async () => {
			try {
				const { data } = await apiClient.get('/no-call/list/econfig');
				storeRef.current?.dispatch(setConfigs(data));
			} catch (err: any) {
				console.log(err.response.data.message.message);
			}
		};
		if (storeRef) {
			listConfig();
			listClan();
		}
	}, [storeRef]);

	return <Provider store={storeRef.current}>{children}</Provider>;
}
