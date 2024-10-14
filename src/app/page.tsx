import History from '@/components/pages/main/history';
import TablesTop from '@/components/pages/main/tables-top';
import Home from '@/components/pages/main/home';

// CL: Chẵn Lẽ - Tài Xỉu; x: Xiên; g: Dự Đoán
export type TypeBet = 'cl' | 'x' | 'g';

export default function Page() {
	return (
		<div className="flex flex-col gap-10 justify-center items-center w-full">
			<Home />
			<div
				style={{ backgroundImage: "url('/image/background/banner_1.jpg')" }}
				className="w-full h-20 bg-cover bg-repeat bg-top"></div>
			<History />
			<div
				style={{ backgroundImage: "url('/image/background/banner_1.jpg')" }}
				className="w-full h-20 bg-cover bg-repeat bg-center"></div>
			<TablesTop />
			<div
				style={{ backgroundImage: "url('/image/background/banner_1.jpg')" }}
				className="w-full h-20 bg-cover bg-repeat bg-bottom"></div>
		</div>
	);
}
