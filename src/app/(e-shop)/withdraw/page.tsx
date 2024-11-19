'use client';
import { getNumbetFromString } from '@/components/pages/main/home';
import { useEffect, useState } from 'react';
import { InputField, TypeEShop } from '../(dto)/dto.eShop';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { FaMinus } from 'react-icons/fa';
import apiClient from '@/lib/server/apiClient';
import moment from 'moment';
import { EConfig, setConfigs } from '@/lib/redux/storage/eshop/config';
import { Bot, setBot } from '@/lib/redux/storage/eshop/bots';
import { setService } from '@/lib/redux/storage/eshop/service';
import { setClans } from '@/lib/redux/storage/clan/clans';
import { useSocket } from '@/lib/server/socket';

function Withdraw() {
	const user = useAppSelector((state) => state.user);
	const bots = useAppSelector((state) => state.bots);
	const services = useAppSelector((state) => state.services);
	const econfig = useAppSelector((state) => state.econfig);
	const dispatch = useAppDispatch();

	const [field, setField] = useState<InputField>({
		type: '1',
		typeGold: 'gold',
	});
	const [isLoad, setLoad] = useState<boolean>(false);
	const [isLoadSub, setLoadSub] = useState<boolean>(false);
	const [msg, setMsg] = useState<string>('');
	const [eshop, setEshop] = useState<EConfig>({});

	const socket = useSocket();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		// If valid, proceed with form submission logic
		try {
			e.preventDefault(); // Prevent form submission
			setLoadSub(true);
			// Config with ESHOP;
			const {
				min_gold = 50e6,
				min_rgold = 5,
				max_gold = 600e6,
				max_rgold = 40,
			} = eshop.option ?? {};

			const playerNameElement = e.currentTarget.elements.namedItem(
				'playerName',
			) as HTMLInputElement;
			const amountElement = e.currentTarget.elements.namedItem(
				'amount',
			) as HTMLInputElement;

			// Check if the playerName is empty
			if (!field.playerName || field.playerName.trim().length === 0) {
				playerNameElement.setCustomValidity('Tên nhân vật là bắt buộc.');
			} else {
				playerNameElement.setCustomValidity(''); // Clear error if valid
			}

			// Check if the amount is empty or not a valid number
			if (
				!field.amount ||
				isNaN(Number(field.amount)) ||
				Number(field.amount) <= 0
			) {
				amountElement.setCustomValidity(
					`Nhập số lượng ${
						field.typeGold === 'rgold' ? 'thỏi vàng' : 'vàng'
					} là bắt buộc.`,
				);
			} else {
				amountElement.setCustomValidity(''); // Clear error if valid
			}

			// Trigger validation
			if (
				!playerNameElement.reportValidity() ||
				!amountElement.reportValidity()
			) {
				return; // Stop submission if input is invalid
			}

			if (field.typeGold === 'gold') {
				if (Number(field.amount) < min_gold)
					amountElement.setCustomValidity(
						`Bạn không thể rút thấp hơn ${new Intl.NumberFormat('vi').format(
							min_gold,
						)} vàng`,
					);
				if (Number(field.amount) > max_gold)
					amountElement.setCustomValidity(
						`Bạn không thể rút lớn hơn ${new Intl.NumberFormat('vi').format(
							max_gold,
						)} vàng`,
					);
			}

			if (field.typeGold === 'rgold') {
				if (Number(field.amount) < min_rgold)
					amountElement.setCustomValidity(
						`Bạn không thể rút thấp hơn ${new Intl.NumberFormat('vi').format(
							min_rgold,
						)} thỏi vàng`,
					);
				if (Number(field.amount) > max_rgold)
					amountElement.setCustomValidity(
						`Bạn không thể rút lớn hơn ${new Intl.NumberFormat('vi').format(
							max_rgold,
						)} thỏi vàng`,
					);
			}

			let bot_status = [...(bots ?? [])]
				.filter((b) => user.server === b.server)
				.filter(
					(b) => b.type_money === (field.typeGold === 'gold' ? '1' : '0'),
				);
			if (bot_status.length === 0)
				return showNoticeEShop(
					'Hệ thống nạp rút đang quá tải, xin vui lòng đợi trong giây lát',
				);
			const { typeGold, amount, playerName } = field;
			const { data } = await apiClient.post(
				'/service/create',
				{
					type: typeGold === 'gold' ? '1' : '0',
					amount: Number(amount),
					playerName,
					server: user.server,
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
		} finally {
			setLoadSub(false);
		}
	};

	const showNoticeEShop = (message: string) => {
		let dialog = document.getElementById('eshop_withdraw') as HTMLDialogElement;
		if (dialog) {
			dialog.show();
			setMsg(message);
		}
	};

	const cancelService = async (serviceId: string) => {
		try {
			setLoad(true);
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
		} finally {
			setLoad(false);
		}
	};

	// Auto get Bot Info
	useEffect(() => {
		socket.on('bot.status', (payload: Bot) => {
			dispatch(setBot(payload));
		});
		return () => {
			socket.off('bot.status');
		};
	}, [socket]);

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
		// const listBot = async () => {
		// 	try {
		// 		const { data } = await apiClient.get('/bot/list');
		// 		dispatch(setBots(data));
		// 	} catch (err: any) {
		// 		console.log(err.response.data.message.message);
		// 	}
		// };

		listClan();
		listConfig();
		// listBot();
	}, []);

	// Update data ESHOP;
	useEffect(() => {
		const e_shop = econfig.find((e) => e.name === 'e_shop');
		if (e_shop) {
			setEshop(e_shop);
		}
	}, [econfig]);

	useEffect(() => {
		const getServices = async () => {
			try {
				const res = await apiClient.get(`/service/history`, {
					headers: {
						Authorization: 'Bearer ' + user.token,
					},
				});
				const { data, page, totalItems, totalPages } = res.data;
				for (const service of data) {
					dispatch(setService(service));
				}
			} catch (err: any) {
				console.log(err.response.data.message.message);
			}
		};
		if (user.isLogin) {
			getServices();
		}
	}, []);
	return (
		<div
			style={{ backgroundImage: "url('/image/background/logo_withdraw.webp')" }}
			className="min-h-screen w-full flex flex-col justify-center items-center p-4 gap-4 bg-no-repeat bg-cover select-none">
			<div className="flex flex-col gap-2 w-full max-w-7xl rounded-box shadow-lg shadow-white/80 bg-white/50 backdrop-blur-lg text-black p-8">
				<h1 className="w-full text-center font-chakra-petch font-bold uppercase text-4xl text-amber-800">
					Rút Vàng
				</h1>
				<div className="flex flex-col gap-1 text-sm shadow-inner shadow-orange-500/30 text-black p-2 rounded-box bg-orange-500/30 font-bold">
					<p>Hệ thống rút vàng tự động</p>
					<p>Bước 1: Đặt đơn rút vàng trên website</p>
					<p>
						Bước 2: Vào đúng địa điểm gặp nhân vật giao hàng để giao dịch nhân
						vàng
					</p>
					<p>- Tỷ lệ rút 100%, rút 100tr được 100tr</p>
					<p>
						Hệ thống tự động hoàn vàng sau 10 phút nếu chưa giao dịch thành công
					</p>
					<p>Hãy tìm khu không có Virus/BOSS để tránh bị hủy GD giữa chừng.</p>
				</div>
				<div className="flex lg:flex-row flex-col w-full gap-2">
					{/* Giao Dịch */}
					<form
						onSubmit={handleSubmit}
						className="flex flex-col w-full lg:max-w-md rounded-box border border-current bg-white">
						<div className="w-full bg-orange-500 text-white text-center rounded-t-box py-4 flex flex-row items-center justify-center gap-4 font-protest-strike-regular">
							<h1>Số Dư:</h1>
							<div className="flex flex-row gap-1 items-center">
								<div className="avatar">
									<div className="w-8 rounded-xl">
										<img
											src={`/image/icon/s1.webp`}
											alt={`Icon gold`}
										/>
									</div>
								</div>
								<p className="font-sf-trans-robotics">
									{new Intl.NumberFormat('vi').format(user.money ?? 0)}
								</p>
							</div>
						</div>
						<label className="form-control w-full p-2 text-orange-500 font-protest-strike-regular">
							<select
								disabled
								className="select select-bordered w-full border-2 ">
								<option disabled>Chọn Máy Chủ</option>
								{Array.from({ length: 7 }).map((_, i) => (
									<option
										selected={user.server === `${i + 1}`}
										key={i + 'withdraw'}
										value={i + 1}>
										Máy Chủ {i + 1}
									</option>
								))}
								<option
									key={'8-9-10' + 'withdraw'}
									selected={user.server === `8`}
									value={'8'}>
									Máy Chủ 8-9-10
								</option>
								<option disabled>Chọn Máy Chủ</option>
								{Array.from({ length: 3 }).map((_, i) => (
									<option
										key={i + 'withdraw'}
										selected={user.server === `${i + 11}`}
										value={i + 11}>
										Máy Chủ {i + 11}
									</option>
								))}
							</select>
						</label>
						<label className="form-control w-full p-2 text-orange-500 font-protest-strike-regular">
							<select
								defaultValue={field.typeGold}
								className="select select-bordered w-full border-2 "
								onChange={(e) => {
									setField((f) => ({
										...f,
										typeGold: e.target.value as TypeEShop,
										amount: '0',
									}));
								}}>
								<option value={'gold'}>Rút vàng</option>
								<option value={'rgold'}>Rút thỏi vàng</option>
							</select>
						</label>
						<label className="form-control w-full p-2 text-orange-500 font-protest-strike-regular">
							<div className="input input-bordered bg-transparent input-lg flex items-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 16 16"
									fill="currentColor"
									className="h-4 w-4 opacity-70">
									<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
								</svg>
								<input
									type="text"
									className="grow"
									placeholder="Tên nhân vật"
									name="playerName"
									onChange={(e) => {
										const value = e.target.value;

										// Update field state
										setField((f) => ({
											...f,
											playerName: value,
										}));

										// Check if playerName is empty
										if (value.trim().length === 0) {
											e.target.setCustomValidity('Tên nhân vật là bắt buộc.');
										} else {
											e.target.setCustomValidity(''); // Clear error if valid
										}

										// Optionally, you can call `reportValidity` to trigger validation visually while typing
										e.target.reportValidity();
									}}
								/>
							</div>
							<div className="label hidden">
								<span className="label-text-alt">Bottom Left label</span>
							</div>
						</label>
						<label className="form-control w-full p-2 text-orange-500 font-protest-strike-regular">
							<div className="input input-bordered bg-transparent input-lg flex items-center gap-2">
								<div className="avatar">
									<div className="w-8 rounded-xl">
										<img
											src={`/image/icon/s1.webp`}
											alt={`Icon gold`}
										/>
									</div>
								</div>
								<input
									value={getNumbetFromString(field.amount ?? '')}
									onChange={(e) => {
										// Extract numeric part (removes any non-digit characters)
										let value = getNumbetFromString(e.target.value);
										e.target.value = value;

										let new_value = value.split(/[,.]/g).join('');
										setField((f) => ({
											...f,
											amount: new_value,
										}));

										// Check if amount is empty or invalid
										if (
											!new_value ||
											isNaN(Number(new_value)) ||
											Number(new_value) <= 0
										) {
											e.target.setCustomValidity(
												`Nhập số lượng ${
													field.typeGold === 'rgold' ? 'thỏi vàng' : 'vàng'
												} là bắt buộc.`,
											);
										} else {
											e.target.setCustomValidity(''); // Clear error if valid
										}

										e.target.reportValidity();
									}}
									type="text"
									name="amount"
									className="grow"
									placeholder={`Nhập số ${
										field.typeGold === 'rgold' ? 'thỏi vàng' : 'vàng'
									} rút`}
								/>
							</div>
							<div className="label hidden">
								<span className="label-text-alt">Bottom Left label</span>
							</div>
						</label>
						<label
							className={`form-control w-full p-2 text-orange-500 font-protest-strike-regular`}>
							<div className="label">
								<span className="label-text-alt">Số vàng nhận</span>
							</div>
							<div className="input input-bordered bg-transparent input-lg flex items-center gap-2">
								<div className="avatar">
									<div className="w-8 rounded-xl">
										<img
											src={`/image/icon/s1.webp`}
											alt={`Icon gold`}
										/>
									</div>
								</div>
								<input
									type="text"
									className="grow"
									placeholder="Số vàng nhận"
									value={new Intl.NumberFormat('vi').format(
										Number(field.amount ?? 0) *
											(field.typeGold === 'rgold' ? 1e6 * 37 : 1),
									)}
								/>
							</div>
						</label>
						<div className="p-2">
							<div className="flex flex-col gap-1 text-sm shadow-inner shadow-orange-500/30 text-black p-2 rounded-box bg-orange-500/30 font-bold">
								<p>
									Hạn mức hôm nay (0h00p sẽ reset):{' '}
									{new Intl.NumberFormat('vi').format(
										user?.meta?.limitTrade ?? 0,
									)}
								</p>
								<p>
									Đã sử dụng:{' '}
									{new Intl.NumberFormat('vi').format(user?.meta?.trade ?? 0)}
								</p>
								<p>Vui lòng chơi để nâng thêm hạn mức !</p>
								<p>
									Hệ thống thỏi vàng tự động quy đổi{' '}
									<span className="text-red-500">1 thỏi vàng</span> là{' '}
									<span className="text-red-500">37tr vàng</span>
								</p>
								<p>
									Tối đa một lần rút:{' '}
									<span className="text-red-500">
										{new Intl.NumberFormat('vi').format(
											eshop?.option?.max_gold ?? 600e6,
										)}{' '}
										vàng
									</span>{' '}
									/{' '}
									<span className="text-red-500">
										{new Intl.NumberFormat('vi').format(
											eshop?.option?.max_rgold ?? 40,
										)}{' '}
										thỏi vàng
									</span>
								</p>
							</div>
						</div>
						<div className="p-4 w-full">
							<button
								disabled={isLoadSub}
								className="font-protest-strike-regular w-full uppercase py-4 px-2 bg-orange-500 text-white rounded-box hover:border-orange-500 hover:border hover:bg-transparent hover:text-orange-500 hover:duration-300 active:hover:scale-90"
								type="submit">
								{isLoadSub ? (
									<span className="loading loading-bars loading-sm"></span>
								) : (
									'Rút Ngay'
								)}
							</button>
						</div>
					</form>
					{/* Table Bot giao dich */}
					<div className="overflow-auto w-full">
						<table className="table border border-black text-nowrap">
							<caption className="caption-top capitalize py-2 px-2 text-xl bg-white text-orange-500 font-protest-strike-regular rounded-t-box">
								Vị Trí Nhân Vật Giao vàng
							</caption>
							{/* head */}
							<thead className="bg-orange-500 text-white capitalize">
								<tr>
									<th></th>
									<th>Nhân Vật</th>
									<th>Địa điểm</th>
									<th>Khu vực</th>
									<th>Số vàng</th>
								</tr>
							</thead>
							<tbody>
								{/* row 1 */}
								{[...(bots ?? [])]
									.filter((b) => user.server === b.server)
									.filter(
										(b) =>
											b.type_money === (field.typeGold === 'gold' ? '1' : '0'),
									)
									.map((b, i) => {
										return (
											<tr key={i + 'deposit_bot'}>
												<th>{i + 1}</th>
												<td>{b.name ?? 'nro'}</td>
												<td>{b.map ?? 'nro'}</td>
												<td>{b.zone ?? 'nro'}</td>
												<td className="font-sf-trans-robotics">
													{new Intl.NumberFormat('vi').format(b.money ?? 0)}
												</td>
											</tr>
										);
									})}
							</tbody>
						</table>

						{[...(bots ?? [])]
							.filter((b) => user.server === b.server)
							.filter(
								(b) => b.type_money === (field.typeGold === 'gold' ? '1' : '0'),
							).length === 0 &&
							user.isLogin && (
								<div className="text-center w-full bg-white text-orange-500">
									Hệ thống rút đang quá tải, xin quay lại trong vài phút!
								</div>
							)}
					</div>
				</div>
			</div>
			{/* History Giao Dịch */}
			<div className="flex flex-col gap-2 w-full max-w-7xl rounded-box shadow-lg shadow-white/80 bg-white/50 backdrop-blur-lg text-black p-8">
				<div className="overflow-auto w-full">
					<table className="table border border-black text-nowrap">
						<caption className="caption-top capitalize py-2 px-2 text-2xl bg-white text-orange-500 font-protest-strike-regular rounded-t-box">
							Lịch Sử giao dịch
						</caption>
						{/* head */}
						<thead className="bg-orange-500 text-white capitalize">
							<tr>
								<th>Máy Chủ</th>
								<th>Nhân Vật</th>
								<th>Hình thức</th>
								<th>Số Thỏi/vàng</th>
								<th>Số vàng nhận</th>
								<th>Tình trạng</th>
								<th>thời gian</th>
								<th>Tương tác</th>
							</tr>
						</thead>
						<tbody className="font-bold text-base">
							{/* row 1 */}
							{services
								?.filter((s) => s.uid === user._id)
								?.filter((s) => s.type === '0' || s.type === '1')
								?.sort(
									(a, b) =>
										moment(b.updatedAt).unix() - moment(a.updatedAt).unix(),
								)
								?.map((s, i) => {
									const {
										server,
										type,
										playerName,
										status,
										amount,
										updatedAt,
										revice = 0,
									} = s;
									const revice_m = type === '0' ? revice * 37e6 : revice;
									return (
										<tr key={i + 'deposit_bot'}>
											<td>{server}</td>
											<td>{playerName}</td>
											<td>{type === '0' ? 'Rút thỏi vàng' : 'Rút vàng'}</td>
											<td className="font-number-font">
												{new Intl.NumberFormat('vi').format(amount ?? 0)}
											</td>
											<td className="font-number-font">
												{new Intl.NumberFormat('vi').format(revice_m)}
											</td>
											<td>
												<div
													className={`badge ${
														status === '0'
															? 'bg-cyan-500'
															: status === '1'
															? 'bg-red-500'
															: 'bg-green-500'
													} font-chakra-petch capitalize text-black`}>
													{status === '0'
														? 'Chờ giao dịch'
														: status === '1'
														? 'Đã hủy'
														: 'Thành công'}
												</div>
											</td>
											<td>{moment(updatedAt).format('DD/MM/YYYY HH:mm:ss')}</td>
											<td>
												{s.isEnd ? (
													''
												) : (
													<button
														onClick={() => cancelService(s._id ?? '')}
														disabled={isLoad}
														className="p-2 rounded-lg bg-red-500 text-white">
														{isLoad ? (
															<span className="loading loading-bars loading-sm"></span>
														) : (
															'Hủy'
														)}
													</button>
												)}
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			</div>
			<dialog
				id="eshop_withdraw"
				className="modal z-[1100]">
				<div className="modal-box font-chakra-petch text-orange-500 p-2">
					<div className="sticky top-0 backdrop-blur-lg flex flex-row w-full py-2 justify-between items-center uppercase font-bold">
						<h1 className="text-lg">Thông Báo</h1>
						<form
							method="dialog"
							className="modal-backdrop">
							<button>
								<FaMinus size={24} />
							</button>
						</form>
					</div>
					<div className="flex flex-col gap-2 text-center">
						<p className="">{msg}</p>
					</div>
				</div>
				<form method="dialog">
					<button>
						<FaMinus size={24} />
					</button>
				</form>
			</dialog>
		</div>
	);
}

export default Withdraw;
