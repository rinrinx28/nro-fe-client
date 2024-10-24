'use client';
import '@/components/css/chat.css';
import '@/components/css/clans.css';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { Clan } from '@/lib/redux/storage/clan/clans';
import { setInviteClan } from '@/lib/redux/storage/clan/invite';
import { setMsgClans } from '@/lib/redux/storage/clan/msgClan';
import { EConfig } from '@/lib/redux/storage/eshop/config';
import apiClient from '@/lib/server/apiClient';
import { useSocket } from '@/lib/server/socket';
import moment from 'moment';
import { useEffect, useState } from 'react';
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
import { IoLogOut, IoSettingsOutline } from 'react-icons/io5';
import { MdChatBubble, MdDeleteSweep } from 'react-icons/md';
import { TbTransfer } from 'react-icons/tb';

export const openClansBox = () => {
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
	| 'clan_create'
	| 'clan_transfer'
	| 'clan_setting';

interface FieldMsgClan {
	token?: string;
	uid?: string;
	content?: string;
	clanId?: string;
}

interface MemberClan {
	name: string;
	money: number;
	meta: Record<string, any>;
	_id?: string;
}
interface FieldCreateClan {
	type?: string;
	name?: string;
	description?: string;
}
interface FieldUpdateClan {
	type?: string;
	description?: string;
}

function Clans() {
	// Redux
	const user = useAppSelector((state) => state.user);
	const clans = useAppSelector((state) => state.clans);
	const msgClans = useAppSelector((state) => state.msgClans);

	// react State
	const [myClan, setMyClan] = useState<Clan | null>(null);
	const [member, setMember] = useState<MemberClan[]>([]);
	const [view, setView] = useState<PageView>('clans_list');
	const [msg, setMsg] = useState<string>('');
	const [fieldMsgClan, setFieldMsgClan] = useState<FieldMsgClan>({});
	const [isLoad, setLoad] = useState<boolean>(false);
	const [target, setTarget] = useState<string | null>(null);

	const socket = useSocket();
	const dispatch = useAppDispatch();

	// Auto Select My Clans
	useEffect(() => {
		if (user.isLogin && user.meta && user.meta.clanId) {
			const { clanId = null } = user.meta;
			if (clanId && !myClan) {
				setView('members');
				const findClan = [...clans].find((c) => c._id === clanId);
				if (findClan) {
					setMyClan(findClan);
				}
			}
		}
	}, [user, clans]);

	// Auto get list Message;
	useEffect(() => {
		const listMsgClan = async (clanId: string) => {
			try {
				const { data } = await apiClient.get(`/clan/list/msg/${clanId}`, {
					headers: {
						Authorization: 'Bearer ' + user.token,
					},
				});
				dispatch(setMsgClans(data));
			} catch (err: any) {
				console.log(err.response.data.message.message);
			}
		};
		const listClanMember = async (clanId: string) => {
			try {
				const { data } = await apiClient.get(
					`/no-call/list/clan/member/${clanId}`,
				);
				setMember(data);
			} catch (err: any) {
				console.log(err.response.data.message.message);
			}
		};
		const listColleter = async (clanId: string) => {
			try {
				const { data } = await apiClient.get(`/clan/invite/list/${clanId}`, {
					headers: {
						Authorization: 'Bearer ' + user.token,
					},
				});
				const { invites } = data;
				for (const invite of invites) {
					dispatch(setInviteClan(invite));
				}
			} catch (err: any) {
				console.log(err.response.data.message.message);
			}
		};
		if (myClan && myClan?._id) {
			listMsgClan(myClan?._id);
			listClanMember(myClan?._id);
			listColleter(myClan?._id);
		}
	}, [myClan]);

	const showNoticeClan = (message: string) => {
		let dialog = document.getElementById('clan_notice_q') as HTMLDialogElement;
		if (dialog) {
			dialog.show();
			setMsg(message);
		}
	};

	// send Chat Clan;
	const sendChatClan = () => {
		setLoad(true);
		try {
			const { content } = fieldMsgClan;
			if (!content || content.length === 0) return showNoticeClan('');
			if (!user.isLogin) return showNoticeClan('');
			if (!user.meta?.clanId || user.meta.clanId !== myClan?._id)
				return showNoticeClan('');
			socket.emit('user.chat.clan', {
				...fieldMsgClan,
				uid: user._id,
				clanId: user.meta.clanId,
				token: user.token,
			});
			setFieldMsgClan({});
		} finally {
			setLoad(false);
		}
	};

	const deletClan = async () => {
		try {
			if (!user.isLogin) return showNoticeClan('Bạn chưa đăng nhập');
			if (!user.meta || !user.meta.clanId)
				return showNoticeClan('Bạn không tham gia vào Bang Hội');
			if (!myClan || !myClan?._id)
				return showNoticeClan('Không tìm thấy bang hội');
			const { data } = await apiClient.post(
				'/clan/delete',
				{
					clanId: myClan?._id,
				},
				{
					headers: {
						Authorization: 'Bearer ' + user.token,
					},
				},
			);
			showNoticeClan(data.message);
			setMyClan({});
			setView('clans_list');
		} catch (err: any) {
			showNoticeClan(err.response.data.message.message);
		}
	};

	const leaveClan = async () => {
		try {
			if (!user.isLogin) return showNoticeClan('Bạn chưa đăng nhập');
			if (!user.meta || !user.meta.clanId)
				return showNoticeClan('Bạn không tham gia vào Bang Hội');
			if (!myClan || !myClan?._id)
				return showNoticeClan('Không tìm thấy bang hội');
			const { data } = await apiClient.post(
				'/clan/leave',
				{
					clanId: myClan?._id,
				},
				{
					headers: {
						Authorization: 'Bearer ' + user.token,
					},
				},
			);
			showNoticeClan(data.message);
			setMyClan({});
			setView('clans_list');
		} catch (err: any) {
			showNoticeClan(err.response.data.message.message);
		}
	};

	const kickClan = async () => {
		try {
			if (!user.isLogin) return showNoticeClan('Bạn chưa đăng nhập');
			if (!user.meta || !user.meta.clanId)
				return showNoticeClan('Bạn không tham gia vào Bang Hội');
			if (!myClan || !myClan?._id)
				return showNoticeClan('Không tìm thấy bang hội');
			if (!target)
				return showNoticeClan(
					'Bạn không thể đuổi thành viên này, xin vui lòng thử lại',
				);
			const { data } = await apiClient.post(
				'/clan/kick',
				{
					clanId: myClan?._id,
					memberId: target,
				},
				{
					headers: {
						Authorization: 'Bearer ' + user.token,
					},
				},
			);
			showNoticeClan(data.message);
			setView('members');
		} catch (err: any) {
			showNoticeClan(err.response.data.message.message);
		}
	};

	const updateMember = (data: any) => {
		setMember(data);
	};
	const updateView = (data: any) => {
		setView(data);
	};
	const updateTarget = (data: any) => {
		setTarget(data);
	};
	return (
		<>
			{/* Clans Button */}
			<div className="fixed bottom-4 left-4 z-[100]">
				<div
					onClick={() => {
						openClansBox();
					}}
					className="text-orange-500 p-2 rounded-full border border-orange-500 bg-black flex items-center justify-center cursor-pointer">
					{myClan ? (
						<div className="flex flex-row items-center justify-center">
							{myClan?.meta?.type ? (
								<div className="avatar">
									<div className="w-12 rounded-xl">
										<img
											src={`/image/banghoi/b${myClan?.meta?.type ?? 1}.gif`}
										/>
									</div>
								</div>
							) : (
								<GiVikingLonghouse size={32} />
							)}
							<p>{myClan?.meta?.name ?? ''}</p>
						</div>
					) : (
						<GiVikingLonghouse size={32} />
					)}
				</div>
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

								{!user?.meta?.clanId && (
									<>
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
									</>
								)}
								{user?.meta?.clanId && (
									<>
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
											Thành Viên {member.length ?? 0}
										</button>
										{user?._id !== myClan?.ownerId && (
											<button
												onClick={() => {
													openLeavelClanQ();
												}}
												className={`lg:py-2 py-1 lg:px-4 px-2 lg:text-base text-sm items-center flex flex-row gap-2 border border-orange-500 rounded-lg`}>
												<IoLogOut size={24} />
												Rời Bang Hội
											</button>
										)}
										{user?._id === myClan?.ownerId && (
											<>
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
														setView('clan_setting');
													}}
													className={`lg:py-2 py-1 lg:px-4 px-2 lg:text-base text-sm items-center flex flex-row gap-2 border ${
														view === 'clan_setting'
															? 'bg-orange-500 text-white'
															: 'border-orange-500'
													} rounded-lg`}>
													<IoSettingsOutline size={24} />
													Chỉnh sửa
												</button>
												<button
													onClick={() => {
														setView('clan_transfer');
													}}
													className={`lg:py-2 py-1 lg:px-4 px-2 lg:text-base text-sm items-center flex flex-row gap-2 border ${
														view === 'clan_transfer'
															? 'bg-orange-500 text-white'
															: 'border-orange-500'
													} rounded-lg`}>
													<TbTransfer size={24} />
													Chuyển Nhượng
												</button>

												<button
													onClick={() => {
														openDeleteClanQ();
													}}
													className={`lg:py-2 py-1 lg:px-4 px-2 lg:text-base text-sm items-center flex flex-row gap-2 border border-orange-500 rounded-lg`}>
													<MdDeleteSweep size={24} />
													Xóa Bang Hội
												</button>
											</>
										)}
										<button
											onClick={() => {
												openChatBoxClan();
											}}
											className={`lg:py-2 py-1 lg:px-4 px-2 lg:text-base text-sm items-center flex flex-row gap-2 border border-orange-500 rounded-lg`}>
											<MdChatBubble size={24} />
											Chat
										</button>
									</>
								)}
							</div>
							{view === 'clans_list' && (
								<ClanList
									setMember={updateMember}
									setView={updateView}
								/>
							)}
							{view === 'members' && (
								<MemberList
									member={member}
									setTarget={updateTarget}
									myClan={myClan}
								/>
							)}
							{view === 'clan_penning' && (
								<ClanColleter
									showNoticeClan={showNoticeClan}
									myClan={myClan}
								/>
							)}
							{view === 'clan_create' && <ClanCreateQ setView={updateView} />}
							{view === 'clan_setting' && (
								<ClanSettingQ
									setView={updateView}
									myClan={myClan}
								/>
							)}
							{view === 'clan_transfer' && (
								<ClanTransferQ
									setView={updateView}
									myClan={myClan}
								/>
							)}
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
							<button
								onClick={() => {
									deletClan();
									let dialog = document.getElementById(
										'clan_delete_q',
									) as HTMLDialogElement;
									if (dialog) {
										dialog.close();
									}
								}}
								className="py-2 px-4 rounded-lg bg-orange-500 text-white hover:duration-300 active:hover:scale-90">
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
							<button
								onClick={() => {
									leaveClan();
									let dialog = document.getElementById(
										'clan_leavel_q',
									) as HTMLDialogElement;
									if (dialog) {
										dialog.close();
									}
								}}
								className="py-2 px-4 rounded-lg bg-orange-500 text-white hover:duration-300 active:hover:scale-90">
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
							Bạn có muốn đuổi thành viên này ra khỏi Bang Hội này không?
						</p>
						<div className="flex flex-row w-full justify-around">
							<button
								onClick={() => {
									kickClan();
									let dialog = document.getElementById(
										'clan_kick_q',
									) as HTMLDialogElement;
									if (dialog) {
										dialog.close();
									}
								}}
								className="py-2 px-4 rounded-lg bg-orange-500 text-white hover:duration-300 active:hover:scale-90">
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
							{msgClans.map((m, i) => {
								const { content, uid, meta = {} } = m;
								const { avatar = '3', name = 'nro' } = meta;
								return (
									<div
										key={i + 'chat_box'}
										className={`chat ${
											uid !== (user._id ?? '') ? 'chat-start' : 'chat-end'
										}`}>
										<div className="chat-image avatar">
											<div className="w-10 rounded-box border border-orange-500">
												<img
													alt="Tailwind CSS chat bubble component"
													src={`/image/avatar/${avatar ?? '3'}.webp`}
												/>
											</div>
										</div>
										<div className="chat-header">
											{uid === (user._id ?? '') ? 'Bạn' : name}
											{/* <time className="text-xs opacity-50">12:45</time> */}
										</div>
										<div className="chat-bubble">{content}</div>
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
								value={fieldMsgClan.content ?? ''}
								onChange={(e) =>
									setFieldMsgClan((f) => ({ ...f, content: e.target.value }))
								}
							/>
							<button
								disabled={isLoad}
								onClick={sendChatClan}
								className="border border-orange-500 rounded-box text-center p-2 active:hover:scale-90 hover:duration-300">
								<IoIosSend size={32} />
							</button>
						</div>
					</div>
				</div>
			</dialog>
			<dialog
				id="clan_notice_q"
				className="modal z-[1100]">
				<div className="modal-box font-chakra-petch text-orange-500 p-2">
					<div className="sticky top-0 backdrop-blur-lg flex flex-row w-full py-2 justify-between items-center uppercase font-bold">
						<h1 className="text-lg">Thông Báo - Bang Hội</h1>
						<form method="dialog">
							<button>
								<FaMinus size={24} />
							</button>
						</form>
					</div>
					<div className="flex flex-col gap-2 text-center">
						<p className="">{msg}</p>
					</div>
				</div>
			</dialog>
		</>
	);
}

// Clans List
const ClanList = (props: { setView: any; setMember: any }) => {
	const { setMember, setView } = props;
	const clans = useAppSelector((state) => state.clans);
	const user = useAppSelector((state) => state.user);
	const eConfig = useAppSelector((state) => state.econfig);

	const [channel, setChannel] = useState<Clan[]>([]);
	const [config, setConfig] = useState<EConfig>({});
	const [msg, setMsg] = useState<string>('');
	const [isLoad, setLoad] = useState<boolean>(false);

	const listClanMemberNoCall = async (clanId: string) => {
		try {
			const { data } = await apiClient.get(
				`/no-call/list/clan/member/${clanId}`,
			);
			setMember(data);
			setView('members');
		} catch (err: any) {
			console.log(err.response.data.message.message);
		}
	};

	const showNoticeClan = (message: string) => {
		let dialog = document.getElementById(
			'clan_notice_invite',
		) as HTMLDialogElement;
		if (dialog) {
			dialog.show();
			setMsg(message);
		}
	};

	const sendColleter = async (clanId: string) => {
		setLoad((e) => !e);
		try {
			if (!user.isLogin) return showNoticeClan('Bạn chưa đăng nhập');
			const { data } = await apiClient.post(
				'/clan/invite/create',
				{
					clanId: clanId,
				},
				{
					headers: {
						Authorization: 'Bearer ' + user.token,
					},
				},
			);
			showNoticeClan(data.message);
		} catch (err: any) {
			return showNoticeClan(err.response.data.message.message);
		} finally {
			setLoad((e) => !e);
		}
	};

	// Auto Update List Clan
	useEffect(() => {
		if (clans && clans.length > 0) {
			// Tạo một bản sao của mảng clans trước khi sắp xếp
			const targets = [...clans].sort(
				(a, b) => (b?.score ?? 0) - (a?.score ?? 0),
			);

			let new_main_server = targets;
			let new_channel: Clan[] = [];

			for (const msg of new_main_server) {
				if (new_channel.length >= 10) {
					new_channel.shift(); // Removes the oldest message if the array exceeds 10 messages
				}
				new_channel.push(msg);
			}

			if (new_channel.length > 0) {
				// Sắp xếp và cập nhật channel với bản sao
				setChannel(
					[...new_channel].sort((a, b) => (b?.score ?? 0) - (a?.score ?? 0)),
				);
			} else {
				setChannel([]);
			}
		}
	}, [clans]);

	// Auto Status Config;
	useEffect(() => {
		const target = [...eConfig].find((c) => c.name === 'e_clan');
		if (target) {
			setConfig(target);
		}
	}, [eConfig]);
	return (
		<div className="flex flex-col gap-2 overflow-auto h-[400px] w-full p-2 bg-black/30 rounded-lg scroll-smooth snap-y">
			{channel.map((c, i) => {
				const { meta = {}, score = 0, member = 0, _id = '' } = c;
				const { name = 'nro', type = '1', description = 'nrogame' } = meta;
				return (
					<div
						key={i + '_list_clans'}
						className="flex flex-row items-center justify-between gap-2 hover:bg-white/10 hover:duration-500 transition-all ease-in-out rounded-lg  snap-center">
						{/* Avatar & Info */}
						<div
							onClick={() => listClanMemberNoCall(_id)}
							className="flex flex-row gap-2 items-center cursor-pointer">
							<div className="avatar">
								<div className="lg:w-24 w-12 rounded-xl">
									<img src={`/image/banghoi/b${type}.gif`} />
								</div>
							</div>
							<div className="flex flex-col font-bold lg:text-base text-sm">
								<h1>{name}</h1>
								<p className="flex flex-row items-center gap-2">
									{description}
								</p>
							</div>
						</div>
						{/* Button xin gia nhap */}
						<button
							onClick={() => sendColleter(_id)}
							className="btn bg-green-500 text-white rounded-lg btn-sm">
							{isLoad ? (
								<span className="loading loading-bars loading-sm"></span>
							) : (
								'Xin vào'
							)}
						</button>
						{/* Score & Length Menbers */}
						<div className="flex flex-col gap-2 font-bold items-end">
							<p className="font-sf-trans-robotics uppercase lg:text-base text-xs">
								{new Intl.NumberFormat('vi').format(score)}{' '}
								<span className="font-chakra-petch">điểm</span>
							</p>
							<p className="font-protest-strike-regular flex flex-row gap-2 items-center lg:text-base text-xs">
								{member}/{config?.option?.max}{' '}
								<span>
									<FaUsers size={24} />
								</span>
							</p>
						</div>
					</div>
				);
			})}
			<dialog
				id="clan_notice_invite"
				className="modal z-[1100]">
				<div className="modal-box font-chakra-petch text-orange-500 p-2">
					<div className="sticky top-0 backdrop-blur-lg flex flex-row w-full py-2 justify-between items-center uppercase font-bold">
						<h1 className="text-lg">Thông Báo - Bang Hội</h1>
						<form method="dialog">
							<button>
								<FaMinus size={24} />
							</button>
						</form>
					</div>
					<div className="flex flex-col gap-2 text-center">
						<p className="">{msg}</p>
					</div>
				</div>
			</dialog>
		</div>
	);
};

const MemberList = (props: {
	member: MemberClan[];
	setTarget: any;
	myClan?: Clan | null;
}) => {
	const user = useAppSelector((state) => state.user);
	const { member, setTarget, myClan } = props;
	return (
		<div className="flex flex-col gap-2 overflow-auto h-[400px] w-full p-2 bg-black/30 rounded-lg scroll-smooth snap-y">
			{member.map((m, i) => {
				const { meta = {}, money, name } = m;
				const { avatar = '3', timeJoin = new Date(), score = 0 } = meta;
				let balance = new Intl.NumberFormat('vi')
					.format(money ?? 0)
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
									<img src={`/image/avatar/${avatar ?? '3'}.webp`} />
								</div>
							</div>
							<div className="flex flex-col font-bold lg:text-base text-sm">
								<h1 className="text-lg">{name ?? 'nro'}</h1>
								<p className="flex lg:flex-row flex-col items-center lg:gap-2 gap-1">
									Ngày gia nhập:
									<span className="">
										{moment(timeJoin).format('DD/MM/YYYY HH:mm')}
									</span>
								</p>
								{user.isLogin &&
									myClan &&
									myClan?.ownerId === user._id &&
									m._id !== user._id && (
										<button
											onClick={() => {
												setTarget(m._id);
												openKickClanQ();
											}}
											className="btn btn-sm text-white bg-orange-500">
											Đuổi
										</button>
									)}
							</div>
						</div>
						{/* Score & Balance */}
						<div className="flex flex-col gap-2 font-bold lg:text-base text-xs text-nowrap">
							<p className="font-sf-trans-robotics uppercase flex flex-row gap-2 ">
								<span className="font-chakra-petch">điểm:</span>
								{new Intl.NumberFormat('vi').format(score ?? 0)}{' '}
							</p>
							<p className="font-protest-strike-regular flex flex-row gap-2 items-center">
								<p className="font-sf-trans-robotics uppercase flex flex-row gap-2">
									<span className="font-chakra-petch">Số Dư:</span>
									{myClan?.ownerId !== user?._id &&
										(balance.length <= 3
											? '***'
											: balance.length > 6
											? '***.' + balance.slice(-3)
											: balance)}
									{myClan?.ownerId === user?._id &&
										new Intl.NumberFormat('vi').format(money)}
								</p>
							</p>
						</div>
					</div>
				);
			})}
		</div>
	);
};

const ClanColleter = (props: { showNoticeClan: any; myClan?: Clan | null }) => {
	const { showNoticeClan, myClan } = props;
	const invites = useAppSelector((state) => state.invites);
	const user = useAppSelector((state) => state.user);

	const addMember = async (inviteId: string) => {
		try {
			if (!user.isLogin) return;
			const { data } = await apiClient.post(
				'/clan/invite/acpect',
				{
					inviteId,
				},
				{
					headers: {
						Authorization: 'Bearer ' + user.token,
					},
				},
			);
			showNoticeClan(data.message);
		} catch (err: any) {
			showNoticeClan(err.response.data.message.message);
		}
	};
	const removeMember = async (inviteId: string) => {
		try {
			if (!user.isLogin) return;
			const { data } = await apiClient.post(
				'/clan/invite/remove',
				{
					inviteId,
				},
				{
					headers: {
						Authorization: 'Bearer ' + user.token,
					},
				},
			);
			showNoticeClan(data.message);
		} catch (err: any) {
			showNoticeClan(err.response.data.message.message);
		}
	};
	return (
		<div className="flex flex-col gap-2 overflow-auto h-[400px] w-full p-2 bg-black/30 rounded-lg scroll-smooth snap-y">
			{invites
				?.filter((invite) => invite?.clanId === myClan?._id)
				?.map((invite, i) => {
					const { meta = {}, createdAt, _id = '' } = invite;
					const { name = 'nro', avatar = '3' } = meta;
					return (
						<div
							key={i + '_colleter_clan'}
							className="flex flex-row items-center justify-between gap-2 hover:bg-white/10 hover:duration-500 transition-all ease-in-out rounded-lg cursor-pointer snap-center">
							{/* Avatar & Info */}
							<div className="flex flex-row gap-2 items-center">
								<div className="avatar">
									<div className="lg:w-24 w-12 rounded-xl">
										<img src={`/image/avatar/${avatar ?? '3'}.webp`} />
									</div>
								</div>
								<div className="flex flex-col font-bold lg:text-base text-sm">
									<h1>{name}</h1>
									<p className="flex lg:flex-row flex-col items-center lg:gap-2 gap-1">
										Ngày xin gia nhập:
										<span className="">
											{moment(createdAt).format('DD/MM/YYYY HH:mm')}
										</span>
									</p>
								</div>
							</div>
							{/* Acpect & Dispect */}
							<div className="flex flex-col gap-2 font-bold lg:text-base text-xs">
								<button
									onClick={() => addMember(_id)}
									className="lg:py-2 py-1 lg:px-4 px-2 rounded-lg flex flex-row gap-2 items-center bg-orange-500 text-white font-bold">
									<FaPlusSquare />
									Chấp Nhận
								</button>
								<button
									onClick={() => removeMember(_id)}
									className="lg:py-2 py-1 lg:px-4 px-2 rounded-lg flex flex-row gap-2 items-center bg-black border border-orange-500 text-orange-500 font-bold">
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

const ClanCreateQ = ({ setView }: { setView: any }) => {
	const user = useAppSelector((state) => state.user);
	const [field, setField] = useState<FieldCreateClan>({
		type: '1',
	});
	const [msg, setMsg] = useState<string>('');
	const [isLoad, setLoad] = useState<boolean>(false);
	const eConfig = useAppSelector((state) => state.econfig);
	const [config, setConfig] = useState<EConfig>({});
	const [prices, setPrices] = useState<number[]>([
		10000000, 100000000, 1000000000, 3000000000, 3000000000, 3000000000,
		5000000000, 5000000000, 5000000000,
	]);

	// Auto Status Config;
	useEffect(() => {
		const target = eConfig.find((c) => c.name === 'e_clan');
		if (target) {
			setConfig(target);
		}
	}, [eConfig]);

	useEffect(() => {
		if (config) {
			let { option } = config;
			if (option) {
				let {
					price = [
						10000000, 100000000, 1000000000, 3000000000, 3000000000, 3000000000,
						5000000000, 5000000000, 5000000000,
					],
				} = option;
				setPrices(price);
			}
		}
	}, [config]);

	const createClan = async () => {
		setLoad(true);
		try {
			const { type, description, name } = field;
			if (!user.isLogin) return showNoticeClan('Bạn chưa đăng nhập');
			if (!type || type.length === 0)
				return showNoticeClan('Xin vui lòng chọn biểu tượng Bang hội');
			if (!description || description.length === 0)
				return showNoticeClan('Xin vui lòng điền giới thiệu bang hội');
			if (!name || name.length === 0)
				return showNoticeClan('Xin vui lòng đặt tên Bang Hội');
			const { data } = await apiClient.post(
				'/clan/create',
				{
					meta: { ...field, type: Number(type) },
				},
				{
					headers: {
						Authorization: 'Bearer ' + user.token,
					},
				},
			);

			const { message } = data;
			showNoticeClan(message);
			setView('members');
		} catch (err: any) {
			const { message } = err.response.data.message;
			showNoticeClan(message);
		} finally {
			setLoad(false);
		}
	};

	const showNoticeClan = (message: string) => {
		let dialog = document.getElementById(
			'clan_notice_create',
		) as HTMLDialogElement;
		if (dialog) {
			dialog.show();
			setMsg(message);
		}
	};
	return (
		<div className="w-full flex justify-center items-center">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					createClan();
				}}
				className="flex flex-col w-full max-w-md gap-4">
				<label className="input input-bordered flex items-center gap-2 text-nowrap">
					Tên Bang Hội
					<input
						type="text"
						className="grow"
						onChange={(e) => setField((f) => ({ ...f, name: e.target.value }))}
					/>
				</label>
				<label className="input input-bordered flex items-center gap-2">
					Giới Thiệu
					<input
						type="text"
						className="grow"
						onChange={(e) =>
							setField((f) => ({ ...f, description: e.target.value }))
						}
					/>
				</label>
				<label className="flex items-center gap-2">
					<select
						defaultValue={'1'}
						onChange={(e) => {
							setField((f) => ({ ...f, type: e.target.value }));
						}}
						className="select w-full max-w-xs">
						{Array.from({ length: 9 }).map((_, i) => {
							return (
								<option
									key={i + 'create_clan'}
									value={`${i + 1}`}>
									Loại {i + 1}
								</option>
							);
						})}
					</select>
					<img
						src={`/image/banghoi/b${field.type ?? '1'}.gif`}
						style={{ width: '52px', height: 'auto' }}
						alt={`type_clan_${field.type ?? '1'}_b`}
					/>
				</label>
				<label className="input input-bordered flex items-center gap-2">
					Chi Phí
					<input
						type="text"
						className="grow font-number-font"
						disabled
						value={new Intl.NumberFormat('vi').format(
							prices[parseInt(field.type ?? '1', 10) - 1] ?? 10000000,
						)}
					/>
				</label>

				<button
					disabled={isLoad}
					className="py-2 px-4 rounded-lg bg-orange-500 text-white hover:duration-300 active:hover:scale-90"
					type="submit">
					{isLoad ? (
						<span className="loading loading-bars loading-sm"></span>
					) : (
						'Tạo Bang Hội'
					)}
				</button>
			</form>
			<dialog
				id="clan_notice_create"
				className="modal z-[1100]">
				<div className="modal-box font-chakra-petch text-orange-500 p-2">
					<div className="sticky top-0 backdrop-blur-lg flex flex-row w-full py-2 justify-between items-center uppercase font-bold">
						<h1 className="text-lg">Thông Báo - Bang Hội</h1>
						<form method="dialog">
							<button>
								<FaMinus size={24} />
							</button>
						</form>
					</div>
					<div className="flex flex-col gap-2 text-center">
						<p className="">{msg}</p>
					</div>
				</div>
			</dialog>
		</div>
	);
};

const ClanSettingQ = ({
	setView,
	myClan,
}: {
	setView: any;
	myClan?: Clan | null;
}) => {
	const user = useAppSelector((state) => state.user);
	const [field, setField] = useState<FieldUpdateClan>({});
	const [msg, setMsg] = useState<string>('');
	const [isLoad, setLoad] = useState<boolean>(false);
	const eConfig = useAppSelector((state) => state.econfig);
	const [config, setConfig] = useState<EConfig>({});
	const [prices, setPrices] = useState<number[]>([
		10000000, 100000000, 1000000000, 3000000000, 3000000000, 3000000000,
		5000000000, 5000000000, 5000000000,
	]);

	// Auto Status Config;
	useEffect(() => {
		const target = eConfig.find((c) => c.name === 'e_clan');
		if (target) {
			setConfig(target);
		}
	}, [eConfig]);

	useEffect(() => {
		if (config) {
			let { option } = config;
			if (option) {
				let {
					price = [
						10000000, 100000000, 1000000000, 3000000000, 3000000000, 3000000000,
						5000000000, 5000000000, 5000000000,
					],
				} = option;
				setPrices(price);
			}
		}
	}, [config]);

	const updateClan = async () => {
		setLoad(true);
		try {
			if (!user.isLogin) return showNoticeClan('Bạn chưa đăng nhập');
			if (!myClan) return showNoticeClan('Đã xảy ra lỗi, xin vui lòng thử lại');
			const { data } = await apiClient.post(
				'/clan/update',
				{
					data: { ...field },
					clanId: myClan?._id ?? '',
				},
				{
					headers: {
						Authorization: 'Bearer ' + user.token,
					},
				},
			);

			const { message } = data;
			showNoticeClan(message);
			setView('members');
		} catch (err: any) {
			const { message } = err.response.data.message;
			showNoticeClan(message);
		} finally {
			setLoad(false);
		}
	};

	const showNoticeClan = (message: string) => {
		let dialog = document.getElementById(
			'clan_notice_create',
		) as HTMLDialogElement;
		if (dialog) {
			dialog.show();
			setMsg(message);
		}
	};
	return (
		<div className="w-full flex justify-center items-center">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					updateClan();
				}}
				className="flex flex-col w-full max-w-md gap-4">
				<label className="input input-bordered flex items-center gap-2 text-nowrap">
					Tên Bang Hội
					<input
						type="text"
						className="grow"
						value={myClan?.meta?.name ?? 'LOADING'}
						disabled
					/>
				</label>
				<label className="input input-bordered flex items-center gap-2">
					Giới Thiệu
					<input
						type="text"
						className="grow"
						defaultValue={myClan?.meta?.description ?? 'LOADING'}
						onChange={(e) =>
							setField((f) => ({ ...f, description: e.target.value }))
						}
					/>
				</label>
				<label className="flex items-center gap-2">
					<select
						defaultValue={`${myClan?.meta?.type ?? '1'}`}
						onChange={(e) => {
							setField((f) => ({ ...f, type: e.target.value }));
						}}
						className="select w-full max-w-xs">
						{Array.from({ length: 9 }).map((_, i) => {
							return (
								<option
									key={i + 'setting_clan'}
									disabled={myClan?.meta?.type === i + 1}
									value={`${i + 1}`}>
									Loại {i + 1}
								</option>
							);
						})}
					</select>
					<img
						src={`/image/banghoi/b${field.type ?? '1'}.gif`}
						style={{ width: '52px', height: 'auto' }}
						alt={`type_clan_${field.type ?? '1'}_b`}
					/>
				</label>
				<label className="input input-bordered flex items-center gap-2">
					Chi Phí
					<input
						type="text"
						className="grow font-number-font"
						disabled
						value={new Intl.NumberFormat('vi').format(
							prices[parseInt(field.type ?? '1', 10) - 1] ?? 10000000,
						)}
					/>
				</label>

				<button
					disabled={isLoad || (!field.description && !field.type)}
					className="py-2 px-4 rounded-lg bg-orange-500 text-white hover:duration-300 active:hover:scale-90"
					type="submit">
					{isLoad ? (
						<span className="loading loading-bars loading-sm"></span>
					) : (
						'Cật nhập Bang Hội'
					)}
				</button>
			</form>
			<dialog
				id="clan_notice_create"
				className="modal z-[1100]">
				<div className="modal-box font-chakra-petch text-orange-500 p-2">
					<div className="sticky top-0 backdrop-blur-lg flex flex-row w-full py-2 justify-between items-center uppercase font-bold">
						<h1 className="text-lg">Thông Báo - Bang Hội</h1>
						<form method="dialog">
							<button>
								<FaMinus size={24} />
							</button>
						</form>
					</div>
					<div className="flex flex-col gap-2 text-center">
						<p className="">{msg}</p>
					</div>
				</div>
			</dialog>
		</div>
	);
};

const ClanTransferQ = ({
	setView,
	myClan,
}: {
	setView: any;
	myClan?: Clan | null;
}) => {
	const user = useAppSelector((state) => state.user);
	const [field, setField] = useState<string | null>(null);
	const [msg, setMsg] = useState<string>('');
	const [isLoad, setLoad] = useState<boolean>(false);

	const tranferClan = async () => {
		setLoad(true);
		try {
			if (!user.isLogin) return showNoticeClan('Bạn chưa đăng nhập');
			if (!field)
				return showNoticeClan('Xin vui lòng nhập ID chủ bang hội mới');
			if (!myClan) return showNoticeClan('Đã xảy ra lỗi, xin vui lòng thử lại');
			if (field.length !== 24)
				return showNoticeClan('ID người dùng không hợp lệ');
			const { data } = await apiClient.post(
				'/clan/tranfer',
				{
					new_ownerId: field,
					clanId: myClan?._id ?? '',
				},
				{
					headers: {
						Authorization: 'Bearer ' + user.token,
					},
				},
			);

			const { message } = data;
			showNoticeClan(message);
			setView('members');
		} catch (err: any) {
			const { message } = err.response.data.message;
			showNoticeClan(message);
		} finally {
			setLoad(false);
		}
	};

	const showNoticeClan = (message: string) => {
		let dialog = document.getElementById(
			'clan_notice_create',
		) as HTMLDialogElement;
		if (dialog) {
			dialog.show();
			setMsg(message);
		}
	};
	return (
		<div className="w-full flex justify-center items-center">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					tranferClan();
				}}
				className="flex flex-col w-full max-w-md gap-4">
				<label className="input input-bordered flex items-center gap-2 text-nowrap">
					Tên Bang Hội
					<input
						type="text"
						className="grow"
						value={myClan?.meta?.name ?? 'LOADING'}
						disabled
					/>
				</label>
				<label className="input input-bordered flex items-center gap-2">
					Chủ Bang Hội
					<input
						type="text"
						className="grow"
						defaultValue={
							myClan?.ownerId === user?._id
								? user.name
								: 'Bạn không phải là chủ bang hội'
						}
						disabled
					/>
				</label>
				<label className="input input-bordered flex items-center gap-2">
					Chủ Bang Hội Mới
					<input
						type="text"
						className="grow"
						placeholder="Xin vui lòng nhập ID Chủ Bang Hội Mới"
						onChange={(e) => setField(e.target.value)}
					/>
				</label>

				<button
					disabled={isLoad || !field}
					className="py-2 px-4 rounded-lg bg-orange-500 text-white hover:duration-300 active:hover:scale-90"
					type="submit">
					{isLoad ? (
						<span className="loading loading-bars loading-sm"></span>
					) : (
						'Chuyển Bang Hội'
					)}
				</button>

				<div className="flex flex-col gap-1 text-sm shadow-inner shadow-orange-500 text-white p-2 rounded-box bg-orange-500 font-bold">
					<p>
						Lưu ý: Khi chuyển nhượng Bang hội, bạn sẽ chuyển thành Member trong
						bang hội
					</p>
				</div>
			</form>
			<dialog
				id="clan_notice_create"
				className="modal z-[1100]">
				<div className="modal-box font-chakra-petch text-orange-500 p-2">
					<div className="sticky top-0 backdrop-blur-lg flex flex-row w-full py-2 justify-between items-center uppercase font-bold">
						<h1 className="text-lg">Thông Báo - Bang Hội</h1>
						<form method="dialog">
							<button>
								<FaMinus size={24} />
							</button>
						</form>
					</div>
					<div className="flex flex-col gap-2 text-center">
						<p className="">{msg}</p>
					</div>
				</div>
			</dialog>
		</div>
	);
};

export default Clans;
