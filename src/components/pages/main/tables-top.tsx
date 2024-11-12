'use client';
import { useAppSelector } from '@/lib/redux/hook';
import { Clan } from '@/lib/redux/storage/clan/clans';
import { EConfig } from '@/lib/redux/storage/eshop/config';
import { User } from '@/lib/redux/storage/user/user';
import { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { MdLeaderboard } from 'react-icons/md';

function TablesTop() {
	const clans = useAppSelector((state) => state.clanTop);
	const users = useAppSelector((state) => state.userTop);
	const econfig = useAppSelector((state) => state.econfig);
	const [eshop, setEshop] = useState<EConfig[]>([]);

	// Update data ESHOP;
	useEffect(() => {
		const e_shop = econfig.filter(
			(e) => e.name === 'e_clan' || e.name === 'e_user_rank',
		);
		if (e_shop) {
			setEshop(e_shop);
		}
	}, [econfig]);

	return (
		<div
			style={{ backgroundImage: "url('/image/background/3.webp')" }}
			className="flex justify-center items-center w-full p-8">
			<div className="flex 2xl:flex-row flex-col items-start gap-2 w-full max-w-7xl justify-start">
				{/* Table Top User */}
				<div className="lg:max-w-7xl w-full select-none flex flex-col justify-start gap-2 border border-current rounded-btn p-4 shadow-xl shadow-current bg-gradient-to-r from-amber-200 to-yellow-400">
					<div
						className="flex flex-row w-full justify-start items-center gap-2 text-2xl text-slate-500 font-protest-strike-regular uppercase"
						style={{
							textShadow: '1px 2px 8px #64748b',
						}}>
						<MdLeaderboard />
						<h1>Top Người Chơi</h1>
					</div>
					<div className="h-12 w-full"></div>
					<div className="flex flex-col justify-start items-center gap-10 w-full overflow-auto h-[600px] py-2 snap-y">
						{users?.map((u, i) => {
							const { meta, name } = u;
							const e_rank_day = eshop.find((e) => e.name === 'e_user_rank');
							const {
								prizes = [
									12000000000, 8000000000, 4000000000, 1000000000, 500000000,
									200000000, 100000000,
								],
							} = e_rank_day?.option ?? {};
							return (
								<div
									key={i + 'top_user_winner'}
									className="snap-center flash cursor-pointer flex lg:flex-row flex-col justify-between w-full max-w-lg bg-gradient-to-r from-amber-200 to-yellow-500 rounded-full items-center text-white font-protest-strike-regular px-1">
									<div className="avatar animate-bounce z-[100] duration-1000">
										<div className="mb-l:size-24 size-16 bg-transparent">
											<img
												src={`/image/rank/${i + 1}_user.webp`}
												alt="Avatar Tailwind CSS Component"
											/>
										</div>
									</div>
									<div className="flex flex-col items-center justify-center lg:text-base text-sm">
										<p>
											#{i + 1} | {name}
										</p>
										{/* <p>Phần Thưởng</p> */}
										<p className="">
											{new Intl.NumberFormat('vi').format(prizes[i])} vàng
										</p>
									</div>
									<div className="flex lg:flex-col flex-row gap-2 items-center justify-center">
										<p>
											{new Intl.NumberFormat('vi').format(
												meta?.totalTrade ?? 0,
											)}
										</p>
										<p>Điểm</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* Table Top Clan Rank */}
				<div className="lg:max-w-7xl w-full select-none flex flex-col justify-start gap-2 border border-current rounded-btn p-4 shadow-xl shadow-current bg-gradient-to-r from-slate-900 to-slate-700">
					<div
						className="flex flex-row w-full justify-start items-center gap-2 text-2xl text-amber-500 font-protest-strike-regular uppercase"
						style={{
							textShadow: '1px 2px 8px #f59e0b',
						}}>
						<MdLeaderboard />
						<h1>Top Bang Hội</h1>
					</div>
					<div className="h-12 w-full"></div>
					<div className="flex flex-col justify-start items-center gap-10 w-full overflow-auto h-[600px] py-2 snap-y">
						{clans?.map((c, i) => {
							const { score, meta = {} } = c ?? {};
							const { type, name } = meta;
							const e_clan = eshop.find((e) => e.name === 'e_clan');
							const {
								prizes = [
									1000000000, 500000000, 300000000, 100000000, 60000000,
								],
							} = e_clan?.option ?? {};
							return (
								<div
									key={i + 'top_user_winner'}
									className="snap-center flash cursor-pointer flex lg:flex-row flex-col justify-between w-full max-w-lg bg-gradient-to-r from-amber-200 to-yellow-500 rounded-full items-center text-white font-protest-strike-regular px-1">
									<div className="avatar animate-bounce z-[100]">
										<div className="mb-l:size-24 size-16 bg-transparent z-50">
											<img
												src={`/image/banghoi/b${type ?? '1'}.webp`}
												alt="Avatar Tailwind CSS Component"
											/>
										</div>
									</div>
									<div className="flex flex-col items-center justify-center lg:text-base text-sm w-full">
										<p>
											Clan {name} | TOP {i + 1}
										</p>
										{/* <p>Phần Thưởng</p> */}
										<div className="flex flex-row gap-1 items-center justify-center">
											<p className="text-nowrap">
												{new Intl.NumberFormat('vi').format(prizes[i])} Vàng /
											</p>
											<FaUser size={12} />
										</div>
									</div>
									<div className="flex lg:flex-col flex-row gap-2 items-center justify-center">
										<p>{new Intl.NumberFormat('vi').format(score ?? 0)}</p>
										<p>Điểm</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default TablesTop;
