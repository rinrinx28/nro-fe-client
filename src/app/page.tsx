'use client';
import History from '@/components/pages/main/history';
import TablesTop from '@/components/pages/main/tables-top';
import Home from '@/components/pages/main/home';

export default function Page() {
	return (
		<div
			id="home_page"
			className="flex flex-col gap-10 justify-center items-center w-full select-none">
			<Home />
			<div
				style={{ backgroundImage: "url('/image/background/banner_1.webp')" }}
				className="w-full h-20 bg-cover bg-repeat bg-top"></div>
			<History />
			<div
				style={{ backgroundImage: "url('/image/background/banner_1.webp')" }}
				className="w-full h-20 bg-cover bg-repeat bg-center"></div>
			<TablesTop />
			<div
				style={{ backgroundImage: "url('/image/background/banner_1.webp')" }}
				className="w-full h-20 bg-cover bg-repeat bg-bottom"></div>
		</div>
	);
}
