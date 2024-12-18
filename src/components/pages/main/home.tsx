'use client';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import { GiPerspectiveDiceSixFacesTwo } from 'react-icons/gi';
import {
	IoIosSend,
	IoIosStarHalf,
	IoLogoGameControllerB,
} from 'react-icons/io';
import { SiGamejolt, SiZalo } from 'react-icons/si';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { setServer } from '@/lib/redux/storage/minigame/server';
import {
	FaBook,
	FaBookmark,
	FaExchangeAlt,
	FaFacebook,
	FaRegUser,
	FaTable,
} from 'react-icons/fa';
import Link from 'next/link';
import { PiHandDepositFill, PiHandWithdrawFill } from 'react-icons/pi';
import Modal from '@/components/controller/Modal';
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5';

import Typewriter from 'typewriter-effect';
import { BetField, MessageField, typeBet } from './(dto)/dto.bet';
import { MiniGame } from '@/lib/redux/storage/minigame/minigame';
import moment from 'moment';
import { Message } from '@/lib/redux/storage/user/message';
import apiClient from '@/lib/server/apiClient';
import { updateUser } from '@/lib/redux/storage/user/user';
import { useSocket } from '@/lib/server/socket';
import { TbPokerChip } from 'react-icons/tb';
import { setClans } from '@/lib/redux/storage/clan/clans';
import { setConfigs } from '@/lib/redux/storage/eshop/config';
import { io, Socket } from 'socket.io-client';

const urlConfig = {
	dev: 'http://localhost:3037',
	vps: 'http://144.126.145.81:3037',
	sv: 'https://api.nrogame.me',
};

export const getNumbetFromString = (value: string) => {
	let num = value.replace(/[^\d]/g, '');
	return num ? new Intl.NumberFormat().format(parseInt(num, 10)) : '';
};

export const autoScrollChatBox = () => {
	let chat_box_screen = document.getElementById(
		'chat_box_screen',
	) as HTMLDivElement;
	if (chat_box_screen) {
		chat_box_screen.scrollTop = chat_box_screen.scrollHeight;
	}
};

const slogans = [
	'Mini Game CSMM Ngọc Rồng Online',
	'Chơi Mini Game, Nhận Vàng Ngay',
	'Tự Động - Ưu Đãi Hấp Dẫn - Uy Tín 100%',
	'Giao Dịch Tự Động - An Toàn - Chất Lượng',
];

function Home() {
	// Redux
	const user = useAppSelector((state) => state.user);
	const jackpot = useAppSelector((state) => state.jackpot);
	const server = useAppSelector((state) => state.server);
	const minigame = useAppSelector((state) => state.minigame);
	const messages = useAppSelector((state) => state.messages);
	const econfig = useAppSelector((state) => state.econfig);
	const clans = useAppSelector((state) => state.clans);
	const users = useAppSelector((state) => state.userTop);
	const [top, setTop] = useState<number | null>(null);
	const dispatch = useAppDispatch();
	// defautl data;
	const betFile_defautl: BetField = {
		amount: '0',
		betId: '',
		place: '',
		server: server.toString(),
		typeBet: 'cl',
		uid: '',
	};
	// Socket
	const socket = useSocket();
	// React State
	const [gameBox, setGameBox] = useState<MiniGame | undefined>();
	const [banner, setBanner] = useState<string[]>([]);
	const [channel, setChannel] = useState<Message[]>([]);
	const [counter, setCounter] = useState<number | null>(null);
	const [typeBet, setTypeBet] = useState<typeBet>('cl');
	const [betField, setBetField] = useState<BetField>({
		...betFile_defautl,
		amount: '0',
	});
	const [msg, setMsg] = useState<MessageField>();
	const [notice, setNotice] = useState<string>();
	const [isLoad, setLoad] = useState<boolean>(false);
	const socketAuth = useRef<Socket | null>(null);

	const showNotice = (type: 'controll' | 'chat-box', mess: string) => {
		switch (type) {
			case 'controll':
				const div_notice = document.getElementById(
					'notice-bet-controll',
				) as HTMLDivElement;
				if (div_notice) {
					div_notice.classList.toggle('hidden');
					setNotice(mess);
				}
				break;
			default:
				const dialog_notice = document.getElementById(
					'chat-box',
				) as HTMLDialogElement;
				if (dialog_notice) {
					dialog_notice.show();
					setNotice(mess);
				}
				break;
		}
		let autoClose = setTimeout(() => {
			let div_notice = document.getElementById(
				'notice-bet-controll',
			) as HTMLDivElement;
			let dialog_notice = document.getElementById(
				'chat-box',
			) as HTMLDialogElement;
			if (dialog_notice && type === 'chat-box') {
				dialog_notice.close();
			}

			if (div_notice && type === 'controll') {
				div_notice.classList.toggle('hidden');
			}
		}, 3e3);
		return () => {
			clearTimeout(autoClose);
		};
	};

	const resetBetFildAndNotice = (msg: string) => {
		setBetField(betFile_defautl);
		return showNotice('controll', msg);
	};

	const placeBet = async () => {
		const { amount, place, typeBet } = betField;
		const { isLogin, token } = user;

		// Input validation
		if (!isLogin) {
			resetBetFildAndNotice('Bạn chưa đăng nhập');
			return;
		}

		if (!gameBox || !gameBox._id) {
			resetBetFildAndNotice('Phiên cược không tồn tại');
			return;
		}

		const n_amount = Number(amount);
		if (n_amount <= 0) {
			resetBetFildAndNotice('Xin vui lòng đặt tiền cược');
			return;
		}

		if (!place?.length) {
			resetBetFildAndNotice('Xin vui lòng đặt cược');
			return;
		}

		if (!typeBet?.length) {
			resetBetFildAndNotice('Xin vui lòng chọn hình thức cược');
			return;
		}

		try {
			if (!socketAuth.current) {
				return resetBetFildAndNotice(
					'Bạn chưa đăng nhập, xin vui lòng đăng nhập',
				);
			}
			setLoad(true);
			socketAuth.current.emit('minigame.place', {
				...betField,
				amount: n_amount,
				betId: gameBox._id,
				server,
			});
		} catch (err: any) {}
	};

	const sendMsg = () => {
		if (!user.isLogin) return showNotice('chat-box', 'Bạn chưa đăng nhập');
		if (!msg) return showNotice('chat-box', 'Xin vui lòng nhập tin nhắn');
		const { content } = msg;
		if (!content) return showNotice('chat-box', 'Xin vui lòng nhập tin nhắn');
		if (content.length < 1)
			return showNotice('chat-box', 'Xin vui lòng nhập tin nhắn');
		socket.emit('user.chat', {
			content,
			server,
			uid: user._id,
			token: user.token,
		});
		setMsg({});
	};
	// Auto show ads
	useEffect(() => {
		const modal = document.getElementById('home_ads') as HTMLDialogElement;
		if (modal) {
			modal.show();
		}
	}, []);

	// Auto Scroll ChatBox
	useEffect(() => {
		const openChatBoxHook = () => {
			let chat_box_screen = document.getElementById(
				'chat_box_screen',
			) as HTMLDivElement;
			if (chat_box_screen) {
				chat_box_screen.scrollTop = chat_box_screen.scrollHeight;
			}
		};
		openChatBoxHook();
	}, []);

	useEffect(() => {
		setBetField((f) => ({
			...f,
			amount: '',
			place: '',
			server: server.toString(),
			typeBet: 'cl',
		}));
		setTypeBet('cl');
		setMsg((m) => ({ ...m, server: server.toString() }));
		// get Data mini sv;
		socket.emit('info.mini', server);
	}, [server]);

	// Update Realtime Minigame with Server
	useEffect(() => {
		if (server) {
			const target = [...minigame].find((m) => m.server === server);
			setGameBox(target);
		}
		return () => {
			setGameBox({});
		};
	}, [server, minigame]);

	useEffect(() => {
		if (gameBox) {
			const loop = setInterval(() => {
				let now = moment().unix();
				let timeEnd = moment(gameBox?.timeEnd).unix();
				let time = Math.floor(timeEnd - now);
				if (time < 0) {
					setCounter(null);
				} else {
					setCounter(time);
				}
			}, 1e3);
			return () => {
				clearInterval(loop);
			};
			// }
		}
	}, [gameBox]);

	// Update realtime chat;
	useEffect(() => {
		if (server && messages && messages.length > 0) {
			const targets = [...messages]
				?.filter((m) => m?.server === server || m?.server === 'all')
				.sort(
					(a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
				);
			let new_main_server = targets;
			let new_channel: Message[] = [];
			for (const msg of new_main_server) {
				if (new_channel.length >= 10) {
					new_channel.shift(); // Removes the oldest message if the array exceeds 10 messages
				}
				new_channel.push(msg);
			}
			if (new_channel.length > 0) {
				setChannel(
					new_channel?.sort(
						(a, b) => moment(a?.createdAt).unix() - moment(b?.createdAt).unix(),
					),
				);
			} else {
				setChannel([]);
			}
		}
	}, [server, messages]);

	// Update banner
	useEffect(() => {
		if (econfig) {
			const target = [...econfig].find((e) => e.name === 'e_banner');
			if (target) {
				setBanner(target?.option?.banner ?? []);
			}
		}
	}, [econfig]);

	// Auto Call Request;
	useEffect(() => {
		const listClan = async () => {
			try {
				const { data } = await apiClient.get('/no-call/list/clan');
				dispatch(setClans(data));
			} catch (err: any) {
				console.log(err.response.data.message.message);
			}
		};
		const listConfig = async () => {
			try {
				const { data } = await apiClient.get('/no-call/list/econfig');
				dispatch(setConfigs(data));
			} catch (err: any) {
				console.log(err.response.data.message.message);
			}
		};
		listClan();
		listConfig();
	}, []);

	useEffect(() => {
		const showModleSocket = (message: string) => {
			const div_notice = document.getElementById(
				'notice-bet-controll',
			) as HTMLDivElement;
			if (div_notice) {
				div_notice.classList.toggle('hidden');
				setNotice(message);
			}
			let autoClose = setTimeout(() => {
				let div_notice = document.getElementById(
					'notice-bet-controll',
				) as HTMLDivElement;
				if (div_notice) {
					div_notice.classList.toggle('hidden');
				}
			}, 3e3);
			return () => {
				clearTimeout(autoClose);
			};
		};
		if (user.isLogin || user.token) {
			const socket_auth: Socket = io(`${urlConfig.sv}/auth`, {
				path: '/socket.io/',
				transports: ['websocket'],
				secure: true,
				reconnectionAttempts: 5, // Limit reconnection attempts
				auth: {
					token: `${user.token}`, // Ensure to pass a valid token
				},
			});
			socketAuth.current = socket_auth;

			socket_auth.on(
				'minigame.place.re',
				(data: { message: string; user?: any }) => {
					showModleSocket(data.message);
					dispatch(updateUser(data.user));
					setLoad(false);
				},
			);

			socket_auth.on('error', (data: { message: string }) => {
				showModleSocket(data.message);
				setLoad(false);
			});
			return () => {
				socketAuth.current = null;
				socket_auth.off('error');
				socket_auth.off('minigame.place.re');
				socket_auth.disconnect();
			};
		}
	}, [user, socketAuth, dispatch]);

	const openTutorialJackpot = () => {
		let dialog = document.getElementById(
			'tutorial_jackpot',
		) as HTMLDialogElement;
		if (dialog) {
			dialog.show();
		}
	};

	return (
		<div
			// style={{ backgroundImage: "url('/image/background/2_main.webp')" }}
			className="min-h-screen flex flex-col w-full justify-center items-center gap-4 p-4 bg-no-repeat bg-cover bg-right select-none font-chakra-petch bg-white">
			{/* Hero */}
			<div className="max-w-7xl flex flex-col items-center text-orange-500 w-full">
				<h1 className="lg:text-3xl text-xl font-bold uppercase">nrogame.me</h1>
				<div className="py-2 lg:text-2xl text-sm w-full text-center">
					<Typewriter
						options={{
							strings: slogans,
							autoStart: true,
							loop: true,
							deleteSpeed: 1,
							delay: 50,
						}}
					/>
				</div>
			</div>
			{/* Button Game */}
			<div className="max-w-7xl w-full flex flex-wrap justify-center gap-2 items-center">
				{Array.from({ length: 7 }).map((_, k) => (
					<button
						key={`${k}-button`}
						onClick={() => {
							dispatch(setServer(`${k + 1}`));
							autoScrollChatBox();
						}}
						className={`font-bold flex flex-row p-3 rounded-box shadow-sm gap-2 text-nowrap items-center transition-colors ease-linear ${
							server === `${k + 1}`
								? 'shadow-orange-500 bg-orange-500 text-white'
								: 'shadow-current bg-base-200'
						}`}>
						{/* <IoLogoGameControllerB size={24} /> */}
						<p>Máy Chủ {k + 1}</p>
					</button>
				))}
				<button
					onClick={() => {
						dispatch(setServer('8'));
						autoScrollChatBox();
					}}
					className={`font-bold flex flex-row p-3 rounded-box shadow-sm gap-2 text-nowrap items-center transition-colors ease-linear ${
						server === '8'
							? 'shadow-orange-500 bg-orange-500 text-white'
							: 'shadow-current bg-base-200'
					}`}>
					Máy Chủ Gộp
				</button>
				{Array.from({ length: 3 }).map((_, k) => (
					<button
						key={`${k}-button`}
						onClick={() => {
							dispatch(setServer(`${k + 11}`));
							autoScrollChatBox();
						}}
						className={`font-bold flex flex-row p-3 rounded-box shadow-sm gap-2 text-nowrap items-center transition-colors ease-linear ${
							server === `${k + 11}`
								? 'shadow-orange-500 bg-orange-500 text-white'
								: 'shadow-current bg-base-200'
						}`}>
						{/* <IoLogoGameControllerB size={24} /> */}
						<p>Máy Chủ {k + 11}</p>
					</button>
				))}
				<button
					onClick={() => {
						dispatch(setServer('24'));
						autoScrollChatBox();
					}}
					className={`font-bold flex flex-row p-3 rounded-box shadow-sm gap-2 text-nowrap items-center transition-colors ease-linear ${
						server === '24'
							? 'shadow-orange-500 bg-orange-500 text-white'
							: 'shadow-current bg-base-200'
					}`}>
					Máy Chủ 24/24
				</button>
			</div>
			{/* Group Func Quick */}
			<div className="flex flex-wrap justify-center items-center w-full capitalize gap-5">
				<div className="dropdown dropdown-bottom dropdown-end">
					<div
						tabIndex={0}
						role="button"
						className="flex flex-row gap-2 items-center rounded-box p-3 bg-orange-500 text-white font-chakra-petch active:hover:scale-90 hover:duration-300">
						<FaBook />
						Chức Năng
					</div>
					<ul
						tabIndex={0}
						className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-white">
						<li>
							<Link
								href="/deposit"
								className="link decoration-transparent flex justify-start items-center gap-2 hover:text-orange-500 hover:transition-colors hover:ease-in-out">
								<PiHandDepositFill size={24} />
								<p>Nạp vàng</p>
							</Link>
						</li>
						<li>
							<Link
								href="/withdraw"
								className="link decoration-transparent flex justify-start items-center gap-2 hover:text-orange-500 hover:transition-colors hover:ease-in-out">
								<PiHandWithdrawFill size={24} />
								<p>Rút vàng</p>
							</Link>
						</li>
						<li>
							<Link
								href={'/user/profile'}
								className="link decoration-transparent flex justify-start items-center gap-2 hover:text-orange-500 hover:transition-colors hover:ease-in-out">
								<FaRegUser size={24} />
								Cài Đặt Tài Khoản
							</Link>
						</li>
						<li>
							<Link
								href={'/user/trade_gold'}
								className="link decoration-transparent flex justify-start items-center gap-2 hover:text-orange-500 hover:transition-colors hover:ease-in-out">
								<FaExchangeAlt size={24} />
								Chuyển Vàng
							</Link>
						</li>
						<li>
							<Link
								href={'/user/exchange_diamon'}
								className="link decoration-transparent flex justify-start items-center gap-2 hover:text-orange-500 hover:transition-colors hover:ease-in-out">
								<FaExchangeAlt size={24} />
								Đổi Vàng
							</Link>
						</li>
						<li>
							<Link
								href={'/user/table_misson'}
								className="link decoration-transparent flex justify-start items-center gap-2 hover:text-orange-500 hover:transition-colors hover:ease-in-out">
								<FaTable size={24} />
								Bảng Nhiệm Vụ
							</Link>
						</li>
						<li>
							<Link
								href={'/user/table_vip'}
								className="link decoration-transparent flex justify-start items-center gap-2 hover:text-orange-500 hover:transition-colors hover:ease-in-out">
								<FaTable size={24} />
								Điểm Danh VIP
							</Link>
						</li>
					</ul>
				</div>
				<button
					onClick={() => {
						const model = document.getElementById(
							'home_tutorial',
						) as HTMLDialogElement;
						if (model) {
							model.show();
						}
					}}
					className="flex flex-row gap-2 items-center rounded-box p-3 bg-orange-500 text-white font-chakra-petch active:hover:scale-90 hover:duration-300">
					<FaBookmark />
					Hướng Dẫn
				</button>
				<Link
					href={'https://www.facebook.com/groups/congdongnrogame'}
					target="_blank"
					className="flex flex-row gap-2 items-center rounded-box p-3 bg-orange-500 text-white font-chakra-petch active:hover:scale-90 hover:duration-300">
					<FaFacebook />
					Group Facebook
				</Link>
				<Link
					href={'https://zalo.me/g/evqnqk421'}
					target="_blank"
					className="flex flex-row gap-2 items-center rounded-box p-3 bg-orange-500 text-white font-chakra-petch active:hover:scale-90 hover:duration-300">
					<SiZalo size={24} />
					Box Chat
				</Link>
			</div>
			{banner.length > 0 && (
				<div className="w-full flex items-center justify-center">
					<div className="w-full max-w-7xl p-2 overflow-hidden text-orange-500 font-bold text-nowrap">
						<div className="running flex items-center gap-5 ">
							{banner?.map((t: string) => {
								return (
									<div
										className="flex flex-row text-nowrap items-center gap-4"
										key={t}>
										<IoIosStarHalf className="spin" />
										<p>{t}</p>
										<IoIosStarHalf className="spin" />
									</div>
								);
							})}
						</div>
					</div>
				</div>
			)}
			{/* Game Info */}
			<div className="grid lg:grid-cols-2 max-w-7xl w-full gap-4 select-none h-fit p-2">
				{/* Left Size Game Board */}
				<div className="flex flex-col gap-5 w-full h-full">
					{/* Background game */}
					<div className="w-full flex flex-col justify-center items-center bg-auto bg-no-repeat bg-right rounded-box p-2 gap-4 border-ani border-none shadow-lg shadow-current">
						<svg
							className="svg"
							height="100%"
							width="100%"
							xmlns="http://www.w3.org/2000/svg">
							<rect
								rx="8"
								ry="8"
								className="line stroke-current rounded-box"
								height="100%"
								width="100%"
								strokeLinejoin="round"
							/>
						</svg>
						{/* Layout Box Game */}
						<div className="flex flex-col justify-start w-full h-full mb-m:p-3 p-2 items-center gap-2 backdrop-blur-md bg-black/80 lg:text-base text-sm">
							<div className="flex flex-row gap-2 items-center border-b border-current text-orange-500 text-xl">
								<SiGamejolt />
								<p className="uppercase font-sf-trans-robotics">Phiên BET</p>
								<SiGamejolt />
							</div>
							<div className="flex flex-row w-full justify-start items-center mb-m:gap-2 gap-1 text-sm mb-l:text-base text-white mb-m:font-chakra-petch font-bold uppercase">
								<p className="text-orange-500">Mã phiên:</p>
								<p className="text-white drop-shadow-md font-number-font normal-case font-bold">
									{/* {gameBox?.isEnd ? (
										<>
											{gameBox._id}{' '}
											<span className="text-orange-500">(đã kết thúc)</span>
										</>
									) : (
										gameBox?._id
									)} */}

									{gameBox?._id}
								</p>
							</div>
							<div className="flex flex-row w-full justify-start items-center mb-m:gap-2 gap-1 text-sm mb-l:text-base text-white mb-m:font-chakra-petch font-bold uppercase">
								<p className="text-orange-500">Máy Chủ:</p>
								<p className="text-white drop-shadow-md font-number-font font-bold">
									{server.replace('8', '8-9-10') ?? (
										<span className="loading loading-bars loading-sm"></span>
									)}
								</p>
							</div>
							<div className="flex flex-row w-full justify-start items-center mb-m:gap-2 gap-1 text-sm mb-l:text-base text-white mb-m:font-chakra-petch font-bold uppercase">
								<p className="text-orange-500">Kết Quả Trước:</p>
								<p className="text-white drop-shadow-md font-number-font font-bold">
									{(gameBox?.lastResult &&
										gameBox?.lastResult.split('-')[0]) ?? (
										<span className="loading loading-dots loading-sm"></span>
									)}
								</p>
							</div>
							<div className="flex flex-row w-full justify-start items-center mb-m:gap-2 gap-1 text-sm mb-l:text-base text-white mb-m:font-chakra-petch font-bold uppercase">
								<p className="text-orange-500">Thời Gian Còn:</p>
								<p className="text-white drop-shadow-md font-number-font font-bold">
									{counter ?? (
										<span className="loading loading-dots loading-sm"></span>
									)}
								</p>
							</div>
							<div className="flex flex-row w-full justify-start items-center mb-m:gap-2 gap-1 text-sm mb-l:text-base text-white mb-m:font-chakra-petch font-bold uppercase">
								<div className="flex flex-row gap-2">
									<p className="text-orange-500">Chẵn:</p>
									<p className="text-white drop-shadow-md font-number-font font-bold">
										{new Intl.NumberFormat('vi').format(
											gameBox?.resultUser?.c ?? 0,
										)}
									</p>
								</div>
								<div className="flex flex-row gap-2">
									<p className="text-orange-500">Lẻ:</p>
									<p className="text-white drop-shadow-md font-number-font font-bold">
										{new Intl.NumberFormat('vi').format(
											gameBox?.resultUser?.l ?? 0,
										)}
									</p>
								</div>
							</div>
							<div className="flex flex-row w-full justify-start items-center mb-m:gap-2 gap-1 text-sm mb-l:text-base text-white mb-m:font-chakra-petch font-bold uppercase">
								<div className="flex flex-row gap-2">
									<p className="text-orange-500">Tài:</p>
									<p className="text-white drop-shadow-md font-number-font font-bold">
										{new Intl.NumberFormat('vi').format(
											gameBox?.resultUser?.t ?? 0,
										)}
									</p>
								</div>
								<div className="flex flex-row gap-2">
									<p className="text-orange-500">Xỉu:</p>
									<p className="text-white drop-shadow-md font-number-font font-bold">
										{new Intl.NumberFormat('vi').format(
											gameBox?.resultUser?.x ?? 0,
										)}
									</p>
								</div>
							</div>
							<div className="flex flex-row w-full justify-start items-center mb-m:gap-2 gap-1 text-sm mb-l:text-base text-white mb-m:font-chakra-petch font-bold uppercase">
								<p className="text-orange-500">Thời Gian Hoạt Động:</p>
								<p className="text-white font-number-font font-bold">
									{server === '24' ? '24/24' : '6h - 23h50'}
								</p>
							</div>
							{server === '24' && (
								<div className="flex flex-row w-full justify-start items-center mb-m:gap-2 gap-1 text-sm mb-l:text-base text-white mb-m:font-chakra-petch font-bold uppercase">
									<p className="text-orange-500">Jackpot:</p>
									<p className="text-white font-number-font font-bold">
										{new Intl.NumberFormat('vi').format(jackpot?.score ?? 0)}
									</p>
									<button
										className="btn btn-sm bg-orange-500 text-white"
										onClick={openTutorialJackpot}>
										Chi tiết
									</button>
								</div>
							)}
							<div className="flex flex-col gap-2 justify-start w-full">
								<div className="flex flex-row w-full justify-start items-center gap-2 text-white font-chakra-petch font-bold uppercase">
									<p className="text-orange-500">CL:</p>
									<ul className="flex flex-row-reverse lg:gap-2 lg:text-base text-sm">
										{gameBox?.lastResult?.split('-').map((r, i) => {
											const number_result = r.length > 1 ? r[1] : r;
											return (
												<li key={i + 'cl'}>
													<div
														className={`tooltip mb-m:size-6 size-4 place-content-center text-white rounded-full ${
															Number(`${number_result}`) % 2 === 0
																? 'bg-orange-500'
																: 'bg-yellow-500'
														}`}
														data-tip={r}>
														<p className="">
															{Number(`${number_result}`) % 2 === 0 ? 'C' : 'L'}
														</p>
													</div>
												</li>
											);
										})}
										{!gameBox && (
											<span className="loading loading-ring loading-sm"></span>
										)}
									</ul>
								</div>
								<div className="flex flex-row w-full justify-start items-center gap-2 text-white font-chakra-petch font-bold uppercase">
									<p className="text-orange-500">TX:</p>
									<ul className="flex flex-row-reverse lg:gap-2 lg:text-base text-sm">
										{gameBox?.lastResult?.split('-').map((r, i) => {
											const number_result = r;
											return (
												<li
													key={i + 'tx'}
													data-tip={r}>
													<div
														className={`tooltip `}
														data-tip={r}>
														<div
															className={`mb-m:size-6 size-4 place-content-center text-white rounded-full ${
																parseInt(number_result, 10) < 50
																	? 'bg-red-500'
																	: 'bg-green-500'
															}`}>
															{parseInt(number_result, 10) > 49 ? 'T' : 'X'}
														</div>
													</div>
												</li>
											);
										})}
										{!gameBox && (
											<span className="loading loading-ring loading-sm"></span>
										)}
									</ul>
								</div>
							</div>
						</div>
					</div>
					{/* Game Controll */}
					<div className="w-full flex flex-col justify-center items-center bg-cover rounded-box p-2 gap-4 border-ani border-none shadow-lg shadow-current">
						<svg
							className="svg"
							height="100%"
							width="100%"
							xmlns="http://www.w3.org/2000/svg">
							<rect
								rx="8"
								ry="8"
								className="line stroke-current rounded-box"
								height="100%"
								width="100%"
								strokeLinejoin="round"
							/>
						</svg>
						<div className="flex flex-col justify-start w-full h-full p-4 items-center gap-2 backdrop-blur-md bg-black/80">
							<div className="flex flex-row gap-2 items-center border-b border-current text-orange-500 text-xl">
								<IoLogoGameControllerB size={24} />
								<p className="uppercase font-protest-strike-regular">Dự Đoán</p>
								<IoLogoGameControllerB size={24} />
							</div>
							<div className="flex flex-row w-full justify-start items-center gap-2 font-sf-trans-robotics uppercase border border-orange-500 rounded-md p-2">
								<div className="avatar">
									<div className="w-8 rounded-xl">
										<img
											src={`/image/icon/s1.webp`}
											alt={`Icon gold`}
										/>
									</div>
								</div>
								<p className={`text-white font-number-font font-bold`}>
									{new Intl.NumberFormat('vi').format(user.money ?? 0)}
								</p>
							</div>
							{/* Select Type Bet */}
							<div className="flex flex-row w-full justify-start items-center gap-2 divide-x-2 divide-orange-500 text-orange-500 font-chakra-petch font-bold uppercase border border-orange-500 px-2 rounded-btn">
								<IoLogoGameControllerB size={24} />
								<select
									defaultValue={'cl'}
									onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
										setTypeBet(event.target.value as typeBet);
									}}
									className="outline-none border-0 z-10 w-full py-3 capitalize bg-transparent">
									<option value={'cl'}>
										Chẵn Lẻ - Tài Xỉu (đặt 10tr được 19.5tr vàng)
									</option>
									<option value={'x'}>Xiên (đặt 10tr được 32tr vàng)</option>
									<option value={'g'}>
										Dự đoán kết quả (đặt 10tr được 700tr vàng)
									</option>
								</select>
							</div>
							{/* Type Bet */}
							{typeBet === 'cl' && (
								<div className="flex flex-col gap-2 items-center mt-2 z-10 w-full font-protest">
									<div className="flex flex-row w-full justify-center items-center gap-2 font-chakra-petch font-bold uppercase">
										<button
											onClick={() =>
												setBetField((f) => ({
													...f,
													place: 'C',
													typeBet: 'cl',
												}))
											}
											className={`${
												betField.place === 'C'
													? 'bg-orange-500 text-white'
													: 'border border-orange-500 text-orange-500'
											} font-chakra-petch w-full p-4 rounded-lg uppercase active:hover:scale-90 hover:duration-300`}>
											Chẵn
										</button>
										<button
											onClick={() =>
												setBetField((f) => ({
													...f,
													place: 'L',
													typeBet: 'cl',
												}))
											}
											className={`${
												betField.place === 'L'
													? 'bg-yellow-500 text-white'
													: 'border border-yellow-500 text-yellow-500'
											} font-chakra-petch w-full p-4 rounded-lg uppercase active:hover:scale-90 hover:duration-300`}>
											Lẻ
										</button>
									</div>
									<div className="flex flex-row w-full justify-center items-center gap-2 font-chakra-petch font-bold uppercase">
										<button
											onClick={() =>
												setBetField((f) => ({
													...f,
													place: 'T',
													typeBet: 'cl',
												}))
											}
											className={`${
												betField.place === 'T'
													? 'bg-green-500 text-white'
													: 'border border-green-500 text-green-500'
											} font-chakra-petch w-full p-4 rounded-lg uppercase active:hover:scale-90 hover:duration-300`}>
											Tài
										</button>
										<button
											onClick={() =>
												setBetField((f) => ({
													...f,
													place: 'X',
													typeBet: 'cl',
												}))
											}
											className={`${
												betField.place === 'X'
													? 'bg-red-500 text-white'
													: 'border border-red-500 text-red-500'
											} font-chakra-petch w-full p-4 rounded-lg uppercase active:hover:scale-90 hover:duration-300`}>
											Xỉu
										</button>
									</div>
								</div>
							)}
							{typeBet === 'x' && (
								<div className="flex flex-col gap-2 items-center mt-2 z-10 w-full">
									<div className="flex flex-row w-full justify-center items-center gap-2 font-chakra-petch font-bold uppercase">
										<button
											onClick={() =>
												setBetField((f) => ({
													...f,
													place: 'CT',
													typeBet: 'x',
												}))
											}
											className={`${
												betField.place === 'CT'
													? 'bg-orange-500 text-white'
													: 'border border-orange-500 text-orange-500'
											} font-chakra-petch w-full p-4 rounded-lg uppercase active:hover:scale-90 hover:duration-300`}>
											Chẵn Tài
										</button>
										<button
											onClick={() =>
												setBetField((f) => ({
													...f,
													place: 'LT',
													typeBet: 'x',
												}))
											}
											className={`${
												betField.place === 'LT'
													? 'bg-yellow-500 text-white'
													: 'border border-yellow-500 text-yellow-500'
											} font-chakra-petch w-full p-4 rounded-lg uppercase active:hover:scale-90 hover:duration-300`}>
											Lẻ Tài
										</button>
									</div>
									<div className="flex flex-row w-full justify-center items-center gap-2 font-chakra-petch font-bold uppercase">
										<button
											onClick={() =>
												setBetField((f) => ({
													...f,
													place: 'CX',
													typeBet: 'x',
												}))
											}
											className={`${
												betField.place === 'CX'
													? 'bg-green-500 text-white'
													: 'border border-green-500 text-green-500'
											} font-chakra-petch w-full p-4 rounded-lg uppercase active:hover:scale-90 hover:duration-300`}>
											Chẵn Xỉu
										</button>
										<button
											onClick={() =>
												setBetField((f) => ({
													...f,
													place: 'LX',
													typeBet: 'x',
												}))
											}
											className={`${
												betField.place === 'LX'
													? 'bg-red-500 text-white'
													: 'border border-red-500 text-red-500'
											} font-chakra-petch w-full p-4 rounded-lg uppercase active:hover:scale-90 hover:duration-300`}>
											Lẻ Xỉu
										</button>
									</div>
								</div>
							)}
							{typeBet === 'g' && (
								<div className="flex flex-row w-full justify-start items-center gap-2 divide-x-2 divide-orange-500 text-orange-500 font-chakra-petch font-bold uppercase border border-orange-500 px-2 rounded-btn z-10">
									<AiOutlineFieldNumber size={24} />
									<input
										type="number"
										className="outline-none border-0 w-full py-3 px-2 bg-transparent text-white"
										placeholder="Nhập kết quả dự đoán"
										onChange={(e) =>
											setBetField((f) => ({
												...f,
												place: e.target.value,
												typeBet: 'g',
											}))
										}
										value={betField.place ?? ''}
									/>
								</div>
							)}

							<div className="lg:grid lg:grid-cols-7 flex flex-wrap gap-2 items-center justify-around w-full">
								{[50e6, 1e8, 3e8, 5e8, 1e9, 2e9, 4e9].map((n, i) => {
									let text = ['50m', '100m', '300m', '500m', '1B', '2B', '4B'];
									return (
										<button
											key={i + 'chip'}
											className="btn items-center btn-sm h-auto lg:w-auto w-[100px] rounded-lg p-1 place-content-center bg-black border border-orange-500 text-orange-500"
											onClick={() => {
												let new_amout =
													parseInt(
														betField.amount.length > 0 ? betField.amount : '0',
														10,
													) + n;
												setBetField((f) => ({
													...f,
													amount: `${new_amout}`,
												}));
											}}>
											<TbPokerChip />
											{text[i]}
										</button>
									);
								})}
							</div>

							<div className="flex flex-row w-full justify-start items-center gap-2 divide-x-2 divide-orange-500 text-orange-500 font-number-font uppercase border border-orange-500 px-2 rounded-btn z-10">
								<div
									data-tip="Xóa"
									className="tooltip tooltip-left">
									<div
										className="avatar cursor-pointer"
										onClick={() =>
											setBetField((f) => ({ ...f, amount: '0', place: '' }))
										}>
										<div className="w-8 rounded-xl">
											<img
												src={`/image/icon/s1.webp`}
												alt={`Icon gold`}
											/>
										</div>
									</div>
								</div>
								<input
									onChange={(e) => {
										// Extract numeric part (removes any non-digit characters)
										let value = getNumbetFromString(e.target.value);
										let new_value = value.split(/[,.]/g).join('');
										setBetField((f) => ({
											...f,
											amount: new_value,
										}));
									}}
									type="text"
									className="outline-none border-0 z-10 w-full py-3 px-2 bg-transparent font-bold text-white"
									value={new Intl.NumberFormat('vi').format(
										parseInt(
											betField.amount.length > 0 ? betField.amount : '0',
											10,
										),
									)}
								/>
							</div>
							<div
								id="notice-bet-controll"
								role="alert"
								className={`alert shadow-lg hidden`}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									className="stroke-info h-6 w-6 shrink-0">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
								</svg>
								<div>
									<h3 className="font-bold">Thông báo!</h3>
									<div className="text-xs">{notice}</div>
								</div>
							</div>
							<div className="flex flex-row w-full justify-center items-center gap-2 font-chakra-petch font-bold uppercase z-10">
								<button
									onClick={placeBet}
									disabled={isLoad}
									className="btn capitalize max-w-xs w-full text-orange-500">
									{!isLoad ? (
										<>
											<GiPerspectiveDiceSixFacesTwo size={24} />
											Cược Ngay
										</>
									) : (
										<span className="loading loading-bars loading-sm"></span>
									)}
								</button>
							</div>
						</div>
					</div>
				</div>
				{/* Right size chat Box */}
				<div className=" bg-black/80 rounded-box border-ani border-none w-full flex flex-col">
					<svg
						className="svg"
						height="100%"
						width="100%"
						xmlns="http://www.w3.org/2000/svg">
						<rect
							rx="8"
							ry="8"
							className="line stroke-orange-500 rounded-box"
							height="100%"
							width="100%"
							strokeLinejoin="round"
						/>
					</svg>
					{/* Layout ChatBox */}
					<div className="flex flex-col gap-3 p-4 font-chakra-petch w-full h-full text-orange-500 justify-between">
						{/* Header */}
						<div className="flex flex-row justify-between items-center  uppercase z-50">
							<div className="flex flex-row gap-2 items-center text-xl">
								<IoChatbubbleEllipsesSharp size={24} />
								<h1>ChatBox</h1>
							</div>
						</div>
						{/* Chat */}
						<div className="p-2 z-50 w-full h-full">
							<div
								id="chat_box_screen"
								className="border border-orange-500 backdrop-blur-lg w-full h-[650px] overflow-auto scroll-smooth rounded-box p-2">
								{channel.map((m, i) => {
									const { content, meta, uid } = m;
									const { clanId = null, vip = null } = meta ?? {};
									const targetClan = clans.find((c) => c._id === clanId);
									const topIndex = users.findIndex((u) => u._id === uid);
									const top = topIndex > -1 ? topIndex + 1 : null;
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
														src={`/image/avatar/${
															uid === 'local'
																? '2.webp'
																: (meta?.avatar ?? '3') + '.webp'
														}`}
													/>
												</div>
											</div>
											<div className="chat-header">
												<div
													className={`flex ${
														uid !== (user._id ?? '')
															? 'flex-row-reverse'
															: 'flex-row'
													} flex-wrap gap-2 items-center`}>
													{top && (
														<div
															data-tip={`Khứa này TOP ${top}`}
															className={`z-[1000] tooltip  ${
																uid !== (user._id ?? '')
																	? 'tooltip-right'
																	: 'tooltip-left'
															}`}>
															<div className="flex flex-row items-center justify-center px-1">
																{top && top > 0 && (
																	<div className="avatar">
																		<div className="w-10 rounded-xl">
																			<img
																				src={`/image/rank/${top}_user.webp`}
																			/>
																		</div>
																	</div>
																)}
															</div>
														</div>
													)}
													{targetClan && (
														<div
															data-tip={`Clan ${targetClan?.meta?.name}`}
															className={`z-[1000] tooltip  ${
																uid !== (user._id ?? '')
																	? 'tooltip-right'
																	: 'tooltip-left'
															}`}>
															<div className="flex flex-row items-center justify-center px-1">
																<div className="avatar">
																	<div className="w-10 rounded-xl">
																		<img
																			src={`/image/banghoi/b${
																				targetClan?.meta?.type ?? 1
																			}.webp`}
																		/>
																	</div>
																</div>
															</div>
														</div>
													)}
													{vip && vip > 0 && (
														<div
															data-tip={`VIP ${vip ?? '0'}`}
															className={`z-[1000] tooltip  ${
																uid !== (user._id ?? '')
																	? 'tooltip-right'
																	: 'tooltip-left'
															}`}>
															<div className="avatar">
																<div className="w-10 rounded-xl">
																	<img
																		src={`/image/vip/v${vip ?? '0'}.png`}
																		alt={`VIP ${vip ?? '0'}`}
																	/>
																</div>
															</div>
														</div>
													)}
													{uid === 'local'
														? 'Hệ thống'
														: uid === (user._id ?? '')
														? 'Bạn'
														: meta?.name}
												</div>
												{/* <time className="text-xs opacity-50">12:45</time> */}
											</div>
											<div className="chat-bubble">
												{content?.split('\n').map((c) => (
													<p key={c}>{c}</p>
												))}
											</div>
											{/* <div className="chat-footer opacity-50">Delivered</div> */}
										</div>
									);
								})}
							</div>
						</div>

						{/* Input Chat */}
						<form
							onSubmit={(e) => {
								e.preventDefault();
								sendMsg();
							}}
							className="flex flex-row text-orange-500 w-full items-center gap-4 z-50">
							<input
								type="text"
								placeholder="Type here"
								className="input input-bordered w-full border-orange-500"
								value={msg?.content ?? ''}
								onChange={(e) => {
									// TODO Need to Add Meta & UID User
									setMsg((m) => ({
										...m,
										content: e.target.value,
									}));
								}}
							/>
							<button
								type="submit"
								className="border border-orange-500 rounded-box text-center p-2 active:hover:scale-90 hover:duration-300">
								<IoIosSend size={32} />
							</button>
						</form>
					</div>
				</div>
			</div>

			<Modal
				id="home_tutorial"
				key={'tutorial'}>
				<div className="flex flex-col gap-5">
					<h3>Hướng Dẫn</h3>
					<div className="flex flex-col gap-1 ">
						<p className="font-bold">Hệ thống chẳn lẻ Game Ngọc Rồng Online</p>
						<p className="font-bold">
							Lấy chức năng "
							<span className="text-amber-500">Con số may mắn</span>" trong game
							làm kết quả
						</p>
						<p className="font-bold">
							Bạn đều có thể đặt cược, lấy kết quả ở{' '}
							<span className="text-amber-500">Máy Chủ</span> tùy thích
						</p>
						<p className="text-amber-500 font-bold">Thể lệ gồm các trò chơi:</p>
						<p className="">
							-{' '}
							<span className="text-orange-500 font-bold">Dự đoán chẵn lẻ</span>
							: kết quả số chẵn hoặc số lẻ
						</p>
						<p className="">
							Tỷ lệ:{' '}
							<span className="text-red-500 font-bold">
								x1.95 (đặt 10tr được 19.5tr vàng)
							</span>
						</p>
						<p className="">
							Ví dụ con số may mắn là 1 số chẵn như 0, 2, 4, 6, 8, 10, 12... thì
							đặt bên Chẵn thắng, ngược lại con số may mắn là số lẻ như 1, 3, 5,
							7, 9, 11... thì đặt bên Lẻ thắng
						</p>
						<p className="">
							-{' '}
							<span className="text-orange-500 font-bold">Dự đoán tài xỉu</span>
							: kết quả từ 50-99 là tài còn từ 0-49 là xỉu
						</p>
						<p className="">
							Tỷ lệ:{' '}
							<span className="text-red-500 font-bold">
								x1.95 (đặt 10tr được 19.5tr vàng)
							</span>
						</p>
						<p className="">
							Ví dụ con số may mắn là 1 số từ 0-49 như 0, 1, 2, 35, 48, 49...
							thì đặt bên Xỉu thắng, ngược lại con số may mắn là 1 số từ 50-99
							như 50, 51, 52, 67, 87, 98, 99 thì đặt bên Tài thắng
						</p>
						<p className="">
							-{' '}
							<span className="text-orange-500 font-bold">Dự đoán kết quả</span>
							: kết quả là con số may mắn từ 0 tới 99
						</p>
						<p className="">
							Tỷ lệ:{' '}
							<span className="text-red-500 font-bold">
								x70 (đặt 10tr được 700tr vàng)
							</span>
						</p>
						<p className="">
							Liên kết:{' '}
							<Link
								className="text-orange-500"
								href={'/deposit'}>
								Nạp vàng
							</Link>{' '}
							|{' '}
							<Link
								className="text-orange-500"
								href={'/withdraw'}>
								Rút vàng
							</Link>
						</p>
					</div>
				</div>
			</Modal>

			{/*ADS*/}
			<Modal
				id="home_ads"
				customClass="w-full max-w-xl">
				<div className="flex flex-col gap-5">
					<h1 className="text-xl">Chương Trình Khuyến Mãi</h1>
					<div className="flex flex-col gap-2">
						<div className="flex flex-row gap-2 items-center text-lg">
							{/* <video
								autoPlay
								loop
								muted
								preload="auto"
								src="/image/gif/dragon_hot.webm"
								aria-label="Dragon Hot"
								style={{ width: '52px' }}></video> */}
							<p className="text-wrap">
								Nhận ngay{' '}
								<span className="text-red-500 font-bold">
									{new Intl.NumberFormat('vi').format(5e6)} vàng
								</span>{' '}
								khi tạo tài khoản trên web
							</p>
						</div>
						<div className="flex flex-row gap-2 items-center text-lg">
							{/* <video
								autoPlay
								loop
								muted
								preload="auto"
								src="/image/gif/dragon_hot.webm"
								aria-label="Dragon Hot"
								style={{ width: '52px' }}></video> */}
							<p>Tặng vàng miễn phí mỗi ngày</p>
						</div>
						<div className="flex flex-row gap-2 items-center text-lg">
							{/* <video
								autoPlay
								loop
								muted
								preload="auto"
								src="/image/gif/dragon_hot.webm"
								aria-label="Dragon Hot"
								style={{ width: '52px' }}></video> */}
							<p>Nạp Thỏi Vàng tích điểm nhận thành viên VIP</p>
						</div>
						<div className="flex flex-row gap-2 items-center text-lg">
							{/* <video
								autoPlay
								loop
								muted
								preload="auto"
								src="/image/gif/dragon_hot.webm"
								aria-label="Dragon Hot"
								style={{ width: '52px' }}></video> */}
							<p>Nhiều Event Hấp Dẫn</p>
						</div>
					</div>
				</div>
			</Modal>

			{/*Notice Chat Box*/}
			<Modal
				id="chat-box"
				customClass="w-full max-w-xl">
				<div className="flex flex-col gap-5">
					<h1 className="text-xl">Chat Box - Thông Báo</h1>
					{notice}
				</div>
			</Modal>

			{/* Tutorial Jackpot */}
			<Modal
				id="tutorial_jackpot"
				customClass="w-full max-w-xl">
				<div className="flex flex-col gap-5">
					<h1 className="text-xl">Hướng Dẫn Jackpot</h1>
					<p>
						- Khi các bạn đặt cược thì Jackpot sẽ nhận được{' '}
						<span className="text-orange-500">10%</span> vàng cược của các bạn
						và cứ thế tăng dần
					</p>
					<p>
						- Khi kết quả của phiên ra số 99, Jackpot sẽ nổ{' '}
						<span className="text-orange-500">5%</span> giải thưởng và chia cho
						tất cả người chơi thắng kèo ở phiên đó
					</p>
					<p>
						- Nếu bạn cược{' '}
						<span className="text-orange-500">càng nhiều vàng</span> trong ván
						Jackpot nổ thì bạn sẽ trúng{' '}
						<span className="text-orange-500">càng nhiều vàng</span> từ Jackpot
					</p>
				</div>
			</Modal>
		</div>
	);
}

export default Home;
