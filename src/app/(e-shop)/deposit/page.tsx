'use client';
'use cache';
import dynamic from 'next/dynamic';

// Lazy load components
const Deposit = dynamic(() => import('./deposit'), {
	loading: () => (
		<div className="flex w-full items-center justify-center min-h-screen">
			<img
				src="/image/background/loading-screen.gif"
				style={{ width: '100%', margin: '0 auto' }}
				alt="Loading Screen Nrogame"
			/>
		</div>
	), // Tùy chọn: Hiển thị trạng thái loading
	ssr: true, // Tắt render phía server nếu không cần
});

export default function Page() {
	return <Deposit />;
}
