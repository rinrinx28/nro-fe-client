'use client';
import { useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
import { useRouter } from 'next/navigation';

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
	const router = useRouter();

	useEffect(() => {
		return () => {};
	}, [router]);

	return <Provider store={storeRef.current}>{children}</Provider>;
}
