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
import { IoIosSend } from 'react-icons/io';
import { IoLogOut } from 'react-icons/io5';
import { MdChatBubble, MdDeleteSweep } from 'react-icons/md';

export const openClansBox = (type?: string) => {
	let clan_box_o = document.getElementById(
		'clan_box_screen',
	) as HTMLDialogElement;
	if (clan_box_o) {
		clan_box_o.show();
	}
};

const openDeleteClanQ = () => {
	let dialog = document.getElementById('clan_delete_q') as HTMLDialogElement;
	if (dialog) {
		dialog.show();
	}
};

const openLeavelClanQ = () => {
	let dialog = document.getElementById('clan_leavel_q') as HTMLDialogElement;
	if (dialog) {
		dialog.show();
	}
};

const openKickClanQ = () => {
	let dialog = document.getElementById('clan_kick_q') as HTMLDialogElement;
	if (dialog) {
		dialog.show();
	}
};

const openChatBoxClan = () => {
	let dialog = document.getElementById(
		'clan_chat_box_screen',
	) as HTMLDialogElement;
	if (dialog) {
		dialog.show();
	}
};

type PageView =
	| 'members'
	| 'clans_list'
	| 'clan_create'
	| 'clan_penning'
	| 'clan_create';

function Clans() {
	const [view, setView] = useState<PageView>('clans_list');
	return (
		<>
			{/* Clans Button */}
			<div className="fixed bottom-4 left-4 z-[100]">
				<button
					onClick={() => {
						openClansBox('o');
					}}
					className="text-orange-500 p-2 size-16 rounded-full border border-orange-500 bg-black flex items-center justify-center">
					<GiVikingLonghouse size={32} />
				</button>
			</div>
			<dialog
				id="clan_box_screen"
				className="modal z-[1000]">
				<div className="p-2 select-none modal-box w-full max-w-7xl">
					<div className=" bg-black/80 box w-full h-full flex flex-col backdrop-blur-lg rounded-lg">
						{/* Layout Clans */}
						<div className="flex flex-col w-full h-full gap-2 font-chakra-petch text-orange-500 p-2">
							{/* Header */}
							<div className="sticky top-0 backdrop-blur-lg flex flex-row w-full py-2 justify-between items-center uppercase font-bold">
								<h1 className="text-lg">Bang Hội</h1>
								<form method="dialog">
									<button>
										<FaMinus size={24} />
									</button>
								</form>
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
									className={`lg:py-2 py-1 lg:px-4 px-2 lg:text-base text-sm items-center flex flex-row gap-2 border ${
										view === 'clans_list'
											? 'bg-orange-500 text-white'
											: 'border-orange-500'
									} rounded-lg`}>
									<GiVikingLonghouse size={24} />
									DS Bang Hội
								</button>
								<button
									onClick={() => {
										setView('clan_create');
									}}
									className={`lg:py-2 py-1 lg:px-4 px-2 lg:text-base text-sm items-center flex flex-row gap-2 border ${
										view === 'clan_create'
											? 'bg-orange-500 text-white'
											: 'border-orange-500'
									} rounded-lg`}>
									<FaPlusSquare size={24} />
									Tạo Bang Hội
								</button>
								<button
									onClick={() => {
										setView('members');
									}}
									className={`lg:py-2 py-1 lg:px-4 px-2 lg:text-base text-sm items-center flex flex-row gap-2 border ${
										view === 'members'
											? 'bg-orange-500 text-white'
											: 'border-orange-500'
									} rounded-lg`}>
									<FaUsers size={24} />
									Thành Viên
								</button>
								<button
									onClick={() => {
										setView('clan_penning');
									}}
									className={`lg:py-2 py-1 lg:px-4 px-2 lg:text-base text-sm items-center flex flex-row gap-2 border ${
										view === 'clan_penning'
											? 'bg-orange-500 text-white'
											: 'border-orange-500'
									} rounded-lg`}>
									<FaAddressBook size={24} />
									Đơn Xin Gia Nhập
								</button>
								<button
									onClick={() => {
										openLeavelClanQ();
									}}
									className={`lg:py-2 py-1 lg:px-4 px-2 lg:text-base text-sm items-center flex flex-row gap-2 border border-orange-500 rounded-lg`}>
									<IoLogOut size={24} />
									Rời Bang Hội
								</button>
								<button
									onClick={() => {
										openDeleteClanQ();
									}}
									className={`lg:py-2 py-1 lg:px-4 px-2 lg:text-base text-sm items-center flex flex-row gap-2 border border-orange-500 rounded-lg`}>
									<MdDeleteSweep size={24} />
									Xóa Bang Hội
								</button>
								<button
									onClick={() => {
										openChatBoxClan();
									}}
									className={`lg:py-2 py-1 lg:px-4 px-2 lg:text-base text-sm items-center flex flex-row gap-2 border border-orange-500 rounded-lg`}>
									<MdChatBubble size={24} />
									Chat
								</button>
							</div>
							{view === 'clans_list' && <ClanList />}
							{view === 'members' && <MemberList />}
							{view === 'clan_penning' && <ClanColleter />}
							{view === 'clan_create' && <ClanCreateQ />}
						</div>
					</div>
				</div>
			</dialog>
			<dialog
				id="clan_delete_q"
				className="modal z-[1100]">
				<div className="modal-box font-chakra-petch text-orange-500 p-2">
					<div className="sticky top-0 backdrop-blur-lg flex flex-row w-full py-2 justify-between items-center uppercase font-bold">
						<h1 className="text-lg">Xóa - Bang Hội</h1>
						<form method="dialog">
							<button>
								<FaMinus size={24} />
							</button>
						</form>
					</div>
					<div className="flex flex-col gap-2">
						<p className="">Bạn có muốn xóa Bang Hội này không?</p>
						<div className="flex flex-row w-full justify-around">
							<button className="py-2 px-4 rounded-lg bg-orange-500 text-white hover:duration-300 active:hover:scale-90">
								Có
							</button>
							<form method="dialog">
								<button className="py-2 px-4 rounded-lg bg-black border border-orange-500 text-orange-500 hover:duration-300 active:hover:scale-90">
									Không
								</button>
							</form>
						</div>
					</div>
				</div>
			</dialog>
			<dialog
				id="clan_leavel_q"
				className="modal z-[1100]">
				<div className="modal-box font-chakra-petch text-orange-500 p-2">
					<div className="sticky top-0 backdrop-blur-lg flex flex-row w-full py-2 justify-between items-center uppercase font-bold">
						<h1 className="text-lg">Rời - Bang Hội</h1>
						<form method="dialog">
							<button>
								<FaMinus size={24} />
							</button>
						</form>
					</div>
					<div className="flex flex-col gap-2">
						<p className="">Bạn có muốn rời Bang Hội này không?</p>
						<div className="flex flex-row w-full justify-around">
							<button className="py-2 px-4 rounded-lg bg-orange-500 text-white hover:duration-300 active:hover:scale-90">
								Có
							</button>
							<form method="dialog">
								<button className="py-2 px-4 rounded-lg bg-black border border-orange-500 text-orange-500 hover:duration-300 active:hover:scale-90">
									Không
								</button>
							</form>
						</div>
					</div>
				</div>
			</dialog>
			<dialog
				id="clan_kick_q"
				className="modal z-[1100]">
				<div className="modal-box font-chakra-petch text-orange-500 p-2">
					<div className="sticky top-0 backdrop-blur-lg flex flex-row w-full py-2 justify-between items-center uppercase font-bold">
						<h1 className="text-lg">Đuổi - Bang Hội</h1>
						<form method="dialog">
							<button>
								<FaMinus size={24} />
							</button>
						</form>
					</div>
					<div className="flex flex-col gap-2">
						<p className="">
							Bạn có muốn đuổi thành viên {'Rin'} ra khỏi Bang Hội này không?
						</p>
						<div className="flex flex-row w-full justify-around">
							<button className="py-2 px-4 rounded-lg bg-orange-500 text-white hover:duration-300 active:hover:scale-90">
								Có
							</button>
							<form method="dialog">
								<button className="py-2 px-4 rounded-lg bg-black border border-orange-500 text-orange-500 hover:duration-300 active:hover:scale-90">
									Không
								</button>
							</form>
						</div>
					</div>
				</div>
			</dialog>
			<dialog
				id="clan_chat_box_screen"
				className="modal z-[1100]">
				<div className="modal-box font-chakra-petch text-orange-500 p-2 w-full max-w-xl">
					<div className="sticky top-0 backdrop-blur-lg flex flex-row w-full py-2 justify-between items-center uppercase font-bold z-50">
						<h1 className="text-lg">CHAT - Bang Hội</h1>
						<form method="dialog">
							<button>
								<FaMinus size={24} />
							</button>
						</form>
					</div>
					<div className="flex flex-col gap-2 p-2 w-full">
						{/* Chat */}
						<div className="border border-orange-500 w-full h-[600px] overflow-auto scroll-smooth rounded-box p-2">
							{Array.from({ length: 24 }).map((_, i) => {
								return (
									<div
										key={i + 'chat_box'}
										className={`chat ${
											i % 2 === 0 ? 'chat-start' : 'chat-end'
										}`}>
										<div className="chat-image avatar">
											<div className="w-10 rounded-box border border-orange-500">
												<img
													alt="Tailwind CSS chat bubble component"
													src={`/image/avatar/${
														i % 2 === 0 ? '2.webp' : '3.webp'
													}`}
												/>
											</div>
										</div>
										<div className="chat-header">
											{i % 2 === 0 ? 'Rin' : 'Anh'}
											{/* <time className="text-xs opacity-50">12:45</time> */}
										</div>
										<div className="chat-bubble">You were the Chosen One!</div>
										{/* <div className="chat-footer opacity-50">Delivered</div> */}
									</div>
								);
							})}
						</div>

						{/* Input Chat */}
						<div className="flex flex-row text-orange-500 w-full items-center gap-4 z-50">
							<input
								type="text"
								placeholder="Type here"
								className="input input-bordered w-full border-orange-500"
							/>
							<button className="border border-orange-500 rounded-box text-center p-2 active:hover:scale-90 hover:duration-300">
								<IoIosSend size={32} />
							</button>
						</div>
					</div>
				</div>
			</dialog>
		</>
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
								<div className="lg:w-24 w-12 rounded-xl">
									<img src="/image/avatar/1.webp" />
								</div>
							</div>
							<div className="flex flex-col font-bold lg:text-base text-sm">
								<h1>Rin Dev {i + 1}</h1>
								<p className="flex flex-row items-center gap-2">
									Something new
								</p>
							</div>
						</div>
						{/* Score & Length Menbers */}
						<div className="flex flex-col gap-2 font-bold items-end">
							<p className="font-sf-trans-robotics uppercase lg:text-base text-xs">
								{new Intl.NumberFormat('vi').format(
									Math.floor(Math.random() * 1e8),
								)}{' '}
								<span className="font-chakra-petch">điểm</span>
							</p>
							<p className="font-protest-strike-regular flex flex-row gap-2 items-center lg:text-base text-xs">
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
				let balance = new Intl.NumberFormat('vi')
					.format(Math.floor(Math.random() * 1e8))
					.split('')
					.map((s: string, i: number) => (i < 3 ? '*' : s))
					.join('');

				return (
					<div
						key={i + '_member_list'}
						className="flex flex-row items-center justify-between gap-2 hover:bg-white/10 hover:duration-500 transition-all ease-in-out rounded-lg cursor-pointer snap-center">
						{/* Avatar & Info */}
						<div className="flex flex-row gap-2 items-center">
							<div className="avatar">
								<div className="lg:w-24 w-12 rounded-xl">
									<img src="/image/avatar/2.webp" />
								</div>
							</div>
							<div className="flex flex-col font-bold lg:text-base text-sm">
								<h1>Rin Dev {i + 1}</h1>
								<p className="flex lg:flex-row flex-col items-center lg:gap-2 gap-1">
									Ngày gia nhập:
									<span className="">{new Date().toDateString()}</span>
								</p>
							</div>
						</div>
						{/* Score & Balance */}
						<div className="flex flex-col gap-2 font-bold lg:text-base text-xs text-nowrap">
							<p className="font-sf-trans-robotics uppercase flex flex-row gap-2 ">
								<span className="font-chakra-petch">điểm:</span>
								{new Intl.NumberFormat('vi').format(
									Math.floor(Math.random() * 1e8),
								)}{' '}
							</p>
							<p className="font-protest-strike-regular flex flex-row gap-2 items-center">
								<p className="font-sf-trans-robotics uppercase flex flex-row gap-2">
									<span className="font-chakra-petch">Số Dư:</span>
									{balance.length <= 3
										? '***'
										: balance.length > 6
										? '***.' + balance.slice(-3)
										: balance}{' '}
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
								<div className="lg:w-24 w-12 rounded-xl">
									<img src="/image/avatar/2.webp" />
								</div>
							</div>
							<div className="flex flex-col font-bold lg:text-base text-sm">
								<h1>Rin Dev {i + 1}</h1>
								<p className="flex lg:flex-row flex-col items-center lg:gap-2 gap-1">
									Ngày xin gia nhập:
									<span className="">{new Date().toDateString()}</span>
								</p>
							</div>
						</div>
						{/* Acpect & Dispect */}
						<div className="flex flex-col gap-2 font-bold lg:text-base text-xs">
							<button className="lg:py-2 py-1 lg:px-4 px-2 rounded-lg flex flex-row gap-2 items-center bg-orange-500 text-white font-bold">
								<FaPlusSquare />
								Chấp Nhận
							</button>
							<button className="lg:py-2 py-1 lg:px-4 px-2 rounded-lg flex flex-row gap-2 items-center bg-black border border-orange-500 text-orange-500 font-bold">
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

const ClanCreateQ = () => {
	return (
		<div className="w-full flex justify-center items-center">
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
				className="flex flex-col w-full max-w-md">
				<label className="input input-bordered flex items-center gap-2 text-nowrap">
					Tên Bang Hội
					<input
						type="text"
						className="grow"
					/>
				</label>
				<label className="input input-bordered flex items-center gap-2">
					Giới Thiệu
					<input
						type="text"
						className="grow"
					/>
				</label>
				<label className="flex items-center gap-2">
					<select className="select w-full max-w-xs">
						{Array.from({ length: 9 }).map((_, i) => {
							return <option selected={i === 0}>Loại {i + 1}</option>;
						})}
					</select>
					<img
						src="/image/banghoi/b1.gif"
						style={{ width: '32px', height: 'auto' }}
						alt="type_clan_1_b"
					/>
				</label>
				<label className="input input-bordered flex items-center gap-2">
					Chi Phí
					<input
						type="text"
						className="grow font-number-font"
						disabled
						value={Intl.NumberFormat('vi').format(1e9)}
					/>
				</label>

				<button
					className="py-2 px-4 rounded-lg bg-orange-500 text-white hover:duration-300 active:hover:scale-90"
					type="submit">
					Tạo Bang Hội
				</button>
			</form>
		</div>
	);
};

export default Clans;
