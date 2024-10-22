'use client';
import { useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
import { setServer } from './storage/minigame/server';
import { updateUser } from './storage/user/user';
import apiClient from '../server/apiClient';
import { useAppDispatch } from './hook';
import { setBots } from './storage/eshop/bots';
import { setClans } from './storage/clan/clans';
import { setInviteClans } from './storage/clan/invite';
import { setMsgClans } from './storage/clan/msgClan';
import { setConfigs } from './storage/eshop/config';
import { setServices } from './storage/eshop/service';
import { setMinigames } from './storage/minigame/minigame';
import { setMessages } from './storage/user/message';
import { setUserActives } from './storage/user/userActive';
import { setUserBets } from './storage/user/userBet';
import { setUserStores } from './storage/user/users';
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
	storeRef.current.dispatch(setBots([]));
	storeRef.current.dispatch(setClans([]));
	storeRef.current.dispatch(setInviteClans([]));
	storeRef.current.dispatch(setMsgClans([]));
	storeRef.current.dispatch(setConfigs([]));
	storeRef.current.dispatch(setServices([]));
	storeRef.current.dispatch(setMinigames([]));
	storeRef.current.dispatch(setMessages([]));
	storeRef.current.dispatch(setUserActives([]));
	storeRef.current.dispatch(setUserBets([]));
	storeRef.current.dispatch(setUserStores([]));

	useEffect(() => {
		window.scrollTo(0, 0); // Scroll to top when the page reloads
	}, []); // Empty dependency array means it runs once when the component mounts

	// Auto Save fingerprintJS and reload;
	useEffect(() => {
		const setFp = async (token: string) => {
			const fp = await FingerprintJS.load();

			const { visitorId } = await fp.get();
			storeRef.current?.dispatch(setFinger(visitorId));
			apiClient
				.post(
					'/auth/relogin',
					{ hash: visitorId },
					{
						headers: {
							Authorization: 'Bearer ' + token,
						},
					},
				)
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
		return () => {};
	}, [storeRef]);

	return <Provider store={storeRef.current}>{children}</Provider>;
}
