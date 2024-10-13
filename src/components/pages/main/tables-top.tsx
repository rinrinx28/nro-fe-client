import React from 'react';
import { MdLeaderboard } from 'react-icons/md';

function TablesTop() {
	return (
		<div
			style={{ backgroundImage: "url('/image/background/3.jpg')" }}
			className="flex justify-center items-center w-full p-8">
			<div className="flex 2xl:flex-row flex-col items-start gap-2 w-full max-w-7xl justify-start">
				{/* Table Top User */}
				<div className="lg:max-w-7xl w-full select-none flex flex-col justify-start gap-2 border border-current rounded-btn p-4 shadow-xl shadow-current bg-gradient-to-r from-amber-200 to-yellow-400">
					<div
						className="flex flex-row w-full justify-start items-center gap-2 text-2xl text-slate-500 font-mono font-bold"
						style={{
							textShadow: '1px 2px 8px #64748b',
						}}>
						<MdLeaderboard />
						<h1>Top Người Chơi</h1>
					</div>
					<div className="h-12 w-full"></div>
					<div className="flex flex-col justify-start items-center gap-10 w-full overflow-auto h-[600px] py-2 snap-y">
						{Array.from({ length: 10 }).map((_, i) => {
							return (
								<div
									key={i + 'top_user_winner'}
									className="snap-center cursor-pointer flash flex justify-between w-full max-w-lg rounded-full items-center text-white font-bold font-protest-strike-regular uppercase">
									<div className="avatar">
										<div className="mask mask-circle mb-l:size-24 size-14 border border-current backdrop-blur-xl">
											<img
												src={`/image/server/${8}.png`}
												alt="Avatar Tailwind CSS Component"
											/>
										</div>
									</div>
									<div className="flex flex-col items-center justify-center">
										<p>#{i + 1} | Rin</p>
									</div>
									<div className="flex flex-col items-center justify-center pr-10">
										<p>120</p>
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
						className="flex flex-row w-full justify-start items-center gap-2 text-2xl text-amber-500 font-mono font-bold"
						style={{
							textShadow: '1px 2px 8px #f59e0b',
						}}>
						<MdLeaderboard />
						<h1>Top Bang Hội</h1>
					</div>
					<div className="h-12 w-full"></div>
					<div className="flex flex-col justify-start items-center gap-10 w-full overflow-auto h-[600px] py-2 snap-y">
						{Array.from({ length: 10 }).map((_, i) => {
							return (
								<div
									key={i + 'top_user_winner'}
									className="snap-center flash cursor-pointer flex justify-between w-full max-w-lg bg-gradient-to-r from-amber-200 to-yellow-500 rounded-full items-center text-white font-bold font-protest-strike-regular uppercase">
									<div className="avatar">
										<div className="mask mask-circle mb-l:size-24 size-14 border border-current backdrop-blur-xl z-50">
											<img
												src={`/image/server/${3}.png`}
												alt="Avatar Tailwind CSS Component"
											/>
										</div>
									</div>
									<div className="flex flex-col items-center justify-center">
										<p>Clan | #{i + 1}</p>
										<p>Rin Clan</p>
									</div>
									<div className="flex flex-col items-center justify-center pr-10">
										<p>120</p>
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
