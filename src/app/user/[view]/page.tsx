'use client';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { Service, setService } from '@/lib/redux/storage/eshop/service';
import { setServer } from '@/lib/redux/storage/minigame/server';
import { UserActive } from '@/lib/redux/storage/user/userActive';
import { setUserBet, UserBet } from '@/lib/redux/storage/user/userBet';
import apiClient from '@/lib/server/apiClient';
import moment from 'moment';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaExchangeAlt, FaMinus, FaRegUser, FaTable } from 'react-icons/fa';
import { GiDragonShield, GiSeaDragon } from 'react-icons/gi';
import { GrMoney, GrTrigger } from 'react-icons/gr';
import { MdOutlineEmail, MdOutlineHistory } from 'react-icons/md';
import { RiLockPasswordLine, RiVipCrownLine, RiVipFill } from 'react-icons/ri';

type PageView =
	| 'profile'
	| 'trade_gold'
	| 'history_bet'
	| 'history_service'
	| 'history_activity'
	| 'table_misson';

interface FieldPage {
	page: number;
	totalPages: number;
	totalItems?: number;
}
interface FieldChangPwd {
	pwd_n?: string;
	pwd_c?: string;
}

function UserContext() {
	const user = useAppSelector((state) => state.user);
	const params = useParams<{ view: PageView }>();
	const [msg, setMsg] = useState<string>('');
	const [fieldChangePwd, setFieldChangePwd] = useState<FieldChangPwd>({});

	const router = useRouter();

	const showChangePwd = () => {
		let dialog = document.getElementById('change_pwd_q') as HTMLDialogElement;
		if (dialog) {
			dialog.show();
		}
	};

	const closeChangePwd = () => {
		let dialog = document.getElementById('change_pwd_q') as HTMLDialogElement;
		if (dialog) {
			dialog.close();
		}
	};

	const showNotice = (message: string) => {
		let dialog = document.getElementById('profile_notice') as HTMLDialogElement;
		if (dialog) {
			dialog.show();
			setMsg(message);
		}
	};

	const changePwd = async () => {
		try {
			if (!user.isLogin) return showNotice('Bạn chưa đăng nhập');
			const { data } = await apiClient.post(
				'/auth/change/pwd',
				{ ...fieldChangePwd },
				{
					headers: {
						Authorization: 'Bearer ' + user.token,
					},
				},
			);
			showNotice(data.message);
			closeChangePwd();
			router.push('/user/profile');
		} catch (err: any) {
			showNotice(err.response.data.message.message);
		}
	};
	return (
		<div
			style={{ backgroundImage: "url('/image/background/logo_user.jpg')" }}
			className="min-h-screen flex justify-center items-start w-full bg-no-repeat bg-center bg-cover p-8">
			<div className="flex flex-row w-full gap-2 max-w-7xl h-full">
				{/* Navigate User */}
				<div className="lg:flex hidden flex-col bg-white/30 backdrop-blur-lg rounded-box w-fit text-nowrap py-4 px-8 gap-5 text-black">
					<div className="flex flex-row gap-2 items-center">
						<GiSeaDragon size={34} />
						<h1 className="font-sf-trans-robotics uppercase text-2xl">
							{user.name ?? 'NAME'}
						</h1>
					</div>
					<div className="flex flex-col gap-2">
						<Link
							href={'/user/profile'}
							className="flex flex-row gap-2 items-center py-2 px-4 bg-orange-500 rounded-box text-black cursor-pointer font-protest-strike-regular capitalize text-xl hover:bg-black hover:text-orange-500 hover:duration-300 active:hover:scale-90">
							<FaRegUser size={24} />
							Cài Đặt Tài Khoản
						</Link>
						<Link
							href={'/user/trade_gold'}
							className="flex flex-row gap-2 items-center py-2 px-4 bg-orange-500 rounded-box text-black cursor-pointer font-protest-strike-regular capitalize text-xl hover:bg-black hover:text-orange-500 hover:duration-300 active:hover:scale-90">
							<FaExchangeAlt size={24} />
							Chuyển Vàng
						</Link>
						<Link
							href={'/user/history_service'}
							className="flex flex-row gap-2 items-center py-2 px-4 bg-orange-500 rounded-box text-black cursor-pointer font-protest-strike-regular capitalize text-xl hover:bg-black hover:text-orange-500 hover:duration-300 active:hover:scale-90">
							<MdOutlineHistory size={24} />
							Lịch Sử giao dịch
						</Link>
						<Link
							href={'/user/history_bet'}
							className="flex flex-row gap-2 items-center py-2 px-4 bg-orange-500 rounded-box text-black cursor-pointer font-protest-strike-regular capitalize text-xl hover:bg-black hover:text-orange-500 hover:duration-300 active:hover:scale-90">
							<MdOutlineHistory size={24} />
							Lịch sử cược
						</Link>
						<Link
							href={'/user/history_activity'}
							className="flex flex-row gap-2 items-center py-2 px-4 bg-orange-500 rounded-box text-black cursor-pointer font-protest-strike-regular capitalize text-xl hover:bg-black hover:text-orange-500 hover:duration-300 active:hover:scale-90">
							<MdOutlineHistory size={24} />
							Lịch Sử Hoạt Động
						</Link>
						<Link
							href={'/user/table_misson'}
							className="flex flex-row gap-2 items-center py-2 px-4 bg-orange-500 rounded-box text-black cursor-pointer font-protest-strike-regular capitalize text-xl hover:bg-black hover:text-orange-500 hover:duration-300 active:hover:scale-90">
							<FaTable size={24} />
							Bảng Nhiệm Vụ
						</Link>
						<button
							onClick={showChangePwd}
							className="flex flex-row gap-2 items-center py-2 px-4 bg-orange-500 rounded-box text-black cursor-pointer font-protest-strike-regular capitalize text-xl hover:bg-black hover:text-orange-500 hover:duration-300 active:hover:scale-90">
							<RiLockPasswordLine size={24} />
							Đổi Mật Khẩu
						</button>
					</div>
				</div>
				{/* Tab */}
				{params.view === 'profile' && <Profile />}
				{params.view === 'history_bet' && <HistoryBet />}
				{params.view === 'history_activity' && <HistoryActivity />}
				{params.view === 'history_service' && <HistoryService />}
				{params.view === 'trade_gold' && <TradeGold />}
				{params.view === 'table_misson' && <TableMission />}
			</div>
			<dialog
				id="change_pwd_q"
				className="modal z-[1100]">
				<div className="modal-box font-chakra-petch text-orange-500 p-2">
					<div className="sticky top-0 backdrop-blur-lg flex flex-row w-full py-2 justify-between items-center uppercase font-bold">
						<h1 className="text-lg">Đổi Mật Khẩu</h1>
						<form method="dialog">
							<button>
								<FaMinus size={24} />
							</button>
						</form>
					</div>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							changePwd();
						}}
						className="flex flex-col gap-2 p-4">
						<label className="form-control w-full">
							<div className="input input-bordered bg-transparent input-lg flex items-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 16 16"
									fill="currentColor"
									className="h-4 w-4 opacity-70">
									<path
										fillRule="evenodd"
										d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
										clipRule="evenodd"
									/>
								</svg>
								<input
									type="password"
									className="grow"
									placeholder="Nhập mật khẩu cũ"
									onChange={(e) =>
										setFieldChangePwd((f) => ({ ...f, pwd_c: e.target.value }))
									}
									required
								/>
							</div>
						</label>
						<label className="form-control w-full">
							<div className="input input-bordered bg-transparent input-lg flex items-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 16 16"
									fill="currentColor"
									className="h-4 w-4 opacity-70">
									<path
										fillRule="evenodd"
										d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
										clipRule="evenodd"
									/>
								</svg>
								<input
									type="password"
									className="grow"
									placeholder="Nhập mật khẩu mới"
									onChange={(e) =>
										setFieldChangePwd((f) => ({ ...f, pwd_n: e.target.value }))
									}
									required
								/>
							</div>
						</label>
						<button
							type="submit"
							className="border border-orange-500 rounded-lg p-4 hover:bg-orange-500 hover:text-white hover:duration-300">
							Đổi Mật Khẩu
						</button>
					</form>
				</div>
			</dialog>
			<dialog
				id="profile_notice"
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
}

// Cài Đặt Tài Khoản
function Profile() {
	const user = useAppSelector((state) => state.user);
	return (
		<div className="flex flex-col bg-white/30 backdrop-blur-lg rounded-box w-full py-4 px-8 gap-5 text-black slide-in-right">
			<div className="flex flex-row gap-2 items-center">
				<GiDragonShield size={34} />
				<h1 className="font-protest-strike-regular uppercase text-2xl">
					Cài Đặt Tài Khoản
				</h1>
			</div>
			<div className="flex flex-col gap-5">
				{/* Avatar + Name + Badeg */}
				<div className="flex lg:flex-row flex-col gap-2 items-center">
					<div className="avatar">
						<div className="w-24 rounded-full">
							<img src="/image/avatar/3.webp" />
						</div>
					</div>
					<div className="flex flex-col items-start justify-between p-2 font-protest-strike-regular uppercase gap-2">
						<div className="text-xl flex lg:flex-row flex-col gap-2 lg:items-center items-start">
							<p>{user?.name ?? 'NAME'}</p>
							<div
								className="tooltip"
								data-tip="Copy"
								id="data_tip"
								onClick={() => {
									try {
										navigator.clipboard
											.writeText('27165d1b-06c3-4fa9-86af-2af53906ce38')
											.then(() => {
												let text = document.getElementById('user_id');
												let data_tip = document.getElementById('data_tip');
												if (text && data_tip) {
													// Thêm class màu cam khi sao chép thành công
													text.classList.add('text-orange-500');

													// Thay đổi giá trị của data-tip
													data_tip.setAttribute('data-tip', 'Copied!');

													// Loại bỏ màu và khôi phục lại giá trị data-tip sau 1 giây
													setTimeout(() => {
														text.classList.remove('text-orange-500');
														data_tip.setAttribute('data-tip', 'Copy'); // Đặt lại giá trị gốc
													}, 1000);
												}
											});
									} catch (error: any) {}
								}}>
								<p
									id="user_id"
									className="badge badge-outline lg:text-base text-xs cursor-pointer">
									{user?._id ?? '...'}
								</p>
							</div>
						</div>
						<div className="flex flex-row gap-2 border-t border-current py-2">
							{user?.meta?.vip && (
								<div className="badge badge-outline gap-2">
									<RiVipCrownLine />
									VIP {user?.meta?.vip}
								</div>
							)}
							{/* ... TOP & Clan */}
						</div>
					</div>
				</div>
				{/* Info */}
				<div className="flex flex-col gap-2">
					{/* Username */}
					<div className="form-control w-full">
						<div className="label">
							<span className="label-text text-black capitalize text-xl font-chakra-petch font-semibold">
								Tên đăng nhập
							</span>
						</div>
						<div className="input input-bordered bg-transparent border-2 border-black flex items-center gap-2">
							<FaRegUser size={24} />
							<p>{user.username ?? 'rinrinx28'}</p>
						</div>
					</div>
					{/* Email */}
					<div className="form-control w-full">
						<div className="label">
							<span className="label-text text-black capitalize text-xl font-chakra-petch font-semibold">
								Email
							</span>
						</div>
						<div className="input input-bordered bg-transparent border-2 border-black flex items-center gap-2">
							<MdOutlineEmail size={24} />
							<p>{user.email ?? 'rinrinx28@gmail.com'}</p>
						</div>
					</div>
					{/* Name */}
					<div className="form-control w-full">
						<div className="label">
							<span className="label-text text-black capitalize text-xl font-chakra-petch font-semibold">
								Tên Hiển Thị
							</span>
						</div>
						<div className="input input-bordered bg-transparent border-2 border-black flex items-center gap-2">
							<FaRegUser size={24} />
							<p>{user.name ?? 'RIN'}</p>
						</div>
					</div>
					{/* Vàng */}
					<div className="form-control w-full">
						<div className="label">
							<span className="label-text text-black capitalize text-xl font-chakra-petch font-semibold">
								Số Dư
							</span>
						</div>
						<div className="input input-bordered bg-transparent border-2 border-black flex items-center gap-2 lg:text-xl text-xs text-orange-700">
							<GrMoney size={24} />
							<p className="font-sf-trans-robotics ">
								{new Intl.NumberFormat('vi').format(
									user.money ?? Math.floor(Math.random() * 10000),
								)}
							</p>
						</div>
					</div>
					{/* VIP */}
					<div className="form-control w-full">
						<div className="label">
							<span className="label-text text-black capitalize text-xl font-chakra-petch font-semibold">
								Thông Tin VIP
							</span>
						</div>
						<div className="input input-bordered bg-transparent border-2 border-black flex items-center gap-2 lg:text-xl text-xs text-red-500">
							<RiVipFill size={24} />
							<p className="font-sf-trans-robotics">
								{new Intl.NumberFormat('vi').format(user?.meta?.vip ?? 0)}
							</p>
						</div>
					</div>
					{/* Info VIP */}
					<div className="form-control w-full">
						<div className="label">
							<span className="label-text text-black capitalize text-xl font-chakra-petch font-semibold">
								Điểm
							</span>
						</div>
						<div className="input input-bordered bg-transparent border-2 border-black flex items-center gap-2 lg:text-xl text-xs text-red-800">
							<GrTrigger size={24} />
							<p className="font-sf-trans-robotics">
								{new Intl.NumberFormat('vi').format(
									user?.meta?.totalScore ?? 0,
								)}
							</p>
						</div>
						<div className="label">
							<span className="label-text-alt text-black">
								Tích điểm nhận VIP
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// Chuyển Vàng
function TradeGold() {
	const user = useAppSelector((state) => state.user);
	return (
		<div className="flex flex-col bg-white/30 backdrop-blur-lg rounded-box w-full py-4 px-8 gap-5 text-black slide-in-right">
			<div className="flex flex-row gap-2 items-center">
				<GiDragonShield size={34} />
				<h1 className="font-protest-strike-regular uppercase text-2xl">
					Chuyển Vàng
				</h1>
			</div>
			<div className="flex flex-col gap-1 text-sm shadow-inner shadow-orange-500/30 text-black p-2 rounded-box bg-orange-500/30 font-bold">
				{/* <p>
					Bạn chỉ có thể chuyển tới những người chơi ở Máy Chủ{' '}
					{user.server ?? '1'}
				</p> */}
				<p className="text-2xl font-protest-strike-regular capitalize">
					Đang Cập Nhật{' '}
					<span className="loading loading-dots loading-xs"></span>
				</p>
			</div>
			{/* <div className="flex flex-col gap-2">
				<div className="form-control w-full">
					<div className="label">
						<span className="label-text text-black capitalize text-xl font-chakra-petch font-semibold">
							Tài khoản
						</span>
					</div>
					<div className="input input-bordered bg-transparent border-2 border-black flex items-center gap-2  font-bold">
						<FaRegUser size={24} />
						<p>{user.username ?? 'rinx28'}</p>
						<p>Máy Chủ {user.server ?? '1'}</p>
					</div>
				</div>
				<div className="form-control w-full">
					<div className="label">
						<span className="label-text text-black capitalize text-xl font-chakra-petch font-semibold">
							Số Dư
						</span>
					</div>
					<div className="input input-bordered bg-transparent border-2 border-black flex items-center gap-2 text-xl text-orange-700">
						<GrMoney size={24} />
						<p className="font-sf-trans-robotics ">
							{new Intl.NumberFormat('vi').format(user.money ?? 0)}
						</p>
					</div>
				</div>
				<div className="form-control w-full">
					<div className="label">
						<span className="label-text text-black capitalize text-xl font-chakra-petch font-semibold">
							ID Người Nhận
						</span>
					</div>
					<input
						className="input text-orange-500"
						type="text"
						placeholder="Nhập ID Người Nhận"
					/>
				</div>
				<div className="form-control w-full">
					<div className="label">
						<span className="label-text text-black capitalize text-xl font-chakra-petch font-semibold">
							Số vàng chuyển
						</span>
					</div>
					<input
						className="input input-bordered bg-transparent border-2 border-black flex items-center gap-2 text-xl font-number-font"
						type="text"
						placeholder="Nhập số vàng"
						onChange={(e) => {
							// Extract numeric part (removes any non-digit characters)
							let value = getNumbetFromString(e.target.value);

							// Update the input value with the formatted number
							e.target.value = value;
						}}
					/>
					<div className="label hidden">
						<span className="label-text-alt text-black">
							Số vàng bạn muốn chuyển cho người khác
						</span>
						<input
							className="input text-orange-500 font-number-font"
							type="text"
							placeholder="Nhập số vàng"
							onChange={(e) => {
								// Extract numeric part (removes any non-digit characters)
								let value = getNumbetFromString(e.target.value);

								// Update the input value with the formatted number
								e.target.value = value;
							}}
						/>
					</div>
				</div>

				<div className="flex flex-col gap-1 text-sm shadow-inner shadow-orange-500/30 text-black p-2 rounded-box bg-orange-500/30 font-bold">
					<p>Hạn mức hôm nay (0h00p sẽ reset): 0</p>
					<p>Đã sử dụng: 0</p>
					<p>Vui lòng chơi để nâng thêm hạn mức !</p>
					<p>
						Bạn chuyển trên <span className="text-red-500">500tr</span> sẽ chịu{' '}
						<span className="text-red-500">10% fee</span> dịch vụ!
					</p>
				</div>
				<button className="flex flex-row gap-2 font-protest-strike-regular items-center justify-center w-full rounded-box py-4 px-4 bg-black text-orange-500 hover:bg-orange-500 hover:text-white hover:duration-300 active:hover:scale-90">
					<FaExchangeAlt size={24} />
					Chuyển Ngay
				</button>
			</div> */}
		</div>
	);
}

// Lịch Sử Giao Dịch
function HistoryService() {
	const user = useAppSelector((state) => state.user);
	const services = useAppSelector((state) => state.services);
	const [field, setField] = useState<FieldPage>({
		page: 0,
		totalPages: 1,
	});
	const [limited, setLimited] = useState<number>(25);
	const [data, setData] = useState<Service[]>([]);
	const [typeS, setTypeS] = useState<string>('0');
	const [msg, setMsg] = useState<string>('');
	const dispatch = useAppDispatch();

	useEffect(() => {
		const getServices = async () => {
			try {
				const res = await apiClient.get(`/service/history?limited=${limited}`, {
					headers: {
						Authorization: 'Bearer ' + user.token,
					},
				});
				const { data, page, totalItems, totalPages } = res.data;
				for (const service of data) {
					dispatch(setService(service));
				}
				setField({
					page: page,
					totalItems,
					totalPages,
				});
			} catch (err: any) {
				console.log(err.response.data.message.message);
			}
		};
		if (user.isLogin) {
			getServices();
		}
	}, [user, limited]);

	useEffect(() => {
		if (services) {
			const targets = services.filter(
				(service) => service.uid === (user._id ?? ''),
			);
			let new_main_server = targets;
			let new_channel: Service[] = [];
			for (const service of new_main_server) {
				if (new_channel.length >= Number(limited)) {
					new_channel.shift(); // Removes the oldest message if the array exceeds 10 messages
				}
				new_channel.push(service);
			}
			setData(new_channel);
		}
	}, [services, user]);

	const nextPage = async (pageNumber: number) => {
		try {
			const res = await apiClient.get(
				`/service/history?page=${pageNumber}&limited=${limited}`,
				{
					headers: {
						Authorization: 'Bearer ' + user.token,
					},
				},
			);
			const { data, page, totalItems, totalPages } = res.data;
			for (const service of data) {
				dispatch(setServer(service));
			}
			setField({
				page: page,
				totalItems,
				totalPages,
			});
		} catch (err: any) {
			console.log(err.response.data.message.message);
		}
	};

	const prevPage = async (pageNumber: number) => {
		try {
			const res = await apiClient.get(
				`/service/history?page=${pageNumber}&limited=${limited}`,
				{
					headers: {
						Authorization: 'Bearer ' + user.token,
					},
				},
			);
			const { data, page, totalItems, totalPages } = res.data;
			for (const service of data) {
				dispatch(setServer(service));
			}
			setField({
				page: page,
				totalItems,
				totalPages,
			});
		} catch (err: any) {
			console.log(err.response.data.message.message);
		}
	};

	const cancelService = async (serviceId: string) => {
		try {
			if (!user.isLogin || !user.token)
				return showNoticeEShop('Bạn chưa đăng nhập');
			const { data } = await apiClient.post(
				'/service/cancel',
				{
					serviceId: serviceId,
				},
				{
					headers: {
						Authorization: 'Bearer ' + user.token,
					},
				},
			);
			showNoticeEShop(data.message);
		} catch (err: any) {
			showNoticeEShop(err.response.data.message.message);
		}
	};

	const showNoticeEShop = (message: string) => {
		let dialog = document.getElementById(
			'profile_service',
		) as HTMLDialogElement;
		if (dialog) {
			dialog.show();
			setMsg(message);
		}
	};
	return (
		<div className="flex flex-col bg-white/30 backdrop-blur-lg rounded-box w-full py-4 px-8 gap-5 text-black slide-in-right">
			<div className="flex flex-row gap-2 items-center">
				<GiDragonShield size={34} />
				<h1 className="font-protest-strike-regular uppercase text-2xl">
					Lịch Sử Giao Dịch
				</h1>
			</div>
			{/* Tables */}
			<div className="overflow-auto w-full h-[600px]">
				<table className="table border border-black text-nowrap">
					{/* head */}
					<thead className="bg-orange-500 text-white capitalize">
						<tr>
							<th>Máy Chủ</th>
							<th>Nhân Vật</th>
							<th>Loại</th>
							<th>Số Thỏi/vàng</th>
							<th>Số vàng nhận</th>
							<th>Tình trạng</th>
							<th>thời gian</th>
							<th>Tương tác</th>
						</tr>
					</thead>
					<tbody className="font-bold text-base">
						{/* row 1 */}
						{data
							?.filter((s) => s.type === typeS)
							?.sort(
								(a, b) =>
									moment(b?.createdAt).unix() - moment(a?.createdAt).unix(),
							)
							?.map((service, i) => {
								const {
									server,
									playerName,
									type,
									amount,
									status,
									isEnd,
									revice,
								} = service;
								return (
									<tr key={i + 'history_service'}>
										<td>{server}</td>
										<td>{playerName}</td>
										<td>
											{type === '0'
												? 'Rút thỏi vàng'
												: type === '1'
												? 'Rút vàng'
												: type === '2'
												? 'Nạp thỏi vàng'
												: 'Nạp vàng'}
										</td>
										<td className="font-number-font">
											{new Intl.NumberFormat('vi').format(amount ?? 0)}
										</td>
										<td className="font-number-font">
											{new Intl.NumberFormat('vi').format(revice ?? 0)}
										</td>
										<td>
											<div
												className={`badge ${
													status === '0'
														? 'bg-cyan-500 text-black'
														: status === '1'
														? 'bg-red-500 text-white'
														: 'bg-green-500 text-black'
												} font-chakra-petch capitalize `}>
												{status === '0'
													? 'Chờ giao dịch'
													: status === '1'
													? 'Đã hủy'
													: 'Thành công'}
											</div>
										</td>
										<td>
											{moment(service.updatedAt).format('DD/MM/YYYY HH:mm:ss')}
										</td>
										<td>
											{isEnd ? (
												''
											) : (
												<button
													onClick={() => cancelService(service._id ?? '')}
													className="p-2 rounded-lg bg-red-500 text-white">
													Hủy
												</button>
											)}
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
			<div className="flex flex-row justify-between">
				<div className="flex flex-row gap-2">
					{/* Show Row */}
					<select
						defaultValue={`${limited}`}
						onChange={(e) => setLimited(Number(e.target.value))}
						className="select select-bordered w-full max-w-fit bg-transparent text-black border border-black">
						{['10', '25', '50', '100'].map((s, i) => {
							return (
								<option
									value={s}
									key={i + 'show_row_history'}>
									{s}
								</option>
							);
						})}
					</select>
					<select
						defaultValue={`${typeS}`}
						onChange={(e) => setTypeS(e.target.value)}
						className="select select-bordered w-full max-w-fit bg-transparent text-black border border-black">
						{['0', '1', '2', '3'].map((s, k) => (
							<option
								key={`${k}-button`}
								value={s}>
								{s === '0'
									? 'Rút thỏi vàng'
									: s === '1'
									? 'Rút vàng'
									: s === '2'
									? 'Nạp thỏi vàng'
									: 'Nạp vàng'}
							</option>
						))}
					</select>
				</div>

				{/* Show Page */}
				<div className="join">
					<button
						onClick={() => {
							const page = field.page ?? 0;
							if (page + 1 - 1 >= 0) {
								setField((f) => ({ ...f, page: page - 1 }));
								prevPage(page - 1);
							}
						}}
						className="join-item btn">
						«
					</button>
					<button className="join-item btn">
						Page {(field.page ?? 0) + 1}/{field.totalPages ?? 0}
					</button>
					<button
						onClick={() => {
							const page = field.page ?? 0;
							if (page + 2 <= (field.totalPages ?? 1)) {
								setField((f) => ({ ...f, page: page + 1 }));
								nextPage(page + 1);
							}
						}}
						className="join-item btn">
						»
					</button>
				</div>
			</div>
			<dialog
				id="profile_service"
				className="modal z-[1100]">
				<div className="modal-box font-chakra-petch text-orange-500 p-2">
					<div className="sticky top-0 backdrop-blur-lg flex flex-row w-full py-2 justify-between items-center uppercase font-bold">
						<h1 className="text-lg">Thông Báo</h1>
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
}

// Lịch Sử Cược
function HistoryBet() {
	const user = useAppSelector((state) => state.user);
	const userBets = useAppSelector((state) => state.userBets);
	const [field, setField] = useState<FieldPage>({
		page: 0,
		totalPages: 1,
	});
	const [limited, setLimited] = useState<number>(25);
	const [server, setServer] = useState<string>('24');
	const [data, setData] = useState<UserBet[]>([]);
	const dispatch = useAppDispatch();
	const [msg, setMsg] = useState<string>('');

	useEffect(() => {
		const getUserBets = async () => {
			try {
				const res = await apiClient.get(
					`/user/history/bet?limited=${limited}&server=${server}`,
					{
						headers: {
							Authorization: 'Bearer ' + user.token,
						},
					},
				);
				const { data, page, totalItems, totalPages } = res.data;
				for (const bet of data) {
					dispatch(setUserBet(bet));
				}
				setField({
					page: page,
					totalItems,
					totalPages,
				});
			} catch (err: any) {
				console.log(err.response.data.message.message);
			}
		};
		if (user.isLogin) {
			getUserBets();
		}
	}, [user, limited, server]);

	useEffect(() => {
		if (userBets) {
			const targets = userBets.filter(
				(bet) => bet.uid === (user._id ?? '') && bet.server === server,
			);
			let new_main_server = targets;
			let new_channel: UserBet[] = [];
			for (const bet of new_main_server) {
				if (new_channel.length >= Number(limited)) {
					new_channel.shift(); // Removes the oldest message if the array exceeds 10 messages
				}
				new_channel.push(bet);
			}
			setData(new_channel);
		}
	}, [userBets, server, limited]);

	const nextPage = async (pageNumber: number) => {
		try {
			const res = await apiClient.get(
				`/user/history/bet?page=${pageNumber}&limited=${limited}&server=${server}`,
				{
					headers: {
						Authorization: 'Bearer ' + user.token,
					},
				},
			);
			const { data, page, totalItems, totalPages } = res.data;
			for (const bet of data) {
				dispatch(setUserBet(bet));
			}
			setField({
				page: page,
				totalItems,
				totalPages,
			});
		} catch (err: any) {
			console.log(err.response.data.message.message);
		}
	};

	const prevPage = async (pageNumber: number) => {
		try {
			const res = await apiClient.get(
				`/user/history/bet?page=${pageNumber}&limited=${limited}&server=${server}`,
				{
					headers: {
						Authorization: 'Bearer ' + user.token,
					},
				},
			);
			const { data, page, totalItems, totalPages } = res.data;
			for (const bet of data) {
				dispatch(setUserBet(bet));
			}
			setField({
				page: page,
				totalItems,
				totalPages,
			});
		} catch (err: any) {
			console.log(err.response.data.message.message);
		}
	};

	const cancelPlace = async (userBetId: string) => {
		try {
			if (!user.isLogin || !user.token)
				return showNoticeEShop('Bạn chưa đăng nhập');
			const { data } = await apiClient.post(
				'/mini-game/cancel',
				{
					userBetId: userBetId,
				},
				{
					headers: {
						Authorization: 'Bearer ' + user.token,
					},
				},
			);
			showNoticeEShop(data.message);
		} catch (err: any) {
			showNoticeEShop(err.response.data.message.message);
		}
	};

	const showNoticeEShop = (message: string) => {
		let dialog = document.getElementById(
			'usert_bet_place_notice',
		) as HTMLDialogElement;
		if (dialog) {
			dialog.show();
			setMsg(message);
		}
	};

	return (
		<div className="flex flex-col bg-white/30 backdrop-blur-lg rounded-box w-full py-4 px-8 gap-4 text-black slide-in-right">
			<div className="flex flex-row gap-2 items-center">
				<GiDragonShield size={34} />
				<h1 className="font-protest-strike-regular uppercase text-2xl">
					Lịch Sử Cược
				</h1>
			</div>

			<select
				defaultValue={`${server}`}
				onChange={(e) => setServer(e.target.value)}
				className="select select-bordered w-full max-w-fit bg-transparent text-black border border-black">
				{Array.from({ length: 7 }).map((_, k) => (
					<option
						key={`${k}-button`}
						value={`${k + 1}`}>
						<p>Máy Chủ {k + 1}</p>
					</option>
				))}
				<option value={'8'}>Máy Chủ Gộp</option>
				{Array.from({ length: 3 }).map((_, k) => (
					<option
						key={`${k}-button`}
						value={`${k + 11}`}>
						<p>Máy Chủ {k + 11}</p>
					</option>
				))}
				<option value={'24'}>Máy Chủ 24/24</option>
			</select>
			<div className="overflow-auto w-full h-[600px]">
				<table className="table border border-black text-nowrap">
					{/* head */}
					<thead className="bg-orange-500 text-white capitalize">
						<tr>
							<th>Máy Chủ</th>
							<th>Nhân Vật</th>
							<th>Loại</th>
							<th>Dự Đoán</th>
							<th>Kết Quả</th>
							<th>Số vàng Cược</th>
							<th>Số vàng Nhận</th>
							<th>Tình trạng</th>
							<th>thời gian</th>
							<th>Tương tác</th>
						</tr>
					</thead>
					<tbody className="font-bold">
						{/* row 1 */}
						{data
							?.sort(
								(a, b) =>
									moment(b?.createdAt).unix() - moment(a?.createdAt).unix(),
							)
							?.map((bet, i) => {
								const {
									amount = 0,
									status,
									result,
									place,
									revice = 0,
									server,
									typeBet,
									uid,
									meta = {},
									isEnd,
								} = bet;
								const { name = 'rno', avatar = null } = meta;
								return (
									<tr key={i + 'row_history_bet_server'}>
										<td>{server}</td>
										<td>
											<div className="flex items-center gap-3">
												<div className="avatar">
													<div className="mask mask-squircle h-12 w-12">
														<img
															src={`/image/avatar/${avatar ?? '3'}.webp`}
															alt={`Avatar nrogame ${avatar ?? '3'}`}
														/>
													</div>
												</div>
												<div>
													<div className="font-bold">{name}</div>
												</div>
											</div>
										</td>
										<td className="font-number-font font-bold">
											{new Intl.NumberFormat('vi').format(amount)}
										</td>
										<td>
											{typeBet === 'cl'
												? 'CL'
												: typeBet === 'g'
												? 'Dự Đoán Số'
												: 'Xiên'}
										</td>
										<td>{place}</td>
										<td>
											{!isEnd ? (
												<span className="loading loading-dots loading-sm"></span>
											) : (
												result
											)}
										</td>
										<td>
											<div
												className={`badge ${
													revice > 0
														? 'bg-green-500 text-black'
														: 'bg-red-500 text-white'
												} capitalize font-number-font font-bold`}>
												{revice > 0 ? '+' : '-'}
												{new Intl.NumberFormat('vi').format(revice)}
											</div>
										</td>
										<td>
											<div
												className={`badge ${
													status === 1
														? 'bg-yellow-500 text-black'
														: status === 2
														? revice > 0
															? 'bg-green-500 text-black'
															: 'bg-red-500 text-white'
														: 'bg-cyan-500 text-black'
												} font-chakra-petch capitalize font-bold`}>
												{status === 1
													? 'Đã Hủy'
													: status === 2
													? revice > 0
														? 'Thắng'
														: 'Thua'
													: 'Đợi Kết Quả'}
											</div>
										</td>
										<th>
											{moment(bet.createdAt).format('DD/MM/YYYY HH:mm:ss')}
										</th>
										<th>
											{uid === user._id ? (
												!isEnd && status === 0 ? (
													<button
														onClick={() => cancelPlace(bet._id ?? '')}
														className="p-2 rounded-lg bg-red-500 text-white">
														Hủy
													</button>
												) : (
													''
												)
											) : (
												''
											)}
										</th>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
			<div className="flex flex-row justify-between">
				<div className="flex flex-row gap-2">
					{/* Show Row */}
					<select
						defaultValue={`${limited}`}
						onChange={(e) => setLimited(Number(e.target.value))}
						className="select select-bordered w-full max-w-fit bg-transparent text-black border border-black">
						{['10', '25', '50', '100'].map((s, i) => {
							return (
								<option
									value={s}
									key={i + 'show_row_history'}>
									{s}
								</option>
							);
						})}
					</select>
				</div>

				{/* Show Page */}
				<div className="join">
					<button
						onClick={() => {
							const page = field.page ?? 0;
							if (page + 1 - 1 >= 0) {
								setField((f) => ({ ...f, page: page - 1 }));
								prevPage(page - 1);
							}
						}}
						className="join-item btn">
						«
					</button>
					<button className="join-item btn">
						Page {(field.page ?? 0) + 1}/{field.totalPages ?? 0}
					</button>
					<button
						onClick={() => {
							const page = field.page ?? 0;
							if (page + 2 <= (field.totalPages ?? 1)) {
								setField((f) => ({ ...f, page: page + 1 }));
								nextPage(page + 1);
							}
						}}
						className="join-item btn">
						»
					</button>
				</div>
			</div>
			<dialog
				id="usert_bet_place_notice"
				className="modal z-[1100]">
				<div className="modal-box font-chakra-petch text-orange-500 p-2">
					<div className="sticky top-0 backdrop-blur-lg flex flex-row w-full py-2 justify-between items-center uppercase font-bold">
						<h1 className="text-lg">Thông Báo</h1>
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
}

// Lịch Sử Hoạt động
function HistoryActivity() {
	const user = useAppSelector((state) => state.user);
	const [actives, setActives] = useState<UserActive[]>([]);
	const [field, setField] = useState<FieldPage>({
		page: 0,
		totalPages: 1,
	});
	const [limited, setLimited] = useState<number>(25);

	useEffect(() => {
		const getActives = async () => {
			try {
				const res = await apiClient.get(
					`/user/history/active?limited=${limited}`,
					{
						headers: {
							Authorization: 'Bearer ' + user.token,
						},
					},
				);
				const { data, page, totalItems, totalPages } = res.data;
				setActives(data);
				setField({
					page: page,
					totalItems,
					totalPages,
				});
			} catch (err: any) {
				console.log(err.response.data.message.message);
			}
		};
		if (user.isLogin) {
			getActives();
		}
	}, [user, limited]);

	const nextPage = async (pageNumber: number) => {
		try {
			const res = await apiClient.get(
				`/user/history/active?page=${pageNumber}&limited=${limited}`,
				{
					headers: {
						Authorization: 'Bearer ' + user.token,
					},
				},
			);
			const { data, page, totalItems, totalPages } = res.data;
			setActives(data);
			setField({
				page: page,
				totalItems,
				totalPages,
			});
		} catch (err: any) {
			console.log(err.response.data.message.message);
		}
	};

	const prevPage = async (pageNumber: number) => {
		try {
			const res = await apiClient.get(
				`/user/history/active?page=${pageNumber}&limited=${limited}`,
				{
					headers: {
						Authorization: 'Bearer ' + user.token,
					},
				},
			);
			const { data, page, totalItems, totalPages } = res.data;
			setActives(data);
			setField({
				page: page,
				totalItems,
				totalPages,
			});
		} catch (err: any) {
			console.log(err.response.data.message.message);
		}
	};

	return (
		<div className="flex flex-col bg-white/30 backdrop-blur-lg rounded-box w-full py-4 px-8 gap-4 text-black slide-in-right">
			<div className="flex flex-row gap-2 items-center">
				<GiDragonShield size={34} />
				<h1 className="font-protest-strike-regular uppercase text-2xl">
					Lịch Sử Hoạt động
				</h1>
			</div>
			<div className="overflow-auto w-full h-[600px]">
				<table className="table border border-black text-nowrap">
					{/* head */}
					<thead className="bg-orange-500 text-white capitalize">
						<tr>
							<th>Máy Chủ</th>
							<th>Nhân Vật</th>
							<th>Hoạt Động</th>
							<th>Số vàng Trước</th>
							<th>Số vàng Sau</th>
							<th>thời gian</th>
						</tr>
					</thead>
					<tbody className="font-bold">
						{/* row 1 */}
						{actives.map((ac, i) => {
							const {
								name = 'nro',
								m_current = 0,
								m_new = 0,
							} = ac.active ?? {};
							const name_res =
								KeyConfig.find((k) => k.key === name)?.name ?? name;
							return (
								<tr key={i + 'history_activity'}>
									<td>1</td>
									<td>{user.name}</td>
									<td>{name_res}</td>
									<td>
										<div className="font-number-font badge badge-outline bg-red-500">
											{new Intl.NumberFormat('vi').format(m_current)}
										</div>
									</td>
									<td>
										<div className="font-number-font badge badge-outline bg-green-500">
											{new Intl.NumberFormat('vi').format(m_new)}
										</div>
									</td>
									<td>{moment(ac.createdAt).format('DD/MM/YYYY HH:mm:ss')}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<div className="flex flex-row justify-between">
				{/* Show Row */}
				<select
					defaultValue={`${limited}`}
					onChange={(e) => setLimited(Number(e.target.value))}
					className="select select-bordered w-full max-w-fit bg-transparent text-black border border-black">
					{['10', '25', '50', '100'].map((s, i) => {
						return (
							<option
								value={s}
								key={i + 'show_row_history'}>
								{s}
							</option>
						);
					})}
				</select>

				{/* Show Page */}
				<div className="join">
					<button
						onClick={() => {
							const page = field.page ?? 0;
							if (page + 1 - 1 >= 0) {
								setField((f) => ({ ...f, page: page - 1 }));
								prevPage(page - 1);
							}
						}}
						className="join-item btn">
						«
					</button>
					<button className="join-item btn">
						Page {(field.page ?? 0) + 1}/{field.totalPages ?? 0}
					</button>
					<button
						onClick={() => {
							const page = field.page ?? 0;
							if (page + 2 <= (field.totalPages ?? 1)) {
								setField((f) => ({ ...f, page: page + 1 }));
								nextPage(page + 1);
							}
						}}
						className="join-item btn">
						»
					</button>
				</div>
			</div>
		</div>
	);
}

// Table Nhiệm Vụ
function TableMission() {
	return (
		<div className="flex flex-col bg-white/30 backdrop-blur-lg rounded-box w-full py-4 px-8 gap-5 text-black slide-in-right">
			<div className="flex flex-row gap-2 items-center">
				<GiDragonShield size={34} />
				<h1 className="font-protest-strike-regular uppercase text-2xl">
					Table Nhiệm Vụ
				</h1>
			</div>
			<p className="text-2xl font-protest-strike-regular capitalize">
				Đang Cập Nhật <span className="loading loading-dots loading-xs"></span>
			</p>
		</div>
	);
}

export default UserContext;

const KeyConfig = [
	{ key: 'w_gold', name: 'Rút vàng' },
	{ key: 'cancel_w_gold', name: 'Hủy rút vàng' },
	{ key: 'd_gold', name: 'Nạp vàng' },
	{ key: 'cancel_d_gold', name: 'Hủy nạp vàng' },
	{ key: 'd_rgold', name: 'Nạp thỏi vàng' },
	{ key: 'cancel_d_rgold', name: 'Hủy nạp thỏi vàng' },
	{ key: 'w_rgold', name: 'Rút thỏi vàng' },
	{ key: 'cancel_w_rgold', name: 'Hủy rút thỏi vàng' },
	{ key: 'winer_bet', name: 'Thắng cược' },
	{ key: 'place_bet', name: 'Cược' },
	{ key: 'cancel_bet', name: 'Hủy Cược' },
	{ key: 'top_clan', name: 'TOP Clan' },
	{ key: 'top_day', name: 'TOP Day' },
	{ key: 'login', name: 'Đăng nhập' },
	{ key: 'resigter', name: 'Đăng ký' },
	{ key: 'change_pwd', name: 'Đổi mật khẩu' },
];
