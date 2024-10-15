'use client';
import '@/components/css/chat.css';
import '@/components/css/clans.css';
import { useState } from 'react';
import {
	FaAddressBook,
	FaMinus,
	FaMinusSquare,
	FaPlusSquare,
	FaSearch,
	FaUsers,
} from 'react-icons/fa';
import { GiVikingLonghouse } from 'react-icons/gi';
import { IoLogOut } from 'react-icons/io5';
import { MdDeleteSweep } from 'react-icons/md';
export const openClansBox = () => {
	let clan_box = document.getElementById('clan_box_screen') as HTMLDivElement;
	if (clan_box) {
		clan_box.classList.toggle('hidden');
	}
};

type PageView = 'members' | 'clans_list' | 'clan_create' | 'clan_penning';

function Clans() {
	const [view, setView] = useState<PageView>('clans_list');
	return (
		<div
			id="clan_box_screen"
			className="fixed top-48 left-0 lg:left-1/4 min-h-screen lg:w-1/2 w-full max-w-7xl slide-top z-[100] p-2 select-none hidden">
			<div className=" bg-black/80 box w-full h-full flex flex-col backdrop-blur-lg rounded-lg">
				{/* Layout Clans */}
				<div className="flex flex-col w-full h-full gap-2 font-chakra-petch text-orange-500 p-2">
					{/* Header */}
					<div className="flex flex-row w-full justify-between items-center uppercase font-bold">
						<h1 className="text-lg">Bang Hội</h1>
						<button onClick={openClansBox}>
							<FaMinus size={24} />
						</button>
					</div>
					{/* Session */}
					<div className="flex lg:flex-row flex-wrap w-full gap-2">
						<label className="input input-bordered flex items-center gap-2">
							<input
								type="text"
								className="grow"
								placeholder="Search"
							/>
							<FaSearch size={24} />
						</label>

						<button
							onClick={() => {
								setView('clans_list');
							}}
							className="py-2 px-4 items-center flex flex-row gap-2 border border-orange-500 rounded-lg">
							<GiVikingLonghouse size={24} />
							DS Bang Hội
						</button>
						<button
							onClick={() => {}}
							className="py-2 px-4 items-center flex flex-row gap-2 border border-orange-500 rounded-lg">
							<FaPlusSquare size={24} />
							Tạo Bang Hội
						</button>
						<button
							onClick={() => {
								setView('members');
							}}
							className="py-2 px-4 items-center flex flex-row gap-2 border border-orange-500 rounded-lg">
							<FaUsers size={24} />
							Thành Viên
						</button>
						<button
							onClick={() => {
								setView('clan_penning');
							}}
							className="py-2 px-4 items-center flex flex-row gap-2 border border-orange-500 rounded-lg">
							<FaAddressBook size={24} />
							Đơn Xin Gia Nhập
						</button>
						<button
							onClick={() => {}}
							className="py-2 px-4 items-center flex flex-row gap-2 border border-orange-500 rounded-lg">
							<IoLogOut size={24} />
							Rời Bang Hội
						</button>
						<button
							onClick={() => {}}
							className="py-2 px-4 items-center flex flex-row gap-2 border border-orange-500 rounded-lg">
							<MdDeleteSweep size={24} />
							Xóa Bang Hội
						</button>
					</div>
					{view === 'clans_list' && <ClanList />}
					{view === 'members' && <MemberList />}
					{view === 'clan_penning' && <ClanColleter />}
				</div>
			</div>
		</div>
	);
}

// Clans List
const ClanList = () => {
	return (
		<div className="flex flex-col gap-2 overflow-auto h-[400px] w-full p-2 bg-black/30 rounded-lg scroll-smooth snap-y">
			{Array.from({ length: 50 }).map((_, i) => {
				return (
					<div
						key={i + '_list_clans'}
						className="flex flex-row items-center justify-between gap-2 hover:bg-white/10 hover:duration-500 transition-all ease-in-out rounded-lg cursor-pointer snap-center">
						{/* Avatar & Info */}
						<div className="flex flex-row gap-2 items-center">
							<div className="avatar">
								<div className="w-24 rounded-xl">
									<img src="/image/avatar/1.webp" />
								</div>
							</div>
							<div className="flex flex-col font-bold">
								<h1>Rin Dev {i + 1}</h1>
								<p className="flex flex-row items-center gap-2">
									Something new{' '}
									<span className="loading loading-dots loading-xs"></span>
								</p>
							</div>
						</div>
						{/* Score & Length Menbers */}
						<div className="flex flex-col gap-2 font-bold items-end">
							<p className="font-sf-trans-robotics uppercase">
								{new Intl.NumberFormat('vi').format(
									Math.floor(Math.random() * 1e8),
								)}{' '}
								<span className="font-chakra-petch">điểm</span>
							</p>
							<p className="font-protest-strike-regular flex flex-row gap-2 items-center">
								{Math.floor(Math.random() * 100)}/100{' '}
								<span>
									<FaUsers size={24} />
								</span>
							</p>
						</div>
					</div>
				);
			})}
		</div>
	);
};

const MemberList = () => {
	return (
		<div className="flex flex-col gap-2 overflow-auto h-[400px] w-full p-2 bg-black/30 rounded-lg scroll-smooth snap-y">
			{Array.from({ length: 50 }).map((_, i) => {
				return (
					<div
						key={i + '_member_list'}
						className="flex flex-row items-center justify-between gap-2 hover:bg-white/10 hover:duration-500 transition-all ease-in-out rounded-lg cursor-pointer snap-center">
						{/* Avatar & Info */}
						<div className="flex flex-row gap-2 items-center">
							<div className="avatar">
								<div className="w-24 rounded-xl">
									<img src="/image/avatar/2.webp" />
								</div>
							</div>
							<div className="flex flex-col font-bold">
								<h1>Rin Dev {i + 1}</h1>
								<p className="flex flex-row items-center gap-2">
									Ngày gia nhập:
									<span className="loading loading-dots loading-xs"></span>
								</p>
							</div>
						</div>
						{/* Score & Balance */}
						<div className="flex flex-col gap-2 font-bold">
							<p className="font-sf-trans-robotics uppercase flex flex-row gap-2">
								<span className="font-chakra-petch">điểm:</span>
								{new Intl.NumberFormat('vi').format(
									Math.floor(Math.random() * 1e8),
								)}{' '}
							</p>
							<p className="font-protest-strike-regular flex flex-row gap-2 items-center">
								<p className="font-sf-trans-robotics uppercase flex flex-row gap-2">
									<span className="font-chakra-petch">Số Dư:</span>
									{new Intl.NumberFormat('vi').format(
										Math.floor(Math.random() * 1e8),
									)}{' '}
								</p>
							</p>
						</div>
					</div>
				);
			})}
		</div>
	);
};

const ClanColleter = () => {
	return (
		<div className="flex flex-col gap-2 overflow-auto h-[400px] w-full p-2 bg-black/30 rounded-lg scroll-smooth snap-y">
			{Array.from({ length: 50 }).map((_, i) => {
				return (
					<div
						key={i + '_colleter_clan'}
						className="flex flex-row items-center justify-between gap-2 hover:bg-white/10 hover:duration-500 transition-all ease-in-out rounded-lg cursor-pointer snap-center">
						{/* Avatar & Info */}
						<div className="flex flex-row gap-2 items-center">
							<div className="avatar">
								<div className="w-24 rounded-xl">
									<img src="/image/avatar/2.webp" />
								</div>
							</div>
							<div className="flex flex-col font-bold">
								<h1>Rin Dev {i + 1}</h1>
								<p className="flex flex-row items-center gap-2">
									Ngày xin gia nhập:
									<span className="loading loading-dots loading-xs"></span>
								</p>
							</div>
						</div>
						{/* Acpect & Dispect */}
						<div className="flex flex-col gap-2 font-bold">
							<button className="py-2 px-4 rounded-lg flex flex-row gap-2 items-center bg-orange-500 text-white font-bold">
								<FaPlusSquare />
								Chấp Nhận
							</button>
							<button className="py-2 px-4 rounded-lg flex flex-row gap-2 items-center bg-black border border-orange-500 text-orange-500 font-bold">
								<FaMinusSquare />
								Từ Chối
							</button>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Clans;
