'use client';
import { useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
import { useRouter } from 'next/navigation';
import { setServer } from './storage/server';

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
		server = localStorage.getItem('server') ?? '0';
	} else {
		server = '0'; // Giá trị mặc định nếu không có localStorage
	}

	storeRef.current.dispatch(setServer(parseInt(server, 10)));

	const router = useRouter();

	useEffect(() => {
		return () => {};
	}, [router]);

	return <Provider store={storeRef.current}>{children}</Provider>;
}
